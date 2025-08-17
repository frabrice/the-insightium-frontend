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
  Mic,
  Hash,
  Globe,
  Play,
  Youtube,
  BarChart3,
  Headphones,
  Download,
  Music,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { podcastsApi } from '../../../api/podcasts';

interface AdminPodcastViewProps {
  isDarkMode: boolean;
}

export default function AdminPodcastView({ isDarkMode }: AdminPodcastViewProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  // Truncate text utility
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    const fetchPodcast = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await podcastsApi.getPodcastById(id);
        if (response.success) {
          setPodcast(response.data);
        } else {
          setError('Podcast episode not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load podcast episode');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
          <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-green-300 animate-spin" style={{ animationDelay: '0.15s', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
          } border-2`}>
            <Mic className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Podcast Episode Not Found
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {error || 'The podcast episode you\'re looking for doesn\'t exist or has been removed.'}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-transparent"></div>
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
                  Library Talk podcast episode information and analytics
                </p>
              </div>
            </div>
            
            {/* Enhanced badges */}
            <div className="flex items-center space-x-3">
              {podcast.featured && (
                <div className="bg-gradient-to-r from-purple-100 to-violet-50 text-purple-700 dark:from-purple-900/30 dark:to-violet-900/20 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Featured</span>
                </div>
              )}
              <div className="bg-gradient-to-r from-green-100 to-emerald-50 text-green-700 dark:from-green-900/30 dark:to-emerald-900/20 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-sm">
                <Mic className="w-4 h-4" />
                <span>Published</span>
              </div>
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
              {/* Episode Number */}
              {podcast.episode_number && (
                <div className="flex items-center space-x-3">
                  <Hash className="w-4 h-4 text-green-600" />
                  <span className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-200/50 dark:border-green-800/50">
                    Episode {podcast.episode_number}
                  </span>
                </div>
              )}

              {/* Title with better typography */}
              <div className="space-y-3">
                <h2 className={`text-4xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {podcast.title}
                </h2>
                {podcast.description && (
                  <div className="space-y-2">
                    <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isDescriptionExpanded ? podcast.description : truncateText(podcast.description, 200)}
                    </p>
                    {podcast.description.length > 200 && (
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

              {/* Guest Information */}
              {podcast.guest_name && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Featured Guest</p>
                    <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {podcast.guest_name}
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Meta Information Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Published</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {new Date(podcast.publish_date || podcast.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {podcast.duration && (
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Duration</p>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {podcast.duration}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Headphones className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Plays</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {(podcast.plays || '0').toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Download className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Downloads</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {(podcast.downloads || '0').toLocaleString()}
                    </p>
                  </div>
                </div>

                {podcast.rating > 0 && (
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Rating</p>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {podcast.rating}/5
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Episode Player Card */}
            {podcast.image && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm overflow-hidden`}>
                <div className="p-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Episode Preview
                    </h4>
                  </div>
                </div>
                <div className="p-6">
                  <div className="relative">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="w-full h-96 object-cover rounded-xl shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    {/* Episode duration overlay */}
                    {podcast.duration && (
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                        {podcast.duration}
                      </div>
                    )}
                  </div>
                  
                  {/* Platform Links */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {podcast.youtube_url && (
                      <a
                        href={podcast.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Youtube className="w-4 h-4" />
                        <span>YouTube</span>
                      </a>
                    )}
                    {podcast.spotify_url && (
                      <a
                        href={podcast.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Music className="w-4 h-4" />
                        <span>Spotify</span>
                      </a>
                    )}
                    {podcast.apple_url && (
                      <a
                        href={podcast.apple_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        <Headphones className="w-4 h-4" />
                        <span>Apple</span>
                      </a>
                    )}
                    {podcast.google_url && (
                      <a
                        href={podcast.google_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Google</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Transcript */}
            {podcast.transcript && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Episode Transcript
                  </h4>
                </div>
                <div className={`text-base leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {podcast.transcript}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/4 width on xl screens */}
          <div className="space-y-6">
            {/* Series Info */}
            {podcast.podcast_series && (
              <div className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-2xl border shadow-sm p-6`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Mic className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Series
                  </h4>
                </div>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {podcast.podcast_series.title || 'Library Talk'}
                </p>
              </div>
            )}

            {/* Tags */}
            {podcast.tags && (
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
                    {podcast.tags.split(',').slice(0, isTagsExpanded ? undefined : 3).map((tag: string, index: number) => (
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
                  {podcast.tags.split(',').length > 3 && (
                    <button
                      onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                      className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <span>{isTagsExpanded ? 'Show less tags' : `Show ${podcast.tags.split(',').length - 3} more tags`}</span>
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
            {podcast.meta_description && (
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
                    {isSeoExpanded ? podcast.meta_description : truncateText(podcast.meta_description, 120)}
                  </p>
                  {podcast.meta_description.length > 120 && (
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
                    {podcast.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Created</span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {new Date(podcast.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {podcast.updatedAt !== podcast.createdAt && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated</span>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {new Date(podcast.updatedAt).toLocaleDateString()}
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