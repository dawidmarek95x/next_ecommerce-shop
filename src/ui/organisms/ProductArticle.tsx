import { formatMoney } from "@/utils/formatMoney";
import { ProductCoverImage } from "../atoms/ProductCoverImage";
import { ProductColorSelectionList } from "./ProductColorSelectionList";
import { CheckCheckIcon } from "lucide-react";
import { AddToCartButton } from "../atoms/AddToCartButton";
import { addProductToCart, getOrCreateCart } from "@/lib/services/cart";
import { revalidateTag } from "next/cache";
import { HTMLAttributes } from "react";
import { ProductItemFullFragment } from "@/gql/graphql";

interface ProductArticleProps extends HTMLAttributes<HTMLDivElement> {
	product: ProductItemFullFragment;
}

export async function ProductArticle({
	product,
	...props
}: ProductArticleProps) {
	async function addToCartAction(_formData: FormData) {
		"use server";
		const cart = await getOrCreateCart();

		if (cart) {
			await addProductToCart(cart, product.id);
		}

		revalidateTag("cart");
	}

	return (
		<article {...props}>
			<form action={addToCartAction} className="grid grid-cols-1 gap-4">
				{product.images[0] && (
					<ProductCoverImage
						src={product.images[0]?.url}
						alt={product.name}
						className="mx-auto mb-4 overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100 lg:w-1/3 xl:w-2/5"
					/>
				)}
				<div className="px-2 sm:px-6">
					<h1
						className="flex-auto text-3xl font-bold tracking-tight text-slate-900"
						role="heading"
					>
						{product.name}
					</h1>
					<div className="mt-4 flex items-center">
						<p className="font-base small-caps text-lg text-slate-800">
							{formatMoney(product.price / 100)}
						</p>
					</div>
					<div className="mt-4 space-y-6">
						<p className="text-justify font-sans text-base text-slate-500">
							{product.description}
						</p>
					</div>
					<div className="mt-4">
						<ProductColorSelectionList
							className="flex"
							colorVariants={product?.colorVariants}
						/>
					</div>
					<div className="mt-6 flex items-center">
						<CheckCheckIcon
							className="h-5 w-5 flex-shrink-0 text-blue-500"
							aria-hidden="true"
						/>
						<p className="ml-1 text-sm font-semibold text-slate-500">
							In stock
						</p>
					</div>
					<div className="mt-8">
						<AddToCartButton />
					</div>
				</div>
			</form>
		</article>
	);
}
