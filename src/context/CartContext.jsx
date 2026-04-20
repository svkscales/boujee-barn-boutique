import React, { createContext, useContext, useState, useEffect } from 'react';
import { createCart, fetchCart, addToCart, removeFromCart } from '../lib/shopify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem('boujee_cart_id');
      if (storedCartId) {
        setIsLoading(true);
        const existingCart = await fetchCart(storedCartId);
        if (existingCart) {
          setCart(existingCart);
        } else {
          localStorage.removeItem('boujee_cart_id');
        }
        setIsLoading(false);
      }
    };
    initializeCart();
  }, []);

  const handleAddToCart = async (variantId) => {
    setIsLoading(true);
    let updatedCart;
    if (cart?.id) {
      updatedCart = await addToCart(cart.id, variantId);
    } else {
      updatedCart = await createCart(variantId);
      if (updatedCart?.id) {
        localStorage.setItem('boujee_cart_id', updatedCart.id);
      }
    }
    
    if (updatedCart) {
      setCart(updatedCart);
    }
    setIsLoading(false);
  };

  const handleRemoveFromCart = async (lineId) => {
    if (!cart?.id) return;
    setIsLoading(true);
    const updatedCart = await removeFromCart(cart.id, lineId);
    if (updatedCart) {
      setCart(updatedCart);
    }
    setIsLoading(false);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        isCartOpen, 
        setIsCartOpen, 
        addToCart: handleAddToCart, 
        removeFromCart: handleRemoveFromCart,
        isLoading 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
