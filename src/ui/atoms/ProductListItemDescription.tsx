import { ProductItemFragment } from "@/gql/graphql";
import { calculateAverageRating } from "@/utils/calculateAverageRating";
import { formatMoney } from "@/utils/formatMoney";
import StarRating from "./StarRating";

interface ProductListItemDescriptionProps {
	product: ProductItemFragment;
}

export const ProductListItemDescription = ({
	product: { name, categories, price, reviews },
}: ProductListItemDescriptionProps) => {
	const rating = calculateAverageRating(reviews);

	return (
		<div className="mt-2">
			<div className="flex flex-row justify-between">
				<h3 className="text-sm font-semibold text-slate-700">{name}</h3>
				<p
					className="small-caps text-sm font-medium text-slate-900"
					data-testid="product-price"
				>
					{formatMoney(price / 100)}
				</p>
			</div>
			<div className="mt-1 flex flex-row justify-between">
				{categories[0]?.name && (
					<p className="text-sm text-slate-500">{categories[0]?.name}</p>
				)}
				<div className="flex flex-row items-center gap-2">
					<p
						className="small-caps text-xs"
						data-testid="product-rating"
						aria-hidden="true"
					>
						{`${rating.toFixed(1)}/5`}
					</p>
					<StarRating rating={rating} size={16} />
				</div>
			</div>
		</div>
	);
};
