import { ProductCoverImage } from "@ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@ui/atoms/ProductListItemDescription";
import { ProductItemType } from "@ui/types";

interface ProductListItemProps {
	product: ProductItemType;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<article>
				<ProductCoverImage
					src={product.coverImage.src}
					alt={product.coverImage.alt}
				/>
				<ProductListItemDescription
					product={{
						category: product.category,
						name: product.name,
						price: product.price,
					}}
				/>
			</article>
		</li>
	);
};
