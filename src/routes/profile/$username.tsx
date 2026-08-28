import { createFileRoute } from "@tanstack/react-router";
import { Photos } from "#/components/web/Photos";
import { AppLayout } from "#/layouts/AppLayout";
import { getPhotosOptions } from "#/queries/photos";

export const Route = createFileRoute("/profile/$username")({
	loader: ({ params, context }) => {
		context.queryClient.infiniteQuery(
			getPhotosOptions({ user: params.username }),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { username } = Route.useParams();

	return (
		<AppLayout>
			<h1 className="title block mb-5">{username}</h1>

			<Photos user={username} />
		</AppLayout>
	);
}
