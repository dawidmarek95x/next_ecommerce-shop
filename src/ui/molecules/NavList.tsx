import { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import { getCategories } from "@/lib/services/categories";

export const NavList = async () => {
	const categories = await getCategories({});

	const navLinks = [
		{ href: "/", label: "Home", exact: true },
		{ href: "/products", label: "All", exact: false },
		...(categories?.data?.map((category) => ({
			href: `/categories/${category.slug}`,
			label: category.name,
			exact: false,
		})) ?? []),
	];

	const linkClassNames =
		"flex h-full w-full min-w-[3rem] items-center justify-center border-b-2  px-1 pt-1 text-center text-sm font-medium text-slate-500 hover:text-sky-700";

	const activeLinkClassNames = "border-sky-700";
	const inactiveClassNames = "border-transparent hover:border-gray-300";

	return (
		<ul className="flex h-16 max-w-full space-x-8 whitespace-nowrap px-4 lg:px-8">
			{navLinks.map((navLink, idx) => (
				<li key={idx}>
					<ActiveLink
						href={navLink.href as Route<string>}
						className={linkClassNames}
						activeClassName={activeLinkClassNames}
						inactiveClassName={inactiveClassNames}
						exact={navLink.exact}
					>
						{navLink.label}
					</ActiveLink>
				</li>
			))}
		</ul>
	);
};
