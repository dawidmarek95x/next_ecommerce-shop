import { CollectionItemFragment } from "@/gql/graphql";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { CollectionCoverImage } from "../atoms/CollectionCoverImage";

interface CollectionItemProps extends HTMLAttributes<HTMLLIElement> {
	collection: CollectionItemFragment;
}

export const CollectionItem = async ({
	collection,
	...props
}: CollectionItemProps) => {
	return (
		<li
			className={`group relative ${props.className && props.className}`}
			{...props}
		>
			<Link href={`/collections/${collection.slug}`}>
				<CollectionCoverImage
					src={collection.image.url}
					alt={collection.name}
				/>
				<h3 className="mt-2 font-bold text-slate-700">{collection.name}</h3>
			</Link>
		</li>
	);
};
