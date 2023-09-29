import { CartFragment } from "@/gql/graphql";
import { HTMLAttributes, Suspense } from "react";
import { CartProductItem } from "../molecules/CartProductItem";
import { Loader } from "../atoms/Loader";

interface CartProductListProps extends HTMLAttributes<HTMLUListElement> {
	cart: CartFragment;
}

export async function CartProductList({
	cart,
	...props
}: CartProductListProps) {
	return (
		<Suspense fallback={<Loader />}>
			<ul
				role="list"
				className="divide-y divide-gray-200 border-b border-t border-gray-200"
				{...props}
			>
				{cart.orderItems.map(
					(orderItem) =>
						orderItem?.product && (
							<CartProductItem key={orderItem.id} orderItem={orderItem} />
						),
				)}
			</ul>
		</Suspense>
	);
}
