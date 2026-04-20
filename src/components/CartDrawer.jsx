import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, isLoading } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const lines = cart?.lines?.edges || [];
  const subtotal = cart?.cost?.subtotalAmount;

  return (
    <>
      <div 
        className="cart-overlay" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 999998,
          backdropFilter: 'blur(2px)'
        }}
        onClick={() => setIsCartOpen(false)}
      />
      <div 
        className="cart-drawer pink-bg" 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '450px',
          height: '100vh',
          zIndex: 999999,
          boxShadow: '-5px 0 25px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <div className="cart-header" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Cart ({cart?.totalQuantity || 0})</h2>
          <button 
            onClick={() => setIsCartOpen(false)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {lines.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-secondary)' }}>
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: '1rem', background: 'transparent', border: '1px solid var(--text-primary)', padding: '0.8rem 1.5rem', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            lines.map(({ node: line }) => (
              <div key={line.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 30px', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={line.merchandise.image?.url} 
                  alt={line.merchandise.image?.altText || 'Product'} 
                  style={{ width: '80px', height: '110px', objectFit: 'cover' }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>{line.merchandise.product.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{line.merchandise.title !== 'Default Title' ? line.merchandise.title : ''}</span>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>Qty: {line.quantity}</span>
                    <span>${parseFloat(line.merchandise.price.amount).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(line.id)}
                  disabled={isLoading}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, alignSelf: 'flex-start', transition: 'all 0.2s ease' }}
                  title="Remove Item"
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-footer" style={{ padding: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'var(--sand-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span>Subtotal</span>
              <span>{subtotal?.currencyCode} ${parseFloat(subtotal?.amount).toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Shipping & taxes calculated at checkout
            </p>
            <a 
              href={cart.checkoutUrl || '#'} 
              className="btn btn-primary"
              style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1.2rem', textAlign: 'center', textDecoration: 'none' }}
            >
              PROCEED TO CHECKOUT
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
