"use client";

import { motion } from "framer-motion";

const brands = [
  "Vogue", "GQ", "Esquire", "Vanity Fair", "Hypebeast", "Highsnobiety", "Complex"
];

export default function InfiniteMarquee() {
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">As featured in</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {/* Double the array to ensure seamless looping */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className="mx-8 md:mx-16 flex items-center justify-center min-w-[120px] transition-transform duration-300 hover:scale-110"
            >
              <span className="text-2xl md:text-3xl font-black text-gray-300 tracking-tighter hover:text-[#111827] transition-colors duration-300 cursor-default">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
