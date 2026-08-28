import { queryOptions } from "@tanstack/react-query";
import { getUserFn } from "#/server/authFn";

export const userQueryOptions = queryOptions({
	queryKey: ["user"],
	queryFn: getUserFn,
	staleTime: 5 * 60 * 1000,
});
