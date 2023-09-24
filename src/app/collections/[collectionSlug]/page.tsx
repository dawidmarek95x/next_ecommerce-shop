import { getCollections } from "@/lib/services/collections";
import { redirect } from "next/navigation";

export const generateStaticParams = async () => {
	const collections = await getCollections({});

	return collections?.data?.map((collection) => ({
		collectionSlug: collection.slug,
	}));
};

export default async function CollectionSlugPage({
	params,
}: {
	params: { collectionSlug: string };
}) {
	const collections = await getCollections({});

	collections.data
		.map((collection) => collection.slug)
		.includes(params.collectionSlug)
		? redirect(`/collections/${params?.collectionSlug}/1`)
		: redirect("/");
}
