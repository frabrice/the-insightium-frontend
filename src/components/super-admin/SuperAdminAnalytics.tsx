import React, { useEffect, useState } from 'react';
import { TrendingUp, Eye, FileText, Users, BarChart2 } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

export default function SuperAdminAnalytics() {
  const [topArticles, setTopArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totals, setTotals] = useState({ views: 0, articles: 0, published: 0 });

  useEffect(() => {
    adminApi.superAdmin.getAllArticles().then(({ data }) => {
      const articles = data || [];
      const sorted = [...articles].sort((a, b) => (b.view_count || b.views || 0) - (a.view_count || a.views || 0));
      setTopArticles(sorted.slice(0, 15));
      setTotals({
        views: articles.reduce((sum: number, a: any) => sum + (a.view_count || a.views || 0), 0),
        articles: articles.length,
        published: articles.filter((a: any) => a.status === 'published').length,
      });
      setIsLoading(false);
    });
  }, []);

  const maxViews = topArticles.length > 0 ? Math.max(...topArticles.map(a => a.view_count || a.views || 0)) : 1;

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-neutral-800 rounded-sm" />)}
        </div>
        {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-neutral-800 rounded-sm" />)}
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-white text-2xl">Analytics</h1>
        <p className="text-neutral-500 text-sm mt-1">Platform performance and content metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Total Views</p>
              <p className="text-2xl font-bold text-white">{totals.views.toLocaleString()}</p>
            </div>
            <Eye size={18} className="text-blue-500 opacity-60" />
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Total Articles</p>
              <p className="text-2xl font-bold text-white">{totals.articles}</p>
            </div>
            <FileText size={18} className="text-green-500 opacity-60" />
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Published</p>
              <p className="text-2xl font-bold text-white">{totals.published}</p>
            </div>
            <TrendingUp size={18} className="text-brand-red opacity-60" />
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
          <BarChart2 size={14} className="text-neutral-500" />
          <h2 className="text-sm font-semibold text-white">Top Articles by Views</h2>
        </div>

        {topArticles.length === 0 ? (
          <div className="text-center py-14 text-neutral-500 text-sm">No data yet.</div>
        ) : (
          <div className="p-4 space-y-3">
            {topArticles.map((article, i) => {
              const views = article.view_count || article.views || 0;
              const pct = maxViews > 0 ? (views / maxViews) * 100 : 0;
              return (
                <div key={article.id} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-neutral-600 w-5 text-right flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-neutral-300 line-clamp-1">{article.title}</p>
                      <span className="text-xs font-medium text-white ml-3 flex-shrink-0">{views.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-red rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
