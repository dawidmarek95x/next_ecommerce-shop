import { getProducts } from "@/lib/services/products";
import { CollectionArticle } from "@/ui/organisms/CollectionArticle";
import { ProductList } from "@/ui/organisms/ProductList";
import { Metadata } from "next";

const HOMEPAGE_DESCRIPTIONS = [
	"Our store is a fashion mecca, a place where you will find everything you need to express your personality and feel fashionable regardless of the occasion. Regardless of whether you are a fan of casual style or prefer more sophisticated and original combinations, we have something special for you.",
	"Our mission is to provide you with the best quality products, regardless of whether you are looking for something for everyday use, for a special occasion, or maybe you just want to complement your collection. We take care of every detail - from design to the quality of materials - so that you can enjoy the fashion that inspires you.",
];

export const metadata: Metadata = {
	title: "Home | E-commerse shop",
	description: HOMEPAGE_DESCRIPTIONS.join(", "),
	openGraph: {
		title: "Home | E-commerse shop",
		description: HOMEPAGE_DESCRIPTIONS.join(", "),
	},
};

export default async function Home() {
	const products = await getProducts({ limit: 4 });

	return (
		<>
			<div>
				<h1 className="py-8 text-center text-5xl font-bold">Homepage</h1>
				<div>
					{HOMEPAGE_DESCRIPTIONS.map((text, idx) => (
						<p
							key={idx}
							className="mx-auto mb-4 max-w-3xl px-8 text-justify last:mb-11 lg:max-w-4xl xl:max-w-5xl"
						>
							{text}
						</p>
					))}
				</div>
				<div className="bg-gray-100">
					<div className="mx-auto max-w-7xl px-8">
						<CollectionArticle />
					</div>
				</div>
				<article className="sm:py-18 mx-auto max-w-2xl px-8 py-12 sm:px-6 lg:max-w-7xl">
					<ProductList products={products?.data} />
				</article>
			</div>
		</>
	);
}
