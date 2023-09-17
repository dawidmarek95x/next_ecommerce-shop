import { getProducts } from "@/lib/services/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { Metadata } from "next";

export const generateStaticParams = async ({
	params,
}: {
	params: { pageNumber: string };
}) => {
	const products = await getProducts({
		limit: INITIAL_SEARCH_PARAMS.LIMIT,
		offset: params.pageNumber,
	});

	const pageCount =
		products.totalResults / Number(INITIAL_SEARCH_PARAMS.LIMIT) +
		(products.totalResults % Number(INITIAL_SEARCH_PARAMS.LIMIT) !== 0 ? 1 : 0);

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
	description:
		"Welcome to our online store, where you will find the largest selection of high-quality products available online. Our offer covers a wide range of product categories, meeting the diverse needs and preferences of our customers. Whether you are a fan of technology, fashion, cosmetics or home goods, we have something special for you.",
	openGraph: {
		title: "Products | E-commerse shop",
		description:
			"Welcome to our online store, where you will find the largest selection of high-quality products available online. Our offer covers a wide range of product categories, meeting the diverse needs and preferences of our customers. Whether you are a fan of technology, fashion, cosmetics or home goods, we have something special for you.",
	},
};

const INITIAL_SEARCH_PARAMS = {
	LIMIT: "20",
};

export default async function CategoryProductPage({
	params,
}: {
	params: { pageNumber: string };
}) {
	const products = await getProducts({
		limit: INITIAL_SEARCH_PARAMS.LIMIT,
		offset: params.pageNumber,
	});

	return (
		<>
			<div>
				<h1 className="py-8 text-center text-5xl font-bold">All products</h1>
				<p className="mx-auto mb-14 max-w-3xl text-justify">
					Welcome to our online store, where you will find the largest selection
					of high-quality products available online. Our offer covers a wide
					range of product categories, meeting the diverse needs and preferences
					of our customers. Whether you are a fan of technology, fashion,
					cosmetics or home goods, we have something special for you.
				</p>
			</div>

			<article>
				<ProductList products={products?.data} />
			</article>

			<Pagination
				totalResults={products?.totalResults}
				currentPage={+params?.pageNumber}
				adjacentPageCount={2}
				resultsPerPage={+INITIAL_SEARCH_PARAMS.LIMIT}
				basePath="/products"
			/>
		</>
	);
}
