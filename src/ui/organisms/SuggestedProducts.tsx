import {
	getProducts,
	getProductsByCategorySlug,
} from "@/lib/services/products";
import { ProductList } from "./ProductList";
import { ProductItemFragment } from "@/gql/graphql";

export const SuggestedProductsList = async ({
	currentProduct,
}: {
	currentProduct: ProductItemFragment;
}) => {
	const products = await getProductsByCategorySlug({
		categorySlug: currentProduct.categories[0]?.slug ?? "",
	});

	const categorizedProducts = products.data.filter(
		(product) => product.id !== currentProduct.id,
	);
	let additionalProducts: ProductItemFragment[] = [];
	if (categorizedProducts.length < 4) {
		const products = await getProducts({});

		additionalProducts =
			products?.data?.filter((product) => product.id !== currentProduct.id) ??
			[];
	}

	const suggestedProducts =
		categorizedProducts.length >= 4
			? categorizedProducts?.slice(0, 4)
			: [...categorizedProducts, ...additionalProducts]?.slice(0, 4);

	return <ProductList products={suggestedProducts} />;
};
