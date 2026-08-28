import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AccountLayout } from "#/layouts/AccountLayout";
import { AppLayout } from "#/layouts/AppLayout";

export const Route = createFileRoute("/account")({
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({ to: "/login" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AppLayout>
			<AccountLayout />
			<Outlet />
		</AppLayout>
	);
}
