import { useForm } from "@tanstack/react-form";
import { Eye, Image, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "#/lib/utils";
import { usePhotoPostMutation } from "#/mutations/usePhotoMutations";
import { photoSchema } from "#/schemas/photo";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type PostFormProps = {
	username: string;
};

type PreviewType = {
	nome?: string;
	idade?: number;
	peso?: number;
	img?: string;
};

export function PostForm({ username }: PostFormProps) {
	const { mutateAsync: post } = usePhotoPostMutation();

	const [preview, setPreview] = useState<PreviewType | null>(null);

	useEffect(() => {
		return () => {
			if (preview?.img) URL.revokeObjectURL(preview.img);
		};
	}, [preview]);

	const form = useForm({
		defaultValues: {
			nome: "",
			idade: "",
			peso: "",
			img: null as File | null,
		},
		validators: {
			onSubmit: photoSchema,
		},
		onSubmit: async ({ value }) => {
			const formData = new FormData();
			formData.append("nome", value.nome);
			formData.append("idade", value.idade);
			formData.append("peso", value.peso);
			formData.append("img", value.img as File);

			await post(formData);
		},
	});

	function handleFileChange(
		e: React.ChangeEvent<HTMLInputElement>,
		onChange: (file: File | null) => void,
	) {
		const file = e.target.files?.[0] ?? null;
		onChange(file);

		setPreview((prev) => {
			if (prev?.img) URL.revokeObjectURL(prev.img); // libera a URL anterior
			return file && prev ? { ...prev, img: URL.createObjectURL(file) } : null;
		});
	}

	return (
		<div className="flex gap-4 flex-col md:flex-row">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className={cn("animate-fade-in flex flex-col gap-6 flex-1")}
			>
				<FieldGroup>
					<form.Field name="nome">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Nome</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="text"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => {
										field.handleChange(e.target.value);
										setPreview((prev) =>
											prev
												? { ...prev, nome: e.target.value }
												: { nome: e.target.value },
										);
									}}
									placeholder="John Doe"
								/>
								<FieldError errors={field.state.meta.errors} />
							</Field>
						)}
					</form.Field>

					<form.Field name="peso">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Peso</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="number"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => {
										field.handleChange(e.target.value);
										setPreview((prev) =>
											prev
												? { ...prev, peso: Number(e.target.value) }
												: { peso: Number(e.target.value) },
										);
									}}
									placeholder="5"
								/>
								<FieldError errors={field.state.meta.errors} />
							</Field>
						)}
					</form.Field>
					<form.Field name="idade">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Idade</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="number"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => {
										field.handleChange(e.target.value);
										setPreview((prev) =>
											prev
												? { ...prev, idade: Number(e.target.value) }
												: { idade: Number(e.target.value) },
										);
									}}
									placeholder="2"
								/>
								<FieldError errors={field.state.meta.errors} />
							</Field>
						)}
					</form.Field>

					<form.Field name="img">
						{(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Imagem</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="file"
									accept="image/png, image/jpeg, image/webp"
									onBlur={field.handleBlur}
									onChange={(e) => {
										const file = e.target.files?.[0] ?? null;
										field.handleChange(file);
										handleFileChange(e, field.handleChange);
									}}
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
									{isSubmitting ? "Postando..." : "Postar"}
								</Button>
							</Field>
						)}
					</form.Subscribe>
				</FieldGroup>
			</form>

			<div className="flex-1">
				{preview && (
					<div>
						{preview.img ? (
							<img
								src={preview.img}
								alt="Imagem preview do post"
								className="w-full max-h-96 rounded-md object-cover mb-5"
							/>
						) : (
							<div className="max-w-full rounded-md bg-secondary h-80 flex items-center justify-center flex-col text-muted-foreground mb-3">
								<Image className="size-10" />
								<span className="text-sm">Image</span>
							</div>
						)}

						<div className="w-full">
							<div className="flex justify-between items-center">
								<p className="text-muted-foreground">@{username}</p>
								<div className="flex gap-2 text-sm items-center text-muted-foreground">
									<Eye className="size-4" />0
								</div>
							</div>

							<h2 className="title">{preview.nome}</h2>

							<div className="flex gap-4 mt-5">
								<span>{preview.peso ?? 0} kg</span>
								<span>
									{preview.idade ?? 0}{" "}
									{preview.idade && preview.idade > 1 ? "anos" : "ano"}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
