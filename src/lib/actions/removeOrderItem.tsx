"use server";

import {
	CartDeleteOrderItemByIdDocument,
	CartUpdateByIdDocument,
	OrderSingleItemFragment,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";
import { getCartByFromCookies } from "../services/cart";
import { revalidateTag } from "next/cache";

export const removeOrderItem = async (orderItem: OrderSingleItemFragment) => {
	const cart = await getCartByFromCookies();

	if (!cart) {
		return;
	}

	await executeGraphQL(
		CartUpdateByIdDocument,
		{
			id: cart.id,
			total: cart.total - orderItem.quantity * (orderItem.product?.price ?? 0),
		},
		{
			isMutation: true,
			cache: "no-cache",
		},
	);

	await executeGraphQL(
		CartDeleteOrderItemByIdDocument,
		{
			id: orderItem.id,
		},
		{
			isMutation: true,
			cache: "no-cache",
		},
	);

	revalidateTag("cart");
};
