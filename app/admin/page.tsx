"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading) return <div className="text-sm text-neutral-500">Loading inventory...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light tracking-tight">Inventory</h1>
        <Link href="/admin/add" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors">
          <Plus size={16} /> New Product
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No products found.</td></tr>
              ) : products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4 min-w-[250px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.r2ImageUrl} alt={product.title} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                    <span className="font-medium text-gray-900 truncate">{product.title}</span>
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
