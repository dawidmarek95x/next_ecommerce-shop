type Review = { rating: number };
type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface CalculateRatingStats {
	averageRating: number;
	totalReviews: number;
	percentageRatingByStar: Record<RatingValue, number>;
}

export function calculateRatingStats(reviews: Review[]) {
	const totalReviews = reviews.length;
	if (totalReviews === 0) {
		return {
			averageRating: 0,
			totalReviews: 0,
			percentageRatingByStar: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			} as Record<RatingValue, number>,
		};
	}

	const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
	const averageRating = +(totalRating / totalReviews).toFixed(1);

	const ratingCounts: Record<number, number> = {};
	for (const review of reviews) {
		ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
	}

	const percentageRatingByStar: Record<RatingValue, number> = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};
	for (let i = 1; i <= 5; i++) {
		percentageRatingByStar[i as RatingValue] = +(
			((ratingCounts[i] || 0) / totalReviews) *
			100
		).toFixed(0);
	}

	return {
		totalReviews,
		averageRating,
		percentageRatingByStar,
	};
}
