"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AccountSettingsPage() {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle'|'saving'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername && !adminPassword) {
      alert('Please enter a new username or password to update.');
      return;
    }

    setSaveStatus('saving');
    
    try {
      const payload: Record<string, string> = {};
      if (adminUsername) payload.admin_username = adminUsername;
      if (adminPassword) payload.admin_password = adminPassword;

      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      setAdminUsername('');
      setAdminPassword('');
      alert('Admin credentials updated successfully! You may need to log in again.');
    } catch (err) {
      console.error(err);
      alert('Failed to update credentials.');
    } finally {
      setSaveStatus('idle');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Admin Access</h2>
          <p className="text-sm text-gray-500 mb-6">Update your login credentials. Leave blank to keep current credentials.</p>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">New Admin Username</label>
              <input 
                type="text" 
                value={adminUsername} 
                onChange={e => setAdminUsername(e.target.value)} 
                placeholder="Leave blank to keep unchanged"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">New Admin Password</label>
              <input 
                type="password" 
                value={adminPassword} 
                onChange={e => setAdminPassword(e.target.value)} 
                placeholder="Leave blank to keep unchanged"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex justify-end">
          <button 
            type="submit" 
            disabled={saveStatus !== 'idle'}
            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {saveStatus !== 'idle' && <Loader2 className="w-5 h-5 animate-spin" />}
            {saveStatus === 'saving' ? 'Saving...' : 'Save Credentials'}
          </button>
        </div>
      </form>
    </div>
  );
}
