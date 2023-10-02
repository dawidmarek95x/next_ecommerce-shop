/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<Response> {
	const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;
	const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

	if (!webhookSecret) {
		return new Response(
			"Missing webhook secret: NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET",
			{ status: 500 },
		);
	}

	if (!stripeSecretKey) {
		return new Response(
			"Missing Stripe secret key: NEXT_PUBLIC_STRIPE_SECRET_KEY",
			{ status: 500 },
		);
	}

	const stripe = new Stripe(stripeSecretKey, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");
	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		webhookSecret,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "checkout.session.completed": {
			console.dir(event, { depth: 999 });
			event.data.object.metadata?.cartId;
		}

		case "checkout.session.async_payment_succeeded": {
		}
		case "checkout.session.expired": {
		}
		case "checkout.session.async_payment_failed": {
		}
	}

	return new Response(null, { status: 204 });
}
