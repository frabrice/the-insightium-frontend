import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  X
} from 'lucide-react';
import { useData } from '../../../contexts/DataContext';

interface MainArticlesManagementProps {
  isDarkMode: boolean;
}

export default function MainArticlesManagement({ isDarkMode }: MainArticlesManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mainArticles, setMainArticles] = useState<any>({ main: null, second: null });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [saveStatusType, setSaveStatusType] = useState<'success' | 'error'>('success');
  const { articles } = useData();

  // Fetch main articles and recent articles
  useEffect(() => {
    // Use dummy data instead of database calls
    setMainArticles({
      main: articles[0] || null,
      second: articles[1] || null
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      fetchRecentArticles();
    }
  }, [articles]);

  const fetchRecentArticles = () => {
    // Get articles from the last 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const recent = articles.filter(article => {
      const publishDate = new Date(article.publishDate || article.publish_date);
      const isRecent = publishDate >= threeDaysAgo;
      const isPublished = article.status === 'published';
      const isNotCurrentMain = article.id !== mainArticles.main?.id;
      const isNotCurrentSecond = article.id !== mainArticles.second?.id;
      
      return isRecent && isPublished && isNotCurrentMain && isNotCurrentSecond;
    }).sort((a, b) => {
      const dateA = new Date(a.publishDate || a.publish_date);
      const dateB = new Date(b.publishDate || b.publish_date);
      return dateB.getTime() - dateA.getTime();
    });

    setRecentArticles(recent);
  };

  // Filter recent articles based on search
  const filteredRecentArticles = recentArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.category_name || article.category).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showSaveStatus = (message: string, type: 'success' | 'error' = 'success') => {
    setSaveStatus(message);
    setSaveStatusType(type);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleSetMainArticle = async (article: any, position: 'main' | 'second') => {
    setIsSaving(true);
    try {
      // Update local state immediately
      setMainArticles(prev => ({
        ...prev,
        [position]: article
      }));

      // Refresh recent articles to remove the newly set article
      setTimeout(() => {
        fetchRecentArticles();
      }, 100);

      showSaveStatus(`Article set as ${position} main article successfully!`, 'success');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveMainArticle = async (position: 'main' | 'second') => {
    setIsSaving(true);
    try {
      // Update local state
      setMainArticles(prev => ({
        ...prev,
        [position]: null
      }));

      // Refresh recent articles to include the removed article
      setTimeout(() => {
        fetchRecentArticles();
      }, 100);

      showSaveStatus(`${position.charAt(0).toUpperCase() + position.slice(1)} main article removed successfully!`, 'success');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSwapPositions = async () => {
    if (!mainArticles.main || !mainArticles.second) return;

    setIsSaving(true);
    try {
      // Update local state
      setMainArticles({
        main: mainArticles.second,
        second: mainArticles.main
      });

      showSaveStatus('Main articles positions swapped successfully!', 'success');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    // Simulate refresh with dummy data
    setMainArticles({
      main: articles[0] || null,
      second: articles[1] || null
    });
    showSaveStatus('Main articles refreshed!', 'success');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 3) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" style={{ borderColor: '#F21717' }}></div>
        <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading main articles...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Main Articles Management
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage the main featured articles on your homepage
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading || isSaving}
            className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 disabled:opacity-50 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          {mainArticles.main && mainArticles.second && (
            <button
              onClick={handleSwapPositions}
              disabled={isSaving}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <ArrowUp className="w-3 h-3" />
              <ArrowDown className="w-3 h-3" />
              <span>Swap Positions</span>
            </button>
          )}
        </div>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className={`${
          saveStatusType === 'success' 
            ? isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
            : isDarkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
        } rounded-lg border p-3`}>
          <div className="flex items-center space-x-2">
            {saveStatusType === 'success' ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-xs ${
              saveStatusType === 'success' 
                ? isDarkMode ? 'text-green-300' : 'text-green-700'
                : isDarkMode ? 'text-red-300' : 'text-red-700'
            }`}>
              {saveStatus}
            </span>
          </div>
        </div>
      )}

      {/* Current Main Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Main Article */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Main Article
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-xs text-yellow-600 font-medium">Primary</span>
              </div>
              {mainArticles.main && (
                <button
                  onClick={() => handleRemoveMainArticle('main')}
                  disabled={isSaving}
                  className="text-xs text-red-600 hover:text-red-700 font-medium disabled:opacity-50 flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>

          {mainArticles.main ? (
            <div className="space-y-3">
              <img 
                src={mainArticles.main.featured_image || mainArticles.main.featuredImage}
                alt={mainArticles.main.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className={`text-sm font-medium line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {mainArticles.main.title}
                </h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded text-xs">
                    {mainArticles.main.category_name || mainArticles.main.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {mainArticles.main.author}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {mainArticles.main.views} views
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Eye className="w-3 h-3" />
                    </button>
                    <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No main article selected</p>
              <p className="text-xs">Choose from recent articles below</p>
            </div>
          )}
        </div>

        {/* Second Main Article */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Second Main Article
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-blue-500 fill-current" />
                <span className="text-xs text-blue-600 font-medium">Secondary</span>
              </div>
              {mainArticles.second && (
                <button
                  onClick={() => handleRemoveMainArticle('second')}
                  disabled={isSaving}
                  className="text-xs text-red-600 hover:text-red-700 font-medium disabled:opacity-50 flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>

          {mainArticles.second ? (
            <div className="space-y-3">
              <img 
                src={mainArticles.second.featured_image || mainArticles.second.featuredImage}
                alt={mainArticles.second.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className={`text-sm font-medium line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {mainArticles.second.title}
                </h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded text-xs">
                    {mainArticles.second.category_name || mainArticles.second.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {mainArticles.second.author}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {mainArticles.second.views} views
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Eye className="w-3 h-3" />
                    </button>
                    <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No second main article selected</p>
              <p className="text-xs">Choose from recent articles below</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Articles (Last 3 Days) */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Articles (Last 3 Days)
            </h2>
            <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {filteredRecentArticles.length} articles
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search recent articles..."
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

        {filteredRecentArticles.length > 0 ? (
          <div className="space-y-2">
            {filteredRecentArticles.map((article) => (
              <div key={article.id} className={`flex items-center justify-between p-3 rounded-lg border ${isDarkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                <div className="flex items-center space-x-3">
                  <img 
                    src={article.featured_image || article.featuredImage}
                    alt={article.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded text-xs">
                        {article.category_name || article.category}
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
                          {getTimeAgo(article.publish_date || article.publishDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {article.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => handleSetMainArticle(article, 'main')}
                    disabled={isSaving || mainArticles.main?.id === article.id}
                    className="px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <Star className="w-3 h-3" />
                    <span>Set as Main</span>
                  </button>
                  <button 
                    onClick={() => handleSetMainArticle(article, 'second')}
                    disabled={isSaving || mainArticles.second?.id === article.id}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <Star className="w-3 h-3" />
                    <span>Set as Second</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">No recent articles found</p>
            <p className="text-xs">
              {searchQuery 
                ? `No articles match "${searchQuery}" from the last 3 days`
                : 'No articles have been published in the last 3 days'
              }
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Loading Indicator */}
      {isSaving && (
        <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border p-3`}>
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              Updating main articles...
            </span>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className={`${isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} rounded-lg border p-4`}>
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
          <div>
            <h3 className={`text-sm font-medium ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>
              Main Articles Management
            </h3>
            <ul className={`text-xs mt-1 space-y-1 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
              <li>• Only articles from the last 3 days are shown for selection</li>
              <li>• Main article appears prominently on the homepage</li>
              <li>• Second main article appears in the sidebar</li>
              <li>• You can swap positions or remove articles anytime</li>
              <li>• Changes are applied immediately to your website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}