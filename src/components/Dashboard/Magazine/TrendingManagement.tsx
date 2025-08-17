import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Eye, ArrowUp, ArrowDown, Plus, Search, Calendar, User, X, Siren as Fire, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

import { articlesApi } from '../../../api/articles';
import { useData } from '../../../contexts/DataContext';

interface TrendingManagementProps {
  isDarkMode: boolean;
}

export default function TrendingManagement({ isDarkMode }: TrendingManagementProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingArticles, setTrendingArticles] = useState<any[]>([]);
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData } = useData();

  const hardcodedTrendingArticles = [
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

  const hardcodedAvailableArticles = [
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

  useEffect(() => {
    loadTrendingArticles();
    loadAvailableArticles();
  }, [currentPage]);

  const loadTrendingArticles = async () => {
    try {
      const response = await articlesApi.getTrendingArticles({
        page: currentPage,
        limit: 10,
        status: 'published'
      });
      
      if (response.success) {
        setTrendingArticles(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setTrendingArticles([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error loading trending articles:', error);
      setTrendingArticles([]);
      setTotalPages(1);
    }
  };

  const loadAvailableArticles = async () => {
    try {
      const response = await articlesApi.getArticles({
        page: 1,
        limit: 20,
        status: 'published',
        trending: false
      });
      
      if (response.success) {
        setAllArticles(response.data || []);
      } else {
        setAllArticles([]);
      }
    } catch (error) {
      console.error('Error loading available articles:', error);
      setAllArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsTrending = async (articleId: string) => {
    try {
      const article = allArticles.find(a => (a._id || a.id) === articleId);
      if (article) {
        await articlesApi.updateArticle(articleId, {
          ...article,
          trending: true
        });
        await loadTrendingArticles();
        await loadAvailableArticles();
        await fetchData();
      }
    } catch (error) {
      console.error('Error marking article as trending:', error);
    }
  };

  const handleRemoveFromTrending = async (articleId: string) => {
    try {
      const article = trendingArticles.find(a => (a._id || a.id) === articleId);
      if (article) {
        await articlesApi.updateArticle(articleId, {
          ...article,
          trending: false
        });
        await loadTrendingArticles();
        await loadAvailableArticles();
        await fetchData();
      }
    } catch (error) {
      console.error('Error removing article from trending:', error);
    }
  };

  const filteredAvailableArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.categoryName || article.category_name || article.category).toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading trending articles...
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Trending Views
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {trendingArticles.reduce((total, article) => {
                  const viewsStr = article.views?.toString() || '0';
                  const views = parseInt(viewsStr.replace(/[K,]/g, '')) || 0;
                  return total + (viewsStr.includes('K') ? views * 1000 : views);
                }, 0).toLocaleString()}
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
                {trendingArticles.length > 0 ? (
                  Math.round(trendingArticles.reduce((total, article) => {
                    const growth = parseInt(article.growthRate?.replace(/[+%]/g, '')) || 0;
                    return total + growth;
                  }, 0) / trendingArticles.length)
                ) : 0}%
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
{(() => {
                  const categoryCount: Record<string, number> = {};
                  trendingArticles.forEach(article => {
                    const category = article.categoryName || article.category_name || article.category || 'Unknown';
                    categoryCount[category] = (categoryCount[category] || 0) + 1;
                  });
                  const categories = Object.keys(categoryCount);
                  if (categories.length === 0) return 'None';
                  const topCategory = categories.reduce((a, b) => 
                    categoryCount[a] > categoryCount[b] ? a : b
                  );
                  return topCategory;
                })()}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-lg">
              <Fire className="w-4 h-4" />
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
                {trendingArticles.length}
              </p>
            </div>
            <div className="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-lg">
              <User className="w-4 h-4" />
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
          {trendingArticles.map((article, index) => {
            const articleId = article._id || article.id;
            return (
            <div key={articleId} className={`flex items-center space-x-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
                src={article.image || article.featured_image || article.featuredImage}
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
                        {article.categoryName || article.category_name || article.category}
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
                      <button 
                        onClick={() => navigate(`/admin/article/${articleId}`)}
                        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );})}
        </div>
        {renderPagination()}
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