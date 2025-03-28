import {
  createStorefrontApiClient,
  StorefrontApiClient,
} from "@shopify/storefront-api-client";

const storeDomain = process.env.X_PUBLIC_SHOPIFY_STORE_DOMAIN as string;
const publicAccessToken = process.env
  .X_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

if (!storeDomain || !publicAccessToken) {
  throw new Error("Missing Shopify environment variables");
}

export const client: StorefrontApiClient = createStorefrontApiClient({
  storeDomain,
  apiVersion: "2025-04",
  publicAccessToken,
});

interface ImageEdge {
  node: ImageNode;
}

interface ImageNode {
  url: string;
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
}

interface CollectionResponse {
  collection: {
    handle: string;
    title: string;
    products: {
      edges: ProductEdge[];
    };
  } | null;
}

export async function getCollection(
  handle: string
): Promise<CollectionResponse | null> {
  const collectionQuery = `query getCollectionByHandle($handle: String!) {
      collection( handle: $handle){
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

export async function getAllProducts() {
  try {
    interface GetAllProductsResponse {
      products: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            description: string;
            handle: string;
            variants: {
              edges: Array<{
                node: {
                  id: string;
                  title: string;
                  price: {
                    amount: string;
                    currencyCode: string;
                  };
                };
              }>;
            };
            images: {
              edges: Array<{
                node: {
                  url: string;
                  altText: string | null;
                };
              }>;
            };
          };
        }>;
      };
    }

    const response = await client.request<GetAllProductsResponse>(
      `query GetAllProducts {
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              handle
              variants(first: 10) {
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
                    altText
                  }
                }
              }
            }
          }
        }
      }`
    );

    if (!response.data) {
      throw new Error("Response data is undefined");
    }
    return response.data.products.edges;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
