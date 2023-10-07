import { CartFragment } from "@/gql/graphql";
import { HTMLAttributes } from "react";
import { OrderItem } from "../molecules/OrderItem";

interface OrderListProps extends HTMLAttributes<HTMLUListElement> {
	orders: CartFragment[];
}

export async function OrderList({ orders, ...props }: OrderListProps) {
	return (
		<ul {...props}>
			{orders.map((order) => (
				<OrderItem
					key={order.id}
					className="rounded-lg border border-gray-300 bg-blue-100 py-4 hover:shadow-lg"
					data={order}
				/>
			))}
		</ul>
	);
}
