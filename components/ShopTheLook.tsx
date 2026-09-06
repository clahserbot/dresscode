"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export type Hotspot = {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  price: string;
  image: string;
};

const defaultHotspots: Hotspot[] = [
  {
    id: "1",
    x: 45,
    y: 30,
    title: "Oversized Wool Coat",
    price: "₹8,499",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "2",
    x: 55,
    y: 55,
    title: "Minimalist Crossbody Bag",
    price: "₹3,299",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "3",
    x: 48,
    y: 85,
    title: "Wide-Leg Trousers",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop"
  }
];

type ShopTheLookProps = {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  hotspots?: Hotspot[];
};

export default function ShopTheLook({ 
  title = "Shop The Look", 
  subtitle = "Curated pieces for the urban explorer.", 
  imageUrl = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", 
  hotspots = defaultHotspots 
}: ShopTheLookProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // We need to parse hotspots if they are passed as a JSON string from DB, but let's assume they are parsed before passing.
  return (
    <section className="mb-24 relative group aspect-[4/5] md:aspect-[21/9]">
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
      </div>

      <div className="absolute top-10 left-10 md:top-16 md:left-16 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">{title}</h2>
        <p className="text-white/90 mt-2 text-lg drop-shadow-md">{subtitle}</p>
      </div>

      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute z-20"
          style={{ top: `${spot.y}%`, left: `${spot.x}%`, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setActiveHotspot(spot.id)}
          onMouseLeave={() => setActiveHotspot(null)}
        >
          {/* Pulsing Dot */}
          <div className="relative flex h-6 w-6 items-center justify-center cursor-pointer">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-lg"></span>
          </div>

          {/* Tooltip Card */}
          <AnimatePresence>
            {activeHotspot === spot.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-white/70 backdrop-blur-xl border border-white/20 p-3 rounded-2xl shadow-2xl flex items-center gap-4 cursor-default pointer-events-auto"
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <img src={spot.image} alt={spot.title} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#111827] text-sm leading-tight">{spot.title}</h4>
                  <p className="text-[#3C50E0] font-bold text-sm mt-1">{spot.price}</p>
                </div>
                <button className="h-8 w-8 bg-[#111827] text-white rounded-full flex items-center justify-center hover:bg-[#3C50E0] transition-colors shrink-0">
                  <ShoppingBag size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
}
