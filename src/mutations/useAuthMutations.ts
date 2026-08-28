import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { userQueryOptions } from "#/queries/user";
import { loginFn, logoutFn, signupFn } from "#/server/authFn";

export function useLoginMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: { username: string; password: string }) =>
			loginFn({ data: data }),
		onSuccess: async ({ message, status }) => {
			if (status !== 200) throw new Error(message);
			toast.success(message);
			await queryClient.invalidateQueries({
				queryKey: userQueryOptions.queryKey,
			});
			navigate({ to: "/" });
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});
}

export function useSignupMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: { username: string; email: string; password: string }) =>
			signupFn({ data: data }),
		onSuccess: async ({ message, status }) => {
			if (status !== 200) throw new Error(message);
			toast.success(message);
			await queryClient.invalidateQueries({
				queryKey: userQueryOptions.queryKey,
			});
			navigate({ to: "/" });
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});
}

export function useSignoutMutation() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: () => logoutFn(),
		onSuccess: async ({ message }) => {
			await queryClient.invalidateQueries({
				queryKey: userQueryOptions.queryKey,
			});
			toast.success(message);
			navigate({ to: "/" });
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});
}
