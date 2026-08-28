import z from "zod";

export const signupSchema = z.object({
	username: z.string().min(1, "O nome de usuário é obrigatório"),
	email: z.email("O e-mail deve ser válido"),
	password: z
		.string()
		.min(6, "A senha deve ter pelo menos 6 caracteres")
		.max(20, "A senha deve ter no máximo 20 caracteres"),
});

export const loginSchema = z.object({
	username: z.string().min(1, "O nome de usuário é obrigatório"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
