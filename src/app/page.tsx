import { Metadata } from "next";

const HOMEPAGE_DESCRIPTIONS = [
	"Our store is a fashion mecca, a place where you will find everything you need to express your personality and feel fashionable regardless of the occasion. Regardless of whether you are a fan of casual style or prefer more sophisticated and original combinations, we have something special for you.",
	"Our mission is to provide you with the best quality products, regardless of whether you are looking for something for everyday use, for a special occasion, or maybe you just want to complement your collection. We take care of every detail - from design to the quality of materials - so that you can enjoy the fashion that inspires you.",
	"Shopping in our store is a simple and convenient process. We deliver products quickly and safely, and our helpful customer service is always ready to offer advice and answer your questions.",
];

export const metadata: Metadata = {
	title: "Home | E-commerse shop",
	description: HOMEPAGE_DESCRIPTIONS.join(", "),
	openGraph: {
		title: "Home | E-commerse shop",
		description: HOMEPAGE_DESCRIPTIONS.join(", "),
	},
};

export default function Home() {
	return (
		<>
			<div>
				<h1 className="py-8 text-center text-5xl font-bold">Homepage</h1>
				{HOMEPAGE_DESCRIPTIONS.map((text) => (
					<p className="mx-auto mb-3 max-w-3xl text-justify last:mb-14">
						{text}
					</p>
				))}
			</div>
		</>
	);
}
