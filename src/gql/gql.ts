/* eslint-disable */
import * as types from './graphql';



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
    "query CategoriesGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  categories(first: $limit, skip: $offset, where: {slug: $slug}) {\n    ...CategoryItem\n  }\n}": types.CategoriesGetBySlugDocument,
    "query CategoriesGetlist($limit: Int, $offset: Int) {\n  categories(first: $limit, skip: $offset) {\n    ...CategoryItem\n  }\n  categoriesConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.CategoriesGetlistDocument,
    "query CollectionsGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  collections(first: $limit, skip: $offset, where: {slug: $slug}) {\n    ...CollectionItem\n  }\n}": types.CollectionsGetBySlugDocument,
    "query CollectionsGetList($limit: Int, $offset: Int) {\n  collections(first: $limit, skip: $offset) {\n    ...CollectionItem\n  }\n  collectionsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetByCategorySlug($limit: Int, $offset: Int, $categorySlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    ...ProductItem\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($limit: Int, $offset: Int, $collectionSlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {collections_some: {slug: $collectionSlug}}\n  ) {\n    ...ProductItem\n    collections(first: 1) {\n      name\n      slug\n    }\n  }\n  productsConnection(where: {collections_some: {slug: $collectionSlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetList($limit: Int, $offset: Int) {\n  products(first: $limit, skip: $offset) {\n    ...ProductItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "fragment CategoryItem on Category {\n  id\n  name\n  slug\n  description\n}": types.CategoryItemFragmentDoc,
    "fragment CollectionItem on Collection {\n  id\n  name\n  slug\n  description\n  image {\n    url\n  }\n}": types.CollectionItemFragmentDoc,
    "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  price\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n}": types.ProductItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  categories(first: $limit, skip: $offset, where: {slug: $slug}) {\n    ...CategoryItem\n  }\n}"): typeof import('./graphql').CategoriesGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetlist($limit: Int, $offset: Int) {\n  categories(first: $limit, skip: $offset) {\n    ...CategoryItem\n  }\n  categoriesConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetlistDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  collections(first: $limit, skip: $offset, where: {slug: $slug}) {\n    ...CollectionItem\n  }\n}"): typeof import('./graphql').CollectionsGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList($limit: Int, $offset: Int) {\n  collections(first: $limit, skip: $offset) {\n    ...CollectionItem\n  }\n  collectionsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($limit: Int, $offset: Int, $categorySlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    ...ProductItem\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($limit: Int, $offset: Int, $collectionSlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {collections_some: {slug: $collectionSlug}}\n  ) {\n    ...ProductItem\n    collections(first: 1) {\n      name\n      slug\n    }\n  }\n  productsConnection(where: {collections_some: {slug: $collectionSlug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($limit: Int, $offset: Int) {\n  products(first: $limit, skip: $offset) {\n    ...ProductItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryItem on Category {\n  id\n  name\n  slug\n  description\n}"): typeof import('./graphql').CategoryItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionItem on Collection {\n  id\n  name\n  slug\n  description\n  image {\n    url\n  }\n}"): typeof import('./graphql').CollectionItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  price\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n}"): typeof import('./graphql').ProductItemFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
