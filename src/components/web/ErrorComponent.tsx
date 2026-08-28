import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="min-w-3xs text-center rounded-sm p-4 bg-secondary">
				<h2 className="text-2xl font-bold">{error.name}</h2>
				<p className="text-sm mb-4 text-muted-foreground">{error.message}</p>
				<Button onClick={reset}>Resetar</Button>
			</div>
		</div>
	);
}
