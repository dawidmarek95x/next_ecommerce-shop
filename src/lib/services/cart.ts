import {
	CartAddOrderItemDocument,
	CartCreateDocument,
	CartFragment,
	CartGetByIdDocument,
	CartUpdateByIdDocument,
	CartUpdateOrderItemByIdDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { cookies } from "next/headers";
import { executeGraphQL } from "../graphqlApi";

export async function getOrCreateCart(): Promise<CartFragment | null> {
	const existingCart = await getCartByFromCookies();

	if (existingCart) {
		return existingCart;
	}

	const { createOrder: newCart } = await createCart();

	if (newCart) {
		return newCart;
	}

	return null;
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
	return await executeGraphQL(CartCreateDocument, {}, { isMutation: true });
}

export async function addProductToCart(cart: CartFragment, productId: string) {
	const { product } = await executeGraphQL(ProductGetByIdDocument, {
		id: productId,
	});

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
			{ isMutation: true },
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
			},
		);
	}
}
