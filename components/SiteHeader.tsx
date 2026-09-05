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

  return (
    <header className="sticky top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 h-20 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-700 hover:text-[#3C50E0]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tight text-[#3C50E0] flex items-center gap-2">
          <span className="w-8 h-8 bg-[#3C50E0] text-white rounded-lg flex items-center justify-center text-lg hidden sm:flex">D</span>
          DressCode
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-sm font-medium text-gray-800 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="hover:text-[#3C50E0] transition-colors">Home</Link>
          {categories.slice(0, 4).map(c => (
            <Link key={c.id} href={`/?category=${c.slug}`} className="hover:text-[#3C50E0] transition-colors">{c.name}</Link>
          ))}
        </nav>
        
        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-5 text-gray-700">
          <button 
            aria-label="Search" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-[#3C50E0] transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          
          <WishlistWidget />
          <CartWidget />
        </div>
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 shadow-md flex justify-center animate-in fade-in slide-in-from-top-4">
          <form onSubmit={handleSearch} className="w-full max-w-2xl flex gap-2 relative">
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3C50E0]"
              autoFocus
            />
            <button type="submit" className="bg-[#111827] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#3C50E0] transition">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-md">
          <nav className="flex flex-col p-4 gap-4 text-base font-medium text-gray-800">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#3C50E0] border-b pb-2">Home</Link>
            {categories.map(c => (
               <Link key={c.id} href={`/?category=${c.slug}`} onClick={() => setIsMenuOpen(false)} className="hover:text-[#3C50E0] border-b pb-2">{c.name}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
