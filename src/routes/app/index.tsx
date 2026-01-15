import { createFileRoute } from "@tanstack/react-router";
import { CalendarView } from "@/features/dashboard";

export const Route = createFileRoute("/app/")({
	component: DashboardCalendar,
});

function DashboardCalendar() {
	return (
		<div className="h-[calc(100vh-3.5rem)] p-4">
			<CalendarView />
		</div>
	);
}
