import React from 'react';
import { User } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface MainArticlesSectionProps {
  isDarkMode: boolean;
}

export default function MainArticlesSection({ isDarkMode }: MainArticlesSectionProps) {
  const { mainArticle, secondMainArticle } = useData();
  const navigate = useNavigate();

  // Fallback data if no articles are set
  const defaultMainArticle = {
    title: "The Future of African Education Technology",
    intro: "Exploring how innovative educational technologies are transforming learning experiences across the African continent, from rural classrooms to urban universities. This comprehensive study reveals groundbreaking insights into digital transformation and the revolutionary impact of AI-powered learning platforms. Discover how mobile-first solutions are reaching remote communities, bridging educational gaps, and creating unprecedented opportunities for millions of students. The research highlights emerging trends in personalized learning, virtual reality applications, and collaborative digital environments that are reshaping the future of education across Africa.",
    category: "Tech Trends",
    author: "Dr. Amara Okafor",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  const defaultSecondMainArticle = {
    title: "Women Leading Educational Innovation Across Africa",
    subtitle: "Celebrating the female pioneers transforming learning landscapes",
    category: "Career Campus",
    author: "Sarah Mwangi",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  };

  const displayMainArticle = mainArticle || defaultMainArticle;
  const displaySecondMainArticle = secondMainArticle || defaultSecondMainArticle;

  const handleMainArticleClick = () => {
    if (mainArticle && mainArticle.id) {
      navigate(`/article/${mainArticle.id}`);
    }
  };

  const handleSecondArticleClick = () => {
    if (secondMainArticle && secondMainArticle.id) {
      navigate(`/article/${secondMainArticle.id}`);
    }
  };

  return (
    <section className={`py-3 sm:py-4 lg:py-6 xl:py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Main Article - Takes full width on mobile, 3 columns on desktop */}
          <div className="lg:col-span-3">
            <div 
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg border transition-colors group cursor-pointer hover:shadow-xl`}
              onClick={handleMainArticleClick}
            >
              <div className="flex flex-col lg:grid lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 items-start h-full">
                {/* Article Content - Full width on mobile, 3 columns on desktop */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full order-2 lg:order-1">
                  <div>
                    <h1 className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-tight mb-2 sm:mb-3 lg:mb-4 group-hover:underline transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                        style={{ 
                          textDecorationColor: '#F21717',
                          textUnderlineOffset: '6px'
                        }}>
                      {displayMainArticle.title}
                    </h1>
                    <p className={`text-xs sm:text-sm lg:text-sm leading-relaxed mb-3 sm:mb-4 lg:mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2 sm:line-clamp-3 lg:line-clamp-none`}>
                      {mainArticle?.excerpt || displayMainArticle.intro}
                    </p>
                  </div>
                  
                  {/* Category and Author */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 lg:space-x-4">
                    <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold whitespace-nowrap ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                      {displayMainArticle.category_name || displayMainArticle.category}
                    </span>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {displayMainArticle.author}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Article Image - Full width on mobile, 2 columns on desktop */}
                <div className="lg:col-span-2 w-full h-40 sm:h-48 lg:h-full order-1 lg:order-2">
                  <img 
                    src={mainArticle?.featured_image || mainArticle?.featuredImage || displayMainArticle.image}
                    alt={displayMainArticle.title}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg lg:rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Second Main Article - Full width on mobile, 1 column on desktop */}
          <div className="lg:col-span-1">
            <div 
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg border transition-colors group cursor-pointer hover:shadow-xl flex flex-row lg:flex-col h-28 sm:h-32 lg:h-80`}
              onClick={handleSecondArticleClick}
            >
              {/* Second Article Image */}
              <div className="relative overflow-hidden w-28 sm:w-32 lg:w-full lg:flex-1">
                <img 
                  src={secondMainArticle?.featured_image || secondMainArticle?.featuredImage || displaySecondMainArticle.image}
                  alt={displaySecondMainArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              {/* Second Article Content */}
              <div className="p-2 sm:p-3 lg:p-4 flex-1 lg:flex-shrink-0 flex flex-col justify-center lg:justify-start">
                <h2 className={`text-xs sm:text-sm lg:text-sm xl:text-base font-bold mb-1 sm:mb-2 leading-tight group-hover:underline transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2 lg:line-clamp-none`}
                    style={{ 
                      textDecorationColor: '#F21717',
                      textUnderlineOffset: '4px'
                    }}>
                  {displaySecondMainArticle.title}
                </h2>
                
                {/* Subtitle for second article - Enhanced visibility */}
                {(secondMainArticle?.subtitle || displaySecondMainArticle.subtitle) && (
                  <p className={`text-xs mb-1 sm:mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} line-clamp-1 sm:line-clamp-2 lg:line-clamp-2`}>
                    {secondMainArticle?.subtitle || displaySecondMainArticle.subtitle}
                  </p>
                )}
                
                <div className="space-y-1 mt-1">
                  <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold whitespace-nowrap ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                    {displaySecondMainArticle.category_name || displaySecondMainArticle.category}
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {displaySecondMainArticle.author}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}