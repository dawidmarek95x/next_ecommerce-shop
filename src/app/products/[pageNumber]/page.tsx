import { PRODUCTS_INITIAL_SEARCH_PARAMS } from "@/lib/data/initialSearchParams";
import { getProducts } from "@/lib/services/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { Metadata } from "next";

const PRODUCTS_DESCRIPTION =
	"Our products are a collection of the latest clothing trends and unique accessories that will allow you to express yourself and feel special. They are the epitome of comfort and style, offering a variety of styles, patterns and colors to express your personality. So explore our fascinating collection to find the perfect items that will express your unique style.";

export const generateStaticParams = async ({
	params,
}: {
	params: { pageNumber: string };
}) => {
	const products = await getProducts({
		limit: PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
	});

	const pageCount = Math.ceil(
		products.totalResults / Number(PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT),
	);

	const pageNumbers = [];
	for (let i = 1; i <= pageCount; i++) {
		pageNumbers.push(i);
	}

	return pageNumbers.map((pageNumber) => ({
		pageNumber: pageNumber.toString(),
	}));
};

export const metadata: Metadata = {
	title: "Products | E-commerse shop",
	description: PRODUCTS_DESCRIPTION,
	openGraph: {
		title: "Products | E-commerse shop",
		description: PRODUCTS_DESCRIPTION,
	},
};

export default async function CategoryProductPage({
	params,
}: {
	params: { pageNumber: string };
}) {
	const products = await getProducts({
		limit: PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
	});

	return (
		<>
			<div>
				<h1 className="py-8 text-center text-5xl font-bold">All products</h1>
				<p className="mx-auto mb-14 max-w-3xl text-justify">
					{PRODUCTS_DESCRIPTION}
				</p>
			</div>

			<article>
				<ProductList products={products?.data} />
			</article>

			<Pagination
				totalResults={products?.totalResults}
				currentPage={+params?.pageNumber}
				adjacentPageCount={2}
				resultsPerPage={PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT}
				basePath="/products"
			/>
		</>
	);
}
