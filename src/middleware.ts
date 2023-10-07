import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
	publicRoutes: [
		"/",
		"/cart",
		"/categories/:categorySlug",
		"/categories/:categorySlug/:pageNumber",
		"/collections/:collectionSlug",
		"/collections/:collectionSlug/:pageNumber",
		"/product/:productId",
		"/products",
		"/products/:pageNumber",
		"/search",
	],
});
