import { getOrdersByUserId } from "@/lib/services/cart";
import { OrderList } from "@/ui/organisms/OrderList";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const userId = user?.id;

	const orders = await getOrdersByUserId(userId);

	return (
		<div className="mx-auto max-w-2xl px-8 py-3 sm:px-6 md:max-w-5xl lg:max-w-7xl">
			<h2 className="py-3 text-3xl font-bold">Your orders</h2>
			{orders?.data && orders.data.length > 0 ? (
				<OrderList className="grid gap-6 lg:grid-cols-2" orders={orders.data} />
			) : (
				<p className="divide-y divide-gray-300 border-b border-t border-gray-300 px-4 py-4">
					You haven't submitted any orders yet.
				</p>
			)}
		</div>
	);
}
