"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart, useWishlist } from '../hooks/useStore';

interface ProductDetailViewProps {
  product: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    r2ImageUrl: string;
    category: string;
  };
  sizes: string[];
}

export default function ProductDetailView({ product, sizes }: ProductDetailViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || '');
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const router = useRouter();

  const isLiked = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      r2ImageUrl: product.r2ImageUrl,
      category: product.category
    });
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      r2ImageUrl: product.r2ImageUrl,
      category: product.category
    });
    router.push('/cart');
  };

  return (
    <div className="min-h-[80vh] pt-8 pb-24">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-8 font-medium gap-2">
        <Link href="/" className="hover:text-[#3C50E0] transition-colors">Home</Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-[#111827]">{product.title}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Product Image */}
        <div className="bg-white aspect-square rounded-2xl overflow-hidden sticky top-28 z-20 isolate">
          <div className="w-full h-full bg-[#F3F4F6]">
            <img 
              src={product.r2ImageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col pt-4">
          <h1 className="font-bold text-3xl md:text-4xl text-[#111827] mb-4">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <p className="font-bold text-2xl text-[#111827]">
              ₹{product.price.toFixed(2)}
            </p>
            <div className="flex text-yellow-400 gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">(15 Reviews)</span>
          </div>
          
          <div className="prose prose-neutral mb-8 text-gray-600 leading-relaxed">
            <p>{product.description}</p>
          </div>

          <div className="mb-8 border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#111827]">Size</h3>
              <button className="text-sm text-gray-500 underline hover:text-[#3C50E0]">Size Guide</button>
            </div>
            <div className="flex gap-3 flex-wrap">
              {sizes.map((size: string) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] px-3 h-12 flex items-center justify-center rounded-lg border font-medium cursor-pointer transition-colors
                    ${selectedSize === size 
                      ? 'border-[#111827] bg-[#111827] text-white' 
                      : 'border-gray-200 text-gray-600 hover:border-[#111827] hover:text-[#111827]'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#3C50E0] text-white text-center py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              Buy Now
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#111827] text-white text-center py-4 rounded-lg font-medium text-lg hover:bg-black transition-colors shadow-sm"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`w-14 flex items-center justify-center rounded-lg border transition-colors ${
                isLiked ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Free worldwide shipping
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              100% Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
