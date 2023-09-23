import { ProductData } from "@/lib/services/products";
import { ProductCoverImage } from "@ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@ui/atoms/ProductListItemDescription";
import Link from "next/link";

interface ProductListItemProps {
	product: ProductData;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					{product.coverImage && <ProductCoverImage {...product.coverImage} />}
					<ProductListItemDescription
						product={{
							category: product.category.name,
							name: product.name,
							price: product.price,
						}}
					/>
				</article>
			</Link>
		</li>
	);
};
