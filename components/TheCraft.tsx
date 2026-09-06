"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TheCraft() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="mb-24 relative h-[80vh] min-h-[600px] overflow-hidden rounded-[2rem] bg-[#111827] flex items-center justify-center">
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium fabric texture" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-[#111827]" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <span className="text-gray-400 font-semibold tracking-[0.3em] uppercase text-sm mb-6 block">The Craft</span>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
          Obsessive attention to <span className="text-[#3C50E0] italic">every thread</span>.
        </h2>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
          We source only the finest sustainable materials from artisan mills globally. 
          Each piece is constructed to last a lifetime, challenging the disposable nature of modern fashion.
        </p>
      </motion.div>
    </section>
  );
}
