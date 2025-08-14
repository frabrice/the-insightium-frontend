import React, { useState } from 'react';
import { 
  Edit3, 
  Edit, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Plus,
  Search,
  Calendar,
  User,
  TrendingUp,
  X,
  Award
} from 'lucide-react';

interface EditorsPickManagementProps {
  isDarkMode: boolean;
}

export default function EditorsPickManagement({ isDarkMode }: EditorsPickManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const editorsPickArticles = [
    {
      id: '1',
      title: 'The Future of African Education Technology',
      category: 'Tech Trends',
      author: 'Dr. Amara Okafor',
      publishDate: '2024-03-15',
      views: '45.2K',
      position: 1,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '2',
      title: 'Women Leading Educational Innovation Across Africa',
      category: 'Career Campus',
      author: 'Sarah Mwangi',
      publishDate: '2024-03-12',
      views: '38.7K',
      position: 2,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '6',
      title: 'Digital Literacy for Rural Communities',
      category: 'Tech Trends',
      author: 'Dr. Kemi Adebayo',
      publishDate: '2024-03-01',
      views: '18.3K',
      position: 3,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const availableArticles = [
    {
      id: '7',
      title: 'Revolutionary Teaching Methods Transforming African Classrooms',
      category: 'Research World',
      author: 'Prof. Kwame Asante',
      publishDate: '2024-03-03',
      views: '35.7K'
    },
    {
      id: '8',
      title: 'Climate Change Education for Young Minds',
      category: 'Research World',
      author: 'Dr. Kwame Asante',
      publishDate: '2024-02-19',
      views: '20.8K'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Editor's Pick
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Curate the best articles handpicked by our editorial team (max 3 articles)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {editorsPickArticles.length}/3 slots used
          </span>
        </div>
      </div>

      {/* Current Editor's Pick Articles */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex items-center space-x-2 mb-4">
          <Edit3 className="w-4 h-4 text-blue-600" />
          <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Current Editor's Pick
          </h2>
        </div>

        <div className="space-y-3">
          {editorsPickArticles.map((article, index) => (
            <div key={article.id} className={`flex items-center space-x-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Position */}
              <div className="flex flex-col items-center space-y-1">
                <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 w-6 h-6 rounded-full flex items-center justify-center">
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
                    disabled={index === editorsPickArticles.length - 1}
                    className={`p-1 rounded ${index === editorsPickArticles.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
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
      {editorsPickArticles.length < 3 && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Add to Editor's Pick
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
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors flex items-center space-x-1">
                  <Edit3 className="w-3 h-3" />
                  <span>Add to Editor's Pick</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor's Note */}
      <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border p-4`}>
        <div className="flex items-start space-x-3">
          <Edit3 className="w-4 h-4 text-blue-600 mt-0.5" />
          <div>
            <h3 className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              Editor's Note
            </h3>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              Editor's Pick articles are carefully curated content that represents the best of our editorial standards. 
              These articles appear in a special section and are highlighted with editorial badges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}