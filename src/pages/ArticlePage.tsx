import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, Eye, Heart, ArrowLeft, MessageSquare, Tag, TrendingUp, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { publicApi, PublicArticle } from '../api/public';
import Footer from '../components/shared/Footer';
import { likesApi } from '../api/likes';
import { commentsApi, Comment, CreateCommentData } from '../api/comments';

interface ArticlePageProps {
  isDarkMode: boolean;
}

export default function ArticlePage({ isDarkMode }: ArticlePageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<PublicArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Like functionality
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  
  // Comment functionality
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  
  // Text expansion states
  const [isExcerptExpanded, setIsExcerptExpanded] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  // Truncate text utility
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Handle like increment
  const handleLike = async () => {
    if (!article || likeLoading) return;
    
    setLikeLoading(true);
    try {
      const response = await likesApi.incrementLike(article._id || article.id);
      if (response.success) {
        setLikeCount(response.likeCount || 0);
      }
    } catch (error) {
      console.error('Error incrementing like:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  // Handle unlike (decrement)
  const handleUnlike = async () => {
    if (!article || likeLoading || likeCount <= 0) return;
    
    setLikeLoading(true);
    try {
      const response = await likesApi.decrementLike(article._id || article.id);
      if (response.success) {
        setLikeCount(response.likeCount || 0);
      }
    } catch (error) {
      console.error('Error decrementing like:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || commentLoading || !commentContent) return;
    
    setCommentLoading(true);
    try {
      const response = await commentsApi.createComment(article._id || article.id, {
        name: 'Anonymous',
        email: 'anonymous@example.com',
        content: commentContent
      });
      if (response.success && response.data) {
        setComments(prev => [response.data!, ...prev].slice(0, 3)); // Keep only latest 3
        setCommentCount(prev => prev + 1);
        setCommentContent('');
        setShowCommentForm(false);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  // Load likes and comments data
  const loadLikesAndComments = async (articleId: string) => {
    try {
      // Load like count
      const likeResponse = await likesApi.getLikeCount(articleId);
      if (likeResponse.success && likeResponse.data) {
        setLikeCount(likeResponse.data.likeCount);
      }

      // Load comments (latest 3)
      const commentsResponse = await commentsApi.getComments(articleId, { limit: 3 });
      if (commentsResponse.success && commentsResponse.data) {
        setComments(commentsResponse.data.comments);
        setCommentCount(commentsResponse.data.totalComments);
      }
    } catch (error) {
      console.error('Error loading likes and comments:', error);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      loadArticle(id);
    }
  }, [id]);

  const loadArticle = async (articleId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await publicApi.getArticle(articleId);
      
      if (response.success && response.data) {
        setArticle(response.data);
        
        // Load likes and comments for this article
        loadLikesAndComments(response.data._id || response.data.id);
      } else {
        setError(response.message || 'Article not found');
      }
    } catch (error) {
      console.error('Error loading article:', error);
      setError('Failed to load article');
    } finally {
      setIsLoading(false);
    }
  };

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

  if (error || !article) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-6">Article Not Found</h1>
          <p className="mb-8">{error || 'The article you\'re looking for doesn\'t exist or has been removed.'}</p>
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

          {(article.category || article.categoryName) && (
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300">
                {article.category || article.categoryName}
              </span>
            </div>
          )}

          <h1 className={`text-3xl lg:text-4xl font-bold leading-tight mb-4 break-words ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {article.title}
          </h1>
          
          {article.subtitle && (
            <h2 className={`text-lg lg:text-xl mb-6 break-words ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
        <div className="max-w-4xl mx-auto px-6">
          <div>
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



              {/* Article Content */}
              <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                <div className="space-y-2">
                  <div 
                    className={`leading-relaxed break-words overflow-wrap-anywhere ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(
                        isContentExpanded ? (article.content || '') : truncateText(article.content || '', 500)
                      ) 
                    }}
                  />
                  {(article.content || '').length > 500 && (
                    <button
                      onClick={() => setIsContentExpanded(!isContentExpanded)}
                      className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <span>{isContentExpanded ? 'Show less' : 'Show more'}</span>
                      {isContentExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
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
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleLike}
                        disabled={likeLoading}
                        className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Like ({likeCount})</span>
                      </button>
                      {likeCount > 0 && (
                        <button 
                          onClick={handleUnlike}
                          disabled={likeLoading}
                          className="text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                          Unlike
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Images Gallery */}
              {article.additionalImages && article.additionalImages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className={`text-xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <svg className="w-6 h-6 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Image Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {article.additionalImages.map((image: any, index: number) => (
                      <div key={image.id || index} className={`group relative overflow-hidden rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 transition-all duration-300 hover:shadow-xl`}>
                        <div className="relative overflow-hidden rounded-lg">
                          <img 
                            src={image.url} 
                            alt={image.alt || `Gallery image ${index + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {image.caption && (
                          <div className="mt-3">
                            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}


          </div>
        </div>
      </main>


      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}