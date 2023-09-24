import { PRODUCTS_INITIAL_SEARCH_PARAMS } from "@/lib/data/initialSearchParams";
import { getProducts } from "@/lib/services/products";
import { redirect } from "next/navigation";

export default async function ProductsPageNumberLayout({
	params,
	children,
}: {
	params: { categorySlug: string; pageNumber: string };
	children: React.ReactNode;
}) {
	if (isNaN(+params.pageNumber) || +params.pageNumber <= 0) {
		redirect(`/products/1`);
	}

	const products = await getProducts({
		limit: PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT,
	});

	const pageCount = Math.ceil(
		products.totalResults / Number(PRODUCTS_INITIAL_SEARCH_PARAMS.LIMIT),
	);

	if (+params.pageNumber > pageCount) {
		redirect(`/products/${pageCount}`);
	}

	return (
		<div className="mx-auto flex w-full flex-grow flex-col">{children}</div>
	);
}
