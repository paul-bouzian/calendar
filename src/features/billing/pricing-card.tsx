"use client";

import { useState } from "react";
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
import { useTranslations } from "next-intl";

interface PricingCardProps {
	isPremium: boolean;
}

export function PricingCard({ isPremium }: PricingCardProps) {
	const t = useTranslations();
	const [isLoading, setIsLoading] = useState(false);

	const handleUpgrade = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/stripe/checkout", { method: "POST" });
			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error("[Upgrade]", error);
		} finally {
			setIsLoading(false);
		}
	};

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
						<li className="flex items-center gap-2">
							<Check className="size-4 text-green-500" />
							{t("upgrade_feature_unlimited_voice")}
						</li>
						<li className="flex items-center gap-2">
							<Check className="size-4 text-green-500" />
							{t("upgrade_feature_priority_support")}
						</li>
						<li className="flex items-center gap-2">
							<Check className="size-4 text-green-500" />
							{t("upgrade_feature_early_access")}
						</li>
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
					<li className="flex items-center gap-2">
						<Check className="size-4 text-green-500" />
						{t("pricing_tier_free_feature_1")}
					</li>
					<li className="flex items-center gap-2">
						<Check className="size-4 text-green-500" />
						{t("pricing_tier_free_feature_2")}
					</li>
					<li className="flex items-center gap-2">
						<Check className="size-4 text-green-500" />
						{t("pricing_tier_free_feature_4")}
					</li>
				</ul>
				<Button
					onClick={handleUpgrade}
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
