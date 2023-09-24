import { getCategories } from "@/lib/services/categories";
import { redirect } from "next/navigation";

export const generateStaticParams = async () => {
	const categories = await getCategories({});

	return categories?.data?.map((category) => ({
		categorySlug: category.slug,
	}));
};

export default async function CategorySlugPage({
	params,
}: {
	params: { categorySlug: string };
}) {
	const categories = await getCategories({});

	categories.data.map((category) => category.slug).includes(params.categorySlug)
		? redirect(`/categories/${params.categorySlug}/1`)
		: redirect("/");
}
