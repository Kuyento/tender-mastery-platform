/**
 * POST /api/webhooks/stripe — Stripe webhook handler.
 *
 * Publicly accessible (no auth required). Stripe calls this endpoint to
 * notify the platform of payment events (e.g. checkout.session.completed,
 * invoice.payment_succeeded).
 *
 * Security: All incoming requests are verified using the Stripe webhook
 * signing secret (`STRIPE_WEBHOOK_SECRET`) to ensure they originate from
 * Stripe and have not been tampered with.
 *
 * IMPORTANT: This route must read the raw request body for signature
 * verification. Do not parse the body with JSON.parse() before verification.
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Keep this in sync with the Stripe API version used in your Stripe Dashboard.
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing Stripe signature header.", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Stripe webhook signature verification failed: ${message}`);
    return new Response(`Webhook error: ${message}`, { status: 400 });
  }

  // Handle relevant Stripe events.
  switch (event.type) {
    case "checkout.session.completed": {
      // TODO: Provision course access for the learner in Supabase.
      // const session = event.data.object as Stripe.Checkout.Session
      break;
    }

    case "invoice.payment_succeeded": {
      // TODO: Handle subscription renewal if subscription model is used.
      break;
    }

    case "customer.subscription.deleted": {
      // TODO: Revoke course access if subscription is cancelled.
      break;
    }

    default:
      // Unhandled event types are silently ignored.
      break;
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
