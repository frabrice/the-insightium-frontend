import React from 'react';
import { Calendar, User, Clock, ArrowRight, Eye } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface FeaturedArticlesSectionProps {
  isDarkMode: boolean;
}

export default function FeaturedArticlesSection({ isDarkMode }: FeaturedArticlesSectionProps) {
  const { featuredArticles } = useData();
  const navigate = useNavigate();

  const defaultFeaturedArticles = [
    {
      title: "Mental Health Support in Universities",
      excerpt: "Addressing the growing mental health challenges among students with innovative support systems and campus-wide initiatives.",
      author: "Dr. Sarah Ochieng",
      publishDate: "March 10, 2024",
      readTime: "8 min read",
      views: "32.1K",
      category: "Mind and Body Quest",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Traditional Wisdom Meets Modern Learning",
      excerpt: "How indigenous knowledge systems are being integrated into contemporary educational frameworks across Africa.",
      author: "Chief Amina Hassan",
      publishDate: "March 8, 2024",
      readTime: "6 min read",
      views: "28.9K",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "The Rise of EdTech Startups in Africa",
      excerpt: "Young entrepreneurs are revolutionizing education through innovative technology solutions tailored for African contexts.",
      author: "James Mwangi",
      publishDate: "March 5, 2024",
      readTime: "7 min read",
      views: "41.3K",
      category: "Tech Trends",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const displayArticles = featuredArticles.length > 0 ? featuredArticles : defaultFeaturedArticles;

  const handleArticleClick = (article: any) => {
    if (article.id) {
      navigate(`/article/${article.id}`);
      window.scrollTo(0, 0);
    } else {
      navigate(`/article/3`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Articles
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Handpicked stories that are making waves in the education world
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {displayArticles.map((article, index) => (
            <article 
              key={index} 
              className={`group cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
              onClick={() => handleArticleClick(article)}
            >
              {/* Article Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={article.featured_image || article.featuredImage || article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                  }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 border-2 border-white text-white rounded-lg text-xs font-bold backdrop-blur-sm bg-black/50 whitespace-nowrap">
                    {article.category_name || article.category}
                  </span>
                </div>
                {/* Views Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-medium">{article.views}</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className={`text-lg font-bold mb-3 leading-tight group-hover:text-red-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {typeof article.publishDate === 'string' && article.publishDate.includes('T') 
                      ? new Date(article.publishDate).toLocaleDateString() 
                      : article.publishDate}
                  </span>
                  <button 
                    className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-1 group/btn" 
                    style={{ color: '#F21717' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArticleClick(article);
                    }}
                  >
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}