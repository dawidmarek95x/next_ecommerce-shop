import { TypedDocumentString } from "@/gql/graphql";

export const apiUrl = process.env.NEXT_PUBLIC_HIGH_PERFORMANCE_API_URL;

export const executeGraphQL = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
	options?: {
		isMutation?: boolean;
		next?: NextFetchRequestConfig;
		cache?: RequestCache;
	},
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
			Authorization: `Bearer ${
				options?.isMutation
					? process.env.NEXT_PUBLIC_MUTATION_TOKEN
					: process.env.NEXT_PUBLIC_QUERY_TOKEN
			}`,
		},
		next: options?.next,
		cache: options?.cache,
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors: undefined };

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (!graphqlResponse?.data) {
		console.log(graphqlResponse?.errors);
		throw TypeError(`GraphQL Error`, { cause: graphqlResponse.errors });
	}

	return graphqlResponse?.data;
};
