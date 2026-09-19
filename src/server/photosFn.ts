import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { isAxiosError, toFormData } from "axios";
import z from "zod";
import type {
	PhotoPostedType,
	PhotoPostType,
	PhotoStats,
	PhotoType,
} from "#/@types/Photos";
import { apiInstance } from "#/api/api";
import { commentSchema } from "#/schemas/photo";
import { apiErrorHandler } from "#/utils/apiError";
import { authMiddleware } from "./authMiddleware";

const getPhotoSchema = z.string();
const getPhotosSchema = z.object({
	page: z.number().min(1),
	total: z.number().min(1),
	user: z.string().or(z.number()),
});

export const getPhotosFn = createServerFn()
	.validator(getPhotosSchema)
	.handler(async ({ data }) => {
		try {
			const { data: response } = await apiInstance.get<PhotoType[]>(
				`/api/photo/?_page=${data.page}&_total=${data.total}&_user=${data.user}`,
			);
			console.log("getPhotosFn response:", response);

			return { data: response, status: 200, message: "" };
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				console.error(
					"getPhotosFn error:",
					error.response?.status,
					error.response?.data,
				);
				return {
					data: null,
					status: error.response?.status ?? 500,
					message: "Ocorreu um erro ao pegar as fotos",
				};
			}
			throw error;
		}
	});

export const getPhotoFn = createServerFn()
	.validator(getPhotoSchema)
	.handler(async ({ data: id }) => {
		try {
			const photoId = Number(id);
			const { data: response } = await apiInstance.get<PhotoPostType>(
				`/api/photo/${photoId}`,
			);

			return { data: response, status: 200, message: "" };
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				console.error(
					"getPhotoFn error:",
					error.response?.status,
					error.response?.data,
				);
				return {
					data: null,
					status: error.response?.status ?? 500,
					message: "Ocorreu um erro ao pegar a foto",
				};
			}
			throw error;
		}
	});

export const postPhotoFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data, context }) => {
		if (context.session === "expired") throw redirect({ to: "/login" });
		try {
			const { data: response } = await apiInstance.post<PhotoPostedType>(
				"/api/photo",
				data,
				{
					headers: {
						Authorization: `Bearer ${context.session}`,
					},
				},
			);

			return {
				data: response,
				status: 200,
				message: "Foto postada com sucesso!",
			};
		} catch (error: unknown) {
			throw apiErrorHandler(error, "Erro ao postar foto", "postPhotoFn");
		}
	});

export const getPhotoStatsFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		if (context.session === "expired") throw redirect({ to: "/login" });
		try {
			const { data: response } = await apiInstance.get<PhotoStats[]>(
				"/api/stats",
				{
					headers: {
						Authorization: `Bearer ${context.session}`,
					},
				},
			);

			return { data: response, status: 200, message: "" };
		} catch (error: unknown) {
			throw apiErrorHandler(error, "getPhotoStatsFn");
		}
	});

export const postCommentFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(commentSchema)
	.handler(async ({ context, data }) => {
		if (context.session === "expired") throw redirect({ to: "/" });
		try {
			const { data: response } = await apiInstance.post(
				`/api/comment/${data.id}`,
				toFormData(data),
				{
					headers: {
						Authorization: `Bearer ${context.session}`,
					},
				},
			);

			return { data: response, status: 200, message: "Comentário postado!" };
		} catch (error: unknown) {
			if (isAxiosError(error)) {
				console.error(
					"postCommentFn error:",
					error.response?.status,
					error.response?.data,
				);
				return {
					data: null,
					status: error.response?.status ?? 500,
					message: "Ocorreu um erro ao postar o comentário",
				};
			}
			throw error;
		}
	});
