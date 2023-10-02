import { MetadataRoute } from "next";

export default function RootSitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://next-ecommerce-shop.vercel.app/",
			lastModified: new Date().toISOString(),
		},
		{
			url: "https://next-ecommerce-shop.vercel.app/products",
			lastModified: new Date().toISOString(),
		},
		{
			url: "https://next-ecommerce-shop.vercel.app/product",
			lastModified: new Date().toISOString(),
		},
		{
			url: "https://next-ecommerce-shop.vercel.app/categories",
			lastModified: new Date().toISOString(),
		},
		{
			url: "https://next-ecommerce-shop.vercel.app/collections",
			lastModified: new Date().toISOString(),
		},
		{
			url: "https://next-ecommerce-shop.vercel.app/search",
			lastModified: new Date().toISOString(),
		},
		{
			url: "https://next-ecommerce-shop.vercel.app/cart",
			lastModified: new Date().toISOString(),
		},
	];
}
