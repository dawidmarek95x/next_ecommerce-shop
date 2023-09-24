"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, HTMLAttributes, useEffect, useState } from "react";

interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {
	id?: string;
	name: string;
	placeholder?: string;
}

export const SearchInput = ({
	id,
	name,
	placeholder,
	...props
}: SearchInputProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const [value, setValue] = useState(query ?? "");
	const debouncedValue = useDebounce(value);

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value);
	};

	useEffect(() => {
		if (!debouncedValue) {
			return;
		}
		router.push(`/search?query=${debouncedValue}`);
	}, [debouncedValue]);

	return (
		<input
			id={id}
			name={name}
			type="search"
			role="searchbox"
			placeholder={placeholder}
			onChange={handleChange}
			value={value}
			{...props}
		/>
	);
};
