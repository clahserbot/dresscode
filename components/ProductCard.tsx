"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ProductCard({ id, title, price, imageUrl, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block w-full outline-none">
      <div className="w-full aspect-square overflow-hidden bg-[#F3F4F6] rounded-2xl mb-4 relative">
        <motion.img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover mix-blend-multiply"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* Wishlist Button Placeholder */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </div>
      
      <div className="space-y-1.5 flex flex-col items-start px-1">
        {/* Star Rating Placeholder */}
        <div className="flex text-yellow-400 gap-0.5">
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          ))}
        </div>
        
        <h3 className="font-medium text-sm sm:text-lg text-[#111827] group-hover:text-[#3C50E0] transition-colors duration-300 line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
          <p className="font-bold text-base sm:text-lg text-[#111827]">₹{price.toFixed(2)}</p>
          <p className="text-xs sm:text-sm text-gray-400 line-through">₹{(price * 1.2).toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
