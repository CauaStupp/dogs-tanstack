import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { Photos } from "#/components/web/Photos";
import { getPhotosOptions } from "#/queries/photos";

export const Route = createFileRoute("/account/")({
	component: RouteComponent,
	loader: ({ context }) => {
		if (!context.user) {
			toast.info("Não autorizado! Faça login para poder acessar sua conta!");
			throw redirect({ to: "/login" });
		}
		return context.queryClient.infiniteQuery(
			getPhotosOptions({ user: context.user.username }),
		);
	},
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return <Photos user={user?.username} />;
}
