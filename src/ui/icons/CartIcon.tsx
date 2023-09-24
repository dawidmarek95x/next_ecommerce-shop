import * as React from "react";
import { SVGProps } from "react";
export const CartIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		aria-hidden="true"
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18" />
		<path d="M16 10a4 4 0 0 1-8 0" />
	</svg>
);
