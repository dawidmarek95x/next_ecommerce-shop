import {
	CategoriesGetBySlugDocument,
	CategoriesGetlistDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";

interface GetCategoriesSearchParams {
	limit?: number;
	offset?: number;
}

interface GetCategoryBySlugSearchParams {
	slug: string;
}

export const getCategories = async ({
	limit,
	offset,
}: GetCategoriesSearchParams) => {
	const categoriesApiResponse = await executeGraphQL(
		CategoriesGetlistDocument,
		{
			limit,
			offset,
		},
	);

	return {
		data: categoriesApiResponse.categories,
		totalResults: categoriesApiResponse.categoriesConnection.aggregate.count,
	};
};

export const getCategoryBySlug = async ({
	slug,
}: GetCategoryBySlugSearchParams) => {
	const categoriesApiResponse = await executeGraphQL(
		CategoriesGetBySlugDocument,
		{ limit: 1, offset: 0, slug },
	);

	return categoriesApiResponse?.categories?.[0];
};
