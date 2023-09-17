import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Products | E-commerse shop",
	description:
		"Welcome to our online store, where you will find the largest selection of high-quality products available online. Our offer covers a wide range of product categories, meeting the diverse needs and preferences of our customers. Whether you are a fan of technology, fashion, cosmetics or home goods, we have something special for you.",
	openGraph: {
		title: "Products | E-commerse shop",
		description:
			"Welcome to our online store, where you will find the largest selection of high-quality products available online. Our offer covers a wide range of product categories, meeting the diverse needs and preferences of our customers. Whether you are a fan of technology, fashion, cosmetics or home goods, we have something special for you.",
	},
};

export default async function ProductsPage() {
	redirect("/products/1");

	return <></>;
}
