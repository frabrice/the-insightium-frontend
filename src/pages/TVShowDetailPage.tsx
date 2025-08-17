import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Eye, Star, Calendar, Clock, Tag, ArrowLeft, ThumbsUp, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { publicApi, PublicTVShow } from '../api/public';
import Footer from '../components/shared/Footer';

interface TVShowDetailPageProps {
  isDarkMode: boolean;
}

export default function TVShowDetailPage({ isDarkMode }: TVShowDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tvShow, setTVShow] = useState<PublicTVShow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Truncate text utility
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    if (id) {
      loadTVShow(id);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadTVShow = async (tvShowId: string) => {
    try {
      setIsLoading(true);
      const response = await publicApi.getTVShow(tvShowId);
      
      if (response.success && response.data) {
        setTVShow(response.data);
        setError(null);
      } else {
        setError(response.message || 'TV show not found');
      }
    } catch (error) {
      console.error('Error loading TV show:', error);
      setError('Failed to load TV show');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getYouTubeVideoId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };


  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors flex items-center justify-center`}>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Loading TV show...
          </p>
        </div>
      </div>
    );
  }

  if (error || !tvShow) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors flex items-center justify-center`}>
        <div className="text-center py-20">
          <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>📺</div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            TV Show Not Found
          </h3>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {error || 'The TV show you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <button
            onClick={() => navigate('/tv-show')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to TV Shows</span>
          </button>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(tvShow.youtube_url);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Back Button */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate('/tv-show')}
            className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to TV Shows</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-6">
              {videoId ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={tvShow.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-white mb-4 mx-auto opacity-80" />
                      <p className="text-white">Video not available</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Title and Details */}
            <div className="mb-6">
              <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {tvShow.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {tvShow.upload_date && (
                  <div className="flex items-center space-x-1">
                    <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(tvShow.upload_date)}
                    </span>
                  </div>
                )}
                
                {tvShow.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tvShow.duration}
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-1">
                  <Eye className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {tvShow.views} views
                  </span>
                </div>

                {tvShow.rating && tvShow.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tvShow.rating}/5
                    </span>
                  </div>
                )}
              </div>

              {/* Categories and Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                  {tvShow.category}
                </span>
                {tvShow.featured && (
                  <span className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
                {tvShow.is_new && (
                  <span className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-6">
                {tvShow.likes && tvShow.likes > 0 && (
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tvShow.likes}
                    </span>
                  </div>
                )}

                {tvShow.comments_count && tvShow.comments_count > 0 && (
                  <div className="flex items-center space-x-2">
                    <MessageSquare className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tvShow.comments_count}
                    </span>
                  </div>
                )}

              </div>

              {/* Description */}
              {tvShow.description && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Description
                  </h3>
                  <div className="space-y-2">
                    <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} rounded-lg border p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Episode Details
              </h3>
              
              <div className="space-y-4">
                {tvShow.season_id && (
                  <div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} block mb-1`}>
                      Season
                    </span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {tvShow.season_id}
                    </span>
                  </div>
                )}

                {tvShow.episode_number && (
                  <div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} block mb-1`}>
                      Episode
                    </span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      #{tvShow.episode_number}
                    </span>
                  </div>
                )}

                {tvShow.section && (
                  <div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} block mb-1`}>
                      Section
                    </span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {tvShow.section}
                    </span>
                  </div>
                )}
              </div>

              {tvShow.tags && (
                <div className="mt-6">
                  <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                    <Tag className="w-4 h-4 mr-1" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tvShow.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}