import { getProducts } from "@/lib/services/products";
import { redirect } from "next/navigation";
import { PRODUCTS_INITIAL_SEARCH_PARAMS } from "./page";

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

	return <>{children}</>;
}
