import { ProductList } from "@ui/organisms/ProductList";
import { ProductItemType } from "@ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "Accessories",
		name: "Super super mug",
		price: 1499,
		coverImage: {
			src: "/images/product_1.png",
			alt: "Super super mug",
		},
	},
	{
		id: "2",
		category: "T-Shirt",
		name: "Indie Sunset T-Shirt",
		price: 4599,
		coverImage: {
			src: "/images/product_2.png",
			alt: "Indie Sunset T-Shirt",
		},
	},
	{
		id: "3",
		category: "Hoodies",
		name: "Gradient Hoodie",
		price: 9999,
		coverImage: {
			src: "/images/product_3.png",
			alt: "Gradient Hoodie",
		},
	},
	{
		id: "4",
		category: "Accessories",
		name: "Verde Chic Backpack",
		price: 15999,
		coverImage: {
			src: "/images/product_4.png",
			alt: "Verde Chic Backpack",
		},
	},
];

export default function ProductsPage() {
	return (
		<main>
			<section className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 sm:px-6 lg:max-w-7xl">
				<ProductList products={products} />
			</section>
		</main>
	);
}
