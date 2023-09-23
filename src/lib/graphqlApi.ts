import { TypedDocumentString } from "@/gql/graphql";
import { apiUrl } from "./endpoints";

export const executeGraphQL = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	if (!apiUrl) {
		throw TypeError("API url is not defined");
	}

	const res = await fetch(apiUrl, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-cache",
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors: undefined };

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (!graphqlResponse?.data) {
		throw TypeError(`GraphQL Error`, { cause: graphqlResponse.errors });
	}

	return graphqlResponse?.data;
};
