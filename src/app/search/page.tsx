import { getProductsBySearchedName } from "@/lib/services/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { Metadata } from "next";

const PRODUCTS_DESCRIPTION =
	"Our products are a collection of the latest clothing trends and unique accessories that will allow you to express yourself and feel special. They are the epitome of comfort and style, offering a variety of styles, patterns and colors to express your personality. So explore our fascinating collection to find the perfect items that will express your unique style.";

export const metadata: Metadata = {
	title: "Products | E-commerse shop",
	description: PRODUCTS_DESCRIPTION,
	openGraph: {
		title: "Products | E-commerse shop",
		description: PRODUCTS_DESCRIPTION,
	},
};

export default async function ProductsBySearchedNamePage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	let query: string = "";
	typeof searchParams?.query === "string"
		? (query = searchParams?.query)
		: Array.isArray(searchParams?.query)
		? (query = searchParams.query[0] ?? "")
		: "";

	const products = await getProductsBySearchedName({
		searchedName: query,
	});

	const searchInfo =
		query !== ""
			? `Found ${products.totalResults} items for phrase "${query}"`
			: `Found ${products.totalResults} items`;

	return (
		<>
			<div className="bg-gray-100 py-6">
				<p className="sm:py-18 mx-auto max-w-2xl px-8 sm:px-6 lg:max-w-7xl">
					{searchInfo}
				</p>
			</div>

			<article className="sm:py-18 mx-auto max-w-2xl px-8 py-12 sm:px-6 lg:max-w-7xl">
				<ProductList products={products?.data} />
			</article>
		</>
	);
}
