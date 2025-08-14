import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Tag,
  BarChart3,
  FileText,
  Eye
} from 'lucide-react';

interface CategoriesManagementProps {
  isDarkMode: boolean;
}

export default function CategoriesManagement({ isDarkMode }: CategoriesManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const categories = [
    {
      id: '1',
      name: 'Research World',
      description: 'Academic research and educational studies',
      articleCount: 45,
      color: 'blue',
      isActive: true
    },
    {
      id: '2',
      name: 'Spirit of Africa',
      description: 'Cultural and traditional aspects of African education',
      articleCount: 32,
      color: 'green',
      isActive: true
    },
    {
      id: '3',
      name: 'Tech Trends',
      description: 'Technology innovations in education',
      articleCount: 67,
      color: 'purple',
      isActive: true
    },
    {
      id: '4',
      name: 'Need to Know',
      description: 'Essential educational information and updates',
      articleCount: 28,
      color: 'red',
      isActive: true
    },
    {
      id: '5',
      name: 'Echoes of Home',
      description: 'Stories about local educational initiatives',
      articleCount: 19,
      color: 'yellow',
      isActive: true
    },
    {
      id: '6',
      name: 'Career Campus',
      description: 'Career development and professional education',
      articleCount: 41,
      color: 'indigo',
      isActive: true
    },
    {
      id: '7',
      name: 'Mind and Body Quest',
      description: 'Mental health and physical wellbeing in education',
      articleCount: 23,
      color: 'pink',
      isActive: true
    },
    {
      id: '8',
      name: 'E! Corner',
      description: 'Entertainment and creative aspects of education',
      articleCount: 15,
      color: 'orange',
      isActive: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
      pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      // Add category logic here
      setNewCategory({ name: '', description: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Categories Management
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Organize your content with categories
          </p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1" 
          style={{ backgroundColor: '#F21717' }}
        >
          <Plus className="w-3 h-3" />
          <span>New Category</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Categories
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {categories.length}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-lg">
              <Tag className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Active Categories
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {categories.filter(cat => cat.isActive).length}
              </p>
            </div>
            <div className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-lg">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Articles
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {categories.reduce((sum, cat) => sum + cat.articleCount, 0)}
              </p>
            </div>
            <div className="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Most Popular
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tech Trends
              </p>
            </div>
            <div className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-2 rounded-lg">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <h2 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add New Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category Name
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
                className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Enter category description"
                className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <button 
              onClick={handleAddCategory}
              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
            >
              Add Category
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className={`px-3 py-1 border rounded text-xs transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-7 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getColorClasses(category.color).split(' ')[0]}`}></div>
                  <h3 className={`text-sm font-bold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.name}
                  </h3>
                  {!category.isActive && (
                    <span className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 px-2 py-0.5 rounded text-xs">
                      Inactive
                    </span>
                  )}
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} line-clamp-2`}>
                  {category.description}
                </p>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Edit className="w-3 h-3" />
                </button>
                <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.articleCount}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    articles
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                  View Articles
                </button>
                {category.isActive ? (
                  <button className="px-2 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors">
                    Deactivate
                  </button>
                ) : (
                  <button className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                    Activate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}