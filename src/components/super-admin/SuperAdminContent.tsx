import React, { useEffect, useState } from 'react';
import { Search, Eye, Trash2, Filter } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

export default function SuperAdminContent() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    adminApi.superAdmin.getAllArticles().then(({ data }) => {
      setArticles(data || []);
      setIsLoading(false);
    });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this article? This cannot be undone.')) return;
    setDeleting(id);
    await adminApi.articles.delete(id);
    setArticles(prev => prev.filter(a => a.id !== id));
    setDeleting(null);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    await adminApi.articles.update(id, { status: newStatus });
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  }

  const filtered = articles.filter(a => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchSearch = !search ||
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.author?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statusBadge = (status: string) => {
    const cfg: Record<string, string> = {
      published: 'bg-green-900/30 text-green-400',
      draft: 'bg-neutral-800 text-neutral-500',
      review: 'bg-yellow-900/30 text-yellow-400',
      scheduled: 'bg-blue-900/30 text-blue-400',
    };
    return (
      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${cfg[status] || cfg.draft}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-white text-2xl">All Content</h1>
        <p className="text-neutral-500 text-sm mt-1">{articles.length} articles across all authors</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full bg-neutral-900 border border-neutral-800 text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white placeholder:text-neutral-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="review">In Review</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-14 bg-neutral-800 rounded animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-14 text-neutral-500 text-sm">No articles found.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-neutral-800 border-b border-neutral-700">
              <tr>
                <th className="text-left text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Title</th>
                <th className="text-left text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Author</th>
                <th className="text-left text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Views</th>
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filtered.map(article => (
                <tr key={article.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-white line-clamp-1">{article.title}</p>
                    {article.category_name && (
                      <p className="text-[10px] text-neutral-600">{article.category_name}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-neutral-400">{article.author}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={article.status}
                      onChange={e => handleStatusChange(article.id, e.target.value)}
                      className="bg-transparent text-[10px] font-semibold uppercase focus:outline-none cursor-pointer text-neutral-400"
                    >
                      <option value="draft">Draft</option>
                      <option value="review">Review</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Eye size={11} /> {article.view_count || article.views || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(article.id)}
                      disabled={deleting === article.id}
                      className="p-1.5 text-neutral-600 hover:text-red-400 transition-colors rounded disabled:opacity-40"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
