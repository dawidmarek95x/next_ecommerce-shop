"use client";

import { OrderSingleItemFragment } from "@/gql/graphql";
import { removeOrderItem } from "@/lib/actions/removeOrderItem";

interface RemoveOrderItemButtonProps {
	orderItem: OrderSingleItemFragment;
}

export function RemoveOrderItemButton({
	orderItem,
}: RemoveOrderItemButtonProps) {
	return (
		<button
			className="mt-3 text-sm font-medium text-blue-600 hover:text-red-500 sm:ml-0"
			type="submit"
			formAction={async () => {
				await removeOrderItem(orderItem);
			}}
		>
			Remove
		</button>
	);
}
