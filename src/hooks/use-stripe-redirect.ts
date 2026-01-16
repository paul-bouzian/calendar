"use client";

import { useState } from "react";

type StripeEndpoint = "/api/stripe/checkout" | "/api/stripe/portal";

interface UseStripeRedirectReturn {
	redirect: () => Promise<void>;
	isLoading: boolean;
}

export function useStripeRedirect(
	endpoint: StripeEndpoint,
): UseStripeRedirectReturn {
	const [isLoading, setIsLoading] = useState(false);

	async function redirect(): Promise<void> {
		setIsLoading(true);
		try {
			const response = await fetch(endpoint, { method: "POST" });
			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error(`[Stripe ${endpoint}]`, error);
		} finally {
			setIsLoading(false);
		}
	}

	return { redirect, isLoading };
}
