import React, { useState } from 'react';
import { 
  Star, 
  Edit, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Plus,
  Search,
  Calendar,
  User,
  TrendingUp,
  X
} from 'lucide-react';

interface FeaturedArticlesManagementProps {
  isDarkMode: boolean;
}

export default function FeaturedArticlesManagement({ isDarkMode }: FeaturedArticlesManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticles = [
    {
      id: '3',
      title: 'Mental Health Support in Universities',
      category: 'Mind and Body Quest',
      author: 'Dr. Sarah Ochieng',
      publishDate: '2024-03-10',
      views: '32.1K',
      position: 1,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '4',
      title: 'Traditional Wisdom Meets Modern Learning',
      category: 'Spirit of Africa',
      author: 'Chief Amina Hassan',
      publishDate: '2024-03-08',
      views: '28.9K',
      position: 2,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '5',
      title: 'The Rise of EdTech Startups in Africa',
      category: 'Tech Trends',
      author: 'James Mwangi',
      publishDate: '2024-03-05',
      views: '41.3K',
      position: 3,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const availableArticles = [
    {
      id: '6',
      title: 'Digital Literacy for Rural Communities',
      category: 'Tech Trends',
      author: 'Dr. Kemi Adebayo',
      publishDate: '2024-03-01',
      views: '18.3K'
    },
    {
      id: '7',
      title: 'Revolutionary Teaching Methods Transforming African Classrooms',
      category: 'Research World',
      author: 'Prof. Kwame Asante',
      publishDate: '2024-03-03',
      views: '35.7K'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Articles
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage the featured articles section (max 3 articles)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {featuredArticles.length}/3 slots used
          </span>
        </div>
      </div>

      {/* Current Featured Articles */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <h2 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Current Featured Articles
        </h2>

        <div className="space-y-3">
          {featuredArticles.map((article, index) => (
            <div key={article.id} className={`flex items-center space-x-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Position */}
              <div className="flex flex-col items-center space-y-1">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  #{article.position}
                </span>
                <div className="flex flex-col space-y-1">
                  <button 
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button 
                    disabled={index === featuredArticles.length - 1}
                    className={`p-1 rounded ${index === featuredArticles.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
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

              {/* Stats */}
              <div className="text-right">
                <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.views}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  views
                </p>
              </div>

              {/* Actions */}
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
          ))}
        </div>
      </div>

      {/* Available Articles */}
      {featuredArticles.length < 3 && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Add to Featured
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
                  </div>
                </div>
                <button className="px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>Add to Featured</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}