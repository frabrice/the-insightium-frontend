import React, { useState } from 'react';
import { User, Search, RefreshCw } from 'lucide-react';
import { usePublicData } from '../../contexts/PublicDataContext';
import { useNavigate } from 'react-router-dom';

interface OtherArticlesSectionProps {
  isDarkMode: boolean;
}

export default function OtherArticlesSection({ isDarkMode }: OtherArticlesSectionProps) {
  const [visibleArticles, setVisibleArticles] = useState(6);
  const { regularArticles, trendingArticles, isLoadingRegularArticles } = usePublicData();
  const navigate = useNavigate();

  // Use dedicated regular articles from the API
  const otherArticles = regularArticles;

  // Show loading state while fetching regular articles
  if (isLoadingRegularArticles) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md animate-pulse">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no articles at all (this should rarely happen now that we have content)
  if (otherArticles.length === 0 && trendingArticles.length === 0) {
    return null; // Return nothing for now since we have content in the database
  }
  
  const allArticles = otherArticles;

  // Use real trending articles
  const displayTrendingArticles = trendingArticles;

  const totalArticles = allArticles.length;
  const displayedArticles = allArticles.slice(0, visibleArticles);
  const hasMoreArticles = visibleArticles < totalArticles;

  const loadMoreArticles = () => {
    setVisibleArticles(prev => Math.min(prev + 3, totalArticles));
  };

  const handleArticleClick = (article: any) => {
    if (article._id || article.id) {
      navigate(`/article/${article._id || article.id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleTrendingClick = (article: any, index: number) => {
    if (article.id || article._id) {
      navigate(`/article/${article.id || article._id}`);
      window.scrollTo(0, 0);
    } else {
      // For fallback articles without IDs, just scroll to top
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 gap-6 sm:gap-8 lg:gap-12 ${displayTrendingArticles.length > 0 ? 'lg:grid-cols-3' : ''}`}>
          {/* Main Articles - Left Side (70% - 2/3 width on desktop) */}
          <div className={`${displayTrendingArticles.length > 0 ? 'lg:col-span-2' : ''} order-2 lg:order-1`}>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {displayedArticles.map((article, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                    {/* Article Image */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <img 
                        src={article.featured_image || article.featuredImage || article.image}
                        alt={article.title}
                        className="w-full h-48 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>

                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category Badge - Red */}
                      {(article.categoryName || article.category) && (
                        <div className="mb-2 lg:mb-3">
                          <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold whitespace-nowrap ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                            {article.categoryName || article.category}
                          </span>
                        </div>
                      )}

                      {/* Article Title - Blue on hover */}
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 sm:line-clamp-3">
                        {article.title}
                      </h3>

                      {/* Article Description */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-2 lg:line-clamp-3">
                        {article.content ? article.content.slice(0, 150) + (article.content.length > 150 ? '...' : '') : (article.excerpt || article.description)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Section */}
            {hasMoreArticles && (
              <div className="text-center mt-6 sm:mt-8 lg:mt-10">
                <button 
                  onClick={loadMoreArticles}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors" 
                  style={{ backgroundColor: '#F21717' }}
                >
                  Load More Articles
                </button>
              </div>
            )}

            {/* Empty state for articles when no regular articles but trending exists */}
            {allArticles.length === 0 && displayTrendingArticles.length > 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-200 rounded-full">
                    <Search className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Regular Articles Yet
                </h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  Check out our trending articles on the right, or come back later for new content!
                </p>
              </div>
            )}
          </div>

          {/* Trending Articles Sidebar - Right Side (30% - 1/3 width on desktop) */}
          {displayTrendingArticles.length > 0 && (
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-gray-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 sticky top-4">
                {/* Sidebar Title */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Trending Articles
                </h2>

                {/* Trending Articles List */}
                <div className="space-y-0">
                  {displayTrendingArticles.slice(0, 12).map((article, index) => (
                  <React.Fragment key={article.id || article._id || index}>
                    <div 
                      className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4 group cursor-pointer py-2 sm:py-3 lg:py-4"
                      onClick={() => handleTrendingClick(article, index)}
                    >
                      {/* Number Badge */}
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {index + 1}
                      </div>

                      {/* Article Title */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-xs lg:text-sm font-medium text-gray-900 leading-tight group-hover:text-red-600 transition-colors duration-300 line-clamp-2 lg:line-clamp-3">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Divider Line - Don't show after last item */}
                    {index < displayTrendingArticles.slice(0, 12).length - 1 && (
                      <div className="border-b border-gray-200 mx-2 sm:mx-0"></div>
                    )}
                  </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}