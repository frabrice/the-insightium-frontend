import React from 'react';
import { User, Clock, Eye } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface EditorsPickSectionProps {
  isDarkMode: boolean;
}

export default function EditorsPickSection({ isDarkMode }: EditorsPickSectionProps) {
  const { editorsPickArticles } = useData();
  const navigate = useNavigate();

  // Fallback data if no editor's pick articles are set
  const defaultEditorsPickArticles = [
    {
      title: "Revolutionary Teaching Methods Transforming African Classrooms",
      excerpt: "Discover innovative pedagogical approaches that are changing how students learn and engage with educational content across the continent.",
      category: "Research World",
      author: "Prof. Kwame Asante",
      readTime: "8 min read",
      views: "24.5K",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "The Digital Divide: Bridging Educational Gaps Through Innovation",
      excerpt: "Exploring how technology and creative solutions are making quality education accessible to underserved communities.",
      category: "Tech Trends",
      author: "Dr. Fatima Al-Rashid",
      readTime: "6 min read",
      views: "31.2K",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Preserving Indigenous Knowledge in Modern Curricula",
      excerpt: "How traditional wisdom and cultural heritage are being integrated into contemporary educational frameworks.",
      category: "Spirit of Africa",
      author: "Chief Amina Hassan",
      readTime: "7 min read",
      views: "18.7K",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const displayArticles = editorsPickArticles.length > 0 ? editorsPickArticles : defaultEditorsPickArticles;

  const handleArticleClick = (article: any) => {
    if (article.id) {
      navigate(`/article/${article.id}`);
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

        {/* Three Articles Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayArticles.slice(0, 3).map((article, index) => (
            <div 
              key={index}
              className={`group cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
              onClick={() => handleArticleClick(article)}
            >
              {/* Article Image - Enhanced with overlay effects */}
              <div className="relative overflow-hidden">
                <img 
                  src={article.featured_image || article.featuredImage || article.image}
                  alt={article.title}
                  className="w-full h-56 sm:h-64 lg:h-56 xl:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                  }}
                />
                
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge - Enhanced styling */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 border-2 border-white text-white rounded-lg text-xs font-bold backdrop-blur-sm bg-black/50 whitespace-nowrap">
                    {article.category_name || article.category}
                  </span>
                </div>
                
                {/* Views Badge - Top right */}
              </div>

              {/* Article Content - Enhanced layout */}
              <div className="p-6">
                {/* Title */}
                <h3 className={`text-lg font-bold mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}
                    style={{ 
                      textDecorationColor: '#F21717',
                      textUnderlineOffset: '6px'
                    }}>
                  {article.title}
                </h3>
                
                {/* Excerpt/Intro - New addition */}
                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                  {article.excerpt}
                </p>
                
                {/* Author and Meta Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {article.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {article.readTime}
                    </span>
                  </div>
                </div>
                
                {/* Read More Button */}
                <button 
                  className="text-red-600 hover:text-red-700 transition-colors text-sm font-semibold flex items-center space-x-1 group/btn" 
                  style={{ color: '#F21717' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArticleClick(article);
                  }}
                >
                  <span>Read Article</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}