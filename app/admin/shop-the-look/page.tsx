"use client";

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

type Hotspot = {
  id: string;
  x: number;
  y: number;
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
  }
];

export default function ShopTheLookAdmin() {
  const [settings, setSettings] = useState({
    stl_title: 'Shop The Look',
    stl_subtitle: 'Curated pieces for the urban explorer.',
    stl_image_url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    stl_hotspots: JSON.stringify(defaultHotspots)
  });
  
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle'|'compressing'|'uploading'|'saving'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        const hString = data.stl_hotspots || JSON.stringify(defaultHotspots);
        let parsed = defaultHotspots;
        try { parsed = JSON.parse(hString); } catch(e){}
        setHotspots(parsed);
        setSettings({
          stl_title: data.stl_title || 'Shop The Look',
          stl_subtitle: data.stl_subtitle || 'Curated pieces for the urban explorer.',
          stl_image_url: data.stl_image_url || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
          stl_hotspots: hString
        });
      });
  }, []);

  const handleHotspotChange = (index: number, field: keyof Hotspot, value: any) => {
    const newH = [...hotspots];
    newH[index] = { ...newH[index], [field]: value };
    setHotspots(newH);
  };

  const addHotspot = () => {
    setHotspots([...hotspots, { id: Date.now().toString(), x: 50, y: 50, title: 'New Item', price: '₹0', image: '' }]);
  };

  const removeHotspot = (index: number) => {
    const newH = [...hotspots];
    newH.splice(index, 1);
    setHotspots(newH);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageUrl = settings.stl_image_url;

    if (file) {
      setUploadStatus('compressing');
      try {
        const options = { maxSizeMB: 5, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        
        if (compressedFile.size > 5 * 1024 * 1024) {
          alert("Image is still larger than 5MB after compression.");
          setUploadStatus('idle');
          return;
        }

        setUploadStatus('uploading');
        const urlRes = await fetch('/api/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: compressedFile.name, contentType: compressedFile.type }),
        });
        const { uploadUrl, publicUrl } = await urlRes.json();
        
        if (!uploadUrl) throw new Error("Failed to get presigned URL");

        if (!uploadUrl.includes('mock-upload-url')) {
          await fetch(uploadUrl, {
            method: 'PUT',
            body: compressedFile,
            headers: { 'Content-Type': compressedFile.type }
          });
        }
        finalImageUrl = publicUrl;
      } catch (err) {
        console.error(err);
        alert("Error uploading image");
        setUploadStatus('idle');
        return;
      }
    }

    setUploadStatus('saving');
    
    const currentRes = await fetch('/api/settings');
    const currentSettings = await currentRes.json();

    const toSave = { 
        ...currentSettings, 
        stl_title: settings.stl_title,
        stl_subtitle: settings.stl_subtitle,
        stl_image_url: finalImageUrl,
        stl_hotspots: JSON.stringify(hotspots)
    };

    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toSave)
    });
    
    setSettings({
        ...settings,
        stl_image_url: finalImageUrl,
        stl_hotspots: JSON.stringify(hotspots)
    });
    setUploadStatus('idle');
    setFile(null);
    alert('Shop The Look Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shop The Look Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Main Content</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
              <input 
                type="text" 
                value={settings.stl_title} 
                onChange={e => setSettings({...settings, stl_title: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Subtitle</label>
              <input 
                type="text" 
                value={settings.stl_subtitle} 
                onChange={e => setSettings({...settings, stl_subtitle: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Background Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 text-center hover:bg-gray-50 transition-colors">
                {settings.stl_image_url && !file && (
                  <div className="mb-4 flex flex-col items-center">
                    <span className="text-sm text-gray-500 mb-2">Current image active</span>
                    <img src={settings.stl_image_url} alt="Hero Preview" className="max-h-40 rounded-lg object-contain shadow-sm border border-gray-200" />
                  </div>
                )}
                {file && (
                  <div className="mb-4 flex flex-col items-center">
                    <span className="text-sm text-[#3C50E0] mb-2">New image selected</span>
                    <img src={URL.createObjectURL(file)} alt="Hero Preview" className="max-h-40 rounded-lg object-contain shadow-sm border border-gray-200" />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-black transition-colors cursor-pointer" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Hotspots</h2>
            <button type="button" onClick={addHotspot} className="text-sm flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors">
              <Plus size={16} /> Add Hotspot
            </button>
          </div>
          <div className="space-y-6">
            {hotspots.map((h, idx) => (
              <div key={h.id} className="border border-gray-200 p-4 rounded-xl relative">
                <button type="button" onClick={() => removeHotspot(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-2 gap-4 mr-10">
                    <div>
                        <label className="block text-xs font-medium mb-1">Title</label>
                        <input type="text" value={h.title} onChange={e => handleHotspotChange(idx, 'title', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Price</label>
                        <input type="text" value={h.price} onChange={e => handleHotspotChange(idx, 'price', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">X Position (%)</label>
                        <input type="number" value={h.x} onChange={e => handleHotspotChange(idx, 'x', Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">Y Position (%)</label>
                        <input type="number" value={h.y} onChange={e => handleHotspotChange(idx, 'y', Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-medium mb-1">Image URL</label>
                        <input type="text" value={h.image} onChange={e => handleHotspotChange(idx, 'image', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex justify-end">
          <button 
            type="submit" 
            disabled={uploadStatus !== 'idle'}
            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {uploadStatus !== 'idle' && <Loader2 className="w-5 h-5 animate-spin" />}
            {uploadStatus === 'idle' ? 'Save Settings' : uploadStatus}
          </button>
        </div>
      </form>
    </div>
  );
}
