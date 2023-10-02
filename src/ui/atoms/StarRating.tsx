import clsx from "clsx";
import { StarIcon } from "lucide-react";
import React, { HTMLAttributes } from "react";

interface StarRatingProps extends HTMLAttributes<HTMLDivElement> {
	maxRating?: number;
	rating: number;
	size?: number;
}

const StarRating = ({
	maxRating = 5,
	rating,
	size = 20,
	...props
}: StarRatingProps) => {
	const filledStars = Math.round(rating);
	const emptyStars = maxRating - filledStars;

	return (
		<div className={clsx("flex items-center", props.className)} {...props}>
			{[...Array(filledStars)].map((_, index) => (
				<StarIcon
					className="fill-yellow-400 text-yellow-400"
					style={{ height: size, width: size }}
					key={index}
				/>
			))}
			{[...Array(emptyStars)].map((_, index) => (
				<StarIcon
					className="text-gray-300"
					style={{ height: size, width: size }}
					key={index}
				/>
			))}
		</div>
	);
};

export default StarRating;
