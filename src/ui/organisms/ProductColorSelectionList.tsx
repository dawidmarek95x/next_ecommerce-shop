import { HTMLAttributes } from "react";
import { ProductColorSelectionItem } from "../molecules/ProductColorSelectionItem";
import { ProductColorVariantsFragment } from "@/gql/graphql";

interface ProductColorSelectionListProps
	extends HTMLAttributes<HTMLUListElement>,
		ProductColorVariantsFragment {}

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
