import { CalculateRatingStats } from "@/utils/calculateRatingStars";
import clsx from "clsx";
import { StarIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface RatingResultsByPercentageProps
	extends HTMLAttributes<HTMLDivElement> {
	data: CalculateRatingStats;
}

export default function RatingResultsByPercentage({
	data,
	...props
}: RatingResultsByPercentageProps) {
	const ratingResultsByPercentage = Object.entries(
		data.percentageRatingByStar,
	).map(([starAmount, percentageAmount], index) => {
		const percentageWidth = percentageAmount + "%";

		return (
			<div key={index} className="flex items-center text-sm">
				<dt className="flex flex-1 items-center">
					<p className="w-3 font-medium text-gray-900">
						{starAmount} <span className="sr-only">star reviews</span>
					</p>
					<div className="ml-1 flex flex-1 items-center" aria-hidden="true">
						<StarIcon
							className={clsx(
								"h-5 w-5",
								percentageAmount > 0
									? "fill-yellow-400 text-yellow-400"
									: "text-gray-300 ",
							)}
						/>
						<div className="relative ml-3 flex-1">
							<div className="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
							<div
								className={
									"absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
								}
								style={{
									width: `calc(${percentageWidth})`,
									border:
										percentageAmount > 0 ? "rgba(250, 204, 21, 1)" : "none",
								}}
							></div>
						</div>
					</div>
				</dt>
				<dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
					{`${percentageAmount}%`}
				</dd>
			</div>
		);
	});

	return (
		<div {...props}>
			<h3 className="sr-only">Review data</h3>
			<dl className="space-y-3">{ratingResultsByPercentage}</dl>
		</div>
	);
}
