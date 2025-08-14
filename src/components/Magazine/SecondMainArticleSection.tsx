import React from 'react';
import { Calendar, User, Clock, ArrowRight, Eye, Heart, Share2, Star } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface SecondMainArticleSectionProps {
  isDarkMode: boolean;
}

export default function SecondMainArticleSection({ isDarkMode }: SecondMainArticleSectionProps) {
  const { secondMainArticle } = useData();
  const navigate = useNavigate();

  const defaultSecondMainArticle = {
    title: "Women Leading Educational Innovation Across Africa",
    subtitle: "Celebrating the female pioneers transforming learning landscapes",
    excerpt: "Meet the remarkable women who are breaking barriers and creating new pathways in education, from grassroots initiatives to cutting-edge research that's changing lives across the continent.",
    author: "Sarah Mwangi",
    authorBio: "Gender & Education Policy Analyst",
    publishDate: "March 12, 2024",
    readTime: "10 min read",
    views: "38.7K",
    category: "Career Campus",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  };

  const displayArticle = secondMainArticle || defaultSecondMainArticle;

  const handleReadArticle = () => {
    if (secondMainArticle && secondMainArticle.id) {
      navigate(`/article/${secondMainArticle.id}`);
    } else {
      navigate(`/article/2`);
    }
  };

  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Article Content - Left side for second article */}
          <div className="order-2 lg:order-1">
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
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
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

          {/* Article Image - Right side for second article */}
          <div className="relative group order-1 lg:order-2">
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
            <div className="absolute -top-4 -left-4 bg-pink-600 text-white p-3 rounded-full shadow-lg animate-pulse">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}