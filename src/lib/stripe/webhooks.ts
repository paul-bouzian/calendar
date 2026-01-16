import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { db } from "@/db/index";
import { userSubscriptions } from "@/db/schema";

export async function handleCheckoutCompleted(
	session: Stripe.Checkout.Session,
) {
	const customerId = session.customer as string;
	const subscriptionId = session.subscription as string;

	await db
		.update(userSubscriptions)
		.set({
			stripeSubscriptionId: subscriptionId,
			plan: "premium",
			updatedAt: new Date(),
		})
		.where(eq(userSubscriptions.stripeCustomerId, customerId));

	console.log(`[Stripe] Checkout completed for customer ${customerId}`);
}

export async function handleSubscriptionUpdated(
	subscription: Stripe.Subscription,
) {
	const customerId = subscription.customer as string;
	const status = subscription.status;

	const plan =
		status === "active" || status === "trialing" ? "premium" : "free";

	await db
		.update(userSubscriptions)
		.set({
			plan,
			stripeSubscriptionId: subscription.id,
			updatedAt: new Date(),
		})
		.where(eq(userSubscriptions.stripeCustomerId, customerId));

	console.log(`[Stripe] Subscription ${subscription.id} updated to ${plan}`);
}

export async function handleSubscriptionDeleted(
	subscription: Stripe.Subscription,
) {
	const customerId = subscription.customer as string;

	await db
		.update(userSubscriptions)
		.set({
			plan: "free",
			stripeSubscriptionId: null,
			updatedAt: new Date(),
		})
		.where(eq(userSubscriptions.stripeCustomerId, customerId));

	console.log(`[Stripe] Subscription ${subscription.id} cancelled`);
}
