import { Logo } from "./Logo";

export function Footer() {
	return (
		<footer className="w-full h-32 bg-sidebar mt-10 px-5 flex items-center">
			<div className="container max-w-7xl mx-auto flex items-center justify-between">
				<Logo />

				<p className="text-muted-foreground text-sm">
					Todos direitos reservados
				</p>
			</div>
		</footer>
	);
}
