import React, { useEffect, useState } from 'react';
import { FileText, Users, Eye, MessageSquare, TrendingUp, Mail, Video, Mic } from 'lucide-react';
import { adminApi } from '../../lib/adminAuth';

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  change?: string;
}

export default function SuperAdminOverview() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalUsers: 0,
    activeUsers: 0,
    subscribers: 0,
    pendingComments: 0,
    totalVideos: 0,
    totalPodcasts: 0,
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [articlesRes, usersRes, subsRes, commentsRes, videosRes, podcastsRes] = await Promise.all([
        adminApi.superAdmin.getAllArticles(),
        adminApi.superAdmin.getAllUsers(),
        adminApi.superAdmin.getSubscribers(),
        adminApi.analytics.getComments('pending'),
        adminApi.videos.getAll(),
        adminApi.podcasts.getAll(),
      ]);

      const articles = articlesRes.data || [];
      const users = usersRes.data || [];

      setStats({
        totalArticles: articles.length,
        publishedArticles: articles.filter((a: any) => a.status === 'published').length,
        totalUsers: users.length,
        activeUsers: users.filter((u: any) => u.is_active).length,
        subscribers: (subsRes.data || []).length,
        pendingComments: (commentsRes.data || []).length,
        totalVideos: (videosRes.data || []).length,
        totalPodcasts: (podcastsRes.data || []).length,
      });

      setRecentArticles(articles.slice(0, 8));
      setIsLoading(false);
    }

    loadData();
  }, []);

  const statCards: StatCard[] = [
    { label: 'Total Articles', value: stats.totalArticles, icon: FileText, color: 'text-blue-500', change: `${stats.publishedArticles} published` },
    { label: 'Admin Users', value: stats.totalUsers, icon: Users, color: 'text-green-500', change: `${stats.activeUsers} active` },
    { label: 'Subscribers', value: stats.subscribers, icon: Mail, color: 'text-brand-red', change: 'newsletter' },
    { label: 'Pending Comments', value: stats.pendingComments, icon: MessageSquare, color: 'text-yellow-500', change: 'awaiting review' },
    { label: 'Videos', value: stats.totalVideos, icon: Video, color: 'text-neutral-400', change: 'total' },
    { label: 'Podcast Episodes', value: stats.totalPodcasts, icon: Mic, color: 'text-neutral-400', change: 'total' },
  ];

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

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-neutral-800 rounded-sm" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="font-display font-bold text-white text-2xl">Platform Overview</h1>
        <p className="text-neutral-500 text-sm mt-1">Real-time platform metrics and recent activity</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-800 rounded-sm p-4 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-neutral-500 mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                {card.change && <p className="text-[10px] text-neutral-500 mt-0.5">{card.change}</p>}
              </div>
              <div className={`${card.color} opacity-60`}>
                <card.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
          <h2 className="text-sm font-semibold text-white">Recent Articles</h2>
          <a href="/super-admin/content" className="text-xs text-brand-red hover:underline">View all</a>
        </div>
        <div className="divide-y divide-neutral-800">
          {recentArticles.map(article => (
            <div key={article.id} className="flex items-center justify-between px-4 py-3 hover:bg-neutral-800/50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white line-clamp-1">{article.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-neutral-500">{article.author}</span>
                  {article.category_name && (
                    <span className="text-[10px] text-neutral-600">{article.category_name}</span>
                  )}
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                {statusBadge(article.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
