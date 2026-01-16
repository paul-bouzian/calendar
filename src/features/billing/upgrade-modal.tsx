"use client";

import { useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface UpgradeModalProps {
	isOpen: boolean;
	onClose: () => void;
	usageCount: number;
	usageLimit: number;
}

export function UpgradeModal({
	isOpen,
	onClose,
	usageCount,
	usageLimit,
}: UpgradeModalProps) {
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

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#B552D9] to-[#FA8485]">
						<Sparkles className="size-6 text-white" />
					</div>
					<DialogTitle className="text-center">
						{t("upgrade_modal_title")}
					</DialogTitle>
					<DialogDescription className="text-center">
						{t("upgrade_modal_description", {
							used: usageCount,
							limit: usageLimit,
						})}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-3 py-4">
					<div className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-primary" />
						<span>{t("upgrade_feature_unlimited_voice")}</span>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-primary" />
						<span>{t("upgrade_feature_priority_support")}</span>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<Check className="size-4 text-primary" />
						<span>{t("upgrade_feature_early_access")}</span>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Button
						onClick={handleUpgrade}
						disabled={isLoading}
						className="w-full bg-gradient-to-r from-[#B552D9] to-[#FA8485] hover:opacity-90"
					>
						{isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
						{t("upgrade_modal_cta")}
					</Button>
					<Button variant="ghost" onClick={onClose}>
						{t("upgrade_modal_later")}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
