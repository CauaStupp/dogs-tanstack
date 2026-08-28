import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientOnly, createFileRoute, redirect } from "@tanstack/react-router";
import { ImageOff, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";
import { ChartSkeleton } from "#/components/skeletons/ChartSkeleton";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#/components/ui/chart";
import { getPhotoDataOptions } from "#/queries/photos";

export const Route = createFileRoute("/account/statistics")({
	component: RouteComponent,
	loader: async ({ context }) => {
		if (!context.user) throw redirect({ to: "/login" });
		await context.queryClient.query(getPhotoDataOptions(context.user.username));
		return context.user;
	},
});

function RouteComponent() {
	const { username } = Route.useLoaderData();
	const { data: stats } = useSuspenseQuery(getPhotoDataOptions(username));

	const chartConfig: ChartConfig = Object.fromEntries(
		stats?.map((stat, index) => [
			stat.title,
			{ label: stat.title, color: `var(--chart-${(index % 5) + 1})` },
		]) ?? [],
	);

	const chartData =
		stats?.map((stat, index) => ({
			id: stat.id,
			photo: stat.title,
			visitors: Number(stat.acessos),
			fill: `var(--chart-${(index % 5) + 1})`,
		})) ?? [];

	return (
		<section className="animate-fade-in flex flex-col md:flex-row gap-4 w-full">
			{chartData.length === 0 ? (
				<Card className="flex flex-1 flex-col items-center justify-center py-12">
					<CardContent className="flex flex-col items-center gap-4 text-center">
						<ImageOff className="h-12 w-12 text-muted-foreground" />
						<div>
							<CardTitle className="text-xl">
								Sem fotos para mostrar estatísticas
							</CardTitle>
							<CardDescription className="mt-2">
								Você ainda não postou nenhuma foto. Poste sua primeira foto para
								ver suas estatísticas aqui.
							</CardDescription>
						</div>
					</CardContent>
				</Card>
			) : (
				<>
					<Card className="flex flex-1 flex-col">
						<CardHeader className="items-center pb-0">
							<CardTitle>Acessos</CardTitle>
							<CardDescription>Todos acessos a suas fotos</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 pb-0">
							<ClientOnly fallback={<ChartSkeleton />}>
								<ChartContainer
									config={chartConfig}
									className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
								>
									<PieChart>
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Pie
											data={chartData}
											dataKey="visitors"
											label
											nameKey="photo"
										/>
									</PieChart>
								</ChartContainer>
							</ClientOnly>
						</CardContent>
						<CardFooter className="flex-col gap-2 text-sm">
							<div className="flex items-center gap-2 leading-none font-medium">
								{chartData
									.reduce((acc, d) => acc + d.visitors, 0)
									.toLocaleString("pt-BR")}{" "}
								acessos no total
							</div>
							<div className="leading-none text-muted-foreground">
								{chartData.length} {chartData.length === 1 ? "foto" : "fotos"}{" "}
								no total
							</div>
						</CardFooter>
					</Card>
					<Card className="flex-1">
						<CardHeader>
							<CardTitle>Acessos por Foto</CardTitle>
							<CardDescription>
								Número de acessos em cada uma das suas fotos
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ClientOnly fallback={<ChartSkeleton />}>
								<ChartContainer config={chartConfig}>
									<AreaChart
										accessibilityLayer
										data={chartData}
										margin={{
											left: 12,
											right: 12,
										}}
									>
										<CartesianGrid vertical={false} />
										<XAxis
											dataKey="photo"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickFormatter={(value) =>
												typeof value === "string" ? value.slice(0, 8) : value
											}
										/>
										<ChartTooltip
											cursor={false}
											content={
												<ChartTooltipContent
													nameKey="visitors"
													labelKey="photo"
												/>
											}
										/>
										<defs>
											<linearGradient
												id="fillVisitors"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="var(--color-visitors, var(--chart-1))"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="var(--color-visitors, var(--chart-1))"
													stopOpacity={0.1}
												/>
											</linearGradient>
										</defs>
										<Area
											dataKey="visitors"
											type="natural"
											fill="url(#fillVisitors)"
											fillOpacity={0.4}
											stroke="var(--chart-1)"
										/>
									</AreaChart>
								</ChartContainer>
							</ClientOnly>
						</CardContent>
						<CardFooter>
							<div className="flex w-full items-start gap-2 text-sm">
								<div className="grid gap-2">
									<div className="flex items-center gap-2 leading-none font-medium">
										{chartData
											.reduce((acc, d) => acc + d.visitors, 0)
											.toLocaleString("pt-BR")}{" "}
										acessos no total
										<TrendingUp className="h-4 w-4" />
									</div>
									<div className="flex items-center gap-2 leading-none text-muted-foreground">
										{chartData.length}{" "}
										{chartData.length === 1 ? "foto" : "fotos"} com estatísticas
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				</>
			)}
		</section>
	);
}
