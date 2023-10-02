import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "E-commerce shop";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function RootOpenGraphImage() {
	return new ImageResponse(
		(
			<div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-8xl"
				style={{
					background: `
      linear-gradient(
        135deg,
        rgb(6,172,214) 0%,
        rgb(0,0,0) 30%,
        rgb(0,0,0) 70%,
        rgb(6,172,214) 100%
      )`,
				}}
			>
				<p tw="font-sans m-0 pl-8 pb-8 text-[101px] leading-3">E-commerce</p>
				<p tw="font-serif m-0 p-0 font-bold">shop</p>
			</div>
		),
	);
}
