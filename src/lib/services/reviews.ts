import {
	ReviewGetListByProductIdDocument,
	ReviewGetListDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";

interface GetReviewsSearchParams {
	limit?: number;
	offset?: number;
}

interface GetProductsByProductIdSearchParams extends GetReviewsSearchParams {
	productId: string;
}

export const getReviews = async ({
	limit = 20,
	offset = 0,
}: GetReviewsSearchParams) => {
	const reviewsApiResponse = await executeGraphQL(
		ReviewGetListDocument,
		{
			limit,
			offset,
		},
		{
			next: {
				revalidate: 15,
				tags: ["reviews"],
			},
		},
	);

	return {
		data: reviewsApiResponse?.reviews,
		totalResults: reviewsApiResponse?.reviewsConnection.aggregate.count,
	};
};

export const getReviewsByProductId = async ({
	limit = 20,
	offset = 0,
	productId,
}: GetProductsByProductIdSearchParams) => {
	const reviewsApiResponse = await executeGraphQL(
		ReviewGetListByProductIdDocument,
		{ limit, offset, productId },
		{
			next: {
				revalidate: 15,
				tags: ["reviews"],
			},
		},
	);

	return {
		data: reviewsApiResponse?.reviews,
		totalResults: reviewsApiResponse?.reviewsConnection.aggregate.count,
	};
};
