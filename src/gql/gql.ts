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
    "mutation CartAddOrderItem($orderId: ID!, $productId: ID!, $quantity: Int!, $total: Int!) {\n  createOrderItem(\n    data: {order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}, quantity: $quantity, total: $total}\n  ) {\n    ...OrderSingleItem\n  }\n}": types.CartAddOrderItemDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "mutation CartDeleteOrderItemById($id: ID!) {\n  deleteOrderItem(where: {id: $id}) {\n    id\n    product {\n      name\n    }\n  }\n}": types.CartDeleteOrderItemByIdDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "mutation CartUpdateById($id: ID!, $userId: String, $email: String, $total: Int, $stripeCheckoutId: String) {\n  updateOrder(\n    data: {userId: $userId, email: $email, total: $total, stripeCheckoutId: $stripeCheckoutId}\n    where: {id: $id}\n  ) {\n    ...Cart\n  }\n}": types.CartUpdateByIdDocument,
    "mutation CartUpdateOrderItemById($id: ID, $quantity: Int!, $total: Int!) {\n  updateOrderItem(data: {quantity: $quantity, total: $total}, where: {id: $id}) {\n    ...OrderSingleItem\n  }\n}": types.CartUpdateOrderItemByIdDocument,
    "query CategoriesGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  categories(first: $limit, skip: $offset, where: {slug: $slug}) {\n    ...CategoryItem\n  }\n}": types.CategoriesGetBySlugDocument,
    "query CategoriesGetlist($limit: Int, $offset: Int) {\n  categories(first: $limit, skip: $offset) {\n    ...CategoryItem\n  }\n  categoriesConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.CategoriesGetlistDocument,
    "query CollectionsGetBySlug($limit: Int, $offset: Int, $slug: String!) {\n  collections(first: $limit, skip: $offset, where: {slug: $slug}) {\n    ...CollectionItem\n  }\n}": types.CollectionsGetBySlugDocument,
    "query CollectionsGetList($limit: Int, $offset: Int) {\n  collections(first: $limit, skip: $offset) {\n    ...CollectionItem\n  }\n  collectionsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}, orderBy: createdAt_DESC, stage: DRAFT) {\n    ...Cart\n  }\n  ordersConnection(where: {email: $email}, stage: DRAFT) {\n    aggregate {\n      count\n    }\n  }\n}": types.OrdersGetByEmailDocument,
    "query OrdersGetByUserId($userId: String!) {\n  orders(where: {userId: $userId}, orderBy: createdAt_DESC, stage: DRAFT) {\n    ...Cart\n  }\n  ordersConnection(where: {userId: $userId}, stage: DRAFT) {\n    aggregate {\n      count\n    }\n  }\n}": types.OrdersGetByUserIdDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n    ...ProductColorVariants\n    ...ProductSizeVariants\n    ...ProductReviews\n  }\n}": types.ProductGetByIdDocument,
    "mutation ProductReviewCreate($productId: ID!, $headline: String!, $content: String!, $rating: Int!, $name: String!, $email: String!) {\n  createReview(\n    data: {product: {connect: {id: $productId}}, headline: $headline, content: $content, rating: $rating, name: $name, email: $email}\n  ) {\n    ...ReviewItem\n  }\n}": types.ProductReviewCreateDocument,
    "query ProductsGetByCategorySlug($limit: Int, $offset: Int, $categorySlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    ...ProductItem\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($limit: Int, $offset: Int, $collectionSlug: String!) {\n  products(\n    first: $limit\n    skip: $offset\n    where: {collections_some: {slug: $collectionSlug}}\n  ) {\n    ...ProductItem\n    collections(first: 1) {\n      name\n      slug\n    }\n  }\n  productsConnection(where: {collections_some: {slug: $collectionSlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetBySearchedName($limit: Int, $offset: Int, $searchedName: String) {\n  products(first: $limit, skip: $offset, where: {name_contains: $searchedName}) {\n    ...ProductItem\n  }\n  productsConnection(where: {name_contains: $searchedName}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetBySearchedNameDocument,
    "query ProductsGetList($limit: Int, $offset: Int, $orderBy: ProductOrderByInput) {\n  products(first: $limit, skip: $offset, orderBy: $orderBy) {\n    ...ProductItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ReviewGetList($limit: Int, $offset: Int) {\n  reviews(first: $limit, skip: $offset) {\n    ...ReviewItem\n  }\n  reviewsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ReviewGetListDocument,
    "query ReviewGetListByProductId($limit: Int, $offset: Int, $productId: ID!) {\n  reviews(first: $limit, skip: $offset, where: {product: {id: $productId}}) {\n    ...ReviewItem\n  }\n  reviewsConnection(where: {product: {id: $productId}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ReviewGetListByProductIdDocument,
    "fragment Cart on Order {\n  id\n  userId\n  email\n  total\n  stripeCheckoutId\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n      categories {\n        name\n      }\n      images {\n        url\n      }\n    }\n  }\n  createdAt\n}": types.CartFragmentDoc,
    "fragment CategoryItem on Category {\n  id\n  name\n  slug\n  description\n}": types.CategoryItemFragmentDoc,
    "fragment CollectionItem on Collection {\n  id\n  name\n  slug\n  description\n  image {\n    url\n  }\n}": types.CollectionItemFragmentDoc,
    "fragment OrderSingleItem on OrderItem {\n  id\n  quantity\n  total\n  product {\n    id\n    name\n    price\n    categories {\n      name\n    }\n    images {\n      url\n    }\n  }\n}": types.OrderSingleItemFragmentDoc,
    "fragment ProductColorVariants on Product {\n  colorVariants {\n    slug\n    color\n  }\n}": types.ProductColorVariantsFragmentDoc,
    "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  price\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  reviews {\n    id\n    rating\n  }\n}": types.ProductItemFragmentDoc,
    "fragment ProductItemFull on Product {\n  ...ProductItem\n  ...ProductColorVariants\n  ...ProductSizeVariants\n  ...ProductReviews\n}": types.ProductItemFullFragmentDoc,
    "fragment ProductReviews on Product {\n  reviews {\n    headline\n    name\n    email\n    content\n    rating\n  }\n}": types.ProductReviewsFragmentDoc,
    "fragment ProductSizeVariants on Product {\n  sizeVariants {\n    size\n  }\n}": types.ProductSizeVariantsFragmentDoc,
    "fragment ReviewItem on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n  product {\n    id\n  }\n}": types.ReviewItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddOrderItem($orderId: ID!, $productId: ID!, $quantity: Int!, $total: Int!) {\n  createOrderItem(\n    data: {order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}, quantity: $quantity, total: $total}\n  ) {\n    ...OrderSingleItem\n  }\n}"): typeof import('./graphql').CartAddOrderItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartDeleteOrderItemById($id: ID!) {\n  deleteOrderItem(where: {id: $id}) {\n    id\n    product {\n      name\n    }\n  }\n}"): typeof import('./graphql').CartDeleteOrderItemByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartUpdateById($id: ID!, $userId: String, $email: String, $total: Int, $stripeCheckoutId: String) {\n  updateOrder(\n    data: {userId: $userId, email: $email, total: $total, stripeCheckoutId: $stripeCheckoutId}\n    where: {id: $id}\n  ) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartUpdateByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartUpdateOrderItemById($id: ID, $quantity: Int!, $total: Int!) {\n  updateOrderItem(data: {quantity: $quantity, total: $total}, where: {id: $id}) {\n    ...OrderSingleItem\n  }\n}"): typeof import('./graphql').CartUpdateOrderItemByIdDocument;
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
export function graphql(source: "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}, orderBy: createdAt_DESC, stage: DRAFT) {\n    ...Cart\n  }\n  ordersConnection(where: {email: $email}, stage: DRAFT) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByUserId($userId: String!) {\n  orders(where: {userId: $userId}, orderBy: createdAt_DESC, stage: DRAFT) {\n    ...Cart\n  }\n  ordersConnection(where: {userId: $userId}, stage: DRAFT) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByUserIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n    ...ProductColorVariants\n    ...ProductSizeVariants\n    ...ProductReviews\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProductReviewCreate($productId: ID!, $headline: String!, $content: String!, $rating: Int!, $name: String!, $email: String!) {\n  createReview(\n    data: {product: {connect: {id: $productId}}, headline: $headline, content: $content, rating: $rating, name: $name, email: $email}\n  ) {\n    ...ReviewItem\n  }\n}"): typeof import('./graphql').ProductReviewCreateDocument;
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
export function graphql(source: "query ProductsGetBySearchedName($limit: Int, $offset: Int, $searchedName: String) {\n  products(first: $limit, skip: $offset, where: {name_contains: $searchedName}) {\n    ...ProductItem\n  }\n  productsConnection(where: {name_contains: $searchedName}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetBySearchedNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($limit: Int, $offset: Int, $orderBy: ProductOrderByInput) {\n  products(first: $limit, skip: $offset, orderBy: $orderBy) {\n    ...ProductItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewGetList($limit: Int, $offset: Int) {\n  reviews(first: $limit, skip: $offset) {\n    ...ReviewItem\n  }\n  reviewsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ReviewGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewGetListByProductId($limit: Int, $offset: Int, $productId: ID!) {\n  reviews(first: $limit, skip: $offset, where: {product: {id: $productId}}) {\n    ...ReviewItem\n  }\n  reviewsConnection(where: {product: {id: $productId}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ReviewGetListByProductIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  userId\n  email\n  total\n  stripeCheckoutId\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n      categories {\n        name\n      }\n      images {\n        url\n      }\n    }\n  }\n  createdAt\n}"): typeof import('./graphql').CartFragmentDoc;
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
export function graphql(source: "fragment OrderSingleItem on OrderItem {\n  id\n  quantity\n  total\n  product {\n    id\n    name\n    price\n    categories {\n      name\n    }\n    images {\n      url\n    }\n  }\n}"): typeof import('./graphql').OrderSingleItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductColorVariants on Product {\n  colorVariants {\n    slug\n    color\n  }\n}"): typeof import('./graphql').ProductColorVariantsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  price\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  reviews {\n    id\n    rating\n  }\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItemFull on Product {\n  ...ProductItem\n  ...ProductColorVariants\n  ...ProductSizeVariants\n  ...ProductReviews\n}"): typeof import('./graphql').ProductItemFullFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductReviews on Product {\n  reviews {\n    headline\n    name\n    email\n    content\n    rating\n  }\n}"): typeof import('./graphql').ProductReviewsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductSizeVariants on Product {\n  sizeVariants {\n    size\n  }\n}"): typeof import('./graphql').ProductSizeVariantsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReviewItem on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n  product {\n    id\n  }\n}"): typeof import('./graphql').ReviewItemFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
