import React, { useState, useEffect } from 'react';
import { fetchProductsByQuery, fetchProductsByCollectionHandle } from '../lib/shopify';

const ProductGrid = ({ type, value, title, productType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setProducts([]); // Clear old products quickly before fetch

    const fetchData = async () => {
      let data = [];
      try {
        if (type === 'category') {
          // productType in Shopify is often capitalized differently, maybe just basic query
          data = await fetchProductsByQuery(`product_type:'${value}'`);
        } else if (type === 'collection') {
          data = await fetchProductsByCollectionHandle(value, productType);
        } else if (type === 'tag') {
          data = await fetchProductsByQuery(`tag:'${value}'`);
        } else if (type === 'custom-query' || type === 'search') {
          data = await fetchProductsByQuery(value);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      
      if (isMounted) {
        const activeProducts = data.filter(p => {
          if (!p || !p.availableForSale) return false;
          if (productType && (!p.productType || p.productType.toLowerCase() !== productType.toLowerCase())) return false;
          return true;
        });
        setProducts(activeProducts);
        setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [type, value]);

  const getDynamicSubtitle = (catTitle) => {
    if (!catTitle) return "Curated selections just for you.";
    const t = catTitle.toLowerCase();
    
    if (t.includes('search')) return "Curated selections just for you.";
    if (t.includes('new arrival')) return "The absolute freshest styles just hitting the boutique.";
    if (t.includes('sale')) return "Unmissable boutique steals and last-chance deals.";
    
    if (t.includes('jean') || t.includes('pant') || t.includes('bottom') || t.includes('short') || t.includes('skirt') || t.includes('overall') || t.includes('sweat')) {
      return "Essential foundations for your everyday western wardrobe.";
    }
    if (t.includes('top') || t.includes('shirt') || t.includes('tee') || t.includes('tank') || t.includes('jacket') || t.includes('sleeve') || t.includes('set')) {
      return "Statement styling crafted for the free-spirited cowgirl.";
    }
    if (t.includes('dress') || t.includes('maxi') || t.includes('mini') || t.includes('midi')) {
      return "Flowy, elegant, and effortlessly western.";
    }
    if (t.includes('children') || t.includes('kid')) {
      return "Adorable boutique styles for the little ones.";
    }
    if (t.includes('toy') || t.includes('game') || t.includes('sensory') || t.includes('novelty')) {
      return "Curated fun and playful curiosities.";
    }
    if (t.includes('accessor') || t.includes('hat') || t.includes('bag') || t.includes('jewel') || t.includes('clutch')) {
      return "The perfect finishing touches to elevate your look.";
    }
    if (t.includes('dance') || t.includes('leotard')) {
      return "Performance-ready styles crafted for movement.";
    }
    if (t.includes('shoe')) {
      return "Step out in true southwestern style.";
    }
    
    return "Curated selections tailored for the modern cowgirl.";
  };

  return (
    <section className="product-grid-section pink-bg" style={{ minHeight: '80vh', padding: '6rem 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <h2 style={{ textTransform: 'uppercase', color: 'var(--text-primary)' }}>{title || value}</h2>
          <p style={{ color: 'var(--text-primary)', opacity: 0.8 }}>{getDynamicSubtitle(title || value)}</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-primary)' }}>Loading collections...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-primary)' }}>No active products found in this category right now.</div>
        ) : (
          <div className="grid-4" style={{ gap: '1rem' }}>
            {products.filter(product => !product.title.toLowerCase().includes('tanner mitt')).map(product => {
              const image = product.images?.edges[0]?.node?.url;
              const price = product.priceRange?.minVariantPrice;
              const compareAtPrice = product.variants?.edges[0]?.node?.compareAtPrice;
              const isOnSale = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
              
              return (
                <a href={`#product-${product.handle}`} key={product.id} className="product-card category-card" style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="product-img img-placeholder" style={{ 
                    backgroundImage: image ? `url(${image})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'var(--sand-bg)',
                    marginBottom: '1rem',
                    aspectRatio: '2/3',
                    height: 'auto',
                    transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {isOnSale && (
                      <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#d9534f', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', padding: '0.4em 0.8em', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Sale
                      </span>
                    )}
                    {!product.availableForSale && (
                      <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#333', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', padding: '0.4em 0.8em', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Sold Out
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <h4>
                      {product.title}
                    </h4>
                    <p className="price">
                      {isOnSale && (
                        <span style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.85rem' }}>
                          {compareAtPrice.currencyCode} ${parseFloat(compareAtPrice.amount).toFixed(2)}
                        </span>
                      )}
                      <span style={{ color: isOnSale ? '#d9534f' : 'inherit', fontWeight: isOnSale ? 600 : 'normal' }}>
                        {price ? `${price.currencyCode} $${parseFloat(price.amount).toFixed(2)}` : ''}
                      </span>
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
