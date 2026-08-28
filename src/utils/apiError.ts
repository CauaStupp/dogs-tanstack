import { isAxiosError } from "axios";

export function apiErrorHandler(
	error: unknown,
	status: number,
	message: string,
	funcName?: string,
) {
	if (isAxiosError(error)) {
		console.error(
			`${funcName ?? null} error:`,
			error.response?.status || status,
			error.response?.data,
		);
		return {
			data: null,
			status: error.response?.status ?? 500,
			message: message,
		};
	}
	throw error;
}
