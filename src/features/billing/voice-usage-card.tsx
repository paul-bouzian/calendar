"use client";

import { Mic } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";

interface VoiceUsageCardProps {
	count: number;
	limit: number;
	isUnlimited: boolean;
}

export function VoiceUsageCard({
	count,
	limit,
	isUnlimited,
}: VoiceUsageCardProps) {
	const t = useTranslations();

	if (isUnlimited) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Mic className="size-5" />
						{t("billing_voice_usage")}
					</CardTitle>
					<CardDescription>{t("billing_unlimited_usage")}</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	const percentage = Math.min(100, (count / limit) * 100);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Mic className="size-5" />
					{t("billing_voice_usage")}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Progress value={percentage} className="h-2" />
				<p className="text-sm text-muted-foreground">
					{t("billing_usage_count", { used: count, total: limit })}
				</p>
			</CardContent>
		</Card>
	);
}
