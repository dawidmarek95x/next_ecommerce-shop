import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCartByFromCookies } from "@/lib/services/cart";

export async function CartBar() {
	const cart = await getCartByFromCookies();

	const totalQuantity =
		cart?.orderItems.reduce(
			(total, orderitem) => total + orderitem.quantity,
			0,
		) ?? 0;

	return (
		<div className="ml-auto h-full lg:ml-4">
			<Link
				href="/cart"
				className="group flex h-full w-16 items-center justify-center border-b-2 border-transparent py-1 text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-sky-700"
			>
				<ShoppingBag className="h-6 w-6 flex-shrink-0 text-slate-500 group-hover:text-sky-700" />
				<div className="inline-block">
					<span className="ml-2 text-sm font-medium ">{totalQuantity}</span>
				</div>
			</Link>
		</div>
	);
}
