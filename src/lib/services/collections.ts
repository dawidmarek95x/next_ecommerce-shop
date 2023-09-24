import {
	CollectionsGetBySlugDocument,
	CollectionsGetListDocument,
} from "@/gql/graphql";
import { executeGraphQL } from "../graphqlApi";

interface GetCollectionsSearchParams {
	limit?: number;
	offset?: number;
}

interface GetCollectionBySlugSearchParams {
	slug: string;
}

export const getCollections = async ({
	limit,
	offset,
}: GetCollectionsSearchParams) => {
	const collectionsApiResponse = await executeGraphQL(
		CollectionsGetListDocument,
		{ limit, offset },
	);

	return {
		data: collectionsApiResponse.collections,
		totalResults: collectionsApiResponse.collectionsConnection.aggregate.count,
	};
};

export const getCollectionBySlug = async ({
	slug,
}: GetCollectionBySlugSearchParams) => {
	const collectionApiResponse = await executeGraphQL(
		CollectionsGetBySlugDocument,
		{ limit: 1, offset: 0, slug },
	);

	return collectionApiResponse?.collections?.[0];
};
