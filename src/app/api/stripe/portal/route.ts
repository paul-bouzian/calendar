import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { userSubscriptions } from "@/db/schema";
import { authServer } from "@/lib/auth-server";
import { stripe } from "@/lib/stripe/client";

export async function POST() {
	try {
		const { data: session } = await authServer.getSession();
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const subscription = await db.query.userSubscriptions.findFirst({
			where: eq(userSubscriptions.userId, session.user.id),
		});

		if (!subscription?.stripeCustomerId) {
			return NextResponse.json(
				{ error: "No billing account found" },
				{ status: 404 },
			);
		}

		const portalSession = await stripe.billingPortal.sessions.create({
			customer: subscription.stripeCustomerId,
			return_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing`,
		});

		return NextResponse.json({ url: portalSession.url });
	} catch (error) {
		console.error("[Stripe Portal]", error);
		return NextResponse.json(
			{ error: "Failed to create portal session" },
			{ status: 500 },
		);
	}
}
