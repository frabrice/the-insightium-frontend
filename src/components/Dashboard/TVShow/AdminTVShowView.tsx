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
  Tv,
  Hash,
  Globe,
  Play,
  Youtube,
  BarChart3,
  ExternalLink,
  Monitor,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { tvShowsApi } from '../../../api/tvshows';

interface AdminTVShowViewProps {
  isDarkMode: boolean;
}

export default function AdminTVShowView({ isDarkMode }: AdminTVShowViewProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tvShow, setTVShow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Truncate text utility
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    const fetchTVShow = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await tvShowsApi.getTVShowById(id);
        if (response.success) {
          setTVShow(response.data);
        } else {
          setError('TV show episode not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load TV show episode');
      } finally {
        setLoading(false);
      }
    };

    fetchTVShow();
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

  if (error || !tvShow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
          } border-2`}>
            <Tv className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              TV Show Episode Not Found
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {error || 'The TV show episode you\'re looking for doesn\'t exist or has been removed.'}
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
                  Episode Details
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Project Insight TV show episode information and analytics
                </p>
              </div>
            </div>
            
            {/* Enhanced badges and action buttons */}
            <div className="flex items-center space-x-3">
              {tvShow.is_new && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-50 text-green-700 dark:from-green-900/30 dark:to-emerald-900/20 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>New</span>
                </div>
              )}
              {tvShow.featured && (
                <div className="bg-gradient-to-r from-purple-100 to-violet-50 text-purple-700 dark:from-purple-900/30 dark:to-violet-900/20 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Featured</span>
                </div>
              )}
              <div className="bg-gradient-to-r from-blue-100 to-cyan-50 text-blue-700 dark:from-blue-900/30 dark:to-cyan-900/20 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-sm">
                <Tv className="w-4 h-4" />
                <span>Published</span>
              </div>
              <button
                onClick={() => navigate(`/tvshow/${tvShow._id || tvShow.id}`)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Live</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content with better spacing */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - 3/4 width on xl screens */}
          <div className="xl:col-span-3 space-y-8">
            {/* Episode Header Card */}
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
                  {tvShow.category}
                </span>
              </div>

              {/* Title with better typography */}
              <div className="space-y-3">
                <h2 className={`text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {tvShow.title}
                </h2>
                {tvShow.description && (
                  <div className="space-y-2">
                    <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isDescriptionExpanded ? tvShow.description : truncateText(tvShow.description, 200)}
                    </p>
                    {tvShow.description.length > 200 && (
                      <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                          isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        <span>{isDescriptionExpanded ? 'Show less' : 'Show more'}</span>
                        {isDescriptionExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Meta Information Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Uploaded</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {new Date(tvShow.upload_date || tvShow.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {tvShow.duration && (
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Duration</p>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {tvShow.duration}
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
                      {(tvShow.views || '0').toLocaleString()}
                    </p>
                  </div>
                </div>

                {tvShow.rating > 0 && (
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Rating</p>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {tvShow.rating}/5
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced TV Show Player Card */}
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-2xl border shadow-sm overflow-hidden`}>
              <div className="p-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                      <Monitor className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Episode Player
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Interactive TV show episode player
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!showVideoPlayer && tvShow.youtube_url && (
                      <button
                        onClick={() => setShowVideoPlayer(true)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <Play className="w-4 h-4" />
                        <span>Play Episode</span>
                      </button>
                    )}
                    {tvShow.youtube_url && (
                      <a
                        href={tvShow.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                {showVideoPlayer && tvShow.youtube_url ? (
                  /* YouTube Player */
                  <div className="space-y-4">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(tvShow.youtube_url)}?autoplay=0&rel=0&modestbranding=1&fs=1&cc_load_policy=1`}
                        title={tvShow.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setShowVideoPlayer(false)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        Show Thumbnail
                      </button>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Youtube className="w-4 h-4" />
                        <span>Playing from YouTube</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Thumbnail Preview */
                  <div className="space-y-4">
                    <div className="relative group cursor-pointer" onClick={() => tvShow.youtube_url && setShowVideoPlayer(true)}>
                      <img
                        src={tvShow.thumbnail}
                        alt={tvShow.title}
                        className="w-full h-96 object-cover rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIFRodW1ibmFpbDwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                      {tvShow.youtube_url && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-12 h-12 text-white fill-current" />
                          </div>
                        </div>
                      )}
                      {/* Enhanced duration overlay */}
                      {tvShow.duration && (
                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm">
                          {tvShow.duration}
                        </div>
                      )}
                      {/* Quality badge */}
                      <div className="absolute top-4 left-4 bg-purple-500 bg-opacity-90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        HD
                      </div>
                    </div>
                    
                    {/* YouTube URL Information */}
                    <div className={`p-4 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <Youtube className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              YouTube URL
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {tvShow.youtube_url ? 'Episode source available' : 'No episode source'}
                            </p>
                          </div>
                        </div>
                        {tvShow.youtube_url && (
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                              ✓ Available
                            </span>
                          </div>
                        )}
                      </div>
                      {tvShow.youtube_url && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <p className={`text-xs font-mono break-all ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {tvShow.youtube_url}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/4 width on xl screens */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-2xl border shadow-sm p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <Hash className="w-4 h-4 text-white" />
                </div>
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quick Actions
                </h4>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/admin/tv-show`)}
                  className={`w-full px-4 py-3 rounded-lg transition-colors text-left ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Tv className="w-4 h-4" />
                    <span className="text-sm font-medium">Manage TV Shows</span>
                  </div>
                </button>
                <button
                  onClick={() => navigate(`/tvshow/${tvShow._id || tvShow.id}`)}
                  className={`w-full px-4 py-3 rounded-lg transition-colors text-left ${
                    isDarkMode 
                      ? 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-400' 
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View Public Page</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Section Info */}
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-2xl border shadow-sm p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <Tv className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Section
                </h4>
              </div>
              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {tvShow.section || 'TV Show'}
              </p>
            </div>

            {/* Episode Details */}
            {(tvShow.season_id || tvShow.episode_number) && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Hash className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Episode Details
                  </h4>
                </div>
                <div className="space-y-2">
                  {tvShow.season_id && (
                    <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Season: {tvShow.season_id}
                    </p>
                  )}
                  {tvShow.episode_number && (
                    <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Episode: {tvShow.episode_number}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {tvShow.tags && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Tags
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {tvShow.tags.split(',').slice(0, isTagsExpanded ? undefined : 3).map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                  {tvShow.tags.split(',').length > 3 && (
                    <button
                      onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                      className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <span>{isTagsExpanded ? 'Show less tags' : `Show ${tvShow.tags.split(',').length - 3} more tags`}</span>
                      {isTagsExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Meta Description */}
            {tvShow.meta_description && (
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
                    {isSeoExpanded ? tvShow.meta_description : truncateText(tvShow.meta_description, 120)}
                  </p>
                  {tvShow.meta_description.length > 120 && (
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

            {/* Analytics Summary */}
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-2xl border shadow-sm p-6`}>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Analytics
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {tvShow.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Created</span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {new Date(tvShow.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {tvShow.updatedAt !== tvShow.createdAt && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated</span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {new Date(tvShow.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}