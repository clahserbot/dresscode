"use client";

import { useWishlist } from '@/hooks/useStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  title: string;
  price: number;
  r2ImageUrl: string;
  category: string;
};

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`/api/products?ids=${wishlist.join(',')}`);
        if (res.ok) {
          setProducts(await res.json());
        }
      } catch (error) {
        console.error("Failed to fetch wishlist products", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-[#111827]">Your Wishlist</h1>
      
      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed max-w-4xl mx-auto">
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link href="/" className="text-[#3C50E0] font-medium hover:underline">
            Discover Styles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col h-full bg-white transition-all duration-300">
              <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl mb-4 isolate">
                <img 
                  src={product.r2ImageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
              
              <button 
                onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-sm border border-gray-100 hover:bg-white hover:scale-110 transition-all"
                title="Remove from wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>

              <div className="flex flex-col flex-1 px-1">
                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">
                  {product.category}
                </div>
                <h3 className="text-base font-semibold text-gray-900 leading-snug mb-1">
                  <Link href={`/product/${product.id}`} className="hover:text-[#3C50E0] transition-colors">
                    {product.title}
                  </Link>
                </h3>
                <p className="text-base font-medium text-gray-900 mt-auto">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
