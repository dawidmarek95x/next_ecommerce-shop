import { CartFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/formatMoney";
import { HTMLAttributes } from "react";
import Stripe from "stripe";
import { OrderedProductTile } from "../atoms/OrderedProductTile";

interface OrderItemProps extends HTMLAttributes<HTMLLIElement> {
	data: CartFragment;
}

export async function OrderItem({ data, ...props }: OrderItemProps) {
	if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
		throw new Error("Missing NEXT_PUBLIC_STRIPE_SECRET_KEY");
	}

	const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(
		data.stripeCheckoutId ?? "",
	);

	if (!stripeCheckoutSession) {
		return <li>No order details available.</li>;
	}

	return (
		<li {...props}>
			<div className="relative flex flex-1 flex-col justify-between px-4 sm:text-left">
				<h3 className="mb-2 break-all">
					<span className="font-bold">Order No: </span>
					{data.id}
				</h3>
				<p className="mb-2">
					<span className="font-bold">Total amount: </span>
					{formatMoney(data.total / 100)}
				</p>
				<p className="mb-2">
					<span className="font-bold">Status: </span>
					{stripeCheckoutSession.status}{" "}
					{stripeCheckoutSession.status === "open" && (
						<a
							href={stripeCheckoutSession.url ?? ""}
							className="ms-1 rounded bg-black px-2 text-white transition-colors hover:bg-blue-800"
						>
							view
						</a>
					)}
				</p>
				<p className="mb-2">
					<span className="font-bold">Payment status: </span>
					{stripeCheckoutSession.payment_status}
				</p>

				<div>
					<p className="mb-1 font-bold">Items:</p>
					<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
						{data.orderItems.map((orderItem) => (
							<li key={orderItem.id}>
								<OrderedProductTile orderItem={orderItem} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</li>
	);
}
