import clsx from "clsx";
import { HTMLAttributes } from "react";

interface ProductColorSelectionItemProps extends HTMLAttributes<HTMLLIElement> {
	colorVariant: string;
}

export const ProductColorSelectionItem = ({
	colorVariant,
	...props
}: ProductColorSelectionItemProps) => {
	const BORDER = {
		WHITE: "border-white",
		BLACK: "border-black",
	};

	const selectBackgroundStylesByColor = (colorName: string) => {
		switch (colorName) {
			case "beige":
				return "bg-[#dfcc65]";

			case "black":
				return "bg-black";

			case "gray":
				return "bg-gray-500";

			case "khaki":
				return "bg-[#608663]";

			case "multicolor":
				return "bg-gradient-multicolor";

			case "pink":
				return "bg-pink-500";

			case "purple":
				return "bg-purple-500";

			default:
				return "bg-black";
		}
	};

	const selectBorderStylesByColor = (colorName: string) => {
		return ["white"].includes(colorName) ? BORDER.BLACK : BORDER.WHITE;
	};

	const bgStyles = selectBackgroundStylesByColor(colorVariant);
	const borderStyles = selectBorderStylesByColor(colorVariant);

	return (
		<li {...props}>
			<div className="relative inline-block rounded-full border-2 p-1 transition duration-300 ease-in">
				<label
					htmlFor={`${colorVariant}ColorVariant`}
					className={clsx(
						"absolute left-0 top-0 h-full w-full rounded-full",
						bgStyles,
						borderStyles,
					)}
				></label>
				<input
					id={`${colorVariant}ColorVariant`}
					name="productColorVariant"
					type="radio"
					className={clsx(
						"relative block h-6 w-6 appearance-none rounded-full checked:z-[1] checked:border-2",
						bgStyles,
						borderStyles,
					)}
					value={colorVariant}
				/>
			</div>
		</li>
	);
};
