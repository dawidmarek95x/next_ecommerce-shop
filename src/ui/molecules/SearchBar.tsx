import { SearchInput } from "../atoms/SearchInput";
import { Search as SearchIcon } from "lucide-react";

interface SearchBarProps {
	id: string;
	name: string;
	label: string;
	isLabelVisible?: boolean;
	placeholder?: string;
}

export const SearchBar = ({
	id,
	name,
	label,
	isLabelVisible = false,
	placeholder,
}: SearchBarProps) => {
	return (
		<div className="w-full max-w-lg lg:max-w-xs">
			<label htmlFor={id} className={`${!isLabelVisible && "sr-only"}`}>
				{label}
			</label>
			<div className="relative">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<SearchIcon className="h-5 w-5 text-slate-300" />
				</div>
				<SearchInput
					id={id}
					className="w-full rounded-md border-0 bg-slate-50 py-2 pl-11 pr-4 text-sm text-slate-800 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
					name={name}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};
