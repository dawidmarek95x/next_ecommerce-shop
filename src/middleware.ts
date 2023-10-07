import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
	publicRoutes: [
		"/",
		"/cart",
		// @ts-ignore
		"/categories/(.*)",
		// @ts-ignore
		"/collections/(.*)",
		// @ts-ignore
		"/product/(.*)",
		"/products",
		// @ts-ignore
		"/products/(.*)",
		"/search",
	],
});
