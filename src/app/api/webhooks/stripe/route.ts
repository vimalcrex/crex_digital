import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const organizationId = session.metadata?.organizationId;
        const type = session.metadata?.type;

        if (organizationId && type === "setup_fee") {
          // Mark setup fee as paid
          await db.organization.update({
            where: { id: organizationId },
            data: {
              setupFeePaid: true,
              stripeCustomerId: session.customer as string,
            },
          });

          // Create invoice record
          await db.invoice.create({
            data: {
              organizationId,
              stripeInvoiceId: session.invoice as string,
              setupFee: 1500, // $1,500 setup fee
              total: 1500,
              periodStart: new Date(),
              periodEnd: new Date(),
              status: "PAID",
              paidAt: new Date(),
            },
          });
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = subscription.metadata?.organizationId;

        if (organizationId) {
          await db.organization.update({
            where: { id: organizationId },
            data: {
              stripeSubscriptionId: subscription.id,
              subscriptionStatus: "ACTIVE",
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = subscription.metadata?.organizationId;

        if (organizationId) {
          let status: "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIALING" =
            "ACTIVE";

          switch (subscription.status) {
            case "active":
              status = "ACTIVE";
              break;
            case "past_due":
              status = "PAST_DUE";
              break;
            case "canceled":
              status = "CANCELED";
              break;
            case "trialing":
              status = "TRIALING";
              break;
          }

          await db.organization.update({
            where: { id: organizationId },
            data: {
              subscriptionStatus: status,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = subscription.metadata?.organizationId;

        if (organizationId) {
          await db.organization.update({
            where: { id: organizationId },
            data: {
              subscriptionStatus: "CANCELED",
            },
          });
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Find organization by Stripe customer ID
        const organization = await db.organization.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (organization) {
          // Create or update invoice record
          await db.invoice.upsert({
            where: { stripeInvoiceId: invoice.id },
            create: {
              organizationId: organization.id,
              stripeInvoiceId: invoice.id,
              platformFee: (invoice.amount_paid || 0) / 100,
              total: (invoice.amount_paid || 0) / 100,
              periodStart: new Date(invoice.period_start * 1000),
              periodEnd: new Date(invoice.period_end * 1000),
              status: "PAID",
              paidAt: new Date(),
            },
            update: {
              status: "PAID",
              paidAt: new Date(),
            },
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const organization = await db.organization.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (organization) {
          await db.organization.update({
            where: { id: organization.id },
            data: {
              subscriptionStatus: "PAST_DUE",
            },
          });

          await db.invoice.upsert({
            where: { stripeInvoiceId: invoice.id },
            create: {
              organizationId: organization.id,
              stripeInvoiceId: invoice.id,
              platformFee: (invoice.amount_due || 0) / 100,
              total: (invoice.amount_due || 0) / 100,
              periodStart: new Date(invoice.period_start * 1000),
              periodEnd: new Date(invoice.period_end * 1000),
              status: "FAILED",
            },
            update: {
              status: "FAILED",
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
