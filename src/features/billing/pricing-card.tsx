"use client";

import { Check, Loader2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useStripeRedirect } from "@/hooks/use-stripe-redirect";
import { useTranslations } from "next-intl";

interface PricingCardProps {
	isPremium: boolean;
}

const PREMIUM_FEATURES = [
	"upgrade_feature_unlimited_voice",
	"upgrade_feature_priority_support",
	"upgrade_feature_early_access",
] as const;

const FREE_FEATURES = [
	"pricing_tier_free_feature_1",
	"pricing_tier_free_feature_2",
	"pricing_tier_free_feature_4",
] as const;

export function PricingCard({ isPremium }: PricingCardProps) {
	const t = useTranslations();
	const { redirect, isLoading } = useStripeRedirect("/api/stripe/checkout");

	if (isPremium) {
		return (
			<Card className="border-primary">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Star className="size-5 text-primary" />
						{t("billing_plan_premium")}
						<Badge className="border-0 bg-gradient-to-r from-[#B552D9] to-[#FA8485] text-white">
							{t("billing_active")}
						</Badge>
					</CardTitle>
					<CardDescription>{t("billing_premium_desc")}</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2 text-sm text-muted-foreground">
						{PREMIUM_FEATURES.map((feature) => (
							<li key={feature} className="flex items-center gap-2">
								<Check className="size-4 text-green-500" />
								{t(feature)}
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{t("billing_plan_free")}
					<Badge variant="secondary">Free</Badge>
				</CardTitle>
				<CardDescription>{t("billing_free_desc")}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<ul className="space-y-2 text-sm text-muted-foreground">
					{FREE_FEATURES.map((feature) => (
						<li key={feature} className="flex items-center gap-2">
							<Check className="size-4 text-green-500" />
							{t(feature)}
						</li>
					))}
				</ul>
				<Button
					onClick={redirect}
					disabled={isLoading}
					className="w-full bg-gradient-to-r from-[#B552D9] to-[#FA8485] hover:opacity-90"
				>
					{isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
					{t("billing_upgrade_cta")}
				</Button>
			</CardContent>
		</Card>
	);
}
