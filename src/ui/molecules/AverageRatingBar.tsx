import { HTMLAttributes } from "react";
import StarRating from "../atoms/StarRating";
import { CalculateRatingStats } from "@/utils/calculateRatingStars";

interface AverageRatingBarProps extends HTMLAttributes<HTMLDivElement> {
	data: CalculateRatingStats;
}

export default function AverageRatingBar({
	data,
	...props
}: AverageRatingBarProps) {
	return (
		<div {...props}>
			<div title={`${data.averageRating} out of 5 stars`}>
				<StarRating rating={data.averageRating} />
				<p className="sr-only">{`${data.averageRating} out of 5 stars`}</p>
			</div>
			<p className="ml-2 text-sm text-gray-900">
				{`Based on ${data.totalReviews} reviews`}
			</p>
		</div>
	);
}
