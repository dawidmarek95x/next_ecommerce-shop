"use client";

import { HTMLAttributes, useState } from "react";
import { StarIcon } from "lucide-react";
import clsx from "clsx";

interface RatingRadioFormFieldProps extends HTMLAttributes<HTMLDivElement> {
	maxRating?: number;
	name: string;
	required?: boolean;
}

export const RatingRadioFormField = ({
	maxRating = 5,
	name,
	required = false,
	...props
}: RatingRadioFormFieldProps) => {
	const [rating, setRating] = useState<number>(0);
	const [nextRating, setNextRating] = useState<number>(0);

	const handleRatingChange = (value: number) => {
		setRating(value);
	};

	return (
		<div className={clsx("flex items-center", props.className)} {...props}>
			{[...Array(maxRating)]
				.map((_, idx) => idx + 1)
				.map((value) => (
					<label key={value}>
						<input
							type="radio"
							name={name}
							className="sr-only"
							value={value}
							required={required}
							onChange={() => handleRatingChange(value)}
						/>
						<StarIcon
							className={clsx("h-5 w-5 cursor-pointer")}
							style={{
								fill: value <= rating || value <= nextRating ? "#facc15" : "",
								color:
									value <= rating || value <= nextRating
										? "#facc15"
										: "#d1d5db",
							}}
							onMouseEnter={() => setNextRating(value)}
							onMouseLeave={() => setNextRating(rating)}
						/>
					</label>
				))}
		</div>
	);
};
