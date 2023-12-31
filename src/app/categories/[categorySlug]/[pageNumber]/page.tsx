import { CATEGORIES_INITIAL_SEARCH_PARAMS } from "@/lib/data/initialSearchParams";
import { getCategoryBySlug } from "@/lib/services/categories";
import { getProductsByCategorySlug } from "@/lib/services/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

const PLACEHOLDER_DESCRIPTION =
	"We are your favorite source of the latest trends and unique accessories that will allow you to express yourself and feel special. Our offer includes three fascinating categories: T-Shirts, Hoodies and Accessories. See why we are one of the best places to shop for fashion.";

// export const generateStaticParams = async ({
// 	params,
// }: {
// 	params: {
// 		categorySlug: string;
// 		pageNumber: string;
// 	};
// }) => {
// 	const categories = await getCategories({});

// 	const pages = categories?.data?.map(async (category) => {
// 		const products = await getProductsByCategorySlug({
// 			limit: CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT,
// 			offset:
// 				(Number(params.pageNumber) - 1) *
// 				CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT,
// 			categorySlug: category.slug,
// 		});

// 		const pageCount = Math.ceil(
// 			products.totalResults / Number(CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT),
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
	params: { categorySlug: string };
}) {
	const category = await getCategoryBySlug({ slug: params.categorySlug });

	return {
		title: category?.name
			? `${category?.name} Category | E-commerse shop`
			: "Category | E-commerse shop",
		description: category?.description ?? PLACEHOLDER_DESCRIPTION,
		openGraph: {
			title: category?.name
				? `${category?.name} Category | E-commerse shop`
				: "Category | E-commerse shop",
			description: category?.description ?? PLACEHOLDER_DESCRIPTION,
		},
	};
}

export default async function CategoryProductPage({
	params,
}: {
	params: {
		categorySlug: string;
		pageNumber: string;
	};
}) {
	const category = await getCategoryBySlug({ slug: params.categorySlug });

	const products = await getProductsByCategorySlug({
		limit: CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT,
		offset:
			(Number(params.pageNumber) - 1) * CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT,
		categorySlug: params.categorySlug,
	});

	return (
		<>
			<div>
				<h1 className="py-8 text-center text-5xl font-bold">
					{category?.name ?? "Categories"}
				</h1>
				<p className="mx-auto mb-11 max-w-3xl px-8 text-justify lg:max-w-4xl xl:max-w-5xl">
					{category?.description ?? PLACEHOLDER_DESCRIPTION}
				</p>
			</div>

			<article className="sm:py-18 mx-auto max-w-2xl px-8 py-12 sm:px-6 lg:max-w-7xl">
				<ProductList products={products?.data} />
			</article>

			<Pagination
				totalResults={products?.totalResults}
				currentPage={+params?.pageNumber}
				adjacentPageCount={2}
				resultsPerPage={CATEGORIES_INITIAL_SEARCH_PARAMS.LIMIT}
				basePath={`/categories/${params.categorySlug}`}
			/>
		</>
	);
}
