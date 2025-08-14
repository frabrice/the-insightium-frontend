import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, Eye, Heart, Share2, ArrowLeft, MessageSquare, Tag, TrendingUp } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Footer from '../components/shared/Footer';

interface ArticlePageProps {
  isDarkMode: boolean;
}

export default function ArticlePage({ isDarkMode }: ArticlePageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticleById, articles } = useData();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample additional images for the article
  const additionalImages = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  // Trending articles for sidebar
  const trendingArticles = [
    "AI-Powered Learning Platforms Transform Education",
    "Women Leading Educational Innovation Across Africa",
    "Digital Literacy for Rural Communities",
    "Mental Health Support in Universities",
    "Traditional Wisdom Meets Modern Learning",
    "The Rise of EdTech Startups in Africa",
    "Climate Change Education for Young Minds",
    "Blockchain Technology in Academic Credentials",
    "Virtual Reality in Medical Education",
    "Microlearning Platforms Boost Engagement"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foundArticle = getArticleById(id);
      if (foundArticle) {
        setArticle(foundArticle);
        
        const related = articles
          .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id && a.status === 'published')
          .slice(0, 4);
        setRelatedArticles(related);
      } else {
        const fallbackArticle = articles.length > 0 ? articles[0] : null;
        if (fallbackArticle) {
          setArticle(fallbackArticle);
          const related = articles
            .filter(a => a.category === fallbackArticle.category && a.id !== fallbackArticle.id && a.status === 'published')
            .slice(0, 4);
          setRelatedArticles(related);
        }
      }
    }
    setIsLoading(false);
  }, [id, getArticleById, articles]);

  const formatContent = (content: string) => {
    if (!content) return '';
    
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/### (.*?)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
      .split('\n\n').join('</p><p class="mb-6">');
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="animate-pulse">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-6">Article Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => {
              navigate('/magazine');
              window.scrollTo(0, 0);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors" 
            style={{ backgroundColor: '#F21717' }}
          >
            Return to Magazine
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Article Header */}
      <header className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
            className={`flex items-center space-x-2 mb-6 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors group`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Magazine</span>
          </button>

          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300">
              {article.category}
            </span>
          </div>

          <h1 className={`text-3xl lg:text-4xl font-bold leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {article.title}
          </h1>
          
          {article.subtitle && (
            <h2 className={`text-lg lg:text-xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {article.subtitle}
            </h2>
          )}

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.author}
                </p>
                {article.authorBio && (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {article.authorBio}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishDate).toLocaleDateString()}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock className="w-4 h-4" />
                <span>{article.readTime || `${Math.max(1, Math.ceil((article.content?.split(' ').length || 0) / 200))} min read`}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Eye className="w-4 h-4" />
                <span>{article.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Article Content - 3/4 width */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              {article.featuredImage && (
                <div className="mb-8">
                  <img 
                    src={article.featured_image || article.featuredImage} 
                    alt={article.featuredImageAlt || article.title}
                    className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  {article.featuredImageAlt && (
                    <p className={`text-sm mt-2 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.featuredImageAlt}
                    </p>
                  )}
                </div>
              )}

              {/* Excerpt */}
              {article.excerpt && (
                <div className="mb-8">
                  <p className={`text-lg leading-relaxed font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.excerpt}
                  </p>
                </div>
              )}

              {/* Article Content with Mixed Images */}
              <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                <div className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {/* First paragraph */}
                  <p className="mb-6">
                    {article.content ? article.content.split('\n\n')[0] : 'The landscape of education in Africa is undergoing a revolutionary transformation, driven by cutting-edge technology and innovative approaches that are reshaping how students learn and teachers teach across the continent.'}
                  </p>

                  {/* First additional image */}
                  <div className="my-8">
                    <img 
                      src={additionalImages[0]}
                      alt="Educational technology in action"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Second paragraph */}
                  <p className="mb-6">
                    From AI-powered learning platforms that adapt to individual student needs to mobile-first solutions reaching the most remote communities, technology is breaking down traditional barriers to quality education. Universities and schools across Kenya, Rwanda, Ghana, and Nigeria are implementing innovative digital tools that enhance learning outcomes and create new opportunities for academic excellence.
                  </p>

                  {/* Second additional image */}
                  <div className="my-8">
                    <img 
                      src={additionalImages[1]}
                      alt="Students using modern technology"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Third paragraph */}
                  <p className="mb-6">
                    The integration of virtual reality, augmented reality, and interactive learning environments is creating immersive educational experiences that were unimaginable just a few years ago. Students can now take virtual field trips to historical sites, conduct complex scientific experiments in simulated laboratories, and collaborate with peers across continents in real-time.
                  </p>

                  {/* Third additional image */}
                  <div className="my-8">
                    <img 
                      src={additionalImages[2]}
                      alt="Modern learning environment"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Final paragraph */}
                  <p className="mb-6">
                    As we look toward the future, the potential for educational technology in Africa is limitless. With continued investment in digital infrastructure, teacher training, and innovative pedagogical approaches, the continent is positioned to become a global leader in educational excellence and technological innovation.
                  </p>
                </div>
              </div>

              {/* Tags */}
              {article.tags && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Tag className="w-5 h-5 inline mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.split(',').map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    {article.allowComments && (
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Articles Sidebar - 1/4 width */}
            <div className="lg:col-span-1">
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} rounded-2xl p-6 sticky top-4 border`}>
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-red-600" style={{ color: '#F21717' }} />
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Trending Articles
                  </h3>
                </div>

                <div className="space-y-0">
                  {trendingArticles.slice(0, 8).map((title, index) => (
                    <React.Fragment key={index}>
                      <div className="group cursor-pointer py-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#F21717' }}>
                            {index + 1}
                          </div>
                          <h4 className={`text-sm font-medium leading-tight group-hover:text-red-600 transition-colors line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {title}
                          </h4>
                        </div>
                      </div>
                      {index < trendingArticles.slice(0, 8).length - 1 && (
                        <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Articles - Horizontal Layout */}
      {relatedArticles.length > 0 && (
        <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className={`text-2xl lg:text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <div 
                  key={index}
                  className={`group cursor-pointer ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-300`}
                  onClick={() => {
                    navigate(`/article/${relatedArticle.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={relatedArticle.featured_image || relatedArticle.featuredImage}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold text-xs shadow-md">
                        {relatedArticle.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className={`text-base font-bold mb-2 leading-tight group-hover:text-red-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}>
                      {relatedArticle.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {relatedArticle.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <User className="w-3 h-3" />
                        <span>{relatedArticle.author}</span>
                      </span>
                      <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(relatedArticle.publishDate).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}