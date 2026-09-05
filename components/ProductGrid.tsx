"use client";

import { motion, Variants } from 'framer-motion';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  price: number;
  r2ImageUrl: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard 
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.r2ImageUrl}
            category={product.category}
          />
        </div>
      ))}
    </motion.div>
  );
}
