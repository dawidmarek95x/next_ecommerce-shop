import { HTMLAttributes } from "react";
import NextImage from "next/image";
import { CartProductItemContent } from "./CartProductItemContent";
import { ProductQuantityCounter } from "./ProductQuantityCounter";
import { OrderSingleItemFragment } from "@/gql/graphql";
import { RemoveOrderItemButton } from "../atoms/RemoveOrderItemButton";

interface CartProductItemProps extends HTMLAttributes<HTMLLIElement> {
	orderItem: OrderSingleItemFragment;
}

export async function CartProductItem({
	orderItem,
	...props
}: CartProductItemProps) {
	return (
		<li className="flex py-4" {...props}>
			<div className="flex-shrink-0 self-start rounded-md border bg-slate-50">
				<NextImage
					width={200}
					height={200}
					src={orderItem.product?.images?.[0]?.url ?? ""}
					alt={orderItem.product?.name ?? ""}
					className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
				/>
			</div>
			<div className="relative flex flex-1 flex-col justify-between pl-4 text-center sm:text-left">
				<CartProductItemContent
					className="grid grid-cols-1 justify-between sm:grid-cols-2"
					name={orderItem.product?.name ?? ""}
					category={orderItem.product?.categories?.[0]?.name ?? ""}
					price={orderItem.product?.price ?? 0}
				/>
				<div className="mx-auto mt-4 sm:mx-0">
					<ProductQuantityCounter orderItem={orderItem} />
					<RemoveOrderItemButton orderItem={orderItem} />
				</div>
			</div>
		</li>
	);
}
