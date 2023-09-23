import { ProductItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/PruductListItem";

export const ProductList = ({
	products,
}: {
	products: ProductItemFragment[];
}) => {
	return (
		<ul
			data-testid="products-list"
			className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
		>
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
};
