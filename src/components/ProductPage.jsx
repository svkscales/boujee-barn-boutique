import React, { useState, useEffect } from 'react';
import { fetchProductByHandle } from '../lib/shopify';
import { useCart } from '../context/CartContext';

const ProductPage = ({ handle }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart: globalAddToCart, isLoading: isCartLoading } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      const data = await fetchProductByHandle(handle);
      if (isMounted) {
        setProduct(data);
        if (data?.variants?.edges?.length > 0) {
          setSelectedVariant(data.variants.edges[0].node);
        }
        setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [handle]);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAddingToCart(true);
    try {
      await globalAddToCart(selectedVariant.id);
    } catch (err) {
      console.error(err);
      alert("Error adding to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <section className="sand-bg" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading piece...</section>;
  }

  if (!product) {
    return <section className="sand-bg" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Piece not found or unavailable.</section>;
  }

  const images = product.images?.edges?.map(e => e.node.url) || [];
  const primaryImage = images[0];

  return (
    <section className="product-detail-section sand-bg" style={{ minHeight: '80vh', padding: '6rem 0' }}>
      <div className="container">
        <div className="product-detail-layout">
          
          <div className="product-images" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {primaryImage ? (
              <img src={primaryImage} alt={product.title} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }} />
            ) : (
              <div style={{ width: '100%', height: '600px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}></div>
            )}
            
            {images.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {images.slice(1).map((img, i) => (
                  <img key={i} src={img} alt="Detail" className="product-thumbnail" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', cursor: 'pointer', borderRadius: '4px' }} />
                ))}
              </div>
            )}
          </div>

          <div className="product-info-details" style={{ padding: '2rem 0', position: 'sticky', top: '100px' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>{product.title}</h1>
            <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem', color: 'var(--text-secondary)', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>
              {selectedVariant ? `${selectedVariant.price.currencyCode} $${parseFloat(selectedVariant.price.amount).toFixed(2)}` : ''}
            </p>

            {product.variants?.edges?.length > 1 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1.5px' }}>Select Size / Variant</label>
                <select 
                  style={{ width: '100%', padding: '1.2rem', border: '1px solid var(--text-primary)', backgroundColor: 'transparent', fontFamily: 'var(--font-body)', outline: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}
                  value={selectedVariant?.id || ''}
                  onChange={(e) => {
                    const variant = product.variants.edges.find(v => v.node.id === e.target.value)?.node;
                    setSelectedVariant(variant);
                  }}
                >
                  {product.variants.edges.map(v => (
                    <option key={v.node.id} value={v.node.id} disabled={!v.node.availableForSale}>
                      {v.node.title} {v.node.availableForSale ? '' : '- Sold Out'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1.2rem', marginBottom: '3rem', display: 'flex', justifyContent: 'center', opacity: product.availableForSale ? 1 : 0.4, cursor: product.availableForSale ? 'pointer' : 'not-allowed' }}
              disabled={!product.availableForSale || addingToCart || isCartLoading}
              onClick={handleAddToCart}
            >
              {(addingToCart || isCartLoading) ? 'Adding to Bag...' : product.availableForSale ? 'Add To Cart' : 'Sold Out'}
            </button>

            <div 
              style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '0.95rem' }} 
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
