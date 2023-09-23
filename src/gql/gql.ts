/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
	"query CategoriesGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  categories(first: $limit, skip: $offset, where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}":
		types.CategoriesGetBySlugDocument,
	"query CategoriesGetlist($limit: Int, $offset: Int) {\n  categories(first: $limit, skip: $offset) {\n    id\n    name\n    slug\n    description\n  }\n}":
		types.CategoriesGetlistDocument,
	"query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    slug\n    description\n    price\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n  }\n}":
		types.ProductGetByIdDocument,
	"query ProductsGetByCategorySlug($limit: Int, $offset: Int, $categorySlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    id\n    name\n    slug\n    description\n    price\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}":
		types.ProductsGetByCategorySlugDocument,
	"query ProductsGetList($limit: Int, $offset: Int) {\n  products(first: $limit, skip: $offset) {\n    id\n    name\n    slug\n    description\n    price\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}":
		types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "query CategoriesGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  categories(first: $limit, skip: $offset, where: {slug: $slug}) {\n    id\n    name\n    slug\n    description\n  }\n}",
): typeof import("./graphql").CategoriesGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "query CategoriesGetlist($limit: Int, $offset: Int) {\n  categories(first: $limit, skip: $offset) {\n    id\n    name\n    slug\n    description\n  }\n}",
): typeof import("./graphql").CategoriesGetlistDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    slug\n    description\n    price\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n  }\n}",
): typeof import("./graphql").ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "query ProductsGetByCategorySlug($limit: Int, $offset: Int, $categorySlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    id\n    name\n    slug\n    description\n    price\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}",
): typeof import("./graphql").ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "query ProductsGetList($limit: Int, $offset: Int) {\n  products(first: $limit, skip: $offset) {\n    id\n    name\n    slug\n    description\n    price\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}",
): typeof import("./graphql").ProductsGetListDocument;

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}
