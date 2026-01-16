import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
	if (!stripeInstance) {
		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("STRIPE_SECRET_KEY is required");
		}
		stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2025-12-15.clover",
		});
	}
	return stripeInstance;
}

export const stripe = {
	get customers() {
		return getStripe().customers;
	},
	get checkout() {
		return getStripe().checkout;
	},
	get billingPortal() {
		return getStripe().billingPortal;
	},
	get webhooks() {
		return getStripe().webhooks;
	},
};

export const STRIPE_CONFIG = {
	priceId: process.env.STRIPE_PRICE_ID!,
	successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?success=true`,
	cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?canceled=true`,
} as const;
