import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home | E-commerse shop",
	description:
		"Welcome to our online store, where you will find the largest selection of high-quality products available online. Our offer covers a wide range of product categories, meeting the diverse needs and preferences of our customers. Whether you are a fan of technology, fashion, cosmetics or home goods, we have something special for you.",
	openGraph: {
		title: "Home | E-commerse shop",
		description:
			"Welcome to our online store, where you will find the largest selection of high-quality products available online. Our offer covers a wide range of product categories, meeting the diverse needs and preferences of our customers. Whether you are a fan of technology, fashion, cosmetics or home goods, we have something special for you.",
	},
};

export default function Home() {
	return (
		<>
			<div>
				<h1 className="py-8 text-center text-5xl font-bold">Homepage</h1>
				<p className="mx-auto mb-14 max-w-3xl text-justify">
					Welcome to our online store, where you will find the largest selection
					of high-quality products available online. Our offer covers a wide
					range of product categories, meeting the diverse needs and preferences
					of our customers. Whether you are a fan of technology, fashion,
					cosmetics or home goods, we have something special for you.
				</p>
			</div>
		</>
	);
}
