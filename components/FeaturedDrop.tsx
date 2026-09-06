"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

export default function FeaturedDrop() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="mb-24 py-12">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#111827]">Limited Edition Drop</h2>
          <p className="text-gray-500 mt-2">Exclusive pieces. Once they're gone, they're gone.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3C50E0]">12</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3C50E0]">45</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Mins</div>
          </div>
        </div>
      </div>

      <div 
        className="group relative flex flex-col md:flex-row bg-[#111827] rounded-3xl overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
      >
        {/* Magic Hover Effect (design-spells style) */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(60, 80, 224, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative z-10">
          <span className="text-[#3C50E0] font-semibold tracking-wider uppercase mb-4 text-sm">Members Only</span>
          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            The Midnight <br/> Capsule Collection
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Crafted from premium sustainable materials, designed for the modern urbanite. Available in extremely limited quantities.
          </p>
          <button className="bg-white text-[#111827] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] w-fit flex items-center gap-2">
            Unlock Early Access
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1550614000-4b95d466f168?q=80&w=2070&auto=format&fit=crop" 
            alt="Midnight Capsule Collection" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#111827]" />
        </div>
      </div>
    </section>
  );
}
