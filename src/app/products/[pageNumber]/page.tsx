import { PRODUCTS_INITIAL_SEARCH_PARAMS } from "@/lib/data/initialSearchParams";
import { PRODUCT_SORT_OPTIONS } from "@/lib/data/productSortOptions";
import { GetProductsListOrderBy, getProducts } from "@/lib/services/products";
import SortSelect from "@/ui/atoms/SortSelect";
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

	const pageNumbers: number[] = [];
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

export default async function ProductsPageNumberPage({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { orderBy: string };
}) {
	const products = await getProducts({
		limit: PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
		orderBy: searchParams?.orderBy as GetProductsListOrderBy | undefined,
	});

	return (
		<>
			<div className="bg-gray-100 py-8">
				<div className="mx-auto max-w-7xl px-8">
					<div className="flex flex-row items-center justify-between">
						<h1 className="text-center text-3xl font-bold">All products</h1>
						<SortSelect
							className="arrow-down-bg block w-48 cursor-pointer rounded-md border border-gray-300 py-2 text-sm  font-light shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50 lg:mt-1"
							options={PRODUCT_SORT_OPTIONS}
						/>
					</div>
				</div>
			</div>

			<article className="sm:py-18 mx-auto max-w-2xl px-8 py-12 sm:px-6 lg:max-w-7xl">
				<ProductList products={products?.data} />
			</article>

			<Pagination
				totalResults={products?.totalResults}
				currentPage={+params?.pageNumber}
				adjacentPageCount={2}
				resultsPerPage={PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT}
				basePath="/products"
				searchParams={searchParams}
			/>
		</>
	);
}
