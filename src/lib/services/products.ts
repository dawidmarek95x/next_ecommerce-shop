import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCategorySlugQuery,
	ProductsGetListDocument,
	ProductsGetListQuery,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";

interface GetProductsSearchParams {
	limit?: number;
	offset?: number;
}

interface ProductApiData {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	categories?: { name?: string; slug?: string }[];
	images?: { url?: string }[];
}

export interface GetProductsApiData {
	products: ProductApiData[];
	productsConnection: {
		aggregate: {
			count: number;
		};
	};
}

export interface GetProductsApiResponse {
	data: GetProductsApiData;
}

export interface GetProductApiResponse {
	data: {
		product: ProductApiData;
	};
}

interface GetProductsByCategorySlugSearchParams {
	limit?: number;
	offset?: number;
	categorySlug: string;
}

export interface ProductData {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	category: {
		name: string;
		slug: string;
	};
	coverImage?: {
		src: string;
		alt: string;
	};
}

export interface GetProductsResponse {
	data: ProductData[];
	totalResults: number;
}

export const getProducts = async ({
	limit = 20,
	offset = 0,
}: GetProductsSearchParams) => {
	const productsApiResponse = await executeGraphQL(ProductsGetListDocument, {
		limit,
		offset,
	});

	const productsResponse =
		convertProductsApiResponseToProductsResponse(productsApiResponse);

	return productsResponse;
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

	const productsResponse =
		convertProductsApiResponseToProductsResponse(productsApiResponse);

	return productsResponse;
};

export const getProductById = async (id: string) => {
	const productApiResponse = await executeGraphQL(ProductGetByIdDocument, {
		id,
	});

	if (!productApiResponse.product) {
		return null;
	}

	return convertProductApiDataToProductData(productApiResponse?.product);
};

export const convertProductApiDataToProductData = (
	product: ProductApiData,
): ProductData => ({
	id: product?.id,
	name: product?.name,
	slug: product?.slug,
	description: product?.description,
	price: product?.price,
	category: {
		name: product?.categories?.[0]?.name ?? "",
		slug: product?.categories?.[0]?.slug ?? "",
	},
	coverImage: product?.images?.[0] && {
		src: product?.images?.[0]?.url ?? "",
		alt: product?.name,
	},
});

export const convertProductsApiResponseToProductsResponse = (
	productsApiResponse: ProductsGetListQuery | ProductsGetByCategorySlugQuery,
) => {
	const products: ProductData[] = productsApiResponse.products.map((product) =>
		convertProductApiDataToProductData(product),
	);

	const totalResults = productsApiResponse.productsConnection.aggregate.count;

	const productsResponse: GetProductsResponse = {
		data: products,
		totalResults,
	};

	return productsResponse;
};
