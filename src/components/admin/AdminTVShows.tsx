import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Tv, X, Save, ChevronDown, ChevronRight, Film } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi } from '../../lib/adminAuth';

interface ShowForm {
  title: string;
  description: string;
  cover_image: string;
  status: 'published' | 'draft';
}

const EMPTY_SHOW: ShowForm = {
  title: '',
  description: '',
  cover_image: '',
  status: 'draft',
};

export default function AdminTVShows() {
  const { adminUser } = useAdminAuth();
  const [shows, setShows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedShow, setExpandedShow] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<Record<string, any[]>>({});

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ShowForm>(EMPTY_SHOW);
  const [isSaving, setIsSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (!adminUser) return;
    loadShows();
  }, [adminUser]);

  async function loadShows() {
    if (!adminUser) return;
    setIsLoading(true);
    const { data } = await adminApi.tvShows.getByAdmin(adminUser.id);
    setShows(data || []);
    setIsLoading(false);
  }

  async function toggleExpand(showId: string) {
    if (expandedShow === showId) {
      setExpandedShow(null);
      return;
    }
    setExpandedShow(showId);
    if (!seasons[showId]) {
      const { data } = await adminApi.tvShows.getById(showId);
      setSeasons(prev => ({ ...prev, [showId]: [] }));
    }
  }

  function openCreate() {
    setEditId(null);
    setForm(EMPTY_SHOW);
    setShowForm(true);
  }

  function openEdit(show: any) {
    setEditId(show.id);
    setForm({
      title: show.title || '',
      description: show.description || '',
      cover_image: show.cover_image || '',
      status: show.status || 'draft',
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!adminUser || !form.title.trim()) return;
    setIsSaving(true);

    const payload = { ...form, admin_id: adminUser.id };
    let error = null;

    if (editId) {
      const res = await adminApi.tvShows.update(editId, payload);
      error = res.error;
      if (!error) setShows(prev => prev.map(s => s.id === editId ? { ...s, ...payload } : s));
    } else {
      const res = await adminApi.tvShows.create(payload);
      error = res.error;
      if (!error && res.data) setShows(prev => [res.data, ...prev]);
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
    if (!confirm('Delete this TV show and all its episodes? This cannot be undone.')) return;
    setDeleting(id);
    await adminApi.tvShows.delete(id);
    setShows(prev => prev.filter(s => s.id !== id));
    setDeleting(null);
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-brand-black dark:text-white text-2xl">TV Shows</h1>
          <p className="text-neutral-500 text-sm mt-1">{shows.length} shows total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
        >
          <Plus size={15} /> Add Show
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800 w-full max-w-md shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="font-display font-bold text-brand-black dark:text-white">{editId ? 'Edit Show' : 'Add TV Show'}</h2>
              <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Show Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
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
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            ))}
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-14">
            <Tv size={36} className="mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />
            <p className="text-neutral-500 text-sm mb-3">No TV shows yet.</p>
            <button onClick={openCreate} className="text-sm text-brand-red hover:underline">Create your first show</button>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {shows.map(show => (
              <div key={show.id}>
                <div className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <button
                    onClick={() => toggleExpand(show.id)}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors flex-shrink-0"
                  >
                    {expandedShow === show.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {show.cover_image ? (
                    <div className="w-14 h-14 rounded flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img src={show.cover_image} alt={show.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <Tv size={18} className="text-neutral-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-black dark:text-white">{show.title}</p>
                    {show.description && (
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{show.description}</p>
                    )}
                    <span className={`mt-1 inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm ${
                      show.status === 'published'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}>{show.status || 'draft'}</span>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(show)} className="p-1.5 text-neutral-400 hover:text-brand-red transition-colors rounded">
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(show.id)}
                      disabled={deleting === show.id}
                      className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors rounded disabled:opacity-40"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {expandedShow === show.id && (
                  <div className="bg-neutral-50 dark:bg-neutral-800/30 px-10 py-4 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Episodes</p>
                      <button className="flex items-center gap-1 text-xs text-brand-red hover:underline">
                        <Plus size={10} /> Add Episode
                      </button>
                    </div>
                    {(seasons[show.id] || []).length === 0 ? (
                      <div className="text-center py-6">
                        <Film size={24} className="mx-auto mb-2 text-neutral-300 dark:text-neutral-600" />
                        <p className="text-xs text-neutral-400">No episodes yet. Add episodes to this show.</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {(seasons[show.id] || []).map((ep: any) => (
                          <div key={ep.id} className="flex items-center gap-3 py-2 px-3 bg-white dark:bg-neutral-900 rounded border border-neutral-100 dark:border-neutral-800">
                            <span className="text-xs font-bold text-brand-red w-8">EP{ep.episode_number}</span>
                            <span className="flex-1 text-sm text-brand-black dark:text-white line-clamp-1">{ep.title}</span>
                            {ep.duration && <span className="text-xs text-neutral-400">{ep.duration}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
