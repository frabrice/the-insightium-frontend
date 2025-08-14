import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface ThreeFeaturedArticlesProps {
  isDarkMode: boolean;
}

export default function ThreeFeaturedArticles({ isDarkMode }: ThreeFeaturedArticlesProps) {
  const { featuredArticles } = useData();
  const navigate = useNavigate();

  // Fallback data if no featured articles are set
  const defaultFeaturedArticles = [
    {
      title: "Mental Health Support in Universities",
      category: "Mind and Body Quest",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Traditional Wisdom Meets Modern Learning",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "The Rise of EdTech Startups in Africa",
      category: "Tech Trends",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const displayArticles = featuredArticles.length > 0 ? featuredArticles : defaultFeaturedArticles;

  const handleArticleClick = (article: any) => {
    if (article.id) {
      navigate(`/article/${article.id}`);
    }
  };

  return (
    <section className={`py-4 sm:py-6 lg:py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayArticles.slice(0, 3).map((article, index) => (
            <div 
              key={index}
              className={`group cursor-pointer ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-white border-gray-200'} rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-300`}
              onClick={() => handleArticleClick(article)}
            >
              <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                {/* Article Image - Left side */}
                <div className="flex-shrink-0">
                  <img 
                    src={article.featured_image || article.featuredImage || article.image}
                    alt={article.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>

                {/* Article Content - Right side */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm sm:text-sm lg:text-base font-bold mb-2 leading-tight group-hover:underline transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}
                      style={{ 
                        textDecorationColor: '#F21717',
                        textUnderlineOffset: '4px'
                      }}>
                    {article.title}
                  </h3>
                  
                  <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold whitespace-nowrap ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                    {article.category_name || article.category}
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