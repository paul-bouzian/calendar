import {
	DotIcon,
	MoonIcon,
	PaletteIcon,
	SettingsIcon,
	SunMediumIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { useDragDrop } from "@/components/calendar/contexts/dnd-context";

export function Settings() {
	const {
		badgeVariant,
		setBadgeVariant,
		use24HourFormat,
		toggleTimeFormat,
		agendaModeGroupBy,
		setAgendaModeGroupBy,
	} = useCalendar();
	const { showConfirmation, setShowConfirmation } = useDragDrop();
	const { theme, setTheme } = useTheme();

	const isDarkMode = theme === "dark";
	const isDotVariant = badgeVariant === "dot";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<SettingsIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Calendar settings</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<span className="flex items-center gap-2">
							{isDarkMode ? (
								<MoonIcon className="h-4 w-4" />
							) : (
								<SunMediumIcon className="h-4 w-4" />
							)}
							Use dark mode
						</span>
						<DropdownMenuShortcut>
							<Switch
								checked={isDarkMode}
								onCheckedChange={(checked) =>
									setTheme(checked ? "dark" : "light")
								}
							/>
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Show confirmation dialog on event drop
						<DropdownMenuShortcut>
							<Switch
								checked={showConfirmation}
								onCheckedChange={(checked) => setShowConfirmation(checked)}
							/>
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<span className="flex items-center gap-2">
							{isDotVariant ? (
								<DotIcon className="w-4 h-4" />
							) : (
								<PaletteIcon className="w-4 h-4" />
							)}
							Use dot badge
						</span>
						<DropdownMenuShortcut>
							<Switch
								checked={isDotVariant}
								onCheckedChange={(checked) =>
									setBadgeVariant(checked ? "dot" : "colored")
								}
							/>
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Use 24 hour format
						<DropdownMenuShortcut>
							<Switch
								checked={use24HourFormat}
								onCheckedChange={toggleTimeFormat}
							/>
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Agenda view group by</DropdownMenuLabel>
					<DropdownMenuRadioGroup
						value={agendaModeGroupBy}
						onValueChange={(value) =>
							setAgendaModeGroupBy(value as "date" | "color")
						}
					>
						<DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="color">Color</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
