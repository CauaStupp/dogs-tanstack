import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { cn } from "#/lib/utils";
import { useLoginMutation } from "#/mutations/useAuthMutations";
import { loginSchema } from "#/schemas/auth";
import { Button } from "../ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";

export function LoginForm() {
	const { mutateAsync } = useLoginMutation();

	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			await mutateAsync({ username: value.username, password: value.password });
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className={cn("animate-fade-in flex flex-col gap-6")}
		>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Entre na sua conta!</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Preencha o formulário abaixo para entrar na sua conta.
					</p>
				</div>

				<form.Field name="username">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Username</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								type="text"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Jonh Doe"
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				</form.Field>
				<form.Field name="password">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Senha</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								type="password"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="******"
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				</form.Field>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Field>
							<Button type="submit" disabled={!canSubmit || isSubmitting}>
								{isSubmitting && <Loader2 className="animate-spin" />}
								{isSubmitting ? "Entrando..." : "Entrar"}
							</Button>
						</Field>
					)}
				</form.Subscribe>

				<FieldSeparator />
				<Field>
					<FieldDescription>
						Ainda não tem uma conta? <Link to="/signup">Crie uma!</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
