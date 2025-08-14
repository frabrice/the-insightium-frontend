import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

interface OtherArticlesSectionProps {
  isDarkMode: boolean;
}

export default function OtherArticlesSection({ isDarkMode }: OtherArticlesSectionProps) {
  const [visibleArticles, setVisibleArticles] = useState(6);
  const { otherArticles } = useData();
  const navigate = useNavigate();
  
  const allArticles = otherArticles.length > 0 ? otherArticles : [
    {
      title: "Digital Literacy for Rural Communities",
      excerpt: "Bridging the digital divide through innovative educational programs in remote areas.",
      author: "Dr. Kemi Adebayo",
      publishDate: "2024-03-14",
      readTime: "6 min read",
      views: "18.3K",
      category: "Tech Trends",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "The Science of Learning",
      excerpt: "Understanding how the brain learns and retains information for better educational outcomes.",
      author: "Prof. David Kimani",
      publishDate: "2024-03-13",
      readTime: "8 min read",
      views: "22.7K",
      category: "Research World",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Community-Driven Education Models",
      excerpt: "How communities are taking ownership of their educational futures through grassroots initiatives.",
      author: "Grace Wanjiku",
      publishDate: "2024-03-11",
      readTime: "7 min read",
      views: "15.9K",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Innovation in Rural Schools",
      excerpt: "Creative solutions for educational challenges in remote areas across Africa.",
      author: "Samuel Mutua",
      publishDate: "2024-03-09",
      readTime: "5 min read",
      views: "19.4K",
      category: "Need to Know",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "The Future of Higher Education",
      excerpt: "Reimagining universities for the digital age and changing workforce demands.",
      author: "Dr. Aisha Patel",
      publishDate: "2024-03-06",
      readTime: "9 min read",
      views: "26.1K",
      category: "Career Campus",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Arts Integration in STEM",
      excerpt: "The power of combining creative arts with science and technology education.",
      author: "Maria Santos",
      publishDate: "2024-03-03",
      readTime: "6 min read",
      views: "14.8K",
      category: "E! Corner",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Mental Health Awareness in Schools",
      excerpt: "Building supportive environments for student wellbeing and academic success.",
      author: "Dr. Sarah Ochieng",
      publishDate: "2024-02-28",
      readTime: "7 min read",
      views: "31.2K",
      category: "Mind and Body Quest",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Preserving Indigenous Languages Through Education",
      excerpt: "How schools are keeping traditional languages alive for future generations.",
      author: "Chief Amina Hassan",
      publishDate: "2024-02-25",
      readTime: "8 min read",
      views: "17.6K",
      category: "Spirit of Africa",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Entrepreneurship Education in African Universities",
      excerpt: "Fostering innovation and business skills among the next generation of leaders.",
      author: "James Mwangi",
      publishDate: "2024-02-22",
      readTime: "6 min read",
      views: "23.4K",
      category: "Career Campus",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Climate Change Education for Young Minds",
      excerpt: "Teaching environmental awareness and sustainability in primary schools.",
      author: "Dr. Kwame Asante",
      publishDate: "2024-02-19",
      readTime: "5 min read",
      views: "20.8K",
      category: "Research World",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Special Needs Education Advances",
      excerpt: "New approaches to inclusive education for students with disabilities.",
      author: "Dr. Mary Wanjiru",
      publishDate: "2024-02-16",
      readTime: "9 min read",
      views: "16.3K",
      category: "Mind and Body Quest",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "The Role of Sports in Education",
      excerpt: "How physical education contributes to holistic student development.",
      author: "Coach Michael Osei",
      publishDate: "2024-02-13",
      readTime: "4 min read",
      views: "12.7K",
      category: "E! Corner",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Trending articles for the right sidebar
  const trendingArticles = [
    "Blockchain Technology Revolutionizes Academic Credentials",
    "Virtual Reality Transforms Medical Education Training",
    "Microlearning Platforms Boost Student Engagement",
    "Indigenous Languages Find New Life in Digital Classrooms",
    "Entrepreneurship Education Creates Job Opportunities",
    "Climate Change Education Shapes Future Leaders",
    "Inclusive Design Makes Learning Accessible for All",
    "Social Media Literacy Becomes Essential Life Skill",
    "Gamification Increases Student Motivation",
    "AI Tutors Provide Personalized Learning Support",
    "Coding Bootcamps Bridge Skills Gap in Africa",
    "Online Libraries Expand Access to Knowledge",
    "Peer-to-Peer Learning Networks Gain Popularity",
    "Educational Podcasts Transform Commute Time",
    "Virtual Field Trips Open New Learning Horizons"
  ];

  const totalArticles = allArticles.length;
  const displayedArticles = allArticles.slice(0, visibleArticles);
  const hasMoreArticles = visibleArticles < totalArticles;

  const loadMoreArticles = () => {
    setVisibleArticles(prev => Math.min(prev + 3, totalArticles));
  };

  const handleArticleClick = (article: any) => {
    if (article.id) {
      navigate(`/article/${article.id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleTrendingClick = (title: string, index: number) => {
    // For now, just scroll to top - could navigate to specific article later
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Main Articles - Left Side (70% - 2/3 width on desktop) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {displayedArticles.map((article, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                    {/* Article Image */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <img 
                        src={article.featured_image || article.featuredImage || article.image}
                        alt={article.title}
                        className="w-full h-48 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>

                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category Badge - Red */}
                      <div className="mb-2 lg:mb-3">
                        <span className={`inline-flex items-center px-3 py-1.5 border-2 border-red-500 rounded-lg text-xs font-bold whitespace-nowrap ${isDarkMode ? 'border-red-500 text-red-400 bg-red-900/20' : 'border-red-500 text-red-600 bg-red-50'}`}>
                          {article.category_name || article.category}
                        </span>
                      </div>

                      {/* Article Title - Blue on hover */}
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 sm:line-clamp-3">
                        {article.title}
                      </h3>

                      {/* Article Description */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-2 lg:line-clamp-3">
                        {article.excerpt || article.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Section */}
            {hasMoreArticles && (
              <div className="text-center mt-6 sm:mt-8 lg:mt-10">
                <button 
                  onClick={loadMoreArticles}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors" 
                  style={{ backgroundColor: '#F21717' }}
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>

          {/* Trending Articles Sidebar - Right Side (30% - 1/3 width on desktop) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-gray-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 sticky top-4">
              {/* Sidebar Title */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                Trending Articles
              </h2>

              {/* Trending Articles List */}
              <div className="space-y-0">
                {trendingArticles.slice(0, 12).map((title, index) => (
                  <React.Fragment key={index}>
                    <div 
                      className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4 group cursor-pointer py-2 sm:py-3 lg:py-4"
                      onClick={() => handleTrendingClick(title, index)}
                    >
                      {/* Number Badge */}
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {index + 1}
                      </div>

                      {/* Article Title */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-xs lg:text-sm font-medium text-gray-900 leading-tight group-hover:text-red-600 transition-colors duration-300 line-clamp-2 lg:line-clamp-3">
                          {title}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Divider Line - Don't show after last item */}
                    {index < trendingArticles.slice(0, 12).length - 1 && (
                      <div className="border-b border-gray-200 mx-2 sm:mx-0"></div>
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