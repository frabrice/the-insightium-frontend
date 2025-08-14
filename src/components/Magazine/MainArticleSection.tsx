import React from 'react';
import { Calendar, User, Clock, ArrowRight, Eye, Heart, Share2, TrendingUp } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface MainArticleSectionProps {
  isDarkMode: boolean;
}

export default function MainArticleSection({ isDarkMode }: MainArticleSectionProps) {
  const { mainArticle } = useData();
  const navigate = useNavigate();

  const defaultMainArticle = {
    title: "The Future of African Education Technology",
    subtitle: "How AI and digital innovation are reshaping learning across the continent",
    excerpt: "Explore the groundbreaking technologies and innovative approaches that are transforming education in Africa, from AI-powered learning platforms to mobile-first solutions reaching remote communities.",
    author: "Dr. Amara Okafor",
    authorBio: "Education Technology Researcher at University of Cape Town",
    publishDate: "March 15, 2024",
    readTime: "12 min read",
    views: "45.2K",
    category: "Tech Trends",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  };

  const displayArticle = mainArticle || defaultMainArticle;

  const handleReadArticle = () => {
    if (mainArticle && mainArticle.id) {
      navigate(`/article/${mainArticle.id}`);
    } else {
      navigate(`/article/1`);
    }
  };

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Article Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={displayArticle.featuredImage || displayArticle.image}
                alt={displayArticle.title}
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className={`inline-flex items-center px-3 py-1 border-2 border-white text-white rounded-lg text-xs font-medium backdrop-blur-sm bg-black/30`}>
                  {displayArticle.category}
                </span>
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">{displayArticle.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{displayArticle.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-white hover:text-red-400 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="text-white hover:text-red-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-red-600 text-white p-3 rounded-full shadow-lg animate-bounce" style={{ backgroundColor: '#F21717' }}>
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Article Content */}
          <div>
            <div className="mb-6">
              <h2 className={`text-4xl lg:text-5xl font-bold leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {displayArticle.title}
              </h2>
              <h3 className={`text-xl lg:text-2xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {displayArticle.subtitle}
              </h3>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {displayArticle.excerpt}
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {displayArticle.author}
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {displayArticle.authorBio}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4" />
                    <span>{typeof displayArticle.publishDate === 'string' && displayArticle.publishDate.includes('T') 
                      ? new Date(displayArticle.publishDate).toLocaleDateString() 
                      : displayArticle.publishDate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 group shadow-xl" 
              style={{ backgroundColor: '#F21717' }}
              onClick={handleReadArticle}
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}