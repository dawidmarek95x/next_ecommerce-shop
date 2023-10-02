import { getProductById } from "@/lib/services/products";
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "E-commerce shop";
export const size = {
	width: 630,
	height: 630,
};

export const contentType = "image/png";

export default async function SingleProductOpenGraphImage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params?.productId);

	return new ImageResponse(
		(
			<div tw="w-full h-full flex items-center justify-center bg-black">
				<img
					width={size.width}
					height={size.height}
					src={product?.images?.[0]?.url}
					alt={product?.name}
				/>
			</div>
		),
	);
}
