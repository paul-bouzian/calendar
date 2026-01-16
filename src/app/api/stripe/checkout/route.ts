import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { userSubscriptions } from "@/db/schema";
import { authServer } from "@/lib/auth-server";
import { stripe, STRIPE_CONFIG } from "@/lib/stripe/client";

export async function POST() {
	try {
		const { data: session } = await authServer.getSession();
		if (!session?.user?.id || !session.user.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userId = session.user.id;
		const userEmail = session.user.email;

		const subscription = await db.query.userSubscriptions.findFirst({
			where: eq(userSubscriptions.userId, userId),
		});

		let customerId = subscription?.stripeCustomerId;

		if (!customerId) {
			const customer = await stripe.customers.create({
				email: userEmail,
				metadata: { userId },
			});
			customerId = customer.id;

			await db
				.insert(userSubscriptions)
				.values({ userId, stripeCustomerId: customerId, plan: "free" })
				.onConflictDoUpdate({
					target: userSubscriptions.userId,
					set: { stripeCustomerId: customerId },
				});
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			customer: customerId,
			mode: "subscription",
			line_items: [{ price: STRIPE_CONFIG.priceId, quantity: 1 }],
			success_url: STRIPE_CONFIG.successUrl,
			cancel_url: STRIPE_CONFIG.cancelUrl,
			metadata: { userId },
		});

		return NextResponse.json({ url: checkoutSession.url });
	} catch (error) {
		console.error("[Stripe Checkout]", error);
		return NextResponse.json(
			{ error: "Failed to create checkout session" },
			{ status: 500 },
		);
	}
}
