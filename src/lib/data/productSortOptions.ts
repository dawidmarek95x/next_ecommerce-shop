interface SortSelectoptions {
	value: string;
	label: string;
	testId?: string;
}

export const PRODUCT_SORT_OPTIONS: SortSelectoptions[] = [
	{
		value: "",
		label: "Default",
	},
	{
		value: "rating_ASC",
		label: "Rating (Low to High)",
		testId: "sort-by-rating",
	},
	{
		value: "rating_DESC",
		label: "Rating (High to Low)",
		testId: "sort-by-rating",
	},
	{
		value: "name_ASC",
		label: "Name (A-Z)",
	},
	{
		value: "name_DESC",
		label: "Name (Z-A)",
	},
	{
		value: "price_ASC",
		label: "Price (Low to High)",
		testId: "sort-by-price",
	},
	{
		value: "price_DESC",
		label: "Price (High to Low)",
		testId: "sort-by-price",
	},
];

export const AVAILABLE_SORT_OPTIONS = PRODUCT_SORT_OPTIONS.map(
	(option) => option.value,
);
