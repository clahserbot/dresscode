"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export type Photo = {
  id: number;
  image: string;
  handle: string;
};

const defaultPhotos: Photo[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop", handle: "@fashionforward" },
  { id: 2, image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1000&auto=format&fit=crop", handle: "@urbanstyle" },
  { id: 3, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop", handle: "@minimalist" },
  { id: 4, image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?q=80&w=1000&auto=format&fit=crop", handle: "@streetchic" },
];

type CustomerGalleryProps = {
  title?: string;
  subtitle?: string;
  photos?: Photo[];
};

export default function CustomerGallery({ 
  title = "Worn By You", 
  subtitle = "Tag @DressCode to be featured in our gallery.", 
  photos = defaultPhotos 
}: CustomerGalleryProps) {
  return (
    <section className="mb-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-[#111827] tracking-tight">{title}</h2>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>
        <a href="#" className="text-[#3C50E0] font-semibold hover:text-[#111827] transition-colors">
          View Instagram
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`group relative rounded-2xl overflow-hidden bg-gray-100 ${i === 1 || i === 2 ? 'md:-translate-y-6' : ''}`}
          >
            <div className="aspect-[4/5] w-full">
              <img 
                src={photo.image} 
                alt={`Worn by ${photo.handle}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white/80 text-sm font-medium mb-3 block">{photo.handle}</span>
                <button className="bg-white text-[#111827] px-4 py-2 rounded-lg font-semibold text-sm w-full flex items-center justify-center gap-2 hover:bg-[#3C50E0] hover:text-white transition-colors">
                  <ShoppingBag size={16} />
                  Shop Look
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
