"use client";

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';

type Photo = {
  id: number;
  image: string;
  handle: string;
};

const defaultPhotos: Photo[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop", handle: "@fashionforward" },
  { id: 2, image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1000&auto=format&fit=crop", handle: "@urbanstyle" },
  { id: 3, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop", handle: "@minimalist" },
  { id: 4, image: "https://images.unsplash.com/photo-1485231183945-fffde7cc051e?q=80&w=1000&auto=format&fit=crop", handle: "@streetchic" },
];

export default function GalleryAdmin() {
  const [settings, setSettings] = useState({
    gallery_title: 'Worn By You',
    gallery_subtitle: 'Tag @DressCode to be featured in our gallery.',
    gallery_photos: JSON.stringify(defaultPhotos)
  });
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle'|'saving'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        const pString = data.gallery_photos || JSON.stringify(defaultPhotos);
        let parsed = defaultPhotos;
        try { parsed = JSON.parse(pString); } catch(e){}
        setPhotos(parsed);
        setSettings({
          gallery_title: data.gallery_title || 'Worn By You',
          gallery_subtitle: data.gallery_subtitle || 'Tag @DressCode to be featured in our gallery.',
          gallery_photos: pString
        });
      });
  }, []);

  const handlePhotoChange = (index: number, field: keyof Photo, value: any) => {
    const newP = [...photos];
    newP[index] = { ...newP[index], [field]: value };
    setPhotos(newP);
  };

  const addPhoto = () => {
    setPhotos([...photos, { id: Date.now(), image: '', handle: '@new_user' }]);
  };

  const removePhoto = (index: number) => {
    const newP = [...photos];
    newP.splice(index, 1);
    setPhotos(newP);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('saving');
    
    const currentRes = await fetch('/api/settings');
    const currentSettings = await currentRes.json();

    const toSave = { 
        ...currentSettings, 
        gallery_title: settings.gallery_title,
        gallery_subtitle: settings.gallery_subtitle,
        gallery_photos: JSON.stringify(photos)
    };

    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toSave)
    });
    
    setSettings({
        ...settings,
        gallery_photos: JSON.stringify(photos)
    });
    setUploadStatus('idle');
    alert('Gallery Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gallery Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Main Content</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
              <input 
                type="text" 
                value={settings.gallery_title} 
                onChange={e => setSettings({...settings, gallery_title: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Subtitle</label>
              <input 
                type="text" 
                value={settings.gallery_subtitle} 
                onChange={e => setSettings({...settings, gallery_subtitle: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
            <button type="button" onClick={addPhoto} className="text-sm flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors">
              <Plus size={16} /> Add Photo
            </button>
          </div>
          <div className="space-y-6">
            {photos.map((p, idx) => (
              <div key={p.id} className="border border-gray-200 p-4 rounded-xl relative flex items-center gap-4">
                <button type="button" onClick={() => removePhoto(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
                {p.image && <img src={p.image} alt={p.handle} className="w-16 h-16 object-cover rounded-xl shadow-sm" />}
                <div className="flex-1 grid grid-cols-2 gap-4 mr-10">
                    <div>
                        <label className="block text-xs font-medium mb-1">Handle</label>
                        <input type="text" value={p.handle} onChange={e => handlePhotoChange(idx, 'handle', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-medium mb-1">Image URL</label>
                        <input type="text" value={p.image} onChange={e => handlePhotoChange(idx, 'image', e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
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
            {uploadStatus === 'idle' ? 'Save Settings' : 'Saving...'}
          </button>
        </div>
      </form>
    </div>
  );
}
