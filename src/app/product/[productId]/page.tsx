import { type Metadata } from "next";
import { getProductById } from "@/lib/services/products";
import { notFound } from "next/navigation";
import { Loader } from "@/ui/atoms/Loader";
import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { Suspense } from "react";
import { ProductArticle } from "@/ui/organisms/ProductArticle";
import { ProductReviews } from "@/ui/organisms/ProductReviews";

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

	return (
		<div className="sm:py-18 mx-auto flex w-full max-w-2xl flex-grow flex-col px-8 py-12 sm:px-6 lg:max-w-7xl">
			<ProductArticle product={product} />
			<aside className="bg-white" data-testid="related-products">
				<div className="py-8">
					<h2 className="py-8 text-xl font-semibold leading-7">
						Similar Products
					</h2>

					<Suspense fallback={<Loader />}>
						<SuggestedProductsList currentProduct={product} />
					</Suspense>
				</div>
			</aside>
			<ProductReviews product={product} className="bg-white" />
		</div>
	);
}
