import * as React from "react";
import { SVGProps } from "react";
export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
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
		<circle cx={11} cy={11} r={8} />
		<path d="m21 21-4.3-4.3" />
	</svg>
);
