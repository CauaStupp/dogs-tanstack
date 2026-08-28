import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getPhotoFn, getPhotoStatsFn, getPhotosFn } from "#/server/photosFn";

type GetPhotosOptionsType = {
	total?: number;
	user?: number | string;
};

export const getPhotosOptions = ({
	user = 0,
	total = 5,
}: GetPhotosOptionsType) => {
	return infiniteQueryOptions({
		queryKey: ["photos", user, total],
		queryFn: async ({ pageParam }) => {
			const { data } = await getPhotosFn({
				data: { page: pageParam, user, total },
			});
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const length = lastPage?.length ?? 0;
			return length < total ? undefined : allPages.length + 1;
		},
	});
};

export const getPhotoOptions = (id: string) => {
	return queryOptions({
		queryKey: ["photo", id],
		queryFn: async () => {
			const { data } = await getPhotoFn({ data: id });
			return data;
		},
	});
};

export const getPhotoDataOptions = (user: string) => {
	return queryOptions({
		queryKey: ["photo-stats", user],
		queryFn: async () => {
			const { data, status, message } = await getPhotoStatsFn();
			if (status !== 200) throw new Error(message);
			return data;
		},
	});
};
