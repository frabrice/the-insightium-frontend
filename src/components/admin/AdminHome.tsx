import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, TrendingUp, Plus, Clock, CheckCircle, AlertCircle, Edit } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminApi } from '../../lib/adminAuth';

interface ArticleRow {
  id: string;
  title: string;
  category_name: string;
  status: string;
  view_count?: number;
  views?: string;
  publish_date: string;
  created_at: string;
}

export default function AdminHome() {
  const { adminUser } = useAdminAuth();
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!adminUser) return;
    adminApi.articles.getByAuthor(adminUser.id).then(({ data }) => {
      setArticles(data || []);
      setIsLoading(false);
    });
  }, [adminUser]);

  const published = articles.filter(a => a.status === 'published').length;
  const drafts = articles.filter(a => a.status === 'draft').length;
  const inReview = articles.filter(a => a.status === 'review').length;
  const totalViews = articles.reduce((acc, a) => acc + (a.view_count || parseInt(a.views || '0') || 0), 0);

  const stats = [
    { label: 'Total Articles', value: articles.length, icon: FileText, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950' },
    { label: 'Published', value: published, icon: CheckCircle, color: 'text-green-500 bg-green-50 dark:bg-green-950' },
    { label: 'In Review', value: inReview, icon: AlertCircle, color: 'text-brand-gold bg-yellow-50 dark:bg-yellow-950' },
    { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'text-brand-red bg-red-50 dark:bg-red-950' },
  ];

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      published: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      draft: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
      review: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
      scheduled: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    };
    return (
      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${colors[status] || colors.draft}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-brand-black dark:text-white text-2xl">
            Welcome back, {adminUser?.full_name?.split(' ')[0] || 'Admin'}
          </h1>
          <p className="text-neutral-500 text-sm mt-1 font-serif">Here&apos;s what&apos;s happening with your content.</p>
        </div>
        <Link
          to="/admin/articles/new"
          className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
        >
          <Plus size={15} /> New Article
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-neutral-900 rounded-sm p-5 border border-neutral-200 dark:border-neutral-800 animate-fade-up">
            <div className={`w-9 h-9 rounded flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={16} />
            </div>
            <p className="text-2xl font-display font-bold text-brand-black dark:text-white">{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="font-display font-bold text-brand-black dark:text-white text-base">Recent Articles</h3>
          <Link to="/admin/articles" className="text-xs text-brand-red hover:underline">View all</Link>
        </div>

        {isLoading ? (
          <div className="p-5 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={36} className="mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />
            <p className="text-sm text-neutral-500 mb-3">No articles yet</p>
            <Link
              to="/admin/articles/new"
              className="inline-flex items-center gap-1 text-sm text-brand-red hover:underline"
            >
              <Plus size={12} /> Write your first article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {articles.slice(0, 8).map(article => (
              <div key={article.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-black dark:text-white line-clamp-1">{article.title}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-500">
                    <span>{article.category_name}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="flex items-center gap-1 text-xs text-neutral-400">
                    <Eye size={11} /> {article.view_count || article.views || 0}
                  </span>
                  {statusBadge(article.status)}
                  <Link
                    to={`/admin/articles/${article.id}/edit`}
                    className="p-1.5 text-neutral-400 hover:text-brand-red transition-colors"
                  >
                    <Edit size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
