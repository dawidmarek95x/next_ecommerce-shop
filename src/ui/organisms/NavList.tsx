import { ActiveLink } from "../atoms/ActiveLink";

export const NavList = () => {
	const linkClassNames =
		"flex h-full w-full min-w-[3rem] items-center justify-center border-b-2  px-1 pt-1 text-center text-sm font-medium text-slate-500 hover:text-sky-700";

	const activeLinkClassNames = "border-sky-700";
	const inactiveClassNames = "border-transparent hover:border-gray-300";

	return (
		<ul className="flex h-16 max-w-full space-x-8 whitespace-nowrap lg:px-8">
			<li className="first:pl-4 last:pr-4 lg:px-0">
				<ActiveLink
					href="/"
					className={linkClassNames}
					activeClassName={activeLinkClassNames}
					inactiveClassName={inactiveClassNames}
				>
					Home
				</ActiveLink>
			</li>
			<li>
				<ActiveLink
					href="/products"
					exact={false}
					className={linkClassNames}
					activeClassName={activeLinkClassNames}
					inactiveClassName={inactiveClassNames}
				>
					All
				</ActiveLink>
			</li>
		</ul>
	);
};
