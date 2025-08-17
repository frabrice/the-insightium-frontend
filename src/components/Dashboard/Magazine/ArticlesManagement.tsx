import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from './ArticleForm';
import { 
  Plus,
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Calendar,
  User,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useData } from '../../../contexts/DataContext';
import { articlesApi } from '../../../api/articles';
import { useToast } from '../../../contexts/ToastContext';

interface ArticlesManagementProps {
  isDarkMode: boolean;
}

export default function ArticlesManagement({ isDarkMode }: ArticlesManagementProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedArticles, setPaginatedArticles] = useState<any[]>([]);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { articles, isLoading: dataLoading, fetchData } = useData();
  const { showSuccess, showError } = useToast();
  const itemsPerPage = 10;

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

  useEffect(() => {
    loadPaginatedArticles();
  }, [currentPage, searchQuery, selectedCategory, selectedStatus, articles]);

  const loadPaginatedArticles = async () => {
    setPaginationLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: itemsPerPage
      };
      
      if (selectedStatus !== 'all') params.status = selectedStatus;
      if (selectedCategory !== 'all') params.category = selectedCategory;
      
      const response = await articlesApi.getArticles(params);
      
      if (response.success) {
        let filteredData = response.data;
        
        if (searchQuery) {
          filteredData = response.data.filter((article: any) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.categoryName || article.category || '').toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setPaginatedArticles(filteredData);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        const localFiltered = articles.filter(article => {
          const matchesSearch = !searchQuery || 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.categoryName || article.category || '').toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesCategory = selectedCategory === 'all' || 
            (article.categoryName || article.category) === selectedCategory;
          
          const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
          
          return matchesSearch && matchesCategory && matchesStatus;
        });
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedArticles(localFiltered.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(localFiltered.length / itemsPerPage));
      }
    } catch (error) {
      const localFiltered = articles.filter(article => {
        const matchesSearch = !searchQuery || 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (article.categoryName || article.category || '').toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || 
          (article.categoryName || article.category) === selectedCategory;
        
        const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
      });
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedArticles(localFiltered.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(localFiltered.length / itemsPerPage));
    } finally {
      setPaginationLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded border ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'} disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded border text-sm ${
                currentPage === page
                  ? 'bg-red-600 text-white border-red-600'
                  : isDarkMode
                    ? 'border-gray-700 text-gray-400 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded border ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'} disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-3 h-3" />;
      default: return <XCircle className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const refreshArticles = () => {
    window.location.reload();
  };

  const handleEditArticle = (article: any) => {
    setEditingArticle(article);
    setShowArticleForm(true);
  };

  const handleViewArticle = (article: any) => {
    navigate(`/admin/article/${article._id || article.id}`);
  };

  const handleSaveArticle = async (articleData: any) => {
    setIsLoading(true);
    setSaveMessage('');
    
    try {
      setSaveMessage('Article saved successfully!');
      
      await fetchData();
      
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      
    } catch (error) {
      setSaveMessage('Error saving article. Please try again.');
    } finally {
      setIsLoading(false);
    }
    
    setShowArticleForm(false);
    setEditingArticle(null);
  };

  const handleDeleteClick = (article: any) => {
    setDeletingArticle(article);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingArticle) return;
    
    setIsLoading(true);
    
    try {
      await articlesApi.deleteArticle(deletingArticle._id || deletingArticle.id);
      showSuccess('Article deleted successfully!');
      await fetchData();
      loadPaginatedArticles();
    } catch (error: any) {
      showError('Failed to delete article', error.message || 'Please try again.');
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
      setDeletingArticle(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletingArticle(null);
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
          onClick={() => {
            setEditingArticle(null);
            setShowArticleForm(true);
          }}
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
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {paginationLoading || dataLoading ? (
            <div className="px-4 py-8 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto mb-2"></div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading articles...</p>
            </div>
          ) : paginatedArticles.length > 0 ? (
            paginatedArticles.map((article) => {
              const articleId = article._id || article.id || '';
              return (
            <div key={articleId} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-center">
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
                          {article.categoryName || article.category}
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
                          {article.views || '0'}
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
                          {new Date(article.publishDate || article.createdAt || Date.now()).toLocaleDateString()}
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
                        <button 
                          onClick={() => handleViewArticle(article)}
                          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          title="View article"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleEditArticle(article)}
                          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          title="Edit article"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(article)}
                          className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300`}
                          title="Delete article"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )})
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
        {renderPagination()}
      </div>


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


      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-2xl w-full max-w-md`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Delete Article
                  </h2>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                Are you sure you want to delete "<span className="font-medium">{deletingArticle.title}</span>"? 
                This will permanently remove the article and all its data.
              </p>
              
              <div className={`${isDarkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} rounded-lg border p-3`}>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                      Warning
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                      This action is permanent and cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-end space-x-3 p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={handleDeleteCancel}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Article</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}