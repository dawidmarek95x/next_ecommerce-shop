import { ProductReviewCreateDocument } from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";
import { revalidateTag } from "next/cache";

export const addReviewToProductAction = async (formData: FormData) => {
	"use server";

	const data = {
		productId: formData.get("productId")?.toString() ?? "",
		headline: formData.get("headline")?.toString() ?? "",
		content: formData.get("content")?.toString() ?? "",
		rating: Number(formData.get("rating")?.toString() ?? 0),
		name: formData.get("name")?.toString() ?? "",
		email: formData.get("email")?.toString() ?? "",
	};

	await executeGraphQL(
		ProductReviewCreateDocument,
		{
			...data,
		},
		{
			isMutation: true,
			cache: "no-cache",
		},
	);

	revalidateTag("products");
	revalidateTag("reviews");
};
