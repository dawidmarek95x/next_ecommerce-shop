import NextImage from "next/image";
import { HTMLAttributes } from "react";

interface CollectionItemProps extends HTMLAttributes<HTMLDivElement> {
	src: string;
	alt: string;
}

export const CollectionCoverImage = async ({
	src,
	alt,
	...props
}: CollectionItemProps) => {
	return (
		<div
			className={`sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white transition group-hover:scale-105 group-hover:opacity-75 sm:h-64 ${
				props.className && props.className
			}`}
			{...props}
		>
			<NextImage
				width={256}
				height={256}
				className="h-full w-full object-cover object-center text-transparent"
				fetchPriority="high"
				src={src}
				alt={alt}
			/>
		</div>
	);
};
