"use client";

import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, SelectHTMLAttributes, useCallback } from "react";

interface SortSelectoptions {
	value: string;
	label: string;
	testId?: string;
}

interface SortSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: SortSelectoptions[];
}

export default function SortSelect({ options, ...props }: SortSelectProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
		router.push(
			`${pathname}${
				evt.target.value && `?${createQueryString("orderBy", evt.target.value)}`
			}` as Route<string>,
		);
	};

	return (
		<select
			onChange={handleChange}
			{...props}
			value={searchParams.get("orderBy") ?? ""}
		>
			{options.map((option, idx) => (
				<option key={idx} value={option?.value} data-testid={option?.testId}>
					{option.label}
				</option>
			))}
		</select>
	);
}
