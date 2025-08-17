import React from 'react';
import { User, FileText, Plus } from 'lucide-react';
import { usePublicData } from '../../contexts/PublicDataContext';
import { useNavigate } from 'react-router-dom';

interface MainArticlesSectionProps {
  isDarkMode: boolean;
}

export default function MainArticlesSection({ isDarkMode }: MainArticlesSectionProps) {
  const { mainArticle, secondMainArticle, isLoadingMainArticles } = usePublicData();
  const navigate = useNavigate();

  // Show loading state while fetching
  if (isLoadingMainArticles) {
    return (
      <section className={`py-3 sm:py-4 lg:py-6 xl:py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Main article skeleton */}
            <div className="lg:col-span-3">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 h-64 animate-pulse`}>
                <div className="flex flex-col lg:grid lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 h-full">
                  <div className="lg:col-span-3 space-y-3">
                    <div className={`h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4`}></div>
                    <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-full`}></div>
                    <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`}></div>
                  </div>
                  <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-full`}></div>
                </div>
              </div>
            </div>
            {/* Second article skeleton */}
            <div className="lg:col-span-1">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg sm:rounded-xl lg:rounded-2xl h-28 sm:h-32 lg:h-80 animate-pulse`}>
                <div className={`w-full h-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state only when not loading and no main articles exist
  if (!isLoadingMainArticles && !mainArticle && !secondMainArticle) {
    return (
      <section className={`py-8 sm:py-12 lg:py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl`}>
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <FileText className={`w-12 h-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No Featured Articles Yet
            </h3>
            <p className={`text-lg mb-6 max-w-md mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're working on bringing you amazing content. Check back soon for our latest featured articles!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/tv-show')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Explore TV Shows</span>
              </button>
              <button
                onClick={() => navigate('/podcast')}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>Check Podcasts</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleMainArticleClick = () => {
    if (mainArticle && (mainArticle._id || mainArticle.id)) {
      navigate(`/article/${mainArticle._id || mainArticle.id}`);
    }
  };

  const handleSecondArticleClick = () => {
    if (secondMainArticle && (secondMainArticle._id || secondMainArticle.id)) {
      navigate(`/article/${secondMainArticle._id || secondMainArticle.id}`);
    }
  };

  return (
    <section className={`py-3 sm:py-4 lg:py-6 xl:py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Show single centered card when only one featured article */}
        {mainArticle && !secondMainArticle ? (
          <div className="max-w-4xl mx-auto">
            <div 
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg border transition-colors group cursor-pointer hover:shadow-xl`}
              onClick={handleMainArticleClick}
            >
              <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-start h-full">
                {/* Article Content - Full width on mobile, 3 columns on desktop */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full order-2 lg:order-1 pr-2 sm:pr-4 lg:pr-0">
                  <div>
                    <h1 className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-tight mb-2 sm:mb-3 lg:mb-4 group-hover:underline transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}
                        style={{ 
                          textDecorationColor: '#F21717',
                          textUnderlineOffset: '6px'
                        }}>
                      {mainArticle?.title}
                    </h1>
                    <p className={`text-xs sm:text-sm lg:text-sm leading-relaxed mb-3 sm:mb-4 lg:mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                      {mainArticle?.excerpt}
                    </p>
                  </div>
                  
                  {/* Category and Author */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 lg:space-x-4">
                    {(mainArticle?.categoryName || mainArticle?.category) && (
                      <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold truncate max-w-full ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                        {mainArticle?.categoryName || mainArticle?.category}
                      </span>
                    )}
                    {mainArticle?.author && (
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {mainArticle?.author}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Article Image - Full width on mobile, 2 columns on desktop */}
                <div className="lg:col-span-2 w-full h-40 sm:h-48 lg:h-full order-1 lg:order-2">
                  <img 
                    src={mainArticle?.featured_image || mainArticle?.featuredImage}
                    alt={mainArticle?.title}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg lg:rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Show two-column layout when both articles exist */
          <div className={`grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 ${mainArticle && secondMainArticle ? 'lg:grid-cols-4' : ''}`}>
            {/* Main Article */}
            {mainArticle && (
            <div className={mainArticle && secondMainArticle ? "lg:col-span-3" : ""}>
              <div 
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg border transition-colors group cursor-pointer hover:shadow-xl`}
                onClick={handleMainArticleClick}
              >
                <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-start h-full">
                  {/* Article Content - Full width on mobile, 3 columns on desktop */}
                  <div className="lg:col-span-3 flex flex-col justify-between h-full order-2 lg:order-1 pr-2 sm:pr-4 lg:pr-0">
                    <div>
                      <h1 className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-tight mb-2 sm:mb-3 lg:mb-4 group-hover:underline transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}
                          style={{ 
                            textDecorationColor: '#F21717',
                            textUnderlineOffset: '6px'
                          }}>
                        {mainArticle?.title}
                      </h1>
                      <p className={`text-xs sm:text-sm lg:text-sm leading-relaxed mb-3 sm:mb-4 lg:mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                        {mainArticle?.excerpt}
                      </p>
                    </div>
                    
                    {/* Category and Author */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 lg:space-x-4">
                      {(mainArticle?.categoryName || mainArticle?.category) && (
                        <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold truncate max-w-full ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                          {mainArticle?.categoryName || mainArticle?.category}
                        </span>
                      )}
                      {mainArticle?.author && (
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {mainArticle?.author}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Article Image - Full width on mobile, 2 columns on desktop */}
                  <div className="lg:col-span-2 w-full h-40 sm:h-48 lg:h-full order-1 lg:order-2">
                    <img 
                      src={mainArticle?.featured_image || mainArticle?.featuredImage}
                      alt={mainArticle?.title}
                      className="w-full h-full object-cover rounded-md sm:rounded-lg lg:rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Second Main Article */}
            {secondMainArticle && (
            <div className="lg:col-span-1">
              <div 
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg border transition-colors group cursor-pointer hover:shadow-xl flex flex-row lg:flex-col h-28 sm:h-32 lg:h-80`}
                onClick={handleSecondArticleClick}
              >
                {/* Second Article Image */}
                <div className="relative overflow-hidden w-28 sm:w-32 lg:w-full lg:flex-1">
                  <img 
                    src={secondMainArticle?.featured_image || secondMainArticle?.featuredImage}
                    alt={secondMainArticle?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>

                {/* Second Article Content */}
                <div className="p-2 sm:p-3 lg:p-4 flex-1 lg:flex-shrink-0 flex flex-col justify-center lg:justify-start">
                  <h2 className={`text-xs sm:text-sm lg:text-sm xl:text-base font-bold mb-1 sm:mb-2 leading-tight group-hover:underline transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}
                      style={{ 
                        textDecorationColor: '#F21717',
                        textUnderlineOffset: '4px'
                      }}>
                    {secondMainArticle?.title}
                  </h2>
                  
                  {/* Subtitle for second article - Enhanced visibility */}
                  {secondMainArticle?.subtitle && (
                    <p className={`text-xs mb-1 sm:mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} line-clamp-1 sm:line-clamp-2 lg:line-clamp-2`}>
                      {secondMainArticle?.subtitle}
                    </p>
                  )}
                  
                  {/* Description/Excerpt for second article */}
                  {secondMainArticle?.excerpt && (
                    <p className={`text-xs leading-relaxed mb-2 sm:mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                      {secondMainArticle?.excerpt}
                    </p>
                  )}
                  
                  <div className="space-y-1 mt-1">
                    {(secondMainArticle?.categoryName || secondMainArticle?.category) && (
                      <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold truncate max-w-full ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                        {secondMainArticle?.categoryName || secondMainArticle?.category}
                      </span>
                    )}
                    {secondMainArticle?.author && (
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {secondMainArticle?.author}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}