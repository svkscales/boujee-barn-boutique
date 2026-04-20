const domain = 'the-boujee-barn-boutique-2.myshopify.com';
const storefrontAccessToken = '7a475967361533cffd9c6d451a2fa639';
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch({ query, variables }) {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({ query, variables })
    });
    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}

const PRODUCT_FRAGMENT = `
  fragment ProductDetails on Product {
    id
    title
    handle
    descriptionHtml
    availableForSale
    productType
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 2) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function fetchProductsByQuery(searchQuery) {
  const query = `
    query ProductsSearch($searchQuery: String!) {
      products(first: 250, query: $searchQuery) {
        edges {
          node {
            ...ProductDetails
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  const response = await shopifyFetch({ query, variables: { searchQuery } });
  return response.body?.data?.products?.edges?.map(edge => edge.node) || [];
}

export async function fetchProductsByCollectionHandle(handle, productTypeFilter = null) {
  const query = `
    query CollectionQuery($handle: String!) {
      collection(handle: $handle) {
        products(first: 250) {
          edges {
            node {
              ...ProductDetails
            }
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  const response = await shopifyFetch({ query, variables: { handle } });
  return response.body?.data?.collection?.products?.edges?.map(edge => edge.node) || [];
}

export async function fetchProductByHandle(handle) {
  const query = `
    query ProductQuery($handle: String!) {
      product(handle: $handle) {
         ...ProductDetails
      }
    }
    ${PRODUCT_FRAGMENT}
  `;
  const response = await shopifyFetch({ query, variables: { handle } });
  return response.body?.data?.product || null;
}

const CART_FRAGMENT = `
  fragment CartDetails on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(variantId) {
  const query = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          ...CartDetails
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await shopifyFetch({ 
    query, 
    variables: { 
      input: { 
        lines: [{ merchandiseId: variantId, quantity: 1 }] 
      } 
    } 
  });
  return response.body?.data?.cartCreate?.cart || null;
}

export async function fetchCart(cartId) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartDetails
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await shopifyFetch({ query, variables: { cartId } });
  return response.body?.data?.cart || null;
}

export async function addToCart(cartId, variantId) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartDetails
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await shopifyFetch({
    query,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity: 1 }]
    }
  });
  return response.body?.data?.cartLinesAdd?.cart || null;
}

export async function removeFromCart(cartId, lineId) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartDetails
        }
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await shopifyFetch({
    query,
    variables: {
      cartId,
      lineIds: [lineId]
    }
  });
  return response.body?.data?.cartLinesRemove?.cart || null;
}
