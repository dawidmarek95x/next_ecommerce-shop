import { CollectionList } from "./CollectionList";

export const CollectionArticle = () => {
	return (
		<article className="mx-auto py-8">
			<h2 className="sr-only">Our collections</h2>
			<CollectionList />
		</article>
	);
};
