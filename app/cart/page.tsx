"use client";

import { useCart } from '@/hooks/useStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [settings, setSettings] = useState<{ whatsapp_phone?: string }>({});
  const [categories, setCategories] = useState<{ slug: string; whatsappMessage?: string }[]>([]);

  useEffect(() => {
    fetch('/api/settings').then(res => res.json()).then(setSettings).catch(console.error);
    fetch('/api/categories').then(res => res.json()).then(setCategories).catch(console.error);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let text = "Hi, I would like to order:\n\n";
    cart.forEach(item => {
      // Find category message if exists
      const cat = categories.find(c => c.slug === item.category);
      if (cat?.whatsappMessage) {
        text += `[${cat.whatsappMessage}]\n`;
      }
      text += `- ${item.title} (Size: ${item.size}) - ₹${item.price.toFixed(2)}\n\n`;
    });
    text += `Total: ₹${total.toFixed(2)}`;

    const phone = settings.whatsapp_phone || process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '1234567890';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-[#111827]">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link href="/" className="text-[#3C50E0] font-medium hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-4 p-4 border rounded-xl bg-white items-center">
                <img src={item.r2ImageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-lg bg-gray-50" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[#111827]">{item.title}</h3>
                  <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  <p className="font-medium mt-1">₹{item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-gray-400 hover:text-red-500 p-2"
                  title="Remove item"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6 pt-4 border-t border-gray-200 text-[#111827]">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#111827] text-white py-3 rounded-lg font-medium hover:bg-[#3C50E0] transition-colors"
            >
              Checkout on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
