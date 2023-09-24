import Link from "next/link";
import { CartIcon } from "../icons/CartIcon";

export const CartBar = () => {
	return (
		<div className="ml-auto h-full lg:ml-4">
			<Link
				href="/"
				className="flex h-full w-16 items-center justify-center border-b-2 border-transparent px-2 text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-slate-700"
			>
				<CartIcon className="h-6 w-6 flex-shrink-0" />
				<div className="inline-block">
					<span className="ml-2 text-sm font-medium ">0</span>
				</div>
			</Link>
		</div>
	);
};
