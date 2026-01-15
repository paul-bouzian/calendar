"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Calendar, CreditCard, Settings } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
	{ title: "Calendar", url: "/app", icon: Calendar },
	{ title: "Settings", url: "/app/settings", icon: Settings },
	{ title: "Billing", url: "/app/billing", icon: CreditCard },
];

export function AppSidebar() {
	const currentPath = usePathname();

	return (
		<Sidebar variant="inset">
			<SidebarHeader className="border-b">
				<Link href="/app" className="flex items-center gap-2 px-2 py-3">
					<img src="/images/logo.png" alt="SayCal" className="h-8 w-auto" />
					<span className="bg-gradient-to-r from-[#B552D9] to-[#FA8485] bg-clip-text text-lg font-bold text-transparent">
						SayCal
					</span>
				</Link>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigationItems.map((item) => {
								const isActive =
									currentPath === item.url ||
									(item.url === "/app" && currentPath === "/app/");
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={isActive}>
											<Link href={item.url}>
												<item.icon
													className={cn(isActive && "text-[#B552D9]")}
												/>
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t">
				<div className="px-2 py-3 text-xs text-muted-foreground">v1.0.0</div>
			</SidebarFooter>
		</Sidebar>
	);
}
