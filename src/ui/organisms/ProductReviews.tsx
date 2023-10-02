import { ProductItemFullFragment } from "@/gql/graphql";
import { calculateRatingStats } from "@/utils/calculateRatingStars";
import { HTMLAttributes } from "react";
import AverageRatingBar from "../molecules/AverageRatingBar";
import RatingResultsByPercentage from "../molecules/RatingResultsByPercentage";
import ReviewForm from "../molecules/ReviewForm";

interface ProductReviewsProps extends HTMLAttributes<HTMLDivElement> {
	product: ProductItemFullFragment;
}

export async function ProductReviews({
	product,
	...props
}: ProductReviewsProps) {
	const starRatingData = calculateRatingStats(product.reviews);

	return (
		<div {...props}>
			<div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-16">
				<div className="lg:col-span-4">
					<div>
						<h2 className="text-2xl font-bold tracking-tight text-gray-900">
							Customer Reviews
						</h2>
						<AverageRatingBar
							className="mt-3 flex items-center"
							data={starRatingData}
						/>
						<RatingResultsByPercentage className="mt-6" data={starRatingData} />
						<ReviewForm
							className="mt-10"
							header="Share your thoughts"
							description="If you've used this product, share your thoughts with other customers"
							productId={product.id}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
