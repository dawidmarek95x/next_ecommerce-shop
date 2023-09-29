import { SearchBar } from "../molecules/SearchBar";
import { NavBar } from "../molecules/NavBar";
import { CartBar } from "../molecules/CartBar";

export const Header = () => {
	return (
		<header className="sticky top-0 z-20 border-b bg-white bg-opacity-60 backdrop-blur-lg">
			<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
				<div className="flex flex-col justify-between gap-y-4 pb-4 lg:flex-row lg:items-center lg:pb-0">
					<NavBar />
					<div className="flex h-full flex-1 items-center px-2 lg:ml-6 lg:h-16 lg:justify-end">
						<SearchBar
							id="search"
							name="search"
							label="Search"
							placeholder="Search"
						/>
						<CartBar />
						<div className="ml-2 flex h-full w-14 items-center justify-center border-b-2 border-transparent text-center text-sm font-medium text-slate-500 hover:border-gray-300 hover:text-sky-700">
							<button>Sign In</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
