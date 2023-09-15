interface ProductCoverImageProps {
	src: string;
	alt: string;
}

export const ProductCoverImage = ({ src, alt }: ProductCoverImageProps) => {
	return (
		<div className="aspect-square rounded-md border bg-slate-50 hover:bg-slate-100">
			<img
				src={src}
				alt={alt}
				loading="lazy"
				decoding="async"
				className="w-100 mx-auto aspect-square object-contain object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
