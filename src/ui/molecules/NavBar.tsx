import { NavList } from "./NavList";

export const NavBar = () => {
	return (
		<nav
			className="scrolling-touch scroll-shadows -mx-2 flex overflow-x-scroll lg:mx-0 lg:h-16 lg:overflow-x-auto"
			role="navigation"
			aria-label="Main"
		>
			<NavList />
		</nav>
	);
};
