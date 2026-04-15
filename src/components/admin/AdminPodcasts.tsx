import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Mic, X, Save } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi } from '../../lib/adminAuth';

interface PodcastForm {
  title: string;
  guest: string;
  episode_number: string;
  duration: string;
  youtube_url: string;
  audio_url: string;
  cover_image: string;
  description: string;
  status: 'published' | 'draft';
}

const EMPTY_FORM: PodcastForm = {
  title: '',
  guest: '',
  episode_number: '',
  duration: '',
  youtube_url: '',
  audio_url: '',
  cover_image: '',
  description: '',
  status: 'draft',
};

export default function AdminPodcasts() {
  const { adminUser } = useAdminAuth();
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PodcastForm>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (!adminUser) return;
    loadPodcasts();
  }, [adminUser]);

  async function loadPodcasts() {
    if (!adminUser) return;
    setIsLoading(true);
    const { data } = await adminApi.podcasts.getByAdmin(adminUser.id);
    setPodcasts(data || []);
    setIsLoading(false);
  }

  function openCreate() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(ep: any) {
    setEditId(ep.id);
    setForm({
      title: ep.title || '',
      guest: ep.guest || '',
      episode_number: ep.episode_number ? String(ep.episode_number) : '',
      duration: ep.duration || '',
      youtube_url: ep.youtube_url || '',
      audio_url: ep.audio_url || '',
      cover_image: ep.cover_image || '',
      description: ep.description || '',
      status: ep.status || 'draft',
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!adminUser || !form.title.trim()) return;
    setIsSaving(true);

    const payload = {
      ...form,
      episode_number: form.episode_number ? parseInt(form.episode_number) : null,
      admin_id: adminUser.id,
    };

    let error = null;
    if (editId) {
      const res = await adminApi.podcasts.update(editId, payload);
      error = res.error;
      if (!error) setPodcasts(prev => prev.map(p => p.id === editId ? { ...p, ...payload } : p));
    } else {
      const res = await adminApi.podcasts.create(payload);
      error = res.error;
      if (!error && res.data) setPodcasts(prev => [res.data, ...prev]);
    }

    setIsSaving(false);
    if (error) {
      setSaveMsg('Failed to save.');
    } else {
      setSaveMsg('Saved!');
      setShowForm(false);
    }
    setTimeout(() => setSaveMsg(''), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this episode? This cannot be undone.')) return;
    setDeleting(id);
    await adminApi.podcasts.delete(id);
    setPodcasts(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-brand-black dark:text-white text-2xl">Podcasts</h1>
          <p className="text-neutral-500 text-sm mt-1">{podcasts.length} episodes total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
        >
          <Plus size={15} /> Add Episode
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="font-display font-bold text-brand-black dark:text-white">{editId ? 'Edit Episode' : 'Add Episode'}</h2>
              <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Episode Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Guest Name</label>
                  <input
                    type="text"
                    value={form.guest}
                    onChange={e => setForm(f => ({ ...f, guest: e.target.value }))}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Episode #</label>
                  <input
                    type="number"
                    value={form.episode_number}
                    onChange={e => setForm(f => ({ ...f, episode_number: e.target.value }))}
                    placeholder="e.g. 42"
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Duration</label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                  placeholder="e.g. 1:24:35"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">YouTube URL</label>
                <input
                  type="url"
                  value={form.youtube_url}
                  onChange={e => setForm(f => ({ ...f, youtube_url: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Audio URL</label>
                <input
                  type="url"
                  value={form.audio_url}
                  onChange={e => setForm(f => ({ ...f, audio_url: e.target.value }))}
                  placeholder="Direct audio file or podcast platform URL..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Cover Image URL</label>
                <input
                  type="url"
                  value={form.cover_image}
                  onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {saveMsg && (
                <p className={`text-xs font-medium ${saveMsg.includes('Failed') ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>{saveMsg}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 text-sm border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-sm hover:border-neutral-400 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving || !form.title} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm bg-brand-red text-white rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-50">
                  {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={13} />}
                  {editId ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            ))}
          </div>
        ) : podcasts.length === 0 ? (
          <div className="text-center py-14">
            <Mic size={36} className="mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />
            <p className="text-neutral-500 text-sm mb-3">No podcast episodes yet.</p>
            <button onClick={openCreate} className="text-sm text-brand-red hover:underline">Add your first episode</button>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {podcasts.map(ep => (
              <div key={ep.id} className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                {ep.cover_image ? (
                  <div className="w-12 h-12 rounded flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img src={ep.cover_image} alt={ep.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <Mic size={16} className="text-neutral-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {ep.episode_number && (
                      <span className="text-[10px] font-bold text-brand-red">EP {ep.episode_number}</span>
                    )}
                    <p className="text-sm font-medium text-brand-black dark:text-white line-clamp-1">{ep.title}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {ep.guest && <span className="text-[10px] text-neutral-400">Guest: {ep.guest}</span>}
                    {ep.duration && <span className="text-[10px] text-neutral-400">{ep.duration}</span>}
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm ${
                      ep.status === 'published'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}>{ep.status || 'draft'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(ep)} className="p-1.5 text-neutral-400 hover:text-brand-red transition-colors rounded">
                    <Edit size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(ep.id)}
                    disabled={deleting === ep.id}
                    className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors rounded disabled:opacity-40"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
