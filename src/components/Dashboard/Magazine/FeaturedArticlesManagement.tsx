import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Plus,
  Search,
  Calendar,
  User,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { articlesApi } from '../../../api/articles';
import { useData } from '../../../contexts/DataContext';

interface FeaturedArticlesManagementProps {
  isDarkMode: boolean;
}

export default function FeaturedArticlesManagement({ isDarkMode }: FeaturedArticlesManagementProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData } = useData();

  const hardcodedFeaturedArticles = [
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

  useEffect(() => {
    loadFeaturedArticles();
  }, [currentPage]);

  const loadFeaturedArticles = async () => {
    try {
      const response = await articlesApi.getFeaturedArticles({
        page: currentPage,
        limit: 3, // Only load latest 3
        status: 'published'
      });
      
      if (response.success) {
        // Sort by creation date and take only the latest 3
        const sortedArticles = (response.data || [])
          .sort((a: any, b: any) => new Date(b.createdAt || b.publishDate).getTime() - new Date(a.createdAt || a.publishDate).getTime())
          .slice(0, 3);
        setFeaturedArticles(sortedArticles);
        setTotalPages(1); // Always 1 page since we only show 3
      } else {
        setFeaturedArticles([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error loading featured articles:', error);
      setFeaturedArticles([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewArticle = (article: any) => {
    const articleId = article._id || article.id;
    navigate(`/admin/article/${articleId}`);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading featured articles...
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
            Featured Articles
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            View the latest 3 featured articles
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {featuredArticles.length}/3 articles
          </span>
        </div>
      </div>

      {/* Current Featured Articles */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4`}>
        <h2 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Latest Featured Articles
        </h2>

        <div className="space-y-3">
          {featuredArticles.map((article, index) => {
            const articleId = article._id || article.id;
            return (
            <div key={articleId} className={`flex items-center space-x-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Position */}
              <div className="flex flex-col items-center space-y-1">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  #{index + 1}
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
                src={article.image || article.featured_image || article.featuredImage}
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

              {/* Stats */}
              <div className="text-right">
                <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.views}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  views
                </p>
              </div>

              {/* Actions - Only View */}
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => handleViewArticle(article)}
                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <Eye className="w-3 h-3" />
                </button>
              </div>
            </div>
          );})}
        </div>
        {renderPagination()}
      </div>
    </div>
  );
}