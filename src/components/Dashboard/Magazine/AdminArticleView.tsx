import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Eye,
  Star,
  TrendingUp,
  BookOpen,
  Hash,
  Image as ImageIcon,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { articlesApi } from '../../../api/articles';

interface AdminArticleViewProps {
  isDarkMode: boolean;
}

export default function AdminArticleView({ isDarkMode }: AdminArticleViewProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExcerptExpanded, setIsExcerptExpanded] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  // Truncate text utility
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await articlesApi.getArticleById(id);
        if (response.success) {
          setArticle(response.data);
        } else {
          setError('Article not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-600"></div>
          <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-red-300 animate-spin" style={{ animationDelay: '0.15s', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
          } border-2`}>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Article Not Found
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {error || 'The article you\'re looking for doesn\'t exist or has been removed.'}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Header with gradient */}
      <div className={`relative ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700' 
          : 'bg-gradient-to-r from-white via-gray-50 to-white border-gray-200'
      } border-b shadow-sm`}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent"></div>
        <div className="relative px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white hover:scale-105' 
                    : 'hover:bg-gray-100/80 text-gray-500 hover:text-gray-700 hover:scale-105'
                } backdrop-blur-sm`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Article Details
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Comprehensive article information and analytics
                </p>
              </div>
            </div>
            
            {/* Enhanced badges */}
            <div className="flex items-center space-x-3">
              {article.featured && (
                <div className="bg-gradient-to-r from-yellow-100 to-amber-50 text-yellow-700 dark:from-yellow-900/30 dark:to-amber-900/20 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Featured</span>
                </div>
              )}
              {article.trending && (
                <div className="bg-gradient-to-r from-red-100 to-pink-50 text-red-700 dark:from-red-900/30 dark:to-pink-900/20 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content with better spacing */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - 3/4 width on xl screens */}
          <div className="xl:col-span-3 space-y-8">
            {/* Article Header Card */}
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-2xl border shadow-sm p-8 space-y-6`}>
              {/* Category with enhanced styling */}
              <div className="flex items-center space-x-3">
                <Hash className="w-4 h-4 text-red-600" />
                <span 
                  className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold border border-red-200/50 dark:border-red-800/50"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(242, 23, 23, 0.1)' : 'rgba(242, 23, 23, 0.05)', 
                    color: '#F21717',
                    borderColor: isDarkMode ? 'rgba(242, 23, 23, 0.3)' : 'rgba(242, 23, 23, 0.2)'
                  }}
                >
                  {article.categoryName || article.category}
                </span>
              </div>

              {/* Title with better typography */}
              <div className="space-y-3">
                <h2 className={`text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.title}
                </h2>
                {article.subtitle && (
                  <h3 className={`text-xl font-medium leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.subtitle}
                  </h3>
                )}
              </div>

              {/* Enhanced Meta Information Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Author</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {article.author}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Published</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {new Date(article.publishDate || article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {article.readTime && (
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Read Time</p>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {article.readTime}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Eye className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Views</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {(article.views || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {article.tags && (
                  <div className="space-y-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                        <Tag className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Tags</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.split(',').slice(0, isTagsExpanded ? undefined : 3).map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isDarkMode 
                              ? 'bg-gray-600 text-gray-200' 
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                    {article.tags.split(',').length > 3 && (
                      <button
                        onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                        className={`inline-flex items-center space-x-1 text-xs font-medium transition-colors ${
                          isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        <span>{isTagsExpanded ? 'Show less' : `+${article.tags.split(',').length - 3} more`}</span>
                        {isTagsExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image Card */}
            {article.featuredImage && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm overflow-hidden`}>
                <div className="p-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Featured Image
                    </h4>
                  </div>
                </div>
                <div className="p-6">
                  <img
                    src={article.featuredImage}
                    alt={article.featuredImageAlt || article.title}
                    className="w-full h-96 object-cover rounded-xl shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Content Card */}
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-2xl border shadow-sm`}>
              <div className="p-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Article Content
                  </h4>
                </div>
              </div>
              <div className="p-6">
                <div className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                  <div className="space-y-2">
                    <div className={`leading-relaxed whitespace-pre-wrap text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {isContentExpanded ? article.content : truncateText(article.content, 500)}
                    </div>
                    {article.content.length > 500 && (
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
              </div>
            </div>

            {/* Additional Images */}
            {article.additionalImages && article.additionalImages.length > 0 && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm`}>
                <div className="p-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Additional Images
                      </h4>
                    </div>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
                      {article.additionalImages.length} images
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {article.additionalImages.map((image: any, index: number) => (
                      <div key={index} className="space-y-3">
                        <img
                          src={image.url}
                          alt={image.alt || `Additional image ${index + 1}`}
                          className="w-full h-56 object-cover rounded-xl shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                        {image.caption && (
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/4 width on xl screens */}
          <div className="space-y-6">
            {/* Excerpt Card */}
            {article.excerpt && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Excerpt
                  </h4>
                </div>
                <div className="space-y-2">
                  <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {isExcerptExpanded ? article.excerpt : truncateText(article.excerpt, 150)}
                  </p>
                  {article.excerpt.length > 150 && (
                    <button
                      onClick={() => setIsExcerptExpanded(!isExcerptExpanded)}
                      className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <span>{isExcerptExpanded ? 'Show less' : 'Show more'}</span>
                      {isExcerptExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Author Bio Card */}
            {article.authorBio && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Author Bio
                  </h4>
                </div>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.authorBio}
                </p>
              </div>
            )}

            {/* Meta Description Card */}
            {article.metaDescription && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    SEO Description
                  </h4>
                </div>
                <div className="space-y-2">
                  <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {isSeoExpanded ? article.metaDescription : truncateText(article.metaDescription, 120)}
                  </p>
                  {article.metaDescription.length > 120 && (
                    <button
                      onClick={() => setIsSeoExpanded(!isSeoExpanded)}
                      className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <span>{isSeoExpanded ? 'Show less' : 'Show more'}</span>
                      {isSeoExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}