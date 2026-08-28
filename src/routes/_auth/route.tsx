import {
	ClientOnly,
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import SignupHero from "#/assets/signup-hero.jpg";
import { buttonVariants } from "#/components/ui/button";
import { Skeleton } from "#/components/ui/skeleton";
import { Logo } from "#/components/web/Logo";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ context }) => {
		if (context.user) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-between items-center gap-2">
					<Logo />

					<Link
						to="/"
						className={buttonVariants({
							variant: "secondary",
							size: "lg",
							className: "flex gap-2 items-center",
						})}
					>
						<ArrowLeft /> Voltar
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<Outlet />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<ClientOnly
					fallback={<Skeleton className="absolute inset-0 h-full w-full" />}
				>
					<img
						src={SignupHero}
						alt="Cute small dog"
						className="animate-fade-in absolute inset-0 h-full w-full object-cover"
					/>
				</ClientOnly>
			</div>
		</div>
	);
}
