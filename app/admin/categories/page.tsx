"use client";

import { useState, useEffect } from 'react';

type Category = { id: string; name: string; slug: string; whatsappMessage?: string };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    if (res.ok) setCategories(await res.json());
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, whatsappMessage })
    });
    setName('');
    setSlug('');
    setWhatsappMessage('');
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Add Category Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Add Category</h2>
          <form onSubmit={handleAdd} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                }} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
                placeholder="e.g. Outerwear"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Slug</label>
              <input 
                type="text" 
                value={slug} 
                onChange={e => setSlug(e.target.value)} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all bg-gray-50" 
                placeholder="e.g. outerwear"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">WhatsApp Custom Message (Optional)</label>
              <textarea 
                value={whatsappMessage} 
                onChange={e => setWhatsappMessage(e.target.value)} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none h-24" 
                placeholder="e.g. Great choice! We will verify this dress availability."
              />
              <p className="text-xs text-gray-500 mt-1">This message will be included when a customer checks out an item from this category.</p>
            </div>
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black transition-colors mt-2"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Existing Categories</h2>
          <div className="space-y-3">
            {categories.map(c => (
              <div key={c.id} className="flex flex-col p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <p className="text-sm text-gray-500">/{c.slug}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
                {c.whatsappMessage && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-100">
                    <span className="font-semibold text-green-800">WhatsApp MSG:</span> {c.whatsappMessage}
                  </div>
                )}
              </div>
            ))}
            {categories.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-500 text-sm">No categories found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
