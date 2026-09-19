import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { CommentForm } from "#/components/web/CommentForm";
import { AppLayout } from "#/layouts/AppLayout";
import { getPhotoOptions } from "#/queries/photos";

export const Route = createFileRoute("/photo/$id")({
	loader: ({ params, context }) =>
		context.queryClient.query(getPhotoOptions(params.id)),
	component: RouteComponent,
	notFoundComponent: () => (
		<AppLayout>
			<div>Nada Encontrado!</div>
		</AppLayout>
	),
	head: ({ loaderData, params }) => ({
		meta: [
			{ title: `${loaderData?.photo.title} | Dogs` },
			{
				name: "description",
				content: `Post do usuário ${loaderData?.photo.author}`,
			},
			{ property: "og:title", content: `${loaderData?.photo.title} | Dogs` },
			{
				property: "og:description",
				content: `Post do usuário ${loaderData?.photo.author}`,
			},
			{
				property: "og:url",
				content: `https://dogstanstack.netlifly.com/photo/${params.id}`,
			},
			{ property: "og:image", content: loaderData?.photo.src },
			{ property: "og:type", content: "article" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: `${loaderData?.photo.title} | Dogs` },
			{
				name: "twitter:description",
				content: `Post do usuário ${loaderData?.photo.author}`,
			},
			{
				name: "twitter:url",
				content: `https://dogstanstack.netlifly.com/photo/${params.id}`,
			},
			{ name: "twitter:image", content: loaderData?.photo.src },
		],
	}),
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data: post } = useSuspenseQuery(getPhotoOptions(id));
	const { user } = Route.useRouteContext();

	return (
		<AppLayout>
			{!post ? (
				<div>Nenhum post encontrado!</div>
			) : (
				<section className="flex gap-5 flex-col animate-fade-in lg:flex-row">
					<img
						src={post.photo.src}
						alt=""
						className="w-full lg:max-w-162.5 rounded-sm"
					/>

					<div className="w-full">
						<div className="flex justify-between items-center">
							<Link
								to="/profile/$username"
								params={{ username: post.photo.author }}
								className="text-muted-foreground"
							>
								@{post.photo.author}
							</Link>
							<div className="flex gap-2 text-sm items-center text-muted-foreground">
								<Eye className="size-4" />
								{post.photo.acessos}
							</div>
						</div>

						<h2 className="title">{post.photo.title}</h2>

						<div className="flex gap-4 mt-5">
							<span>{post.photo.peso} kg</span>
							<span>
								{post.photo.idade} {post.photo.idade > 1 ? "anos" : "ano"}
							</span>
						</div>

						<div className="w-full mt-10">
							<h3 className="text-muted-foreground mb-3">Comentários</h3>
							{post.comments.map((comment) => (
								<div
									key={comment.comment_ID}
									className="flex items-center gap-1 not-last:mb-2"
								>
									<span className="font-bold text-sm">
										{comment.comment_author}:
									</span>
									<p>{comment.comment_content}</p>
								</div>
							))}
						</div>

						{user && (
							<div>
								<CommentForm photoId={id} />
							</div>
						)}
					</div>
				</section>
			)}
		</AppLayout>
	);
}
