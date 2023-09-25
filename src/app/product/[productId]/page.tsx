import { getProductById } from "@/lib/services/products";
import { Loader } from "@/ui/atoms/Loader";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductColorSelectionList } from "@/ui/organisms/ProductColorSelectionList";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { formatMoney } from "@/utils/formatMoney";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	return {
		title: `${product?.name ?? "Product"} | E-commerse shop`,
		description: product?.description ?? "",
		openGraph: {
			title: `${product?.name ?? ""} | E-commerse shop`,
			description: product?.description ?? "",
			images: [
				{
					url: product?.images[0]?.url ?? "",
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
	const product = await getProductById(params?.productId);

	if (!product) {
		notFound();
	}

	const colorVariants = product?.colorVariants.map(
		(colorVariant) => colorVariant.color,
	);

	return (
		<div className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 sm:px-6 lg:max-w-7xl">
			<article>
				<div className="grid grid-cols-1 gap-4">
					{product.images[0] && (
						<ProductCoverImage
							src={product.images[0]?.url}
							alt={product.name}
							className="mx-auto mb-4 overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100 lg:w-1/3 xl:w-2/5"
						/>
					)}
					<div className="px-2 sm:px-6">
						<h1
							className="flex-auto text-3xl font-bold tracking-tight text-slate-900"
							role="heading"
						>
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
						<div className="mt-4">
							<ProductColorSelectionList
								className="flex"
								colorVariants={colorVariants}
							/>
						</div>
					</div>
				</div>
			</article>
			<aside className="bg-white" data-testid="related-products">
				<div className="pt-8">
					<h2 className="py-8 text-xl font-semibold leading-7">
						Similar Products
					</h2>

					<Suspense fallback={<Loader />}>
						<SuggestedProductsList currentProduct={product} />
					</Suspense>
				</div>
			</aside>
		</div>
	);
}
