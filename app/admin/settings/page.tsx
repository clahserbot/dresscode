"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_discount: '',
    hero_image_url: '',
    whatsapp_phone: '',
    promo1_title: '',
    promo1_subtitle: '',
    promo1_image_url: '',
    promo1_product_id: '',
    promo2_title: '',
    promo2_subtitle: '',
    promo2_description: '',
    promo2_image_url: '',
    promo2_product_id: '',
    admin_username: '',
    admin_password: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle'|'compressing'|'uploading'|'saving'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({
          hero_title: data.hero_title || '',
          hero_subtitle: data.hero_subtitle || '',
          hero_discount: data.hero_discount || '',
          hero_image_url: data.hero_image_url || '',
          whatsapp_phone: data.whatsapp_phone || '',
          promo1_title: data.promo1_title || '',
          promo1_subtitle: data.promo1_subtitle || '',
          promo1_image_url: data.promo1_image_url || '',
          promo1_product_id: data.promo1_product_id || '',
          promo2_title: data.promo2_title || '',
          promo2_subtitle: data.promo2_subtitle || '',
          promo2_description: data.promo2_description || '',
          promo2_image_url: data.promo2_image_url || '',
          promo2_product_id: data.promo2_product_id || '',
          admin_username: '',
          admin_password: ''
        });
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageUrl = settings.hero_image_url;

    if (file) {
      setUploadStatus('compressing');
      try {
        const options = {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        
        if (compressedFile.size > 5 * 1024 * 1024) {
          alert("Image is still larger than 5MB after compression. Please choose a smaller file.");
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

    const payload = { ...currentSettings, ...settings, hero_image_url: finalImageUrl };
    if (!settings.admin_username) delete payload.admin_username;
    if (!settings.admin_password) delete payload.admin_password;

    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setSettings({...settings, hero_image_url: finalImageUrl, admin_username: '', admin_password: '' });
    setUploadStatus('idle');
    setFile(null);
    alert('Hero Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hero Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* HERO SECTION CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Hero Section</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Discount Text</label>
              <input 
                type="text" 
                value={settings.hero_discount} 
                onChange={e => setSettings({...settings, hero_discount: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
              <input 
                type="text" 
                value={settings.hero_title} 
                onChange={e => setSettings({...settings, hero_title: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Subtitle</label>
              <textarea 
                value={settings.hero_subtitle} 
                onChange={e => setSettings({...settings, hero_subtitle: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all h-28 resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Hero Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 text-center hover:bg-gray-50 transition-colors">
                {settings.hero_image_url && !file && (
                  <div className="mb-4 flex flex-col items-center">
                    <span className="text-sm text-gray-500 mb-2">Current image active</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={settings.hero_image_url} alt="Hero Preview" className="max-h-40 rounded-lg object-contain shadow-sm border border-gray-200" />
                  </div>
                )}
                {file && (
                  <div className="mb-4 flex flex-col items-center">
                    <span className="text-sm text-[#3C50E0] mb-2">New image selected</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
              <p className="mt-2 text-xs text-gray-500">Upload a new image to replace the current one. Max size 5MB after compression.</p>
            </div>
          </div>
        </div>

        {/* ADMIN ACCESS CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Admin Access</h2>
          <p className="text-sm text-gray-500 mb-6">Update your login credentials. Leave blank to keep current credentials.</p>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">New Admin Username</label>
              <input 
                type="text" 
                value={settings.admin_username} 
                onChange={e => setSettings({...settings, admin_username: e.target.value})} 
                placeholder="Leave blank to keep unchanged"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">New Admin Password</label>
              <input 
                type="password" 
                value={settings.admin_password} 
                onChange={e => setSettings({...settings, admin_password: e.target.value})} 
                placeholder="Leave blank to keep unchanged"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON CARD */}
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
