"use client";

import { ExternalLink, Loader2 } from "lucide-react";
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

export function ManageSubscription() {
	const t = useTranslations();
	const { redirect, isLoading } = useStripeRedirect("/api/stripe/portal");

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("billing_manage")}</CardTitle>
				<CardDescription>{t("billing_manage_desc")}</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					variant="outline"
					onClick={redirect}
					disabled={isLoading}
					className="w-full"
				>
					{isLoading ? (
						<Loader2 className="mr-2 size-4 animate-spin" />
					) : (
						<ExternalLink className="mr-2 size-4" />
					)}
					{t("billing_manage_cta")}
				</Button>
			</CardContent>
		</Card>
	);
}
