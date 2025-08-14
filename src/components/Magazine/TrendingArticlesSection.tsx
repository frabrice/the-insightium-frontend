import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface TrendingArticlesSectionProps {
  isDarkMode: boolean;
}

export default function TrendingArticlesSection({ isDarkMode }: TrendingArticlesSectionProps) {
  const { trendingArticles, otherArticles } = useData();
  const navigate = useNavigate();

  // Combine trending and other articles for main articles display
  const mainArticles = [...trendingArticles, ...otherArticles].slice(0, 5);

  // Default data if no articles are available
  const defaultMainArticles = [
    {
      title: "AI-Powered Learning Platforms Transform Education",
      description: "Discover how artificial intelligence is revolutionizing personalized learning experiences across African universities.",
      category: "Tech Trends",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Community Schools Bridge Rural Education Gap",
      description: "Local communities are taking charge of education, creating innovative solutions for remote learning challenges.",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Female Scientists Lead STEM Education Reform",
      description: "Pioneering women in science are reshaping how we teach and inspire the next generation of innovators.",
      category: "Career Campus",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Mental Wellness Programs in Higher Education",
      description: "Universities are implementing comprehensive mental health support systems for student success.",
      category: "Mind and Body Quest",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Sustainable Campus Initiatives Gain Momentum",
      description: "Educational institutions across Africa are leading environmental sustainability efforts.",
      category: "Research World",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const defaultTrendingArticles = [
    {
      number: 1,
      title: "Blockchain Technology Revolutionizes Academic Credentials"
    },
    {
      number: 2,
      title: "Virtual Reality Transforms Medical Education Training"
    },
    {
      number: 3,
      title: "Microlearning Platforms Boost Student Engagement"
    },
    {
      number: 4,
      title: "Indigenous Languages Find New Life in Digital Classrooms"
    },
    {
      number: 5,
      title: "Entrepreneurship Education Creates Job Opportunities"
    },
    {
      number: 6,
      title: "Climate Change Education Shapes Future Leaders"
    },
    {
      number: 7,
      title: "Inclusive Design Makes Learning Accessible for All"
    },
    {
      number: 8,
      title: "Social Media Literacy Becomes Essential Life Skill"
    }
  ];

  const displayMainArticles = mainArticles.length > 0 ? mainArticles : defaultMainArticles;
  const displayTrendingArticles = trendingArticles.length > 0 
    ? trendingArticles.map((article, index) => ({ number: index + 1, title: article.title, id: article.id }))
    : defaultTrendingArticles;

  const handleMainArticleClick = (article: any) => {
    if (article.id) {
      navigate(`/article/${article.id}`);
    }
  };

  const handleTrendingArticleClick = (article: any) => {
    if (article.id) {
      navigate(`/article/${article.id}`);
    }
  };

  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Articles - Left Side (Full width on mobile, 2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {displayMainArticles.map((article, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleMainArticleClick(article)}
                >
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    {/* Article Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={article.featuredImage || article.image}
                        alt={article.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category Badge - Red */}
                      <div className="mb-2 sm:mb-3">
                        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300">
                          {article.category}
                        </span>
                      </div>

                      {/* Article Title - Blue on hover */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Article Description */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {article.excerpt || article.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Articles Sidebar - Right Side (Full width on mobile, 1/3 width on desktop) */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              {/* Sidebar Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Trending Articles
              </h2>

              {/* Trending Articles List */}
              <div className="space-y-0">
                {displayTrendingArticles.slice(0, 8).map((article, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className="flex items-start space-x-3 sm:space-x-4 group cursor-pointer py-3 sm:py-4"
                      onClick={() => handleTrendingArticleClick(article)}
                    >
                      {/* Number Badge */}
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {article.number}
                      </div>

                      {/* Article Title */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900 leading-tight group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Divider Line - Don't show after last item */}
                    {index < displayTrendingArticles.slice(0, 8).length - 1 && (
                      <div className="border-b border-gray-200"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}