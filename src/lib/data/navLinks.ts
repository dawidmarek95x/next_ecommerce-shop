export const MAIN_CATEGORIES = [
	{
		name: "T-Shirts",
		slug: "t-shirts",
	},
	{
		name: "Hoodies",
		slug: "hoodies",
	},
	{
		name: "Accessories",
		slug: "accessories",
	},
];

export const navLinks = [
	{ href: "/", label: "Home", exact: true },
	{ href: "/products", label: "All", exact: false },
	...MAIN_CATEGORIES.map((category) => ({
		href: `/categories/${category.slug}`,
		label: category.name,
		exact: false,
	})),
];
