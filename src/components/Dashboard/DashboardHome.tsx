import React from 'react';
import { 
  BookOpen, 
  Tv, 
  Mic, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Plus,
  Edit,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface DashboardHomeProps {
  isDarkMode: boolean;
}

export default function DashboardHome({ isDarkMode }: DashboardHomeProps) {

  const stats = [
    {
      title: 'Total Articles',
      value: '7',
      change: '+12',
      changeType: 'increase',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Video Content',
      value: '89',
      change: '+5',
      changeType: 'increase',
      icon: Tv,
      color: 'red'
    },
    {
      title: 'Podcast Episodes',
      value: '34',
      change: '+2',
      changeType: 'increase',
      icon: Mic,
      color: 'green'
    },
    {
      title: 'Monthly Views',
      value: '2.4M',
      change: '+15%',
      changeType: 'increase',
      icon: Eye,
      color: 'purple'
    }
  ];

  const recentArticles = [
    {
      title: 'The Future of African Education Technology',
      status: 'Published',
      views: '45.2K',
      date: '2024-03-15',
      category: 'Tech Trends'
    },
    {
      title: 'Women Leading Educational Innovation',
      status: 'Published',
      views: '38.7K',
      date: '2024-03-12',
      category: 'Career Campus'
    },
    {
      title: 'Mental Health Support in Universities',
      status: 'Draft',
      views: '32.1K',
      date: '2024-03-10',
      category: 'Mind and Body Quest'
    },
    {
      title: 'Traditional Wisdom Meets Modern Learning',
      status: 'Review',
      views: '28.9K',
      date: '2024-03-08',
      category: 'Spirit of Africa'
    }
  ];

  const quickActions = [
    { label: 'New Article', icon: Plus, color: 'red' },
    { label: 'Edit Featured', icon: Edit, color: 'blue' },
    { label: 'View Analytics', icon: BarChart3, color: 'green' },
    { label: 'Manage Users', icon: Users, color: 'purple' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
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
        {stats.map((stat, index) => (
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
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
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
              Recent Articles
            </h3>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentArticles.map((article, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-medium line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {article.title}
                  </h4>
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
                    {article.views}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Preview */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Content Performance
            </h3>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              View Analytics
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Most Popular Category
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tech Trends
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Avg. Read Time
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                7.2 minutes
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Engagement Rate
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                68.4%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                New Subscribers
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                +1,247
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}