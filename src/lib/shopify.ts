import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import type { ShopifyProduct } from "@/types/shopify";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export const shopifyClient = createStorefrontApiClient({
  storeDomain: `https://${domain}`,
  apiVersion: "2025-01",
  publicAccessToken: token,
});

const ALL_PRODUCTS_QUERY = `
  query getAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          availableForSale
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const products: ShopifyProduct[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = (await shopifyClient.request(ALL_PRODUCTS_QUERY, {
      variables: { first: 250, after },
    })) as { data: any };

    const edges = data?.products?.edges ?? [];
    for (const edge of edges) {
      products.push(edge.node);
    }

    hasNextPage = data?.products?.pageInfo?.hasNextPage ?? false;
    after = data?.products?.pageInfo?.endCursor ?? null;
  }

  return products;
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = (await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
    variables: { handle },
  })) as { data: any };

  return data?.productByHandle ?? null;
}
