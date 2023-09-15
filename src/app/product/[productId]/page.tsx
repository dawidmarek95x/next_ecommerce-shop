import { getProductById } from "@/lib/services/products";
import { Loader } from "@/ui/atoms/Loader";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { formatMoney } from "@/utils/formatMoney";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	return {
		title: `${product.name} | E-commerse shop`,
		description: product.description,
		openGraph: {
			title: `${product.name} | E-commerse shop`,
			description: product.description,
			images: [
				{
					url: product.coverImage.src,
				},
			],
		},
	};
};

export default async function SingleProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);

	return (
		<>
			<article>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<ProductCoverImage
						src={product.coverImage.src}
						alt={product.coverImage.alt}
					/>
					<div className="px-6">
						<h1 className="flex-auto text-3xl font-bold tracking-tight text-slate-900">
							{product.name}
						</h1>
						<div className="mt-4 flex items-center">
							<p className="font-base small-caps text-lg text-slate-800">
								{formatMoney(product.price / 100)}
							</p>
						</div>
						<div className="mt-4 space-y-6">
							<p className="text-justify font-sans text-base text-slate-500">
								{product.description}
							</p>
						</div>
					</div>
				</div>
			</article>
			<aside className="bg-white">
				<div className="py-16">
					<h2 className="py-8 text-xl font-semibold leading-7">
						Similar Products
					</h2>

					<Suspense fallback={<Loader />}>
						<SuggestedProductsList currentProduct={product} />
					</Suspense>
				</div>
			</aside>
		</>
	);
}