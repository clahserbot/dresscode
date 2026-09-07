"use client";

import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { Loader2 } from 'lucide-react';

type Category = { id: string; name: string; slug: string; whatsappMessage?: string; imageUrl?: string };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle'|'compressing'|'uploading'|'saving'>('idle');

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editWhatsappMessage, setEditWhatsappMessage] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editUploadStatus, setEditUploadStatus] = useState<'idle'|'compressing'|'uploading'|'saving'>('idle');

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

    let imageUrl = '';
    
    if (file) {
      setUploadStatus('compressing');
      try {
        const compressedFile = await imageCompression(file, { maxSizeMB: 5, maxWidthOrHeight: 1920, useWebWorker: true });
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
          await fetch(uploadUrl, { method: 'PUT', body: compressedFile, headers: { 'Content-Type': compressedFile.type } });
        }
        imageUrl = publicUrl;
      } catch (err) {
        console.error(err);
        alert("Error uploading image");
        setUploadStatus('idle');
        return;
      }
    }

    setUploadStatus('saving');
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, whatsappMessage, imageUrl: imageUrl || undefined })
    });
    setName('');
    setSlug('');
    setWhatsappMessage('');
    setFile(null);
    setUploadStatus('idle');
    fetchCategories();
  };

  const startEdit = (c: Category) => {
    setEditingId(c.id);
    setEditName(c.name);
    setEditSlug(c.slug);
    setEditWhatsappMessage(c.whatsappMessage || '');
    setEditFile(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editName || !editSlug) return;
    
    const category = categories.find(c => c.id === editingId);
    let imageUrl = category?.imageUrl || '';
    
    if (editFile) {
      setEditUploadStatus('compressing');
      try {
        const compressedFile = await imageCompression(editFile, { maxSizeMB: 5, maxWidthOrHeight: 1920, useWebWorker: true });
        if (compressedFile.size > 5 * 1024 * 1024) {
          alert("Image is still larger than 5MB after compression.");
          setEditUploadStatus('idle');
          return;
        }

        setEditUploadStatus('uploading');
        const urlRes = await fetch('/api/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: compressedFile.name, contentType: compressedFile.type }),
        });
        const { uploadUrl, publicUrl } = await urlRes.json();
        if (!uploadUrl) throw new Error("Failed to get presigned URL");

        if (!uploadUrl.includes('mock-upload-url')) {
          await fetch(uploadUrl, { method: 'PUT', body: compressedFile, headers: { 'Content-Type': compressedFile.type } });
        }
        imageUrl = publicUrl;
      } catch (err) {
        console.error(err);
        alert("Error uploading image");
        setEditUploadStatus('idle');
        return;
      }
    }

    setEditUploadStatus('saving');
    await fetch('/api/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, name: editName, slug: editSlug, whatsappMessage: editWhatsappMessage, imageUrl: imageUrl || undefined })
    });
    
    setEditingId(null);
    setEditUploadStatus('idle');
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
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Category Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all bg-white" 
              />
            </div>
            <button 
              type="submit" 
              disabled={uploadStatus !== 'idle'}
              className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black transition-colors mt-2 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {uploadStatus !== 'idle' && <Loader2 className="w-4 h-4 animate-spin" />}
              {uploadStatus === 'idle' ? 'Add Category' : 
               uploadStatus === 'compressing' ? 'Compressing...' :
               uploadStatus === 'uploading' ? 'Uploading...' : 'Saving...'}
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Existing Categories</h2>
          <div className="space-y-3">
            {categories.map(c => (
              <div key={c.id} className="flex flex-col p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
                {editingId === c.id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={editName} 
                        onChange={e => {
                          setEditName(e.target.value);
                          setEditSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                        }} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Slug</label>
                      <input 
                        type="text" 
                        value={editSlug} 
                        onChange={e => setEditSlug(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm bg-gray-50" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">WhatsApp Message</label>
                      <textarea 
                        value={editWhatsappMessage} 
                        onChange={e => setEditWhatsappMessage(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm resize-none h-16" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Update Image</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            setEditFile(e.target.files[0]);
                          }
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm bg-white" 
                      />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        type="submit" 
                        disabled={editUploadStatus !== 'idle'}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
                      >
                        {editUploadStatus !== 'idle' && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editUploadStatus === 'idle' ? 'Save' : 
                         editUploadStatus === 'compressing' ? 'Compressing...' :
                         editUploadStatus === 'uploading' ? 'Uploading...' : 'Saving...'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEditingId(null)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-start w-full gap-4">
                      {c.imageUrl && (
                        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{c.name}</p>
                        <p className="text-sm text-gray-500 truncate">/{c.slug}</p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2">
                        <button 
                          onClick={() => startEdit(c)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors text-right"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(c.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors text-right"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {c.whatsappMessage && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-100">
                        <span className="font-semibold text-green-800">WhatsApp MSG:</span> {c.whatsappMessage}
                      </div>
                    )}
                  </>
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
