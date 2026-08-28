import z from "zod";

export const photoSchema = z.object({
	nome: z.string().min(1, "Obrigatório"),
	idade: z.string().min(1, "Obrigatório"),
	peso: z.string().min(1, "Obrigatório"),
	img: z
		.file()
		.mime(["image/png", "image/jpeg", "image/webp"])
		.max(5_000_000, "Máximo 5MB"),
});

export const commentSchema = z.object({
	id: z.string(),
	comment: z
		.string()
		.min(1, "Comentário precisa ter algum valor pra ser postado"),
});
