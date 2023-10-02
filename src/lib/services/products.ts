import {
	InputMaybe,
	ProductGetByIdDocument,
	ProductOrderByInput,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetBySearchedNameDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";
import { AVAILABLE_SORT_OPTIONS } from "../data/productSortOptions";
import { calculateAverageRating } from "@/utils/calculateAverageRating";
import { filterDataWithLimitAndOffset } from "@/utils/filterDataWithLimitAndOffset";

interface GetProductsSearchParams {
	limit?: number;
	offset?: number;
}

type OrderByRating = "rating_ASC" | "rating_DESC";
export type GetProductsListOrderBy =
	| InputMaybe<ProductOrderByInput>
	| OrderByRating;

interface GetProductsListSearchParams extends GetProductsSearchParams {
	orderBy?: GetProductsListOrderBy;
}

interface GetProductsByCategorySlugSearchParams
	extends GetProductsSearchParams {
	categorySlug: string;
}

interface GetProductsByCollectionSlugSearchParams
	extends GetProductsSearchParams {
	collectionSlug: string;
}

interface GetProductsBySearchedNameSearchParams
	extends GetProductsSearchParams {
	searchedName: string;
}

export const getProducts = async ({
	limit = 20,
	offset = 0,
	orderBy,
}: GetProductsListSearchParams) => {
	if (!AVAILABLE_SORT_OPTIONS.includes(orderBy ?? "")) {
		orderBy = undefined;
	}

	if (!["rating_ASC", "rating_DESC"].includes(orderBy ?? "")) {
		const productsApiResponse = await executeGraphQL(
			ProductsGetListDocument,
			{
				limit,
				offset,
				orderBy: orderBy as InputMaybe<ProductOrderByInput> | undefined,
			},
			{
				next: {
					revalidate: 15,
				},
			},
		);

		return {
			data: productsApiResponse?.products,
			totalResults: productsApiResponse?.productsConnection.aggregate.count,
		};
	} else {
		const productsApiResponse = await executeGraphQL(
			ProductsGetListDocument,
			{},
			{
				next: {
					revalidate: 15,
				},
			},
		);

		return {
			data: filterDataWithLimitAndOffset(
				productsApiResponse?.products
					.map((product) => ({
						...product,
						averageRating: calculateAverageRating(product.reviews),
					}))
					.sort((a, b) => {
						switch (orderBy) {
							case "rating_ASC":
								return a.averageRating - b.averageRating;

							case "rating_DESC":
								return b.averageRating - a.averageRating;

							default:
								return b.averageRating - a.averageRating;
						}
					})
					.map((product) => {
						const { averageRating, ...originalProduct } = product;
						return originalProduct;
					}),
				{ limit, offset },
			),
			totalResults: productsApiResponse?.productsConnection.aggregate.count,
		};
	}
};

export const getProductsByCategorySlug = async ({
	limit = 20,
	offset = 0,
	categorySlug,
}: GetProductsByCategorySlugSearchParams) => {
	const productsApiResponse = await executeGraphQL(
		ProductsGetByCategorySlugDocument,
		{ limit, offset, categorySlug },
		{
			next: {
				revalidate: 15,
				tags: ["products"],
			},
		},
	);

	return {
		data: productsApiResponse?.products,
		totalResults: productsApiResponse?.productsConnection.aggregate.count,
	};
};

export const getProductsByCollectionSlug = async ({
	limit = 20,
	offset = 0,
	collectionSlug,
}: GetProductsByCollectionSlugSearchParams) => {
	const productsApiResponse = await executeGraphQL(
		ProductsGetByCollectionSlugDocument,
		{ limit, offset, collectionSlug },
		{
			next: {
				revalidate: 15,
				tags: ["products"],
			},
		},
	);

	return {
		data: productsApiResponse?.products,
		totalResults: productsApiResponse?.productsConnection.aggregate.count,
	};
};

export const getProductsBySearchedName = async ({
	limit = 20,
	offset = 0,
	searchedName,
}: GetProductsBySearchedNameSearchParams) => {
	const productsApiResponse = await executeGraphQL(
		ProductsGetBySearchedNameDocument,
		{ limit, offset, searchedName },
		{
			next: {
				revalidate: 15,
				tags: ["products"],
			},
		},
	);

	return {
		data: productsApiResponse?.products,
		totalResults: productsApiResponse?.productsConnection.aggregate.count,
	};
};

export const getProductById = async (id: string) => {
	const productApiResponse = await executeGraphQL(
		ProductGetByIdDocument,
		{
			id,
		},
		{
			cache: "no-cache",
			next: {
				tags: ["products"],
			},
		},
	);

	if (!productApiResponse?.product) {
		return null;
	}

	return productApiResponse?.product;
};
