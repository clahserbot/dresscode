"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CartWidget, WishlistWidget } from './HeaderWidgets';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<{id: string, name: string, slug: string}[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 h-20 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden relative p-2 text-gray-700 hover:text-[#3C50E0] transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
            {isMenuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
            )}
          </svg>
          <span className="absolute inset-0 rounded-lg bg-[#3C50E0]/10 scale-0 hover:scale-100 transition-transform duration-300 -z-10"></span>
        </button>

        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tight text-[#3C50E0] flex items-center gap-2 group">
          <span className="w-8 h-8 bg-gradient-to-br from-[#3C50E0] to-[#7C3AED] text-white rounded-lg flex items-center justify-center text-lg hidden sm:flex shadow-lg shadow-[#3C50E0]/30 group-hover:shadow-[#3C50E0]/50 transition-shadow">D</span>
          <span className="bg-gradient-to-r from-[#3C50E0] to-[#7C3AED] bg-clip-text text-transparent">DressCode</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-sm font-medium text-gray-800 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="relative hover:text-[#3C50E0] transition-colors group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3C50E0] to-[#7C3AED] group-hover:w-full transition-all duration-300"></span>
          </Link>
          {categories.slice(0, 4).map(c => (
            <Link key={c.id} href={`/?category=${c.slug}`} className="relative hover:text-[#3C50E0] transition-colors group">
              {c.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3C50E0] to-[#7C3AED] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
        
        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-5 text-gray-700">
          <button 
            aria-label="Search" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-[#3C50E0] transition p-2 rounded-lg hover:bg-[#3C50E0]/5"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <WishlistWidget />
          <CartWidget />
        </div>
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 p-4 shadow-lg flex justify-center animate-in fade-in slide-in-from-top-4">
          <form onSubmit={handleSearch} className="w-full max-w-2xl flex gap-2 relative">
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3C50E0]/50 bg-gray-50/50 focus:bg-white transition-all"
              autoFocus
            />
            <button type="submit" className="bg-gradient-to-r from-[#111827] to-[#3C50E0] text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-[#3C50E0]/30 transition">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Dropdown - Futuristic Design */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 top-20 bg-gradient-to-br from-[#3C50E0]/10 via-[#7C3AED]/5 to-[#111827]/20 backdrop-blur-sm z-40 animate-fade-in"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="lg:hidden absolute top-20 left-0 w-full z-50 animate-slide-down">
            <div className="relative mx-4 mt-2 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-2xl shadow-[#3C50E0]/10">
              {/* Gradient Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3C50E0] via-[#7C3AED] to-[#EC4899]"></div>
              
              {/* Glow Orbs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#3C50E0]/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <nav className="relative flex flex-col p-6 gap-1">
                <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 px-3">Navigation</div>
                
                <Link 
                  href="/" 
                  onClick={closeMenu} 
                  className="group relative flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-gray-800 hover:bg-gradient-to-r hover:from-[#3C50E0]/10 hover:to-transparent hover:text-[#3C50E0] transition-all duration-300 overflow-hidden"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#3C50E0] group-hover:shadow-[0_0_8px_#3C50E0] transition-all duration-300"></span>
                  <span className="flex-1">Home</span>
                  <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
                
                {categories.map((c, i) => (
                  <Link 
                    key={c.id} 
                    href={`/?category=${c.slug}`} 
                    onClick={closeMenu} 
                    className="group relative flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-gray-800 hover:bg-gradient-to-r hover:from-[#3C50E0]/10 hover:to-transparent hover:text-[#3C50E0] transition-all duration-300 overflow-hidden"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#3C50E0] group-hover:shadow-[0_0_8px_#3C50E0] transition-all duration-300"></span>
                    <span className="flex-1">{c.name}</span>
                    <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                ))}
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 px-3">Quick Access</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href="/wishlist" 
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-[#3C50E0] hover:text-white transition-all duration-300"
                    >
                      <span>♡</span> Wishlist
                    </Link>
                    <Link 
                      href="/cart" 
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#3C50E0] to-[#7C3AED] hover:shadow-lg hover:shadow-[#3C50E0]/40 transition-all duration-300"
                    >
                      <span>🛒</span> Cart
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
