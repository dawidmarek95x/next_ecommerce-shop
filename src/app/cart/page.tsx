import { getCartByFromCookies } from "@/lib/services/cart";
import { CartProductList } from "@/ui/organisms/CartProductList";
import { formatMoney } from "@/utils/formatMoney";
import Link from "next/link";
import { handleStripePaymentAction } from "@/lib/actions/handlePaymentAction";
import { currentUser } from "@clerk/nextjs";

export default async function CartPage() {
	const cart = await getCartByFromCookies();
	const user = await currentUser();
	const userId = user?.id;

	return (
		<section className="mx-auto max-w-7xl p-8">
			<h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900">
				Shopping Cart
			</h1>

			<form>
				<div>
					<h2 className="sr-only">Products in your shopping cart</h2>
					{cart?.orderItems && cart?.orderItems?.length > 0 ? (
						<CartProductList cart={cart} isModal={false} />
					) : (
						<p className="divide-y divide-gray-200 border-b border-t border-gray-200 py-4">
							No items in cart!
						</p>
					)}
				</div>
			</form>
			<div className="mt-5">
				<div className="rounded-lg bg-gray-50 p-4">
					<h2 className="sr-only">Order summary</h2>
					<div className="text-sm">
						<div className="flex items-center justify-between py-4">
							<div>
								<p className="text-slate-900">Total order</p>
								<p className="mt-1 text-sm text-slate-500">
									Shipping and taxes will be calculated at the next step
								</p>
							</div>
							<p className="small-caps ml-1 text-base font-semibold text-slate-900">
								{formatMoney((cart?.total ?? 0) / 100)}
							</p>
						</div>
					</div>
				</div>
				<form action={handleStripePaymentAction}>
					<div className="mt-5 flex justify-end">
						{!userId && (
							<label className="me-2 w-1/2 md:w-1/3">
								<span className="sr-only">E-mail</span>
								<input
									className="block w-full rounded-md border border-gray-300 p-3 text-sm font-light shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
									name="email"
									placeholder="Enter e-mail"
									disabled={(cart?.orderItems?.length ?? 0) <= 0}
									required
								/>
							</label>
						)}

						<button
							type="submit"
							className="w-1/2 rounded border border-transparent bg-blue-600 px-6 py-2 font-medium text-slate-50 hover:bg-blue-500 disabled:bg-gray-300 md:w-1/3"
							disabled={(cart?.orderItems?.length ?? 0) <= 0}
						>
							Checkout
						</button>
					</div>
				</form>
			</div>

			<div className="mt-5 text-center ">
				<Link
					className="text-sm font-medium text-blue-600 hover:text-blue-500"
					href="/products/1"
				>
					Continue Shopping
				</Link>
			</div>
		</section>
	);
}
