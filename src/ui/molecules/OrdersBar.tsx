import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export async function OrdersBar() {
	return (
		<div className="ml-2 h-full lg:ml-4">
			<Link
				href="/orders"
				className="group flex h-full w-16 items-center justify-center border-b-2 border-transparent py-1 text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-sky-700"
			>
				<BadgeDollarSign className="h-6 w-6 flex-shrink-0 text-slate-500 group-hover:text-sky-700" />
			</Link>
		</div>
	);
}
