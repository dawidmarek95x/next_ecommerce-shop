import { formatMoney } from "@/utils/formatMoney";

interface ProductListItemDescriptionProps {
	product: {
		name: string;
		category: string;
		price: number;
	};
}

export const ProductListItemDescription = ({
	product: { name, category, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2">
			<div className="flex flex-row justify-between">
				<h3 className="text-sm font-semibold text-slate-700">{name}</h3>
				<p className="small-caps text-sm font-medium text-slate-900">
					{formatMoney(price / 100)}
				</p>
			</div>
			<div className="mt-1 flex flex-row justify-between">
				<p className="text-sm text-slate-500">{category}</p>
			</div>
		</div>
	);
};
