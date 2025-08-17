import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Award,
  RefreshCw
} from 'lucide-react';
import { articlesApi } from '../../../api/articles';
import { useToast } from '../../../contexts/ToastContext';

interface EditorsPickManagementProps {
  isDarkMode: boolean;
}

export default function EditorsPickManagement({ isDarkMode }: EditorsPickManagementProps) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [editorsPickArticles, setEditorsPickArticles] = useState<any[]>([]);
  const [availableArticles, setAvailableArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingArticle, setAddingArticle] = useState<string | null>(null);
  const [removingArticle, setRemovingArticle] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      
      // Load Editor's Pick articles (max 3)
      const editorsPickResponse = await articlesApi.getArticles({ 
        editors_pick: true, 
        limit: 3, 
        status: 'published' 
      });
      
      // Load available articles (not Editor's Pick)
      const availableResponse = await articlesApi.getArticles({ 
        editors_pick: false, 
        limit: 10, 
        status: 'published' 
      });
      
      if (editorsPickResponse.success) {
        setEditorsPickArticles(editorsPickResponse.data || []);
      }
      
      if (availableResponse.success) {
        setAvailableArticles(availableResponse.data || []);
      }
      
    } catch (error) {
      console.error('Error loading articles:', error);
      showError('Error loading articles');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToEditorsPick = async (articleId: string) => {
    if (editorsPickArticles.length >= 3) {
      showError('You can only have 3 Editor\'s Pick articles at a time');
      return;
    }

    try {
      setAddingArticle(articleId);
      
      await articlesApi.updateArticle(articleId, { editors_pick: true });
      showSuccess('Article added to Editor\'s Pick successfully!');
      
      await loadArticles();
    } catch (error) {
      console.error('Error adding to Editor\'s Pick:', error);
      showError('Error adding article to Editor\'s Pick');
    } finally {
      setAddingArticle(null);
    }
  };

  const handleRemoveFromEditorsPick = async (articleId: string) => {
    try {
      setRemovingArticle(articleId);
      
      await articlesApi.updateArticle(articleId, { editors_pick: false });
      showSuccess('Article removed from Editor\'s Pick successfully!');
      
      await loadArticles();
    } catch (error) {
      console.error('Error removing from Editor\'s Pick:', error);
      showError('Error removing article from Editor\'s Pick');
    } finally {
      setRemovingArticle(null);
    }
  };

  const handleEditArticle = (articleId: string) => {
    navigate(`/admin/article/${articleId}`);
  };

  const handleViewArticle = (articleId: string) => {
    navigate(`/admin/article/${articleId}`);
  };

  // Filter available articles by search query
  const filteredAvailableArticles = availableArticles.filter(article => {
    if (!searchQuery) return true;
    return article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           article.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           article.author?.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          <button
            onClick={loadArticles}
            disabled={loading}
            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading Editor's Pick articles...
          </span>
        </div>
      )}

      {/* Current Editor's Pick Articles */}
      {!loading && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center space-x-2 mb-4">
            <Edit3 className="w-4 h-4 text-blue-600" />
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Current Editor's Pick
            </h2>
          </div>

          {editorsPickArticles.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No Editor's Pick articles yet. Add articles from the available list below.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {editorsPickArticles.map((article, index) => (
                <div key={article._id} className={`flex items-center space-x-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  {/* Position */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 w-6 h-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">#{index + 1}</span>
                    </div>
                  </div>

                  {/* Article Image */}
                  <img 
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
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
                            {article.categoryName}
                          </span>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {article.author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {new Date(article.publishDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex items-center space-x-4 ml-4">
                        <div className="text-right">
                          <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {article.views || 0}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            views
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => handleViewArticle(article._id)}
                            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              These articles appear in a special section and are highlighted with editorial badges. Only 3 articles can be featured at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}