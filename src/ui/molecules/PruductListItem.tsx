import { ProductItemFragment } from "@/gql/graphql";
import { ProductCoverImage } from "@ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@ui/atoms/ProductListItemDescription";
import Link from "next/link";

interface ProductListItemProps {
	product: ProductItemFragment;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					{product.images?.[0] && (
						<ProductCoverImage
							src={product.images[0]?.url}
							alt={product.name}
						/>
					)}
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
