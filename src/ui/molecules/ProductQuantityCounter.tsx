"use client";

import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { OrderSingleItemFragment } from "@/gql/graphql";
import { ProductQuantityActionButton } from "../atoms/ProductQuantityActionButton";
import { changeOrderItemQuantity } from "@/lib/actions/changeOrderItemQuantity";
import { removeOrderItem } from "@/lib/actions/removeOrderItem";

interface ProductQuantityCounterProps extends HTMLAttributes<HTMLDivElement> {
	orderItem: OrderSingleItemFragment;
}

export function ProductQuantityCounter({
	orderItem,
	...props
}: ProductQuantityCounterProps) {
	const [optimisticQuantity, setOptimisticQuantity] = useState(
		orderItem.quantity,
	);
	const [actualQuantity, setActualQuantity] = useState(orderItem.quantity);

	const setOrderItemQuantity = useCallback(async () => {
		actualQuantity > 0
			? await changeOrderItemQuantity({ quantity: actualQuantity, orderItem })
			: actualQuantity === 0 && (await removeOrderItem(orderItem));
	}, [actualQuantity]);

	useEffect(() => {
		const quantityChangeDelay = setTimeout(() => {
			setActualQuantity(optimisticQuantity);
		}, 500);

		return () => {
			clearTimeout(quantityChangeDelay);
		};
	}, [optimisticQuantity]);

	useEffect(() => {
		if (actualQuantity !== orderItem.quantity) {
			setOrderItemQuantity();
		}
	}, [actualQuantity]);

	return (
		<div
			className={clsx("flex", props.className && props.className)}
			{...props}
		>
			<ProductQuantityActionButton
				className="h-6 w-6 border border-slate-300 bg-red-400 transition-colors hover:bg-red-300 disabled:bg-slate-300"
				data-testid="decrement"
				disabled={optimisticQuantity <= 1}
				handleAction={async () => {
					if (optimisticQuantity >= 1) {
						setOptimisticQuantity(optimisticQuantity - 1);
					}
				}}
			>
				-
			</ProductQuantityActionButton>
			<span className="w-8 text-center" data-testid="quantity">
				{optimisticQuantity}
			</span>
			<ProductQuantityActionButton
				className="h-6 w-6 border border-slate-300 bg-green-400 transition-colors hover:bg-green-300"
				data-testid="increment"
				handleAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
				}}
			>
				+
			</ProductQuantityActionButton>
		</div>
	);
}
