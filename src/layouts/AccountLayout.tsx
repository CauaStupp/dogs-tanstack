import { useLocation } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { AccountNavbar } from "#/components/web/AccountNavbar";

interface AccountLayoutProps extends PropsWithChildren {}

export function AccountLayout({ children }: AccountLayoutProps) {
	const { pathname } = useLocation();

	const title =
		pathname === "/account"
			? "Minha conta"
			: pathname === "/account/statistics"
				? "Estatísticas"
				: "Nova Postagem";

	return (
		<section>
			<AccountNavbar title={title} />
			{children}
		</section>
	);
}
