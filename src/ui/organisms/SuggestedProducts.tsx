import { ProductData, getProducts } from "@/lib/services/products";
import { ProductList } from "./ProductList";

export const SuggestedProductsList = async ({
	currentProduct,
}: {
	currentProduct: ProductData;
}) => {
	const products = await getProducts({ limit: "0" });

	const categorizedProducts = [
		...products?.data?.filter(
			(product) =>
				product?.category === currentProduct?.category &&
				product?.id !== currentProduct?.id,
		),
	];

	const suggestedProducts =
		categorizedProducts?.length >= 4
			? categorizedProducts?.slice(0, 4)
			: [
					...categorizedProducts,
					...products?.data?.filter(
						(product) => product?.id !== currentProduct?.id,
					),
			  ]?.slice(0, 4);

	return <ProductList products={suggestedProducts} />;
};
