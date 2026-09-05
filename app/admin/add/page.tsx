"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function AddProductPage() {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState<'idle'|'compressing'|'uploading'|'saving'>('idle');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image");
      return;
    }

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
      
      // 1. Get presigned URL
      const urlRes = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: compressedFile.name, contentType: compressedFile.type }),
      });
      const { uploadUrl, publicUrl } = await urlRes.json();

      if (!uploadUrl) throw new Error("Failed to get presigned URL");

      // 2. Upload to S3/Supabase directly from browser
      if (!uploadUrl.includes('mock-upload-url')) {
        await fetch(uploadUrl, {
          method: 'PUT',
          body: compressedFile,
          headers: {
            'Content-Type': compressedFile.type,
          }
        });
      }

      setUploadStatus('saving');
      // 3. Save product to database
      const formData = new FormData(e.currentTarget);
      const sizesStr = formData.get('sizes') as string;
      const productData = {
        title: formData.get('title'),
        price: formData.get('price'),
        description: formData.get('description'),
        category: formData.get('category'),
        sizes: sizesStr.split(',').map(s => s.trim()),
        r2ImageUrl: publicUrl,
      };

      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      router.push('/admin');
    } catch (err) {
      console.error(err);
      alert("Error adding product");
      setUploadStatus('idle');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-gray-900">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
          <input required name="title" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" placeholder="Silk Blend Overcoat" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Price (₹)</label>
            <input required name="price" type="number" step="0.01" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" placeholder="299.99" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Category</label>
            <select required name="category" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all">
              <option value="outerwear">Outerwear</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Sizes (comma separated)</label>
          <input required name="sizes" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" placeholder="S, M, L, XL" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Description</label>
          <textarea required name="description" rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none" placeholder="A brief description of the product..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Product Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 text-center hover:bg-gray-50 transition-colors">
            <input required type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-black transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
          <button 
            type="button"
            onClick={() => router.push('/admin')}
            className="px-6 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={uploadStatus !== 'idle'}
            className="bg-gray-900 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-black disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {uploadStatus !== 'idle' && <Loader2 className="w-4 h-4 animate-spin" />}
            {uploadStatus === 'compressing' ? 'Compressing Image...' : 
             uploadStatus === 'uploading' ? 'Uploading Image...' : 
             uploadStatus === 'saving' ? 'Publishing...' : 
             'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
