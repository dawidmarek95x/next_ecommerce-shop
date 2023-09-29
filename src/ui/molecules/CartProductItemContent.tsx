import { formatMoney } from "@/utils/formatMoney";
import { HTMLAttributes } from "react";

interface CartProductItemContentProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	category: string;
	price: number;
}

export async function CartProductItemContent({
	name,
	category,
	price,
	...props
}: CartProductItemContentProps) {
	return (
		<div {...props}>
			<div className="pr-3">
				<h3 className="font-medium text-slate-700">{name}</h3>
				<p className="mt-1 text-sm text-slate-500">{category}</p>
			</div>
			<p className="small-caps py-2 font-semibold text-slate-900 sm:px-4 sm:py-4 sm:text-right">
				{formatMoney(price / 100)}
			</p>
		</div>
	);
}
