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
          await db
            .from("organizations")
            .update({
              setup_fee_paid: true,
              stripe_customer_id: session.customer as string,
            })
            .eq("id", organizationId);

          // Create invoice record
          await db.from("invoices").insert({
            organization_id: organizationId,
            stripe_invoice_id: session.invoice as string,
            setup_fee: 1500, // $1,500 setup fee
            total: 1500,
            period_start: new Date().toISOString(),
            period_end: new Date().toISOString(),
            status: "PAID",
            paid_at: new Date().toISOString(),
          });
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = subscription.metadata?.organizationId;

        if (organizationId) {
          await db
            .from("organizations")
            .update({
              stripe_subscription_id: subscription.id,
              subscription_status: "ACTIVE",
            })
            .eq("id", organizationId);
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

          await db
            .from("organizations")
            .update({
              subscription_status: status,
            })
            .eq("id", organizationId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = subscription.metadata?.organizationId;

        if (organizationId) {
          await db
            .from("organizations")
            .update({
              subscription_status: "CANCELED",
            })
            .eq("id", organizationId);
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Find organization by Stripe customer ID
        const { data: organization } = await db
          .from("organizations")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (organization) {
          // Check if invoice already exists
          const { data: existingInvoice } = await db
            .from("invoices")
            .select("id")
            .eq("stripe_invoice_id", invoice.id)
            .single();

          if (existingInvoice) {
            // Update existing invoice
            await db
              .from("invoices")
              .update({
                status: "PAID",
                paid_at: new Date().toISOString(),
              })
              .eq("stripe_invoice_id", invoice.id);
          } else {
            // Create new invoice
            await db.from("invoices").insert({
              organization_id: organization.id,
              stripe_invoice_id: invoice.id,
              platform_fee: (invoice.amount_paid || 0) / 100,
              total: (invoice.amount_paid || 0) / 100,
              period_start: new Date(invoice.period_start * 1000).toISOString(),
              period_end: new Date(invoice.period_end * 1000).toISOString(),
              status: "PAID",
              paid_at: new Date().toISOString(),
            });
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const { data: organization } = await db
          .from("organizations")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (organization) {
          await db
            .from("organizations")
            .update({
              subscription_status: "PAST_DUE",
            })
            .eq("id", organization.id);

          // Check if invoice already exists
          const { data: existingInvoice } = await db
            .from("invoices")
            .select("id")
            .eq("stripe_invoice_id", invoice.id)
            .single();

          if (existingInvoice) {
            await db
              .from("invoices")
              .update({
                status: "FAILED",
              })
              .eq("stripe_invoice_id", invoice.id);
          } else {
            await db.from("invoices").insert({
              organization_id: organization.id,
              stripe_invoice_id: invoice.id,
              platform_fee: (invoice.amount_due || 0) / 100,
              total: (invoice.amount_due || 0) / 100,
              period_start: new Date(invoice.period_start * 1000).toISOString(),
              period_end: new Date(invoice.period_end * 1000).toISOString(),
              status: "FAILED",
            });
          }
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
