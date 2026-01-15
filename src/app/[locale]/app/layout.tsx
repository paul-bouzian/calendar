"use client";

import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@neondatabase/neon-js/auth/react/ui";
import { DashboardLayout } from "@/features/dashboard";

type Props = {
	children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
	return (
		<>
			<SignedIn>
				<DashboardLayout>{children}</DashboardLayout>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
}
