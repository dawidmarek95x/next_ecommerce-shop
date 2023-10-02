import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: { sessionId?: string };
}) {
	if (!searchParams.sessionId) {
		redirect("/");
	}

	if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
		throw new Error("Missing NEXT_PUBLIC_STRIPE_SECRET_KEY");
	}

	const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(
		searchParams.sessionId,
	);

	if (!stripeCheckoutSession) {
		redirect("/");
	} else {
		cookies().set("cartId", "");
	}

	return (
		<div className="rounded-lg bg-blue-200 p-4">
			<h1 className="mb-2 text-xl font-bold">Payment status</h1>
			<p className="mb-2 text-base">
				<span className="font-bold">ID:</span> {stripeCheckoutSession.id}
			</p>
			<p className="mb-2 text-base">
				<span className="font-bold">Total amount:</span>{" "}
				{stripeCheckoutSession.amount_total}
			</p>
			<p>
				<span className="font-bold">Status:</span>{" "}
				{stripeCheckoutSession.payment_status}
			</p>
		</div>
	);
}
