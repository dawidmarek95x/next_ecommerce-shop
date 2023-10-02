import { getCartByFromCookies } from "@/lib/services/cart";
import { CartModalOverlay } from "@/ui/atoms/CartModalOverlay";
import { CartProductList } from "@/ui/organisms/CartProductList";
import { formatMoney } from "@/utils/formatMoney";

export default async function ModalCartPage() {
	const cart = await getCartByFromCookies();

	return (
		<aside className="animation-fade-in fixed inset-0 z-20 backdrop-blur-md">
			<CartModalOverlay />
			<div className="animation-slide-from-right absolute bottom-0 right-0 top-0 flex h-full flex-col overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-1/3">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium text-slate-900">
							Shopping cart
						</h3>
						<a className="text-sm text-blue-500" href="/cart">
							(open full view)
						</a>
					</div>
					{cart?.orderItems && cart?.orderItems?.length > 0 ? (
						<div className="mt-8">
							<CartProductList isModal={true} cart={cart} />
						</div>
					) : (
						<p className="divide-y divide-gray-200 border-b border-t border-gray-200 py-4">
							No items in cart!
						</p>
					)}
				</div>
				<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
					<div className="flex justify-between text-base font-medium text-slate-900">
						<p>Total</p>
						<p className="small-caps">
							{formatMoney((cart?.total ?? 0) / 100)}
						</p>
					</div>
					<p className="mt-0.5 text-sm text-slate-500">
						Shipping and taxes will be calculated at the next step
					</p>
					<form className="mt-6">
						<button
							type="submit"
							className="w-full rounded border border-transparent bg-blue-500 px-6 py-3 font-medium text-slate-50 hover:bg-blue-600 disabled:bg-gray-300"
							disabled={(cart?.orderItems?.length ?? 0) <= 0}
						>
							Checkout
						</button>
					</form>
				</div>
			</div>
		</aside>
	);
}
