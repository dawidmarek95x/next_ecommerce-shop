import { NavList } from "./NavList";

export const NavBar = () => {
	return (
		<nav className="scrolling-touch scroll-shadows -mx-2 flex lg:mx-0 lg:h-16 lg:overflow-x-auto">
			<NavList />
		</nav>
	);
};
