import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { CommentPostType } from "#/@types/Photos";
import { postCommentFn, postPhotoFn } from "#/server/photosFn";

export function usePhotoPostMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: FormData) => postPhotoFn({ data }),
		onSuccess: async ({ message, data }) => {
			toast.success(message);
			await queryClient.invalidateQueries({
				queryKey: ["photos", data?.post_author, 5],
			});
			navigate({ to: "/account" });
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});
}

export function useCommentPostMutation(photoId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CommentPostType) => postCommentFn({ data }),
		onSuccess: async ({ message }) => {
			toast.success(message);
			await queryClient.invalidateQueries({ queryKey: ["photo", photoId] });
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});
}
