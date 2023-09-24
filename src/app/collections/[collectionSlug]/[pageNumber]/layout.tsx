import { COLLECTIONS_INITIAL_SEARCH_PARAMS } from "@/lib/data/initialSearchParams";
import { getCollectionBySlug } from "@/lib/services/collections";
import { getProductsByCollectionSlug } from "@/lib/services/products";
import { redirect } from "next/navigation";

export default async function CollectionSlugPageNumberLayout({
	params,
	children,
}: {
	params: { collectionSlug: string; pageNumber: string };
	children: React.ReactNode;
}) {
	const collection = await getCollectionBySlug({ slug: params.collectionSlug });

	if (!collection) {
		redirect("/");
	}

	if (isNaN(+params.pageNumber) || +params.pageNumber <= 0) {
		redirect(`/collections/${params.collectionSlug}/1`);
	}

	const products = await getProductsByCollectionSlug({
		limit: COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT,
		collectionSlug: params.collectionSlug,
	});

	const pageCount = Math.ceil(
		products.totalResults / Number(COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT),
	);

	if (+params.pageNumber > pageCount) {
		redirect(`/collections/${params.collectionSlug}/${pageCount}`);
	}

	return (
		<div className="mx-auto flex w-full flex-grow flex-col">{children}</div>
	);
}
