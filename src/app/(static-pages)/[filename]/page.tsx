import { notFound } from "next/navigation";
import { ComponentType } from "react";

export default async function FilenamePage({
	params,
}: {
	params: { filename: string };
}) {
	const MdxContent = await import(`./${params.filename}.mdx`).then(
		(module: { default: ComponentType }) => module.default,
		() => notFound(),
	);

	return (
		<article className="prose prose-lg mx-auto my-8 text-justify">
			<MdxContent />
		</article>
	);
}
