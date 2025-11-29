import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

// Price IDs from Stripe Dashboard
export const PRICES = {
  SETUP_FEE: process.env.STRIPE_SETUP_FEE_PRICE_ID || "",
  MONTHLY_PLATFORM: process.env.STRIPE_MONTHLY_PRICE_ID || "",
};

/**
 * Create a Stripe customer for an organization
 */
export async function createStripeCustomer(
  organizationId: string,
  email: string,
  name: string
): Promise<Stripe.Customer> {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      organizationId,
    },
  });

  return customer;
}

/**
 * Create a checkout session for initial setup
 */
export async function createSetupCheckoutSession(
  customerId: string,
  organizationId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: PRICES.SETUP_FEE,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      organizationId,
      type: "setup_fee",
    },
  });

  return session;
}

/**
 * Create a subscription for monthly platform fee
 */
export async function createSubscription(
  customerId: string,
  organizationId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: PRICES.MONTHLY_PLATFORM,
      },
    ],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
    metadata: {
      organizationId,
    },
  });

  return subscription;
}

/**
 * Create a billing portal session
 */
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

/**
 * Get customer's subscription status
 */
export async function getSubscriptionStatus(
  customerId: string
): Promise<Stripe.Subscription | null> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 1,
  });

  return subscriptions.data[0] || null;
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);
  return subscription;
}

/**
 * Create a usage record for ad spend pass-through
 */
export async function createUsageRecord(
  subscriptionItemId: string,
  quantity: number,
  timestamp?: number
): Promise<Stripe.UsageRecord> {
  const usageRecord = await stripe.subscriptionItems.createUsageRecord(
    subscriptionItemId,
    {
      quantity,
      timestamp: timestamp || Math.floor(Date.now() / 1000),
      action: "increment",
    }
  );

  return usageRecord;
}

/**
 * Get upcoming invoice for a customer
 */
export async function getUpcomingInvoice(
  customerId: string
): Promise<Stripe.Invoice | null> {
  try {
    const invoice = await stripe.invoices.retrieveUpcoming({
      customer: customerId,
    });
    return invoice;
  } catch {
    return null;
  }
}

/**
 * List invoices for a customer
 */
export async function listInvoices(
  customerId: string,
  limit: number = 10
): Promise<Stripe.Invoice[]> {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  });

  return invoices.data;
}
