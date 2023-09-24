import { getCollections } from "@/lib/services/collections";
import { CollectionItem } from "../molecules/CollectionItem";

export const CollectionList = async () => {
	const collections = await getCollections({});

	return (
		<ul className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
			{collections?.data.map((collection) => (
				<CollectionItem key={collection.id} collection={collection} />
			))}
		</ul>
	);
};
