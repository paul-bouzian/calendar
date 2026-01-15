import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/app/billing")({
	component: BillingPage,
});

function BillingPage() {
	return (
		<div className="max-w-2xl space-y-6 p-6">
			<div>
				<h1 className="text-2xl font-bold">Billing</h1>
				<p className="text-muted-foreground">Manage your subscription</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Current Plan
						<Badge variant="secondary">Free</Badge>
					</CardTitle>
					<CardDescription>You are currently on the free plan</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li className="flex items-center gap-2">
							<span className="text-green-500">✓</span>
							Full calendar (day/week/month)
						</li>
						<li className="flex items-center gap-2">
							<span className="text-green-500">✓</span>
							Manual event creation
						</li>
						<li className="flex items-center gap-2">
							<span className="text-green-500">✓</span>
							Unlimited events
						</li>
						<li className="flex items-center gap-2 text-muted-foreground/50">
							<span>✗</span>
							Voice event creation (Premium)
						</li>
					</ul>
					<Button className="bg-gradient-to-r from-[#B552D9] to-[#FA8485] hover:opacity-90">
						Upgrade to Premium
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Voice Usage</CardTitle>
					<CardDescription>
						Premium feature - voice event creation
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Upgrade to Premium for unlimited voice event creation. Create events
						just by speaking!
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
