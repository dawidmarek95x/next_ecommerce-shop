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
			</Link>
		</li>
	);
};
