import { OrderSingleItemFragment } from "@/gql/graphql";
import clsx from "clsx";
import NextImage from "next/image";
import { HTMLAttributes } from "react";

interface OrderedProductTileProps extends HTMLAttributes<HTMLDivElement> {
	orderItem: OrderSingleItemFragment;
}

export const OrderedProductTile = ({
	orderItem,
	...props
}: OrderedProductTileProps) => {
	return (
		<div className={clsx("relative rounded", props.className)} {...props}>
			<NextImage
				src={orderItem.product?.images[0]?.url ?? ""}
				alt={orderItem.product?.name ?? ""}
				width={320}
				height={320}
				className="aspect-square h-full w-full rounded object-cover object-center transition-transform"
			/>

			<p className="absolute right-0 top-0 rounded-bl rounded-tr bg-black px-2 py-1 text-xs text-white sm:text-sm">
				x {orderItem.quantity}
			</p>
			<p className="absolute bottom-0 left-0 right-0 w-full rounded-b bg-black text-center text-xs text-white sm:text-sm">
				{orderItem.product?.name}
			</p>
		</div>
	);
};
