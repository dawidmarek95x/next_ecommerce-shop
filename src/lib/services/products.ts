import { products } from "../endpoints";

interface GetProductsSearchParams {
	limit?: string;
	offset?: string;
}

export interface ProductApiResponse {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
}

export interface ProductData {
	id: string;
	name: string;
	category: string;
	price: number;
	coverImage: {
		src: string;
		alt: string;
	};
	description: string;
}

export interface GetProductsResponse {
	data: ProductData[];
	totalResults: number;
}

export const getProducts = async ({
	limit,
	offset,
}: GetProductsSearchParams) => {
	const params = new URLSearchParams({
		...(limit && { take: limit }),
		...(offset && { offset }),
	});

	const responseAll = await fetch(`${products}`);
	const productsResponseAll =
		(await responseAll.json()) as ProductApiResponse[];
	const totalResults = productsResponseAll?.length ?? 0;

	const response = await fetch(`${products}${params && `?${params}`}`);
	const productsResponse = (await response.json()) as ProductApiResponse[];

	const productList = productsResponse.map(
		(product): ProductData =>
			convertProductItemResponseTypeToProductItemType(product),
	);

	const productDataResponse = {
		data: productList,
		totalResults,
	};

	return productDataResponse;
};

export const getProductById = async (id: string) => {
	const response = await fetch(`${products}/${id}`);
	const productResponse = (await response.json()) as ProductApiResponse;

	return convertProductItemResponseTypeToProductItemType(productResponse);
};

export const convertProductItemResponseTypeToProductItemType = (
	product: ProductApiResponse,
): ProductData => ({
	id: product.id,
	name: product.title,
	category: product.category,
	price: product.price,
	coverImage: {
		src: product.image,
		alt: product.title,
	},
	description: product.description,
});
