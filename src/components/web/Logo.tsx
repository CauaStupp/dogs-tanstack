import { Link } from "@tanstack/react-router";
import LogoImg from "#/assets/dogs.svg";

export function Logo() {
	return (
		<Link
			to="/"
			className="flex items-center justify-center rounded-sm bg-primary p-1 size-10 transition hover:scale-105"
		>
			<img
				src={LogoImg || ""}
				alt="Logo de um cachorro sorrindo"
				className="size-5"
			/>
		</Link>
	);
}
