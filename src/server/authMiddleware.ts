import { createMiddleware } from "@tanstack/react-start";
import { clearSessionCookie, readSessionToken } from "./session";

export const authMiddleware = createMiddleware().server(({ next }) => {
	const token = readSessionToken();
	const session = token ? token : null;
	if (!session) {
		clearSessionCookie();
		return next({ context: { session: "expired" } });
	}
	return next({ context: { session } });
});

// export function rateLimitMiddleware(opts: {
//   key: string
//   max: number
//   windowMs: number
// }) {
//   return createMiddleware().server(async ({ next }) => {
//     const request = getRequest()
//     const ip =
//       request.headers.get('cf-connecting-ip') ??
//       request.headers.get('x-forwarded-for')?.split(',')[0] ??
//       'unknown'
//     const allowed = await rateLimiter.consume(
//       `rl:${opts.key}:${ip}`,
//       opts.max,
//       opts.windowMs,
//     )
//     if (!allowed) throw new Error('Too many requests')
//     return next()
//   })
// }
