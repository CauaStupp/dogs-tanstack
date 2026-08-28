import { useQuery } from "@tanstack/react-query";
import { ClientOnly, Link } from "@tanstack/react-router";
import { LogIn, LucideGalleryHorizontalEnd, User } from "lucide-react";
import { userQueryOptions } from "#/queries/user";
import { ButtonIconSkeleton } from "../skeletons/ButtonIconSkeleton";
import { buttonVariants } from "../ui/button";
import { Logo } from "./Logo";
import { ToggleTheme } from "./ToggleTheme";

export function Navbar() {
	const { data: user } = useQuery(userQueryOptions);

	return (
		<header className="flex items-center justify-between px-5 border border-b-secondary h-16 mb-10">
			<div className="container mx-auto max-w-7xl flex justify-between">
				<Logo />

				<nav className="flex gap-2 items-center">
					<ToggleTheme />
					<ClientOnly
						fallback={
							<>
								<ButtonIconSkeleton />
								<ButtonIconSkeleton />
							</>
						}
					>
						{user ? (
							<Link
								to="/account"
								className={buttonVariants({
									variant: "secondary",
									size: "lg",
									className: "gap-2",
								})}
							>
								<User />
								{user.username}
							</Link>
						) : (
							<>
								<Link
									to="/login"
									className={buttonVariants({
										variant: "secondary",
										size: "lg",
										className: "gap-2",
									})}
								>
									<LogIn className="size-4" />
									Login
								</Link>
								<Link
									to="/signup"
									className={buttonVariants({
										size: "lg",
										className: "gap-2",
									})}
								>
									<LucideGalleryHorizontalEnd className="size-4" />
									Sign Up
								</Link>
							</>
						)}
					</ClientOnly>
				</nav>
			</div>
		</header>
	);
}
