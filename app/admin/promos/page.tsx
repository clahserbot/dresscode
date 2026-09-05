"use client";

import { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

const ProductSelector = ({ products, value, onChange }: { products: any[], value: string, onChange: (val: string) => void }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const selectedProduct = products.find(p => p.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 bg-white outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all cursor-pointer flex justify-between items-center"
      >
        <span className={selectedProduct ? "text-gray-900 truncate pr-4" : "text-gray-400"}>
          {selectedProduct ? selectedProduct.title : "Select a product..."}
        </span>
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 flex flex-col">
          <div className="p-2 border-b border-gray-100">
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search products..." 
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-400 text-sm"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto p-1 flex-1">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-sm text-gray-500">No products found</div>
            ) : (
              filtered.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => { onChange(p.id); setIsOpen(false); setSearch(''); }} 
                  className={`px-3 py-2 rounded-lg cursor-pointer text-sm ${value === p.id ? 'bg-[#3C50E0] text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <div className="font-medium truncate">{p.title}</div>
                  <div className={`text-xs truncate ${value === p.id ? 'text-blue-100' : 'text-gray-400'}`}>{p.category}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function PromosSettingsPage() {
  const [settings, setSettings] = useState({
    promo1_title: '',
    promo1_subtitle: '',
    promo1_image_url: '',
    promo1_product_id: '',
    promo2_title: '',
    promo2_subtitle: '',
    promo2_description: '',
    promo2_image_url: '',
    promo2_product_id: ''
  });
  const [promo1File, setPromo1File] = useState<File | null>(null);
  const [promo2File, setPromo2File] = useState<File | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle'|'compressing'|'uploading'|'saving'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({
          promo1_title: data.promo1_title || '',
          promo1_subtitle: data.promo1_subtitle || '',
          promo1_image_url: data.promo1_image_url || '',
          promo1_product_id: data.promo1_product_id || '',
          promo2_title: data.promo2_title || '',
          promo2_subtitle: data.promo2_subtitle || '',
          promo2_description: data.promo2_description || '',
          promo2_image_url: data.promo2_image_url || '',
          promo2_product_id: data.promo2_product_id || ''
        });
      });

    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data || []);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const processUpload = async (f: File) => {
      const options = { maxSizeMB: 5, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(f, options);
      if (compressedFile.size > 5 * 1024 * 1024) throw new Error("Image too large");
      const urlRes = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: compressedFile.name, contentType: compressedFile.type }),
      });
      const { uploadUrl, publicUrl } = await urlRes.json();
      if (!uploadUrl) throw new Error("Failed to get URL");
      if (!uploadUrl.includes('mock-upload-url')) {
        await fetch(uploadUrl, { method: 'PUT', body: compressedFile, headers: { 'Content-Type': compressedFile.type } });
      }
      return publicUrl;
    };

    let p1Url = settings.promo1_image_url;
    let p2Url = settings.promo2_image_url;

    if (promo1File || promo2File) {
      setUploadStatus('uploading');
      try {
        if (promo1File) p1Url = await processUpload(promo1File);
        if (promo2File) p2Url = await processUpload(promo2File);
      } catch (err) {
        console.error(err);
        alert("Error uploading promo image");
        setUploadStatus('idle');
        return;
      }
    }

    setUploadStatus('saving');
    
    const currentRes = await fetch('/api/settings');
    const currentSettings = await currentRes.json();

    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...currentSettings, ...settings, promo1_image_url: p1Url, promo2_image_url: p2Url })
    });
    
    setSettings({...settings, promo1_image_url: p1Url, promo2_image_url: p2Url });
    setUploadStatus('idle');
    setPromo1File(null);
    setPromo2File(null);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Promotional Banners</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Banner 1 (Top / Left)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Title (e.g. Summer Sale)</label>
                <input 
                  type="text" 
                  value={settings.promo1_title} 
                  onChange={e => setSettings({...settings, promo1_title: e.target.value})} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Subtitle (e.g. Up to 20% off)</label>
                <input 
                  type="text" 
                  value={settings.promo1_subtitle} 
                  onChange={e => setSettings({...settings, promo1_subtitle: e.target.value})} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Target Product</label>
              <ProductSelector 
                products={products}
                value={settings.promo1_product_id}
                onChange={(val) => setSettings({...settings, promo1_product_id: val})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Promo 1 Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setPromo1File(e.target.files?.[0] || null)} 
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-black transition-colors cursor-pointer" 
              />
              {(settings.promo1_image_url || promo1File) && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500 block mb-1">Preview:</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={promo1File ? URL.createObjectURL(promo1File) : settings.promo1_image_url} alt="Promo 1 Preview" className="max-h-24 rounded-lg object-contain shadow-sm border border-gray-200" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-8 pt-6 border-t border-gray-100 text-gray-800">Banner 2 (Bottom / Right)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
                <input 
                  type="text" 
                  value={settings.promo2_title} 
                  onChange={e => setSettings({...settings, promo2_title: e.target.value})} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">Subtitle</label>
                <input 
                  type="text" 
                  value={settings.promo2_subtitle} 
                  onChange={e => setSettings({...settings, promo2_subtitle: e.target.value})} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Description</label>
              <input 
                type="text" 
                value={settings.promo2_description} 
                onChange={e => setSettings({...settings, promo2_description: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Target Product</label>
              <ProductSelector 
                products={products}
                value={settings.promo2_product_id}
                onChange={(val) => setSettings({...settings, promo2_product_id: val})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Promo 2 Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setPromo2File(e.target.files?.[0] || null)} 
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-black transition-colors cursor-pointer" 
              />
              {(settings.promo2_image_url || promo2File) && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500 block mb-1">Preview:</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={promo2File ? URL.createObjectURL(promo2File) : settings.promo2_image_url} alt="Promo 2 Preview" className="max-h-24 rounded-lg object-contain shadow-sm border border-gray-200" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex justify-end">
          <button 
            type="submit" 
            disabled={uploadStatus !== 'idle'}
            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {uploadStatus !== 'idle' && <Loader2 className="w-5 h-5 animate-spin" />}
            {uploadStatus === 'compressing' ? 'Compressing Image...' : 
             uploadStatus === 'uploading' ? 'Uploading Image...' : 
             uploadStatus === 'saving' ? 'Saving Settings...' : 
             'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
