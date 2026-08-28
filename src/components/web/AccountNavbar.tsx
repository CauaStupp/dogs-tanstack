import { Link } from "@tanstack/react-router";
import {
	ChartNoAxesCombined,
	Images,
	ListMinusIcon,
	Loader2,
	LogOut,
	LogOutIcon,
	Plus,
} from "lucide-react";
import { useSignoutMutation } from "#/mutations/useAuthMutations";
import { Button, buttonVariants } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type AccountNavbarProps = {
	title: string;
};

export function AccountNavbar({ title }: AccountNavbarProps) {
	const { mutate: signout, isPending } = useSignoutMutation();

	return (
		<div className="flex justify-between items-center mb-5">
			<h2 className="title">{title}</h2>

			<nav>
				<div className="hidden md:flex gap-3 items-center">
					<Link
						to="/account"
						className={buttonVariants({
							variant: "secondary",
							size: "lg",
							className: "gap-2",
						})}
					>
						<Images />
						Minhas fotos
					</Link>
					<Link
						to="/account/statistics"
						className={buttonVariants({
							variant: "secondary",
							size: "lg",
							className: "gap-2",
						})}
					>
						<ChartNoAxesCombined />
						Estatísticas
					</Link>
					<Link
						to="/account/post"
						className={buttonVariants({
							variant: "secondary",
							size: "lg",
							className: "gap-2",
						})}
					>
						<Plus />
						Postar
					</Link>
					<Button
						variant="destructive"
						size="lg"
						disabled={isPending}
						onClick={() => signout()}
					>
						{isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
					</Button>
				</div>

				<div className="flex md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline" size="lg">
								<ListMinusIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Link
										to="/account"
										className="flex gap-2 items-center w-full"
									>
										<Images />
										Minhas fotos
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to="/account/statistics"
										className="flex gap-2 items-center w-full"
									>
										<ChartNoAxesCombined />
										Estatísticas
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to="/account/post"
										className="flex gap-2 items-center w-full"
									>
										<Plus />
										Postar
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem
									variant="destructive"
									className="cursor-pointer"
									disabled={isPending}
									onClick={() => signout()}
								>
									{isPending ? (
										<Loader2 className="animate-spin" />
									) : (
										<LogOutIcon />
									)}
									{isPending ? "Saindo..." : "Logout"}
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
		</div>
	);
}
