import React, { useState, useEffect } from 'react';
import { Save, User } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { supabase } from '../../lib/supabase';

export default function AdminProfile() {
  const { adminUser } = useAdminAuth();
  const [form, setForm] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
    specialty: '',
    twitter: '',
    linkedin: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (adminUser) {
      setForm({
        full_name: adminUser.full_name || '',
        bio: adminUser.bio || '',
        avatar_url: adminUser.avatar_url || '',
        specialty: adminUser.specialty || '',
        twitter: adminUser.twitter || '',
        linkedin: adminUser.linkedin || '',
      });
    }
  }, [adminUser]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!adminUser) return;
    setIsSaving(true);
    const { error } = await supabase.from('users').update(form).eq('id', adminUser.id);
    setIsSaving(false);
    setMessage(error ? 'Failed to save. Try again.' : 'Profile saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display font-bold text-brand-black dark:text-white text-2xl">My Profile</h1>
        <p className="text-neutral-500 text-sm mt-1 font-serif">Your profile appears on every article you write.</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800 p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
            {form.avatar_url ? (
              <img src={form.avatar_url} alt={form.full_name} className="w-full h-full object-cover" />
            ) : (
              (adminUser?.full_name || 'A')[0].toUpperCase()
            )}
          </div>
          <div>
            <p className="font-medium text-brand-black dark:text-white">{adminUser?.full_name || 'Admin'}</p>
            <p className="text-sm text-neutral-500 capitalize">{adminUser?.role} &bull; {adminUser?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Specialty</label>
              <input
                type="text"
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                placeholder="e.g. Technology Reporter"
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Write a short bio that will appear on your articles..."
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors resize-none font-serif leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Avatar URL</label>
            <input
              type="url"
              name="avatar_url"
              value={form.avatar_url}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Twitter/X</label>
              <input
                type="text"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                placeholder="@username"
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
          </div>

          {message && (
            <p className={`text-xs font-medium ${message.includes('Failed') ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-60"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
