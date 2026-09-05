"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function CheckoutSettingsPage() {
  const [settings, setSettings] = useState({
    whatsapp_phone: '',
  });
  const [uploadStatus, setUploadStatus] = useState<'idle'|'saving'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({
          whatsapp_phone: data.whatsapp_phone || '',
        });
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('saving');
    
    // We only update the checkout settings but need to preserve others
    // Fetch current first to avoid overwriting with empties if we didn't fetch them
    const currentRes = await fetch('/api/settings');
    const currentSettings = await currentRes.json();
    
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...currentSettings, whatsapp_phone: settings.whatsapp_phone })
    });
    setUploadStatus('idle');
    alert('Checkout Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Checkout Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">WhatsApp Phone Number</label>
              <input 
                type="text" 
                value={settings.whatsapp_phone} 
                onChange={e => setSettings({...settings, whatsapp_phone: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                placeholder="e.g. 919876543210 (include country code, no +)"
              />
              <p className="mt-2 text-xs text-gray-500">The phone number to which WhatsApp orders will be sent.</p>
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
            {uploadStatus === 'saving' ? 'Saving Settings...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
