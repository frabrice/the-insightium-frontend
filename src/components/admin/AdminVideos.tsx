import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Video, X, Save } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi } from '../../lib/adminAuth';

interface VideoForm {
  title: string;
  youtube_url: string;
  thumbnail_url: string;
  section: string;
  category_name: string;
  description: string;
  status: 'published' | 'draft';
}

const EMPTY_FORM: VideoForm = {
  title: '',
  youtube_url: '',
  thumbnail_url: '',
  section: '',
  category_name: '',
  description: '',
  status: 'draft',
};

const SECTIONS = ['Magazine', 'TV Show', 'Podcast', 'Feature', 'Documentary', 'Interview'];

export default function AdminVideos() {
  const { adminUser } = useAdminAuth();
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<VideoForm>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (!adminUser) return;
    loadVideos();
    adminApi.categories.getAll().then(({ data }) => setCategories(data || []));
  }, [adminUser]);

  async function loadVideos() {
    if (!adminUser) return;
    setIsLoading(true);
    const { data } = await adminApi.videos.getByAdmin(adminUser.id);
    setVideos(data || []);
    setIsLoading(false);
  }

  function openCreate() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(video: any) {
    setEditId(video.id);
    setForm({
      title: video.title || '',
      youtube_url: video.youtube_url || '',
      thumbnail_url: video.thumbnail_url || '',
      section: video.section || '',
      category_name: video.category_name || '',
      description: video.description || '',
      status: video.status || 'draft',
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
      const res = await adminApi.videos.update(editId, payload);
      error = res.error;
      if (!error) setVideos(prev => prev.map(v => v.id === editId ? { ...v, ...payload } : v));
    } else {
      const res = await adminApi.videos.create(payload);
      error = res.error;
      if (!error && res.data) setVideos(prev => [res.data, ...prev]);
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
    if (!confirm('Delete this video? This cannot be undone.')) return;
    setDeleting(id);
    await adminApi.videos.delete(id);
    setVideos(prev => prev.filter(v => v.id !== id));
    setDeleting(null);
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-brand-black dark:text-white text-2xl">Videos</h1>
          <p className="text-neutral-500 text-sm mt-1">{videos.length} videos total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
        >
          <Plus size={15} /> Add Video
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="font-display font-bold text-brand-black dark:text-white">{editId ? 'Edit Video' : 'Add Video'}</h2>
              <button onClick={() => setShowForm(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">YouTube URL *</label>
                <input
                  type="url"
                  value={form.youtube_url}
                  onChange={e => setForm(f => ({ ...f, youtube_url: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Thumbnail URL</label>
                <input
                  type="url"
                  value={form.thumbnail_url}
                  onChange={e => setForm(f => ({ ...f, thumbnail_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Section</label>
                  <select
                    value={form.section}
                    onChange={e => setForm(f => ({ ...f, section: e.target.value }))}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                  >
                    <option value="">Select...</option>
                    {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Category</label>
                  <select
                    value={form.category_name}
                    onChange={e => setForm(f => ({ ...f, category_name: e.target.value }))}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
                  >
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
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
        ) : videos.length === 0 ? (
          <div className="text-center py-14">
            <Video size={36} className="mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />
            <p className="text-neutral-500 text-sm mb-3">No videos yet.</p>
            <button onClick={openCreate} className="text-sm text-brand-red hover:underline">Add your first video</button>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {videos.map(video => (
              <div key={video.id} className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                {video.thumbnail_url ? (
                  <div className="w-16 h-10 rounded flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-10 rounded flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <Video size={16} className="text-neutral-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-black dark:text-white line-clamp-1">{video.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {video.section && <span className="text-[10px] text-neutral-400">{video.section}</span>}
                    {video.category_name && <span className="text-[10px] text-neutral-400">{video.category_name}</span>}
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm ${
                      video.status === 'published'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}>{video.status || 'draft'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(video)} className="p-1.5 text-neutral-400 hover:text-brand-red transition-colors rounded">
                    <Edit size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    disabled={deleting === video.id}
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
