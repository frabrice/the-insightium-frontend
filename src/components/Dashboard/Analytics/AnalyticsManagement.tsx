import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye, 
  Users, 
  Calendar,
  Download,
  Share2,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUp,
  ArrowDown,
  Filter,
  RefreshCw,
  BookOpen,
  Tv,
  Mic,
  Activity,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Star,
  Heart,
  MessageSquare,
  Play,
  Headphones
} from 'lucide-react';

interface AnalyticsManagementProps {
  isDarkMode: boolean;
}

export default function AnalyticsManagement({ isDarkMode }: AnalyticsManagementProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  // Key Performance Indicators
  const kpiMetrics = [
    {
      title: 'Total Visitors',
      value: '127.4K',
      change: '+18.2%',
      changeType: 'increase',
      icon: Users,
      color: 'blue',
      trend: [65, 78, 82, 95, 108, 115, 127]
    },
    {
      title: 'Page Views',
      value: '342.8K',
      change: '+12.5%',
      changeType: 'increase',
      icon: Eye,
      color: 'green',
      trend: [180, 210, 245, 280, 310, 325, 343]
    },
    {
      title: 'Avg Session',
      value: '6m 42s',
      change: '+8.7%',
      changeType: 'increase',
      icon: Clock,
      color: 'purple',
      trend: [4.2, 4.8, 5.1, 5.9, 6.2, 6.5, 6.7]
    },
    {
      title: 'Bounce Rate',
      value: '32.1%',
      change: '-5.3%',
      changeType: 'decrease',
      icon: TrendingDown,
      color: 'orange',
      trend: [45, 42, 38, 35, 33, 32, 32]
    }
  ];

  // Content Performance Data
  const contentMetrics = [
    {
      type: 'Articles',
      total: 247,
      views: '289.4K',
      engagement: '68.2%',
      growth: '+15.3%',
      icon: BookOpen,
      color: 'blue'
    },
    {
      type: 'Videos',
      total: 89,
      views: '156.7K',
      engagement: '72.8%',
      growth: '+22.1%',
      icon: Tv,
      color: 'red'
    },
    {
      type: 'Podcasts',
      total: 34,
      views: '67.2K',
      engagement: '81.4%',
      growth: '+28.7%',
      icon: Mic,
      color: 'green'
    }
  ];

  // Top Performing Content
  const topContent = [
    {
      title: 'The Future of African Education Technology',
      type: 'Article',
      views: '24.8K',
      engagement: '78%',
      category: 'Tech Trends',
      performance: 'excellent'
    },
    {
      title: 'Innovation Challenge: Episode 12',
      type: 'Video',
      views: '18.3K',
      engagement: '85%',
      category: 'TV Show',
      performance: 'excellent'
    },
    {
      title: 'AI in Education with Dr. Kwame Asante',
      type: 'Podcast',
      views: '12.5K',
      engagement: '92%',
      category: 'Library Talk',
      performance: 'excellent'
    },
    {
      title: 'Women Leading Educational Innovation',
      type: 'Article',
      views: '16.7K',
      engagement: '71%',
      category: 'Career Campus',
      performance: 'good'
    },
    {
      title: 'Mathematics Showdown',
      type: 'Video',
      views: '21.2K',
      engagement: '88%',
      category: 'Mind Battles',
      performance: 'excellent'
    }
  ];

  // Seasonal Performance Data
  const seasonalData = [
    { month: 'Jan', articles: 45, videos: 12, podcasts: 4, total: 61 },
    { month: 'Feb', articles: 52, videos: 15, podcasts: 5, total: 72 },
    { month: 'Mar', articles: 38, videos: 8, podcasts: 3, total: 49 },
    { month: 'Apr', articles: 67, videos: 18, podcasts: 6, total: 91 },
    { month: 'May', articles: 73, videos: 22, podcasts: 7, total: 102 },
    { month: 'Jun', articles: 58, videos: 16, podcasts: 5, total: 79 },
    { month: 'Jul', articles: 41, videos: 11, podcasts: 4, total: 56 },
    { month: 'Aug', articles: 69, videos: 19, podcasts: 6, total: 94 },
    { month: 'Sep', articles: 84, videos: 25, podcasts: 8, total: 117 },
    { month: 'Oct', articles: 76, videos: 21, podcasts: 7, total: 104 },
    { month: 'Nov', articles: 89, videos: 28, podcasts: 9, total: 126 },
    { month: 'Dec', articles: 62, videos: 17, podcasts: 6, total: 85 }
  ];

  // Category Performance
  const categoryPerformance = [
    { category: 'Tech Trends', articles: 67, avgViews: '18.4K', engagement: '74%', growth: '+23%' },
    { category: 'Career Campus', articles: 41, avgViews: '15.2K', engagement: '69%', growth: '+18%' },
    { category: 'Research World', articles: 45, avgViews: '12.8K', engagement: '65%', growth: '+12%' },
    { category: 'Spirit of Africa', articles: 32, avgViews: '14.1K', engagement: '71%', growth: '+15%' },
    { category: 'Mind and Body Quest', articles: 23, avgViews: '16.7K', engagement: '78%', growth: '+28%' },
    { category: 'Need to Know', articles: 28, avgViews: '11.3K', engagement: '62%', growth: '+8%' },
    { category: 'E! Corner', articles: 15, avgViews: '9.8K', engagement: '58%', growth: '+5%' },
    { category: 'Echoes of Home', articles: 19, avgViews: '13.2K', engagement: '67%', growth: '+14%' }
  ];

  // User Engagement Metrics
  const engagementMetrics = [
    { metric: 'Comments', value: '2.4K', change: '+32%', icon: MessageSquare },
    { metric: 'Shares', value: '8.7K', change: '+28%', icon: Share2 },
    { metric: 'Likes', value: '15.3K', change: '+19%', icon: Heart },
    { metric: 'Downloads', value: '4.2K', change: '+41%', icon: Download }
  ];

  // Geographic Performance
  const geoData = [
    { country: 'Kenya', visitors: '34.2K', percentage: 27, flag: '🇰🇪', growth: '+15%' },
    { country: 'Rwanda', visitors: '28.7K', percentage: 23, flag: '🇷🇼', growth: '+22%' },
    { country: 'Uganda', visitors: '19.4K', percentage: 15, flag: '🇺🇬', growth: '+18%' },
    { country: 'Tanzania', visitors: '16.8K', percentage: 13, flag: '🇹🇿', growth: '+12%' },
    { country: 'Ghana', visitors: '12.3K', percentage: 10, flag: '🇬🇭', growth: '+8%' },
    { country: 'Nigeria', visitors: '9.7K', percentage: 8, flag: '🇳🇬', growth: '+25%' },
    { country: 'Others', visitors: '5.9K', percentage: 4, flag: '🌍', growth: '+10%' }
  ];

  // Device & Platform Analytics
  const deviceData = [
    { device: 'Mobile', percentage: 72, users: '91.7K', icon: Smartphone, color: 'bg-blue-500' },
    { device: 'Desktop', percentage: 21, users: '26.8K', icon: Monitor, color: 'bg-green-500' },
    { device: 'Tablet', percentage: 7, users: '8.9K', icon: Tablet, color: 'bg-purple-500' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'average': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderMiniChart = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-0.5 h-8">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className={`w-1 bg-${color}-500 rounded-t`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Analytics Dashboard
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Comprehensive insights into your platform performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
          <button className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Overview with Mini Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiMetrics.map((metric, index) => (
          <div key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${getColorClasses(metric.color)}`}>
                    <metric.icon className="w-3 h-3" />
                  </div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {metric.title}
                  </p>
                </div>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {metric.value}
                </p>
                <div className="flex items-center mt-1">
                  {metric.changeType === 'increase' ? (
                    <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="ml-2">
                {renderMiniChart(metric.trend, metric.color)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Performance Overview */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Content Performance Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contentMetrics.map((content, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border p-3`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${getColorClasses(content.color)}`}>
                  <content.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {content.type}
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {content.total} published
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Views:</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{content.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Engagement:</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{content.engagement}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Growth:</span>
                  <span className="text-xs font-medium text-green-600">{content.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Performance Chart */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Seasonal Performance Trends
          </h3>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Articles</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Videos</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Podcasts</span>
            </div>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between h-32 space-x-1">
          {seasonalData.map((month, index) => {
            const maxTotal = Math.max(...seasonalData.map(m => m.total));
            const height = (month.total / maxTotal) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                <div className="flex flex-col items-center space-y-0.5 w-full">
                  {/* Stacked bars */}
                  <div className="w-full flex flex-col space-y-0.5" style={{ height: `${height}%` }}>
                    <div 
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${(month.articles / month.total) * 100}%`, minHeight: '2px' }}
                    />
                    <div 
                      className="bg-red-500"
                      style={{ height: `${(month.videos / month.total) * 100}%`, minHeight: '2px' }}
                    />
                    <div 
                      className="bg-green-500 rounded-b"
                      style={{ height: `${(month.podcasts / month.total) * 100}%`, minHeight: '2px' }}
                    />
                  </div>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {month.month}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* High/Low Season Analysis */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} rounded-lg border p-3`}>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <h4 className={`text-xs font-bold ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>
                High Season (Sep-Nov)
              </h4>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
              Peak engagement period with 117 avg monthly content pieces. Best time for major launches.
            </p>
          </div>
          <div className={`${isDarkMode ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} rounded-lg border p-3`}>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-orange-600" />
              <h4 className={`text-xs font-bold ${isDarkMode ? 'text-orange-300' : 'text-orange-900'}`}>
                Low Season (Mar, Jul)
              </h4>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
              Slower periods with 49-56 avg content pieces. Focus on quality over quantity.
            </p>
          </div>
        </div>
      </div>

      {/* Top Performing Content & Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Content */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Top Performing Content
          </h3>
          <div className="space-y-3">
            {topContent.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.type === 'Article' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                      item.type === 'Video' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                      'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {item.type}
                    </span>
                    <Star className={`w-3 h-3 ${getPerformanceColor(item.performance)}`} />
                  </div>
                  <h4 className={`text-xs font-medium line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.category}
                  </p>
                </div>
                <div className="text-right ml-3">
                  <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.views}
                  </p>
                  <p className={`text-xs ${getPerformanceColor(item.performance)}`}>
                    {item.engagement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Category Performance Analysis
          </h3>
          <div className="space-y-2">
            {categoryPerformance.map((category, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border p-2`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.category}
                  </h4>
                  <span className={`text-xs font-medium ${
                    parseFloat(category.growth.replace('%', '').replace('+', '')) > 20 ? 'text-green-600' :
                    parseFloat(category.growth.replace('%', '').replace('+', '')) > 10 ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {category.growth}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Articles:</span>
                    <span className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category.articles}</span>
                  </div>
                  <div>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Views:</span>
                    <span className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category.avgViews}</span>
                  </div>
                  <div>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Engagement:</span>
                    <span className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Engagement & Geographic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User Engagement */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            User Engagement Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {engagementMetrics.map((metric, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border p-3 text-center`}>
                <div className="flex justify-center mb-2">
                  <div className={`p-2 rounded-lg ${getColorClasses('blue')}`}>
                    <metric.icon className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {metric.value}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                  {metric.metric}
                </p>
                <span className="text-xs font-medium text-green-600">
                  {metric.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Performance */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Geographic Performance
          </h3>
          <div className="space-y-2">
            {geoData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{country.flag}</span>
                  <div>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {country.country}
                    </span>
                    <div className={`w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1`}>
                      <div 
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${country.percentage * 4}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {country.visitors}
                  </p>
                  <p className="text-xs text-green-600">
                    {country.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Analytics & Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Device Breakdown */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Device & Platform Analytics
          </h3>
          <div className="space-y-3">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${device.color} bg-opacity-20`}>
                  <device.icon className={`w-4 h-4 ${device.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {device.device}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {device.percentage}% ({device.users})
                    </span>
                  </div>
                  <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2`}>
                    <div 
                      className={`h-2 rounded-full ${device.color}`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Insights
          </h3>
          <div className="space-y-3">
            <div className={`${isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} rounded-lg border p-3`}>
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>
                  What's Working Well
                </h4>
              </div>
              <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                <li>• Podcast engagement up 28.7%</li>
                <li>• Mobile traffic growing strongly</li>
                <li>• Tech Trends category leading</li>
              </ul>
            </div>
            
            <div className={`${isDarkMode ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} rounded-lg border p-3`}>
              <div className="flex items-center space-x-2 mb-1">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-orange-300' : 'text-orange-900'}`}>
                  Areas for Improvement
                </h4>
              </div>
              <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                <li>• E! Corner needs more content</li>
                <li>• Desktop engagement declining</li>
                <li>• Need to Know category underperforming</li>
              </ul>
            </div>

            <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border p-3`}>
              <div className="flex items-center space-x-2 mb-1">
                <Target className="w-4 h-4 text-blue-600" />
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                  Recommendations
                </h4>
              </div>
              <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                <li>• Increase video content in Q2</li>
                <li>• Focus on mobile optimization</li>
                <li>• Expand successful categories</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Real-time Activity Monitor
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              127 users online
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Recent Activity</h4>
            {[
              { action: 'New article published: "AI in Rural Education"', time: '2 min ago', type: 'publish' },
              { action: 'User from Nairobi viewed "Tech Trends"', time: '3 min ago', type: 'view' },
              { action: 'Podcast episode downloaded 50 times', time: '5 min ago', type: 'download' },
              { action: 'Video "Mathematics Showdown" shared', time: '7 min ago', type: 'share' },
              { action: 'New subscriber from Rwanda', time: '12 min ago', type: 'subscribe' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activity.action}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <h4 className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Live Metrics</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Active Sessions', value: '127', icon: Activity },
                { label: 'Pages/Session', value: '3.2', icon: Eye },
                { label: 'New Visitors', value: '23%', icon: Users },
                { label: 'Conversion Rate', value: '4.8%', icon: Target }
              ].map((metric, index) => (
                <div key={index} className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border p-2 text-center`}>
                  <metric.icon className={`w-3 h-3 mx-auto mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {metric.value}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}