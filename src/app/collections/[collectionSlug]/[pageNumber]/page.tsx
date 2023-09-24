import { COLLECTIONS_INITIAL_SEARCH_PARAMS } from "@/lib/data/initialSearchParams";
import { getCollectionBySlug } from "@/lib/services/collections";
import { getProductsByCollectionSlug } from "@/lib/services/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

const PLACEHOLDER_DESCRIPTION =
	"We are your favorite source of the latest trends and unique accessories that will allow you to express yourself and feel special. Our offer includes three fascinating collections: Summer Vibes, New Arrivals and Elegant Extras. See why we are one of the best places to shop for fashion.";

// export const generateStaticParams = async ({
// 	params,
// }: {
// 	params: {
// 		collectionSlug: string;
// 		pageNumber: string;
// 	};
// }) => {
// 	const collections = await getCollections({});

// 	const pages = collections?.data?.map(async (collection) => {
// 		const products = await getProductsByCollectionSlug({
// 			limit: COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT,
// 			offset:
// 				(Number(params.pageNumber) - 1) *
// 				COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT,
// 			collectionSlug: collection.slug,
// 		});

// 		const pageCount = Math.ceil(
// 			products.totalResults / Number(COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT),
// 		);

// 		const pageNumbers = [];
// 		for (let i = 1; i <= pageCount; i++) {
// 			pageNumbers.push(i);
// 		}

// 		return pageNumbers
// 			.map((pageNumber) => ({
// 				pageNumber: pageNumber.toString(),
// 			}))
// 			.flat(1);
// 	});

// 	return pages;
// };

export async function generateMetadata({
	params,
}: {
	params: { collectionSlug: string };
}) {
	const collection = await getCollectionBySlug({ slug: params.collectionSlug });

	return {
		title: collection?.name
			? `${collection?.name} Collection | E-commerse shop`
			: "Collection | E-commerse shop",
		description: collection?.description ?? PLACEHOLDER_DESCRIPTION,
		openGraph: {
			title: collection?.name
				? `${collection?.name} Collection | E-commerse shop`
				: "Collection | E-commerse shop",
			description: collection?.description ?? PLACEHOLDER_DESCRIPTION,
		},
	};
}

export default async function CollectionProductPage({
	params,
}: {
	params: {
		collectionSlug: string;
		pageNumber: string;
	};
}) {
	const collection = await getCollectionBySlug({ slug: params.collectionSlug });

	const products = await getProductsByCollectionSlug({
		limit: COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT,
		collectionSlug: params.collectionSlug,
	});

	return (
		<>
			<div className="bg-gray-100">
				<h1 className="py-8 text-center text-5xl font-bold">
					{collection?.name ?? "Collections"}
				</h1>
				<p className="mx-auto mb-11 max-w-3xl px-8 text-justify lg:max-w-4xl xl:max-w-5xl">
					{collection?.description ?? PLACEHOLDER_DESCRIPTION}
				</p>
			</div>

			<article className="sm:py-18 mx-auto max-w-2xl px-8 py-12 sm:px-6 lg:max-w-7xl">
				<ProductList products={products?.data} />
			</article>

			<Pagination
				totalResults={products?.totalResults}
				currentPage={+params?.pageNumber}
				adjacentPageCount={2}
				resultsPerPage={COLLECTIONS_INITIAL_SEARCH_PARAMS.LIMIT}
				basePath={`/collections/${params.collectionSlug}`}
			/>
		</>
	);
}
