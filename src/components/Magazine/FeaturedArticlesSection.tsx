import React from 'react';
import { Calendar, User, Clock, ArrowRight, Eye } from 'lucide-react';
import { usePublicData } from '../../contexts/PublicDataContext';
import { useNavigate } from 'react-router-dom';

interface FeaturedArticlesSectionProps {
  isDarkMode: boolean;
}

export default function FeaturedArticlesSection({ isDarkMode }: FeaturedArticlesSectionProps) {
  const { dedicatedFeaturedArticles, isLoadingFeaturedArticles } = usePublicData();
  const navigate = useNavigate();

  // Show loading state while fetching
  if (isLoadingFeaturedArticles) {
    return (
      <section className={`py-8 sm:py-12 lg:py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl border shadow-sm p-4 animate-pulse`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}></div>
                  <div className="flex-1 space-y-2">
                    <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4`}></div>
                    <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no featured articles
  if (!dedicatedFeaturedArticles || dedicatedFeaturedArticles.length === 0) {
    return null;
  }

  const displayArticles = dedicatedFeaturedArticles;

  const handleArticleClick = (article: any) => {
    if (article._id || article.id) {
      navigate(`/article/${article._id || article.id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className={`py-8 sm:py-12 lg:py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Articles Grid - Horizontal Layout like in image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayArticles.map((article, index) => (
            <div
              key={article._id || article.id || index}
              className={`group cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-xl border p-4`}
              onClick={() => handleArticleClick(article)}
            >
              <div className="flex items-start space-x-4">
                {/* Article Image - Small square on the left */}
                <div className="flex-shrink-0">
                  <img
                    src={article.featured_image || article.featuredImage}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                </div>

                {/* Article Content - Right side */}
                <div className="flex-1 min-w-0">
                  {/* Article Title */}
                  <h3 className={`text-sm sm:text-base font-semibold mb-2 leading-tight line-clamp-2 group-hover:text-red-600 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {article.title}
                  </h3>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Category Badge - Same styling as MainArticlesSection */}
                    {(article.categoryName || article.category) && (
                      <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold truncate max-w-full ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                        {article.categoryName || article.category}
                      </span>
                    )}

                    {/* Author */}
                    {article.author && (
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {article.author}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}