import { HTMLAttributes } from "react";
import { ProductColorSelectionItem } from "../molecules/ProductColorSelectionItem";

interface ProductColorSelectionListProps
	extends HTMLAttributes<HTMLUListElement> {
	colorVariants: string[];
}

export const ProductColorSelectionList = ({
	colorVariants,
	...props
}: ProductColorSelectionListProps) => {
	return (
		<ul {...props}>
			{colorVariants.map((colorVariant, idx) => (
				<ProductColorSelectionItem
					key={idx}
					className="mr-4 last:mr-0"
					colorVariant={colorVariant}
				/>
			))}
		</ul>
	);
};
