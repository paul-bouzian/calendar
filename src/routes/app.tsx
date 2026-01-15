import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@neondatabase/neon-js/auth/react/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/features/dashboard";

export const Route = createFileRoute("/app")({
	component: AppLayout,
});

function AppLayout() {
	return (
		<>
			<SignedIn>
				<DashboardLayout>
					<Outlet />
				</DashboardLayout>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
}
