"use client";

import { ButtonHTMLAttributes } from "react";

interface ProductQuantityActionButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	handleAction: () => Promise<void>;
}

export const ProductQuantityActionButton = ({
	handleAction,
	...props
}: ProductQuantityActionButtonProps) => {
	return (
		<button type="submit" formAction={handleAction} {...props}>
			{props.children}
		</button>
	);
};
