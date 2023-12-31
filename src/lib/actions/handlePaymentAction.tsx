import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getCartByFromCookies } from "../services/cart";
import { currentUser } from "@clerk/nextjs";
import { CartUpdateByIdDocument } from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const USD_TO_PLN_RATE = 4.4;

export async function handleStripePaymentAction(formData: FormData) {
	"use server";

	if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
		throw new Error("Missing NEXT_PUBLIC_STRIPE_SECRET_KEY");
	}

	const cart = await getCartByFromCookies();
	if (!cart) {
		return;
	}

	const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik", "p24"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart?.orderItems.map((item) => {
			const productPriceToPln = +(
				(item.product?.price ?? 0) * USD_TO_PLN_RATE
			).toFixed(0);

			return {
				price_data: {
					currency: "pln",
					product_data: {
						name: item.product?.name ?? "",
						images: [item.product?.images?.[0]?.url ?? ""],
					},
					unit_amount: productPriceToPln,
				},
				quantity: item.quantity,
			};
		}),
		mode: "payment",
		success_url:
			"https://next-ecommerce-shop.vercel.app/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "https://next-ecommerce-shop.vercel.app/cart",
		// cancel_url: "https://next-ecommerce-shop.vercel.app/cart/cancel",
	});

	const user = await currentUser();
	const userId = user?.id;
	const userEmail = user?.emailAddresses[0]?.emailAddress;
	let email = formData.get("email")?.toString();

	if (userEmail) {
		email = userEmail;
	}

	await executeGraphQL(
		CartUpdateByIdDocument,
		{
			id: cart.id,
			userId,
			email,
			stripeCheckoutId: checkoutSession.id,
		},
		{
			isMutation: true,
			cache: "no-cache",
		},
	);

	if (checkoutSession.url) {
		cookies().delete("cartId");
		revalidateTag("cart");
		redirect(checkoutSession.url);
	}
}
