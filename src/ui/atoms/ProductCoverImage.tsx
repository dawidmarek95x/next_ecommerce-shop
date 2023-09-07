interface ProductCoverImageProps {
	src: string;
	alt: string;
}

export const ProductCoverImage = ({ src, alt }: ProductCoverImageProps) => {
	return (
		<div className="rounded-md border bg-slate-50 hover:bg-slate-100">
			<img
				src={src}
				alt={alt}
				width={256}
				height={256}
				className="w-full object-contain object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
