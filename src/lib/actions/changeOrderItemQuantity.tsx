"use server";

import {
	CartDeleteOrderItemByIdDocument,
	CartUpdateByIdDocument,
	CartUpdateOrderItemByIdDocument,
	OrderSingleItemFragment,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";
import { getCartByFromCookies } from "../services/cart";
import { revalidateTag } from "next/cache";

interface ChangeOrderItemQuantityProps {
	quantity: number;
	orderItem: OrderSingleItemFragment;
}

export const changeOrderItemQuantity = async ({
	quantity,
	orderItem,
}: ChangeOrderItemQuantityProps) => {
	const cart = await getCartByFromCookies();

	if (!cart) {
		return;
	}

	const { updateOrderItem } = await executeGraphQL(
		CartUpdateOrderItemByIdDocument,
		{
			id: orderItem.id,
			quantity,
			total:
				orderItem.total +
				(quantity - orderItem.quantity) * (orderItem.product?.price ?? 0),
		},
		{
			isMutation: true,
			cache: "no-cache",
		},
	);

	if (updateOrderItem) {
		await executeGraphQL(
			CartUpdateByIdDocument,
			{
				id: cart.id,
				total:
					cart.total +
					(quantity - orderItem.quantity) * (orderItem.product?.price ?? 0),
			},
			{
				isMutation: true,
				cache: "no-cache",
			},
		);
	}

	if ((updateOrderItem?.quantity ?? 0) <= 0) {
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
	}

	revalidateTag("cart");
};
