import { createFileRoute } from "@tanstack/react-router";
import DogsImage from "#/assets/dogs-major.jpg";
import { Photos } from "#/components/web/Photos";
import { AppLayout } from "#/layouts/AppLayout";
import { getPhotosOptions } from "#/queries/photos";

export const Route = createFileRoute("/")({
	component: Home,
	loader: ({ context }) =>
		context.queryClient.infiniteQuery(getPhotosOptions({ user: 0 })),
	head: () => ({
		meta: [
			{ title: "Home | Dogs" },
			{
				name: "description",
				content:
					"Rede social para cachorros, onde você pode postar fotos do seu cachorro!",
			},
			{ property: "og:title", content: "Home | Dogs" },
			{
				property: "og:description",
				content:
					"Rede social para cachorros, onde você pode postar fotos do seu cachorro!",
			},
			{
				property: "og:url",
				content: `https://dogstanstack.netlifly.com/`,
			},
			{ property: "og:image", content: DogsImage },
			{ property: "og:type", content: "article" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Home | Dogs" },
			{
				name: "twitter:description",
				content:
					"Rede social para cachorros, onde você pode postar fotos do seu cachorro!",
			},
			{
				name: "twitter:url",
				content: `https://dogstanstack.netlifly.com/`,
			},
			{ name: "twitter:image", content: DogsImage },
		],
	}),
});

function Home() {
	return (
		<AppLayout>
			<Photos />
		</AppLayout>
	);
}
