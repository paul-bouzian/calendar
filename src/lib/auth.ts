import { createAuthClient } from "@neondatabase/neon-js/auth";
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react";

const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;
if (!authUrl) {
	throw new Error("NEXT_PUBLIC_NEON_AUTH_URL is required");
}

export const authClient = createAuthClient(authUrl, {
	adapter: BetterAuthReactAdapter(),
});
