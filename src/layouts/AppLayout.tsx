import type { ReactNode } from "react";
import { Footer } from "#/components/web/Footer";
import { Navbar } from "#/components/web/Navbar";

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			<main className="px-5">
				<div className="container mx-auto max-w-7xl min-h-[calc(100vh-16rem)]">
					{children}
				</div>
			</main>
			<Footer />
		</>
	);
}
