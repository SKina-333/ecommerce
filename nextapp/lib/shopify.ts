import {
  createStorefrontApiClient,
  StorefrontApiClient,
} from "@shopify/storefront-api-client";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string;
const publicAccessToken = process.env
  .NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

if (!storeDomain || !publicAccessToken) {
  throw new Error("Missing Shopify environment variables");
}

export const client: StorefrontApiClient = createStorefrontApiClient({
  storeDomain,
  apiVersion: "2025-04",
  publicAccessToken,
});

interface CollectionsResponse {
  collections: {
    edges: Array<CollectionsEdge[]>;
  };
}

interface CollectionsEdge {
  node: CollectionResponse[];
}

interface CollectionResponse {
  collection: {
    id: string;
    handle: string;
    title: string;
    products: {
      edges: ProductEdge[];
    };
  };
}

interface ProductEdge {
  node: ProductNode;
}

interface ProductNode {
  id: string;
  title: string;
  images: {
    edges: ImageEdge[];
  };
  collections: {
    edges: {
      node: {
        id: string;
        handle: string;
        title: string;
      };
    }
  };
  variants: {
    edges: VariantEdge[];
  };
}

interface VariantEdge {
  node: VariantNode;
}

interface VariantNode {
  id: string;
  title: string;
  price:  {
    amount: number;
    currncyCode: string;
  }
}

interface ImageEdge {
  node: ImageNode;
}

interface ImageNode {
  url: string;
}

interface CartQueryResponse {
  cart: {
    id: string;
    createdAt: string;
    updatedAt: string;
    totalQuantity: number;
    lines: {
      edges: LineEdge[];
    };
    buyerIdentity: {
      countryCode: string;
      email: string;
      phone: string;
    };
    checkoutUrl: string;
    cost: {
      subtotalAmount: {
        amount: number;
        currencyCode: string;
      };
      totalAmount: {
        amount: number;
        currencyCode: string;
      };
    };
  };
}

interface CartLineAddResponse {
  cartLinesAdd: {
    cart: {
      id: string;
      createdAt: string;
      updatedAt: string;
      totalQuantity: number;
      lines: {
        edges: LineEdge[];
      };
      buyerIdentity: {
        countryCode: string;
        email: string;
        phone: string;
      };
      checkoutUrl: string;
      cost: {
        subtotalAmount: {
          amount: number;
          currencyCode: string;
        };
        totalAmount: {
          amount: number;
          currencyCode: string;
        };
      };
    };
    userErrors: UserErrors;
    warnings: Warnings;
  };
}

interface CartResponse {
  cartCreate: {
    cart: {
      id: string;
      createdAt: string;
      updatedAt: string;
      totalQuantity: number;
      lines: {
        edges: LineEdge[];
      };
      buyerIdentity: {
        countryCode: string;
        email: string;
        phone: string;
      };
      checkoutUrl: string;
      cost: {
        subtotalAmount: {
          amount: number;
          currencyCode: string;
        };
        totalAmount: {
          amount: number;
          currencyCode: string;
        };
      };
    };
    userErrors: UserErrors;
    warnings: Warnings;
  };
}

interface LineEdge {
  node: LineNode;
}

interface LineNode {
  id: string;
  quantity: number;
  merchandise: Merchandise;
}

type Merchandise = ProductVariantMerchandise;
interface ProductVariantMerchandise extends CartLineMerchandise {
  __typename: "ProductVariant";
  id: string;
  currentlyNotInStock: boolean;
  image: {
    url: string;
  };
  price: {
    amount: number;
    currencyCode: string;
  };
  product: {
    title: string;
  }
}
interface CartLineMerchandise {
  __typename: string;
}


interface UserErrors {
  code: string;
  field: string[];
  message: string;
}
interface Warnings {
  code: string;
  target: string;
  message: string;
}

