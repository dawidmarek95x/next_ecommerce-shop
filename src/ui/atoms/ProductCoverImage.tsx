import NextImage from "next/image";
import { HTMLAttributes } from "react";

interface ProductCoverImageProps extends HTMLAttributes<HTMLDivElement> {
	src: string;
	alt: string;
}

export const ProductCoverImage = ({
	src,
	alt,
	...props
}: ProductCoverImageProps) => {
	return (
		<div {...props}>
			<NextImage
				src={src}
				alt={alt}
				width={320}
				height={320}
				className="aspect-square h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
