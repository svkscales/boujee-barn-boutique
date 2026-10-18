const domain = 'the-boujee-barn-boutique-2.myshopify.com';
const storefrontAccessToken = '7a475967361533cffd9c6d451a2fa639';
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch({ query, variables }) {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      cache: 'no-store', // Absolutely force live refresh for every Shopify ping
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

const variantMetaCache = new Map();
const LOCAL_CART_STORAGE_KEY = 'boujee_local_cart_lines';

function extractNumericId(gidOrId) {
  if (!gidOrId) return '';
  const str = String(gidOrId);
  const parts = str.split('/');
  return parts[parts.length - 1];
}

function cacheProductVariants(product) {
  if (!product?.variants?.edges) return;
  const fallbackImage = product.images?.edges?.[0]?.node?.url || '';
  for (const edge of product.variants.edges) {
    const v = edge?.node;
    if (!v?.id) continue;
    variantMetaCache.set(v.id, {
      id: v.id,
      numericId: extractNumericId(v.id),
      title: v.title || 'Default Title',
      price: {
        amount: String(v.price?.amount ?? '0.00'),
        currencyCode: v.price?.currencyCode || 'USD'
      },
      product: {
        title: product.title || '',
        handle: product.handle || ''
      },
      image: {
        url: v.image?.url || fallbackImage,
        altText: v.image?.altText || product.title || 'Product'
      }
    });
  }
}

function normalizeRestProduct(restProd, availabilityMap = null) {
  if (!restProd) return null;

  const images = (restProd.images || []).map(img => ({
    node: {
      url: typeof img === 'string' ? img : img.src,
      altText: (typeof img === 'object' && img?.alt) ? img.alt : restProd.title
    }
  }));

  const variants = (restProd.variants || []).map(v => {
    const isAvail = availabilityMap && availabilityMap.has(v.id)
      ? availabilityMap.get(v.id)
      : (v.available !== undefined ? Boolean(v.available) : true);
    const variantImg = restProd.images?.find(img => img.id === v.featured_image?.id || (img.variant_ids || []).includes(v.id));

    return {
      node: {
        id: `gid://shopify/ProductVariant/${v.id}`,
        title: v.title,
        availableForSale: isAvail,
        price: {
          amount: String(v.price ?? '0.00'),
          currencyCode: 'USD'
        },
        compareAtPrice: v.compare_at_price ? {
          amount: String(v.compare_at_price),
          currencyCode: 'USD'
        } : null,
        image: {
          url: variantImg?.src || v.featured_image?.src || images[0]?.node?.url || '',
          altText: restProd.title
        }
      }
    };
  });

  const prices = variants
    .map(v => parseFloat(v.node.price.amount))
    .filter(n => !isNaN(n));
  const minPrice = prices.length > 0 ? Math.min(...prices).toFixed(2) : '0.00';
  const anyVariantAvailable = variants.some(v => v.node.availableForSale);

  const normalized = {
    id: `gid://shopify/Product/${restProd.id}`,
    title: restProd.title,
    handle: restProd.handle,
    descriptionHtml: restProd.body_html || '',
    availableForSale: anyVariantAvailable,
    productType: restProd.product_type || '',
    priceRange: {
      minVariantPrice: {
        amount: String(minPrice),
        currencyCode: 'USD'
      }
    },
    images: { edges: images },
    variants: { edges: variants }
  };

  cacheProductVariants(normalized);
  return normalized;
}

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
  const products = response.body?.data?.products?.edges?.map(edge => edge.node) || [];
  products.forEach(cacheProductVariants);
  return products;
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

  const [graphqlRes, restRes] = await Promise.all([
    shopifyFetch({ query, variables: { handle } }),
    fetch(`https://${domain}/collections/${handle}/products.json?limit=250`, { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .catch(() => null)
  ]);

  const graphqlProducts = graphqlRes.body?.data?.collection?.products?.edges?.map(edge => edge.node) || [];
  graphqlProducts.forEach(cacheProductVariants);

  const seenHandles = new Set(graphqlProducts.map(p => p?.handle).filter(Boolean));
  const mergedProducts = [...graphqlProducts];

  if (restRes?.products?.length) {
    for (const restProd of restRes.products) {
      if (restProd?.handle && !seenHandles.has(restProd.handle)) {
        const normalized = normalizeRestProduct(restProd);
        if (normalized) {
          mergedProducts.push(normalized);
          seenHandles.add(restProd.handle);
        }
      }
    }
  }

  return mergedProducts;
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
  const graphqlProduct = response.body?.data?.product || null;
  if (graphqlProduct) {
    cacheProductVariants(graphqlProduct);
    return graphqlProduct;
  }

  try {
    const [jsonRes, jsRes] = await Promise.all([
      fetch(`https://${domain}/products/${handle}.json`, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`https://${domain}/products/${handle}.js`, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null)
    ]);

    if (jsonRes?.product) {
      const availabilityMap = new Map();
      if (jsRes?.variants) {
        for (const v of jsRes.variants) {
          availabilityMap.set(v.id, Boolean(v.available));
        }
      }
      return normalizeRestProduct(jsonRes.product, availabilityMap);
    }
  } catch (err) {
    console.error('Fallback product fetch failed:', err);
  }

  return null;
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

function getSavedLocalLines() {
  try {
    const raw = localStorage.getItem(LOCAL_CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalLines(lines) {
  try {
    localStorage.setItem(LOCAL_CART_STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // ignore storage errors
  }
}

function syncGraphqlCartToLocalLines(cart) {
  if (!cart?.lines?.edges) return;
  const lines = cart.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    merchandise: {
      id: node.merchandise.id,
      numericId: extractNumericId(node.merchandise.id),
      title: node.merchandise.title,
      price: node.merchandise.price,
      product: node.merchandise.product,
      image: node.merchandise.image
    }
  }));
  saveLocalLines(lines);
}

function buildLocalCartObject(lines) {
  const totalQuantity = lines.reduce((sum, l) => sum + (l.quantity || 0), 0);
  const subtotal = lines.reduce((sum, l) => {
    const unit = parseFloat(l.merchandise?.price?.amount || '0');
    return sum + unit * (l.quantity || 1);
  }, 0);

  const permalinkItems = lines
    .map(l => `${l.merchandise?.numericId || extractNumericId(l.merchandise?.id)}:${l.quantity || 1}`)
    .filter(Boolean)
    .join(',');

  return {
    id: 'local-boujee-cart',
    checkoutUrl: permalinkItems ? `https://${domain}/cart/${permalinkItems}` : '#',
    totalQuantity,
    cost: {
      subtotalAmount: {
        amount: subtotal.toFixed(2),
        currencyCode: 'USD'
      }
    },
    lines: {
      edges: lines.map(l => ({
        node: {
          id: l.id,
          quantity: l.quantity,
          merchandise: l.merchandise
        }
      }))
    }
  };
}

function addVariantToLocalCart(variantId) {
  const lines = getSavedLocalLines();
  const existing = lines.find(l => l.merchandise?.id === variantId);
  if (existing) {
    existing.quantity += 1;
  } else {
    const meta = variantMetaCache.get(variantId) || {
      id: variantId,
      numericId: extractNumericId(variantId),
      title: 'Default Title',
      price: { amount: '0.00', currencyCode: 'USD' },
      product: { title: 'Boutique Item', handle: '' },
      image: { url: '', altText: 'Product' }
    };
    lines.push({
      id: `local-line-${meta.numericId}`,
      quantity: 1,
      merchandise: meta
    });
  }
  saveLocalLines(lines);
  return buildLocalCartObject(lines);
}

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
  const cart = response.body?.data?.cartCreate?.cart || null;
  if (cart) {
    syncGraphqlCartToLocalLines(cart);
    return cart;
  }
  saveLocalLines([]);
  return addVariantToLocalCart(variantId);
}

export async function fetchCart(cartId) {
  if (cartId === 'local-boujee-cart') {
    const lines = getSavedLocalLines();
    return lines.length > 0 ? buildLocalCartObject(lines) : null;
  }
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartDetails
      }
    }
    ${CART_FRAGMENT}
  `;
  const response = await shopifyFetch({ query, variables: { cartId } });
  const cart = response.body?.data?.cart || null;
  if (cart) {
    syncGraphqlCartToLocalLines(cart);
  }
  return cart;
}

export async function addToCart(cartId, variantId) {
  if (cartId === 'local-boujee-cart') {
    return addVariantToLocalCart(variantId);
  }
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
  const cart = response.body?.data?.cartLinesAdd?.cart || null;
  if (cart) {
    syncGraphqlCartToLocalLines(cart);
    return cart;
  }
  return addVariantToLocalCart(variantId);
}

export async function removeFromCart(cartId, lineId) {
  if (cartId === 'local-boujee-cart' || String(lineId).startsWith('local-line-')) {
    const lines = getSavedLocalLines().filter(l => l.id !== lineId);
    saveLocalLines(lines);
    return buildLocalCartObject(lines);
  }
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
  const cart = response.body?.data?.cartLinesRemove?.cart || null;
  if (cart) {
    syncGraphqlCartToLocalLines(cart);
  }
  return cart;
}

