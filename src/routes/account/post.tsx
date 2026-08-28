import { createFileRoute, Navigate } from "@tanstack/react-router";
import { PostForm } from "#/components/web/PostForm";

export const Route = createFileRoute("/account/post")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return !user ? (
		<Navigate to="/login" />
	) : (
		<PostForm username={user.username} />
	);
}
