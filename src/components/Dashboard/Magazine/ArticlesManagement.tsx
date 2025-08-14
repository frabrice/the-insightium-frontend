import React, { useState } from 'react';
import ArticleForm from './ArticleForm';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../../contexts/DataContext';

interface ArticlesManagementProps {
  isDarkMode: boolean;
}

export default function ArticlesManagement({ isDarkMode }: ArticlesManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const { articles, isLoading: dataLoading } = useData();

  const categories = [
    'Research World',
    'Spirit of Africa',
    'Tech Trends',
    'Need to Know',
    'Echoes of Home',
    'Career Campus',
    'Mind and Body Quest',
    'E! Corner'
  ];

  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.category_name || article.category).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      (article.category_name || article.category) === selectedCategory;
    
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-3 h-3" />;
      case 'draft': return <AlertCircle className="w-3 h-3" />;
      case 'review': return <Clock className="w-3 h-3" />;
      default: return <XCircle className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'draft': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'review': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredArticles.map(article => article.id));
    }
  };

  const handleSelectArticle = (id: string) => {
    setSelectedArticles(prev => 
      prev.includes(id) 
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    setShowArticleForm(true);
  };

  const handleEditArticle = (article: any) => {
    setEditingArticle(article);
    setShowArticleForm(true);
  };

  const handleSaveArticle = async (articleData: any) => {
    setIsLoading(true);
    setSaveMessage('');
    
    try {
      console.log('Article saved successfully:', articleData);
      setSaveMessage('Article saved successfully!');
      
      // Refresh the articles list by refetching data
      setTimeout(() => {
        window.location.reload(); // Simple refresh for now
      }, 1000);
      
    } catch (error) {
      console.error('Error in handleSaveArticle:', error);
      setSaveMessage('Error saving article. Please try again.');
    } finally {
      setIsLoading(false);
    }
    
    setShowArticleForm(false);
    setEditingArticle(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Articles Management
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage all your articles and content
          </p>
        </div>
        <button 
          onClick={handleNewArticle}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1" 
          style={{ backgroundColor: '#F21717' }}
        >
          <Plus className="w-3 h-3" />
          <span>New Article</span>
        </button>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`${saveMessage.includes('Error') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'} rounded-lg border p-3`}>
          <p className="text-sm">{saveMessage}</p>
        </div>
      )}

      {/* Filters */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-7 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        {/* Table Header */}
        <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedArticles.length === filteredArticles.length}
              onChange={handleSelectAll}
              className="w-3 h-3 text-red-600 rounded focus:ring-red-500"
            />
            <span className={`ml-3 text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedArticles.length > 0 ? `${selectedArticles.length} selected` : 'Select all'}
            </span>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {dataLoading ? (
            <div className="px-4 py-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto mb-2"></div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading articles...</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
            <div key={article.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-center space-x-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedArticles.includes(article.id)}
                  onChange={() => handleSelectArticle(article.id)}
                  className="w-3 h-3 text-red-600 rounded focus:ring-red-500"
                />

                {/* Article Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {article.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(article.status)}`}>
                          {getStatusIcon(article.status)}
                          <span className="capitalize">{article.status}</span>
                        </span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {article.category_name || article.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {article.author}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Article Stats */}
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
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {article.readTime}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          read
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {new Date(article.publish_date || article.publishDate).toLocaleDateString()}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          published
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center space-x-1">
                        {article.featured && (
                          <div className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 p-1 rounded">
                            <Star className="w-3 h-3" />
                          </div>
                        )}
                        {article.trending && (
                          <div className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-1 rounded">
                            <TrendingUp className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Eye className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleEditArticle(article)}
                          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' 
                  ? 'No articles match your filters' 
                  : 'No articles found'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedArticles.length > 0 && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedArticles.length} article{selectedArticles.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                Publish
              </button>
              <button className="px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors">
                Draft
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Form Modal */}
      {showArticleForm && (
        <ArticleForm
          isDarkMode={isDarkMode}
          onClose={() => {
            setShowArticleForm(false);
            setEditingArticle(null);
          }}
          onSave={handleSaveArticle}
          initialData={editingArticle}
          mode={editingArticle ? 'edit' : 'create'}
        />
      )}
    </div>
  );
}