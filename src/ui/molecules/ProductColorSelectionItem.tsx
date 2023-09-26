import { HTMLAttributes } from "react";

interface ProductColorSelectionItemProps extends HTMLAttributes<HTMLLIElement> {
	colorVariant: {
		slug: string;
		color: string;
	};
}

export const ProductColorSelectionItem = ({
	colorVariant,
	...props
}: ProductColorSelectionItemProps) => {
	const borderColor = ["white"].includes(colorVariant.slug)
		? "#000000"
		: "#ffffff";

	return (
		<li {...props}>
			<div className="relative inline-block rounded-full border-2 p-1 transition duration-300 ease-in">
				<label
					htmlFor={`${colorVariant.slug}ColorVariant`}
					className="absolute left-0 top-0 h-full w-full rounded-full"
					style={{ background: colorVariant.color, borderColor: borderColor }}
				></label>
				<input
					id={`${colorVariant.slug}ColorVariant`}
					name="colorVariant"
					type="radio"
					className="relative block h-6 w-6 appearance-none rounded-full checked:z-[1] checked:border-2"
					style={{ background: colorVariant.color, borderColor: borderColor }}
					value={colorVariant.slug}
				/>
			</div>
		</li>
	);
};
