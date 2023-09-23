import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";

interface GetProductsSearchParams {
	limit?: number;
	offset?: number;
}

interface GetProductsByCategorySlugSearchParams {
	limit?: number;
	offset?: number;
	categorySlug: string;
}

export const getProducts = async ({
	limit = 20,
	offset = 0,
}: GetProductsSearchParams) => {
	const productsApiResponse = await executeGraphQL(ProductsGetListDocument, {
		limit,
		offset,
	});

	return {
		data: productsApiResponse.products,
		totalResults: productsApiResponse.productsConnection.aggregate.count,
	};
};

export const getProductsByCategorySlug = async ({
	limit = 20,
	offset = 0,
	categorySlug,
}: GetProductsByCategorySlugSearchParams) => {
	const productsApiResponse = await executeGraphQL(
		ProductsGetByCategorySlugDocument,
		{ limit, offset, categorySlug },
	);

	return {
		data: productsApiResponse.products,
		totalResults: productsApiResponse.productsConnection.aggregate.count,
	};
};

export const getProductById = async (id: string) => {
	const productApiResponse = await executeGraphQL(ProductGetByIdDocument, {
		id,
	});

	if (!productApiResponse.product) {
		return null;
	}

	return productApiResponse.product;
};
