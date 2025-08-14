import React, { useState } from 'react';
import { TrendingUp, Edit, Eye, ArrowUp, ArrowDown, Plus, Search, Calendar, User, X, Siren as Fire, BarChart3 } from 'lucide-react';

interface TrendingManagementProps {
  isDarkMode: boolean;
}

export default function TrendingManagement({ isDarkMode }: TrendingManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingArticles = [
    {
      id: '6',
      title: 'Revolutionary Teaching Methods Transforming African Classrooms',
      category: 'Research World',
      author: 'Prof. Kwame Asante',
      publishDate: '2024-03-03',
      views: '35.7K',
      position: 1,
      growthRate: '+24%',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '7',
      title: 'Digital Literacy for Rural Communities',
      category: 'Tech Trends',
      author: 'Dr. Kemi Adebayo',
      publishDate: '2024-03-01',
      views: '18.3K',
      position: 2,
      growthRate: '+18%',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const availableArticles = [
    {
      id: '8',
      title: 'Climate Change Education for Young Minds',
      category: 'Research World',
      author: 'Dr. Kwame Asante',
      publishDate: '2024-02-19',
      views: '20.8K',
      growthRate: '+15%'
    },
    {
      id: '9',
      title: 'Entrepreneurship Education in African Universities',
      category: 'Career Campus',
      author: 'James Mwangi',
      publishDate: '2024-02-22',
      views: '23.4K',
      growthRate: '+12%'
    },
    {
      id: '10',
      title: 'Special Needs Education Advances',
      category: 'Mind and Body Quest',
      author: 'Dr. Mary Wanjiru',
      publishDate: '2024-02-16',
      views: '16.3K',
      growthRate: '+8%'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Trending Articles
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage articles that are currently trending and gaining popularity
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Fire className="w-4 h-4 text-red-600" />
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {trendingArticles.length} trending now
          </span>
        </div>
      </div>

      {/* Trending Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Trending Views
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                54.0K
              </p>
            </div>
            <div className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-2 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Avg Growth Rate
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                +21%
              </p>
            </div>
            <div className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-lg">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Peak Category
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Research World
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-lg">
              <Fire className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Trending Articles */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-4 h-4 text-red-600" />
          <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Currently Trending
          </h2>
        </div>

        <div className="space-y-3">
          {trendingArticles.map((article, index) => (
            <div key={article.id} className={`flex items-center space-x-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Position */}
              <div className="flex flex-col items-center space-y-1">
                <div className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 w-6 h-6 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">#{article.position}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <button 
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button 
                    disabled={index === trendingArticles.length - 1}
                    className={`p-1 rounded ${index === trendingArticles.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Article Image */}
              <img 
                src={article.image}
                alt={article.title}
                className="w-16 h-16 object-cover rounded-lg"
              />

              {/* Article Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded text-xs">
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {article.author}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center space-x-4 ml-4">
                    <div className="text-right">
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {article.views}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        views
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-medium text-green-600`}>
                        {article.growthRate}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        growth
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Eye className="w-3 h-3" />
                      </button>
                      <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500`}>
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Articles */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Potential Trending Articles
          </h2>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-7 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs w-64 ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        <div className="space-y-2">
          {availableArticles.map((article) => (
            <div key={article.id} className={`flex items-center justify-between p-3 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-medium line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.title}
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded text-xs">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.views}
                    </span>
                  </div>
                  <span className={`text-xs font-medium text-green-600`}>
                    {article.growthRate}
                  </span>
                </div>
              </div>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors flex items-center space-x-1">
                <Fire className="w-3 h-3" />
                <span>Mark as Trending</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Info */}
      <div className={`${isDarkMode ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} rounded-lg border p-4`}>
        <div className="flex items-start space-x-3">
          <Fire className="w-4 h-4 text-orange-600 mt-0.5" />
          <div>
            <h3 className={`text-sm font-medium ${isDarkMode ? 'text-orange-300' : 'text-orange-900'}`}>
              About Trending Articles
            </h3>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
              Trending articles are automatically promoted based on view growth, engagement, and social sharing. 
              You can also manually promote articles that deserve more visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}