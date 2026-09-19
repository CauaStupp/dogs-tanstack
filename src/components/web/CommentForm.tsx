import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { cn } from "#/lib/utils";
import { useCommentPostMutation } from "#/mutations/usePhotoMutations";
import { commentSchema } from "#/schemas/photo";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type CommentFormProps = {
	photoId: string;
};

export function CommentForm({ photoId }: CommentFormProps) {
	const { mutateAsync } = useCommentPostMutation(photoId);

	const form = useForm({
		defaultValues: {
			id: "",
			comment: "",
		},
		validators: {
			onSubmit: commentSchema,
		},
		onSubmit: async ({ value }) => {
			await mutateAsync({ id: value.id, comment: value.comment });
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className={cn("animate-fade-in flex gap-6 mt-10")}
		>
			<FieldGroup className="flex-row">
				<form.Field name="id" defaultValue={photoId}>
					{(field) => (
						<Input
							type="hidden"
							id={field.name}
							name={field.name}
							value={photoId}
						/>
					)}
				</form.Field>
				<form.Field name="comment">
					{(field) => (
						<Field>
							<Textarea
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder=""
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				</form.Field>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Field className="w-24">
							<Button type="submit" disabled={!canSubmit || isSubmitting}>
								{isSubmitting && <Loader2 className="animate-spin" />}
								{isSubmitting ? "Comentando..." : "Comentar"}
							</Button>
						</Field>
					)}
				</form.Subscribe>
			</FieldGroup>
		</form>
	);
}
