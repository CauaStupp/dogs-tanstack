import { ClientOnly } from "@tanstack/react-router";
import { Laptop2, Moon, Sun } from "lucide-react";
import { type ThemeType, useTheme } from "#/contexts/themeContext";
import { buttonVariants } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function ToggleTheme() {
	const { theme, toggleTheme } = useTheme();
	const themeVerify =
		theme === "dark" ? <Moon /> : theme === "system" ? <Laptop2 /> : <Sun />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={buttonVariants({
					variant: "secondary",
					size: "lg",
				})}
			>
				<ClientOnly fallback={<Moon />}>{themeVerify}</ClientOnly>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuRadioGroup
						value={theme}
						onValueChange={(value) => toggleTheme(value as ThemeType)}
					>
						<DropdownMenuRadioItem value="dark">
							<Moon />
							Dark
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="light">
							<Sun />
							Light
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="system">
							<Laptop2 />
							System
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
