import { getCategoryBySlug } from "@/lib/services/categories";
import { getProductsByCategorySlug } from "@/lib/services/products";
import { redirect } from "next/navigation";
import { CATEGORIES_INITIAL_SEARCH_PARAMS } from "./page";

export default async function CategorySlugPageNumberLayout({
	params,
	children,
}: {
	params: { categorySlug: string; pageNumber: string };
	children: React.ReactNode;
}) {
	const category = await getCategoryBySlug({ slug: params.categorySlug });

	if (!category) {
		redirect("/");
	}

	if (isNaN(+params.pageNumber) || +params.pageNumber <= 0) {
		redirect(`/categories/${params.categorySlug}/1`);
	}

	const products = await getProductsByCategorySlug({
		limit: CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT,
		categorySlug: params.categorySlug,
	});

	const pageCount = Math.ceil(
		products.totalResults / Number(CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT),
	);

	if (+params.pageNumber > pageCount) {
		redirect(`/categories/${params.categorySlug}/${pageCount}`);
	}

	return <>{children}</>;
}
