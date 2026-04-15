import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Filter, Search } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi } from '../../lib/adminAuth';

export default function AdminArticles() {
  const { adminUser } = useAdminAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!adminUser) return;
    adminApi.articles.getByAuthor(adminUser.id).then(({ data }) => {
      setArticles(data || []);
      setIsLoading(false);
    });
  }, [adminUser]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    setDeleting(id);
    await adminApi.articles.delete(id);
    setArticles(prev => prev.filter(a => a.id !== id));
    setDeleting(null);
  }

  const filtered = articles.filter(a => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statusBadge = (status: string) => {
    const cfg: Record<string, string> = {
      published: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      draft: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
      review: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
      scheduled: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    };
    return (
      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${cfg[status] || cfg.draft}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-brand-black dark:text-white text-2xl">My Articles</h1>
          <p className="text-neutral-500 text-sm mt-1">{articles.length} articles total</p>
        </div>
        <Link
          to="/admin/articles/new"
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
        >
          <Plus size={15} /> New Article
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors text-brand-black dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red text-brand-black dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="review">In Review</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-14">
            <p className="text-neutral-500 text-sm mb-3">{search ? 'No articles match your search.' : 'No articles yet.'}</p>
            {!search && (
              <Link to="/admin/articles/new" className="text-sm text-brand-red hover:underline">Write your first article</Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Views</th>
                <th className="text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filtered.map(article => (
                <tr key={article.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-brand-black dark:text-white line-clamp-1">{article.title}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-neutral-500">{article.category_name}</span>
                  </td>
                  <td className="px-4 py-3">{statusBadge(article.status)}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Eye size={11} /> {article.view_count || article.views || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-neutral-500">
                      {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Link
                        to={`/admin/articles/${article.id}/edit`}
                        className="p-1.5 text-neutral-400 hover:text-brand-red transition-colors rounded"
                      >
                        <Edit size={13} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        disabled={deleting === article.id}
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors rounded disabled:opacity-40"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
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
