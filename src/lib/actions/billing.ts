"use server";

import { eq } from "drizzle-orm";
import { format } from "date-fns";
import { db } from "@/db/index";
import { userSubscriptions } from "@/db/schema";
import { authServer } from "@/lib/auth-server";

const FREE_VOICE_LIMIT = 100;

export interface SubscriptionInfo {
	plan: "free" | "premium";
	stripeCustomerId: string | null;
	stripeSubscriptionId: string | null;
	voiceUsage: {
		count: number;
		limit: number;
		remaining: number;
		isUnlimited: boolean;
	};
}

export async function getSubscriptionInfo(): Promise<SubscriptionInfo> {
	const { data: session } = await authServer.getSession();
	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const currentMonth = format(new Date(), "yyyy-MM");

	const subscription = await db.query.userSubscriptions.findFirst({
		where: eq(userSubscriptions.userId, session.user.id),
	});

	if (!subscription) {
		return {
			plan: "free",
			stripeCustomerId: null,
			stripeSubscriptionId: null,
			voiceUsage: {
				count: 0,
				limit: FREE_VOICE_LIMIT,
				remaining: FREE_VOICE_LIMIT,
				isUnlimited: false,
			},
		};
	}

	const isPremium = subscription.plan === "premium";
	const count =
		subscription.voiceUsageMonth === currentMonth
			? subscription.voiceUsageCount
			: 0;

	return {
		plan: subscription.plan as "free" | "premium",
		stripeCustomerId: subscription.stripeCustomerId,
		stripeSubscriptionId: subscription.stripeSubscriptionId,
		voiceUsage: {
			count,
			limit: isPremium ? -1 : FREE_VOICE_LIMIT,
			remaining: isPremium ? -1 : Math.max(0, FREE_VOICE_LIMIT - count),
			isUnlimited: isPremium,
		},
	};
}
