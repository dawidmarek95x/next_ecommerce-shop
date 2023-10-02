import {
	CartAddOrderItemDocument,
	CartCreateDocument,
	CartFragment,
	CartGetByIdDocument,
	CartUpdateByIdDocument,
	CartUpdateOrderItemByIdDocument,
} from "@/gql/graphql";
import { cookies } from "next/headers";
import { executeGraphQL } from "../graphqlApi";
import { getProductById } from "./products";

export async function getOrCreateCart(): Promise<CartFragment | undefined> {
	let cart: CartFragment | undefined = undefined;
	cart = await getCartByFromCookies();

	if (!cart) {
		const newCart = await createCart();
		cart = newCart;
	}

	return cart;
}

export async function getCartByFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphQL(
			CartGetByIdDocument,
			{
				id: cartId,
			},
			{
				cache: "no-cache",
				next: {
					tags: ["cart"],
				},
			},
		);

		if (cart) {
			return cart;
		}
	}
}

export async function createCart() {
	const { createOrder: cart } = await executeGraphQL(
		CartCreateDocument,
		{},
		{
			isMutation: true,
			cache: "no-cache",
		},
	);

	if (cart) {
		cookies().set("cartId", cart.id, {
			httpOnly: true,
			sameSite: "lax",
		});

		return cart;
	}
}

export async function addProductToCart(cart: CartFragment, productId: string) {
	const product = await getProductById(productId);

	if (!product) {
		return;
	}

	const orderItem = cart.orderItems.find(
		(item) => item.product?.id === productId,
	);

	let isOrderItemAdded: boolean = false;
	if (orderItem) {
		const { updateOrderItem } = await executeGraphQL(
			CartUpdateOrderItemByIdDocument,
			{
				id: orderItem.id,
				quantity: orderItem.quantity + 1,
				total: orderItem.total + product.price,
			},
			{
				isMutation: true,
				cache: "no-cache",
			},
		);

		if (updateOrderItem) {
			isOrderItemAdded = true;
		}
	} else {
		const { createOrderItem } = await executeGraphQL(
			CartAddOrderItemDocument,
			{
				orderId: cart.id,
				productId,
				quantity: 1,
				total: product.price,
			},
			{
				isMutation: true,
				cache: "no-cache",
			},
		);

		if (createOrderItem) {
			isOrderItemAdded = true;
		}
	}

	if (isOrderItemAdded) {
		await executeGraphQL(
			CartUpdateByIdDocument,
			{
				id: cart.id,
				total: cart.total + product.price,
			},
			{
				isMutation: true,
				cache: "no-cache",
			},
		);
	}
}
