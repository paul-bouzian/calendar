"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function ManageSubscription() {
	const t = useTranslations();
	const [isLoading, setIsLoading] = useState(false);

	const handleManage = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/stripe/portal", { method: "POST" });
			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error("[Portal]", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("billing_manage")}</CardTitle>
				<CardDescription>{t("billing_manage_desc")}</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					variant="outline"
					onClick={handleManage}
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
