import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useSignupMutation } from "#/mutations/useAuthMutations";
import { signupSchema } from "#/schemas/auth";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SignupForm() {
	const { mutateAsync: signup } = useSignupMutation();

	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		validators: {
			onSubmit: signupSchema,
		},
		onSubmit: async ({ value }) => {
			await signup({
				username: value.username,
				email: value.email,
				password: value.password,
			});
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
					<h1 className="text-2xl font-bold">Crie sua conta!</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Preencha o formulário abaixo para criar sua conta.
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
								placeholder="John Doe"
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				</form.Field>

				<form.Field name="email">
					{(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Email</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								type="email"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="m@example.com"
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
								{isSubmitting ? "Criando..." : "Criar conta"}
							</Button>
						</Field>
					)}
				</form.Subscribe>
				<FieldSeparator />
				<Field>
					<FieldDescription>
						Já tem uma conta? <Link to="/login">Entre nela!</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
