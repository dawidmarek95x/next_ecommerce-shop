import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetBySearchedNameDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";

interface GetProductsSearchParams {
	limit?: number;
	offset?: number;
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

export const getProductsByCollectionSlug = async ({
	limit = 20,
	offset = 0,
	collectionSlug,
}: GetProductsByCollectionSlugSearchParams) => {
	const productsApiResponse = await executeGraphQL(
		ProductsGetByCollectionSlugDocument,
		{ limit, offset, collectionSlug },
	);

	return {
		data: productsApiResponse.products,
		totalResults: productsApiResponse.productsConnection.aggregate.count,
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
