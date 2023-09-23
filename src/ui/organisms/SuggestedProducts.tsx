import {
	ProductData,
	getProducts,
	getProductsByCategorySlug,
} from "@/lib/services/products";
import { ProductList } from "./ProductList";

export const SuggestedProductsList = async ({
	currentProduct,
}: {
	currentProduct: ProductData;
}) => {
	const categorizedProducts = await getProductsByCategorySlug({
		categorySlug: currentProduct.category.slug,
	});

	let additionalProducts: ProductData[] = [];
	if (categorizedProducts?.totalResults < 4) {
		const products = await getProducts({});

		additionalProducts =
			products?.data?.filter((product) => product?.id !== currentProduct?.id) ??
			[];
	}

	const suggestedProducts =
		categorizedProducts.totalResults >= 4
			? categorizedProducts?.data?.slice(0, 4)
			: [...categorizedProducts?.data, ...additionalProducts]?.slice(0, 4);

	return <ProductList products={suggestedProducts} />;
};
