import { ProductItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/formatMoney";

interface ProductListItemDescriptionProps {
	product: ProductItemFragment;
}

export const ProductListItemDescription = ({
	product: { name, categories, price },
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
				{categories[0]?.name && (
					<p className="text-sm text-slate-500">{categories[0]?.name}</p>
				)}
			</div>
		</div>
	);
};