export async function getCollection(
  handle: string
): Promise<CollectionResponse | null> {
  const collectionQuery = `query getCollectionByHandle($handle: String!) {
      collection( handle: $handle){
        id
        handle
        title
        products(first: 250) {
          edges {
            node {
              id
              title
              images(first: 5) {
                edges {
                  node {
                    url
                  }
                }
              }
              collections(first: 10) {
                edges {
                  node {
                    id
                    handle
                    title
                  }
                }
              }
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;
  const response = await client.request<CollectionResponse>(collectionQuery, {
    variables: { handle: handle },
  });
  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  return response.data;
}

export async function getAllCollections() {
  const collectionQuery = `query {
      collections(first: 250){
        edges {
          node {
            id
            handle
            title
            products(first: 250) {
              edges {
                node {
                  id
                  title
                  collections(first: 10) {
                    edges {
                      node {
                        id
                        handle
                        title
                      }
                    }
                  }
                  variants(first: 5) {
                    edges {
                      node {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  images(first: 5) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;
  const response = await client.request<CollectionsResponse>(collectionQuery);
  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  return response.data;
}

export async function createCart(CartInput: any): Promise<CartResponse | null> {
  const createQuery = `mutation cartCreate($input: CartInput) {
    cartCreate(input: $input){
      cart {
        id
        createdAt
        updatedAt
        totalQuantity
        lines(first: 250) {
          edges{
            node {
              id
              quantity
              merchandise{
                __typename
                ... on ProductVariant {
                  id
                  currentlyNotInStock
                }
              }
            }
          }
        }
        buyerIdentity{
          countryCode
          email
          phone
        }
        checkoutUrl
        cost{
          subtotalAmount{
            amount
            currencyCode
          }
          totalAmount{
            amount
            currencyCode
          }
        }
      }
      userErrors{
        code
        field
        message
      }
      warnings{
        code
        target         
        message
      }
    }
  }`;

  const response = await client.request(createQuery, {
    variables: {
      input: CartInput,
    },
  });
  if (response?.errors) {
    console.error("GraphQL Client Error: ", response.errors.message);

    // Log detailed GraphQL errors
    if (response.errors.graphQLErrors) {
      console.error("GraphQL Errors:", response.errors.graphQLErrors);
    }
  }

  return response.data;
}

export async function addLineItems(
  cartId: string,
  lines: any
): Promise<CartLineAddResponse | null> {
  const addLineItemsQuery = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        createdAt
        updatedAt
        totalQuantity
        lines(first: 250) {
          edges{
            node {
              id
              quantity
              merchandise{
                __typename
                ... on ProductVariant {
                  id
                  currentlyNotInStock
                }
              }
            }
          }
        }
        buyerIdentity{
          countryCode
          email
          phone
        }
        checkoutUrl
        cost{
          subtotalAmount{
            amount
            currencyCode
          }
          totalAmount{
            amount
            currencyCode
          }
        }
      }
      userErrors{
        code
        field
        message
      }
      warnings{
        code
        target         
        message
      }
    }
  }`;
  
  const response = await client.request(addLineItemsQuery, {
    variables: {
      cartId: cartId,
      lines: lines,
    },
  });
  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  return response.data;
}

export async function getCart(
  cartId: string
): Promise<CartQueryResponse | null> {
  const cartQuery = `query cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      totalQuantity
      lines(first: 250) {
        edges{
          node {
            id
            quantity
            merchandise{
              __typename
              ... on ProductVariant {
                id
                currentlyNotInStock
                image {
                  url
                }
                price {
                  amount
                  currencyCode  
                }
                product {
                  title
                }
              }
            }
          }
        }
      }
      buyerIdentity{
        countryCode
        email
        phone
      }
      checkoutUrl
      cost{
        subtotalAmount{
          amount
          currencyCode
        }
        totalAmount{
          amount
          currencyCode
        }
      }
    }
  }`;

  const response = await client.request(cartQuery, {
    variables: { cartId: cartId },
  });
  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  return response.data;
}

export async function updateCart(cartId: string, lines: any) {
  const updateQuery = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        createdAt
        updatedAt
        totalQuantity
        lines(first: 250) {
          edges{
            node {
              id
              quantity
              merchandise{
                __typename
                ... on ProductVariant {
                  id
                  currentlyNotInStock
                }
              }
            }
          }
        }
        buyerIdentity{
          countryCode
          email
          phone
        }
        checkoutUrl
        cost{
          subtotalAmount{
            amount
            currencyCode
          }
          totalAmount{
            amount
            currencyCode
          }
        }
      } 
      userErrors{
        code
        field
        message
      }
      warnings{
        code
        target         
        message
      }
    } 
  }`;
  const response = await client.request(updateQuery, {
    variables: {
      cartId: cartId,
      lines: lines,
    },
  });
  if (!response.data) {
    throw new Error("Response data is undefined");
  }
  return response.data;
}
export async function removeLineItems(cartId: string, lines: any) {
  const removeQuery = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        createdAt
        updatedAt
        totalQuantity
        lines(first: 250) {
          edges{
            node {
              id
              quantity
              merchandise{
                __typename
                ... on ProductVariant {
                  id
                  currentlyNotInStock
                }
              }
            }
          }
        }
        buyerIdentity{
          countryCode
          email
          phone
        }
        checkoutUrl
        cost{
          subtotalAmount{
            amount
            currencyCode
          }
          totalAmount{
            amount
            currencyCode
          }
        }
      } 
      userErrors{
        code
        field
        message
      }
      warnings{

        code
        target         
        message
      }
    } 
  }`;
  const response = await client.request(removeQuery, {
    variables: {
      cartId: cartId,
      lineIds: lines,
    },
  });
  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  return response.data;
}

export async function getAllProducts() {
  const allProductsQuery = `query getProducts {
    products(first: 250) {
      edges {
        node {
          id
          title
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          collections(first: 10) {
            edges {
              node {
                id
                handle
                title
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }`;
  const response = await client.request(allProductsQuery);
  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  return response.data;
}