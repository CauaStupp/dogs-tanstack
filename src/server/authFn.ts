import { createServerFn } from "@tanstack/react-start";
import { toFormData } from "axios";
import type { UserType } from "#/@types/User";
import { apiInstance } from "#/api/api";
import { loginSchema, signupSchema } from "#/schemas/auth";
import { apiErrorHandler } from "#/utils/apiError";
import { authMiddleware } from "./authMiddleware";
import { clearSessionCookie, setSessionCookie } from "./session";

// /jwt-auth/v1/token
// /jwt-auth/v1/token/validate

export const loginFn = createServerFn({ method: "POST" })
	.validator(loginSchema)
	.handler(async ({ data }) => {
		try {
			const { data: response } = await apiInstance.post<{ token: string }>(
				"/jwt-auth/v1/token",
				toFormData(data),
			);

			setSessionCookie(response.token);

			return {
				data: null,
				status: 200,
				message: "Login realizado com sucesso!",
			};
		} catch (error) {
			throw apiErrorHandler(error, 400, "Email ou senha inválidos", "loginFn");
		}
	});

export const signupFn = createServerFn({ method: "POST" })
	.validator(signupSchema)
	.handler(async ({ data }) => {
		try {
			const { data: user } = await apiInstance.post(
				"/api/user",
				toFormData(data),
			);

			if (!user) {
				throw new Error(
					"Usuário já existe ou ocorreu um erro. Tente novamente",
				);
			}

			await loginFn({
				data: { username: data.username, password: data.password },
			});

			return { data: null, status: 200, message: "Conta criada com sucesso!" };
		} catch (error) {
			throw apiErrorHandler(error, 400, "Erro ao criar conta", "signup");
		}
	});

export const getUserFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		if (context.session === "expired") return null;
		try {
			const { data: user } = await apiInstance.get("/api/user", {
				headers: {
					Authorization: `Bearer ${context.session}`,
				},
			});
			return user as UserType;
		} catch {
			return null;
		}
	});

export const logoutFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async () => {
		clearSessionCookie();

		return { data: null, status: 200, message: "Logout feito com sucesso!" };
	});
