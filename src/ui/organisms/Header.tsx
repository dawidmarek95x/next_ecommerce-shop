import { NavBar } from "./NavBar";

export const Header = () => {
	return (
		<header className="sticky top-0 z-20 border-b bg-white bg-opacity-60 backdrop-blur-lg">
			<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
				<div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center lg:pb-0">
					<NavBar />
				</div>
			</div>
		</header>
	);
};
