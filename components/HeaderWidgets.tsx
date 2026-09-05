"use client";

import Link from 'next/link';
import { useCart, useWishlist } from '../hooks/useStore';

export function WishlistWidget() {
  const { wishlist } = useWishlist();
  
  return (
    <Link href="/wishlist" aria-label="Wishlist" className="hover:text-[#3C50E0] transition relative">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {wishlist.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] text-white bg-red-600 text-[10px] rounded-full flex items-center justify-center font-bold">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
}

export function CartWidget() {
  const { cart } = useCart();
  
  return (
    <Link href="/cart" aria-label="Cart" className="hover:text-[#3C50E0] transition relative">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {cart.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] text-white bg-red-600 text-[10px] rounded-full flex items-center justify-center font-bold">
          {cart.length}
        </span>
      )}
    </Link>
  );
}
