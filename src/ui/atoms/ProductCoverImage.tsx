import NextImage from "next/image";

interface ProductCoverImageProps {
	src: string;
	alt: string;
}

export const ProductCoverImage = ({ src, alt }: ProductCoverImageProps) => {
	return (
		<div className="hover:bg-slate-2=300 rounded-md border bg-slate-100">
			<NextImage
				src={src}
				alt={alt}
				width={320}
				height={320}
				className="w-full object-contain object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
