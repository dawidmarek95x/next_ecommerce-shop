type Review = { rating: number };

export function calculateAverageRating(reviews: Review[]) {
	const totalReviews = reviews.length;
	if (totalReviews === 0) {
		return 0;
	}

	const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
	const averageRating = +(totalRating / totalReviews).toFixed(1);

	return averageRating;
}
