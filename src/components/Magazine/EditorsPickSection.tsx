import React from 'react';
import { User, Clock, Eye } from 'lucide-react';
import { usePublicData } from '../../contexts/PublicDataContext';
import { useNavigate } from 'react-router-dom';

interface EditorsPickSectionProps {
  isDarkMode: boolean;
}

export default function EditorsPickSection({ isDarkMode }: EditorsPickSectionProps) {
  const { editorsPickArticles, isLoadingEditorsPick } = usePublicData();
  const navigate = useNavigate();

  // Show loading state while fetching
  if (isLoadingEditorsPick) {
    return (
      <section className={`py-4 sm:py-6 lg:py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 lg:mb-12 relative">
            <div className="flex items-end">
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-normal ${isDarkMode ? 'text-white' : 'text-gray-900'} mr-4`}>
                Editor's Pick
              </h2>
              <div className="flex-1 h-0.5 bg-blue-600 mb-1 sm:mb-2"></div>
            </div>
          </div>
          
          {/* Loading skeleton - Large card layout like in image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl border shadow-lg animate-pulse overflow-hidden`}>
                <div className={`w-full h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className="p-6">
                  <div className={`h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 mb-3`}></div>
                  <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-full mb-1`}></div>
                  <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3 mb-4`}></div>
                  <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show "no featured articles" message only when not loading and no articles exist
  if (!isLoadingEditorsPick && editorsPickArticles.length === 0) {
    return (
      <section className={`py-4 sm:py-6 lg:py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 lg:mb-12 relative">
            <div className="flex items-end">
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-normal ${isDarkMode ? 'text-white' : 'text-gray-900'} mr-4`}>
                Editor's Pick
              </h2>
              <div className="flex-1 h-0.5 bg-blue-600 mb-1 sm:mb-2"></div>
            </div>
          </div>
          
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-lg">No featured articles available at the moment.</p>
            <p className="text-sm mt-2">Check back later for our editor's latest picks!</p>
          </div>
        </div>
      </section>
    );
  }

  const handleArticleClick = (article: any) => {
    if (article._id || article.id) {
      navigate(`/article/${article._id || article.id}`);
    }
  };

  return (
    <section className={`py-4 sm:py-6 lg:py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title with Blue Underline that extends to end of cards */}
        <div className="mb-8 sm:mb-10 lg:mb-12 relative">
          <div className="flex items-end">
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-normal ${isDarkMode ? 'text-white' : 'text-gray-900'} mr-4`}>
              Editor's Pick
            </h2>
            {/* Blue line that extends from title to end of content area */}
            <div className="flex-1 h-0.5 bg-blue-600 mb-1 sm:mb-2"></div>
          </div>
        </div>

        {/* Editor's Pick Articles Grid - Large cards like in image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {editorsPickArticles.slice(0, 4).map((article, index) => (
            <div
              key={article._id || article.id || index}
              className={`group cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-xl border overflow-hidden`}
              onClick={() => handleArticleClick(article)}
            >
              {/* Article Image - Large image like in the design */}
              <div className="relative overflow-hidden">
                <img
                  src={article.featured_image || article.featuredImage}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                  }}
                />
                
                {/* Category Badge on image - like in the design */}
                {(article.categoryName || article.category) && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 bg-gray-900/70 backdrop-blur-sm text-white rounded text-xs font-bold">
                      {article.categoryName || article.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Article Content below image */}
              <div className="p-6">
                {/* Article Title */}
                <h3 className={`text-lg font-bold mb-3 leading-tight line-clamp-2 group-hover:text-red-600 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {article.title}
                </h3>

                {/* Article Description/Excerpt */}
                {article.excerpt && (
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {article.excerpt}
                  </p>
                )}

                {/* Author and Read Time */}
                <div className="flex items-center justify-between text-xs">
                  {article.author && (
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {article.author}
                      </span>
                    </div>
                  )}

                  {(article.readTime || article.content) && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {article.readTime || `${Math.max(1, Math.ceil((article.content?.split(' ').length || 0) / 200))} min read`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Read Article Link */}
                <div className="mt-4">
                  <span className="text-red-600 hover:text-red-700 transition-colors text-sm font-semibold">
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}