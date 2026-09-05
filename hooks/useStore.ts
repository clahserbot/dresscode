"use client";

import { useState, useEffect } from 'react';

// Product type for Cart
export interface CartItem {
  id: string;
  title: string;
  price: number;
  size: string;
  r2ImageUrl: string;
  category: string;
}

// Global state using events for lightweight sync across components
export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const stored = localStorage.getItem('dresscode_wishlist');
      if (stored) setWishlist(JSON.parse(stored));
    };
    
    loadWishlist();
    window.addEventListener('wishlist-update', loadWishlist);
    return () => window.removeEventListener('wishlist-update', loadWishlist);
  }, []);

  const toggleWishlist = (id: string) => {
    let updated = [...wishlist];
    if (updated.includes(id)) {
      updated = updated.filter(item => item !== id);
    } else {
      updated.push(id);
    }
    localStorage.setItem('dresscode_wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlist-update'));
  };

  return { wishlist, toggleWishlist };
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const stored = localStorage.getItem('dresscode_cart');
      if (stored) setCart(JSON.parse(stored));
    };
    
    loadCart();
    window.addEventListener('cart-update', loadCart);
    return () => window.removeEventListener('cart-update', loadCart);
  }, []);

  const addToCart = (item: CartItem) => {
    const updated = [...cart, item];
    localStorage.setItem('dresscode_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-update'));
  };

  const removeFromCart = (id: string, size: string) => {
    const updated = cart.filter(item => !(item.id === id && item.size === size));
    localStorage.setItem('dresscode_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-update'));
  };

  const clearCart = () => {
    localStorage.setItem('dresscode_cart', JSON.stringify([]));
    window.dispatchEvent(new Event('cart-update'));
  };

  return { cart, addToCart, removeFromCart, clearCart };
}
