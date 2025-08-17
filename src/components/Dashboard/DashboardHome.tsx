import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Tv, 
  Mic, 
  Eye, 
  ArrowUp,
  ArrowDown,
  Plus,
  Edit,
  TrendingUp,
  Star,
  Crown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '../../api/dashboard';

interface DashboardHomeProps {
  isDarkMode: boolean;
}

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

interface RecentArticle {
  _id: string;
  title: string;
  status: string;
  views: number;
  date: string;
  category: string;
  isMain?: boolean;
  mainPosition?: string;
}

interface DashboardAnalytics {
  mostPopularCategory: string;
  avgReadTime: string;
  engagementRate: string;
  newSubscribers: string;
}

export default function DashboardHome({ isDarkMode }: DashboardHomeProps) {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);
  const [analytics, setAnalytics] = useState<DashboardAnalytics>({
    mostPopularCategory: 'Loading...',
    avgReadTime: 'Loading...',
    engagementRate: 'Loading...',
    newSubscribers: 'Loading...'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all dashboard data
      const [statsResponse, articlesResponse, analyticsResponse] = await Promise.all([
        dashboardApi.getDashboardStats(),
        dashboardApi.getRecentArticles(3),
        dashboardApi.getDashboardAnalytics()
      ]);

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }

      if (articlesResponse.success) {
        setRecentArticles(articlesResponse.data);
      }

      if (analyticsResponse.success) {
        setAnalytics(analyticsResponse.data);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { 
      label: 'New Article', 
      icon: Plus, 
      color: 'red',
      path: '/admin/magazine/articles'
    },
    { 
      label: 'View Articles', 
      icon: BookOpen, 
      color: 'blue',
      path: '/admin/magazine/articles'
    },
    { 
      label: 'Featured Articles', 
      icon: Star, 
      color: 'green',
      path: '/admin/magazine/featured'
    },
    { 
      label: 'Trending Articles', 
      icon: TrendingUp, 
      color: 'purple',
      path: '/admin/magazine/trending'
    }
  ];

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      BookOpen,
      Tv,
      Mic,
      Eye
    };
    return icons[iconName as keyof typeof icons] || BookOpen;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'Draft': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Review': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, Admin! 👋
            </h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Here's what's happening with The Insightium today
            </p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4 animate-pulse`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
                  <div className={`h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
                  <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-20`}></div>
                </div>
                <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}></div>
              </div>
            </div>
          ))
        ) : (
          stats.map((stat, index) => {
            const IconComponent = getIconComponent(stat.icon);
            return (
              <div key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stat.title}
                    </p>
                    <p className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'increase' ? (
                        <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs font-medium ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                      <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        this month
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.path)}
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-700 hover:bg-gray-700 text-gray-300' 
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${getColorClasses(action.color)}`}>
                <action.icon className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Articles */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Latest Main Articles
            </h3>
            <button 
              onClick={() => navigate('/admin/magazine/main-articles')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage Main
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-start justify-between animate-pulse">
                  <div className="flex-1 min-w-0">
                    <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
                    <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-20`}></div>
                  </div>
                  <div className="text-right ml-3">
                    <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-1 w-10`}></div>
                    <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-16`}></div>
                  </div>
                </div>
              ))
            ) : recentArticles.length === 0 ? (
              <div className="text-center py-4">
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No recent articles found
                </p>
              </div>
            ) : (
              recentArticles.map((article, index) => (
                <div key={article._id || index} className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-xs font-medium line-clamp-1 flex-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {article.title}
                      </h4>
                      {article.isMain && (
                        <div className="flex items-center space-x-1">
                          <Crown className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                            {article.mainPosition === 'main' ? 'Main' : 'Second'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatViews(article.views)}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(article.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Analytics Preview */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Content Performance
            </h3>
          </div>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between animate-pulse">
                  <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-24`}></div>
                  <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-16`}></div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Most Popular Category
                  </span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.mostPopularCategory}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Avg. Read Time
                  </span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.avgReadTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Engagement Rate
                  </span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.engagementRate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    New Content
                  </span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.newSubscribers}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}