import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Eye, Loader2 } from "lucide-react";
import { getPhotosOptions } from "#/queries/photos";
import { LoadTrigger } from "./LoadTrigger";

type PhotosProps = {
	user?: string | number;
};

export function Photos({ user }: PhotosProps) {
	const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSuspenseInfiniteQuery(getPhotosOptions({ user }));

	const photos = data.pages.flatMap(
		(page) => page?.map((item) => item) ?? page,
	);

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 animate-fade-in">
			{photos.map((photo, index) => {
				if (!photo) return null;
				const isLargeImg =
					index === 1 &&
					"sm:row-start-1 sm:col-span-2 md:row-start-1 md:col-span-2 lg:row-span-2 lg:col-span-2 xl:row-span-2 xl:col-span-2";
				const id = String(photo.id);

				return (
					<Link
						to="/photo/$id"
						params={{ id }}
						key={photo.id}
						preload={false}
						className={`${isLargeImg} group relative`}
					>
						<div className="absolute inset-0 rounded-sm flex gap-2 items-center justify-center transition bg-black/40 opacity-0 group-hover:opacity-100">
							<Eye />
							{photo.acessos}
						</div>
						<img
							src={photo.src}
							alt={`Foto do ${photo.title}`}
							className="rounded-sm w-full object-cover"
						/>
					</Link>
				);
			})}
			{isFetching ||
				(isFetchingNextPage && (
					<p className="h-10 text-muted-foreground text-sm flex items-center justify-center gap-2">
						<Loader2 className="animate-spin" />
						Carregando...
					</p>
				))}
			<LoadTrigger
				onIntersect={() => fetchNextPage()}
				disabled={!hasNextPage}
			/>
		</div>
	);
}
