import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, Eye, ArrowLeft, Play, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
import { publicApi, PublicVideo } from '../api/public';
import Footer from '../components/shared/Footer';

interface VideoPageProps {
  isDarkMode: boolean;
}

export default function VideoPage({ isDarkMode }: VideoPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<PublicVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Truncate text utility
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      loadVideo(id);
    }
  }, [id]);

  const loadVideo = async (videoId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await publicApi.getVideo(videoId);
      
      if (response.success && response.data) {
        setVideo(response.data);
      } else {
        setError(response.message || 'Video not found');
      }
    } catch (error) {
      console.error('Error loading video:', error);
      setError('Failed to load video');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="animate-pulse">Loading video...</div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-6">Video Not Found</h1>
          <p className="mb-8">{error || 'The video you\'re looking for doesn\'t exist or has been removed.'}</p>
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

  const videoId = getYouTubeVideoId(video.youtube_url || '');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Video Header */}
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
              {video.category}
            </span>
          </div>

          <h1 className={`text-3xl lg:text-4xl font-bold leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {video.title}
          </h1>
          
          {video.description && (
            <div className="mb-6 space-y-2">
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {isDescriptionExpanded ? video.description : truncateText(video.description, 200)}
              </p>
              {video.description.length > 200 && (
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

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {video.creator || 'The Insightium'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-4 h-4" />
                <span>{new Date(video.upload_date || video.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock className="w-4 h-4" />
                <span>{video.duration || '10 min'}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Eye className="w-4 h-4" />
                <span>{video.views || 0} views</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* YouTube Video Player */}
          {videoId ? (
            <div className="mb-8">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className={`mb-8 p-12 text-center rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Youtube className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Video URL not available
              </p>
            </div>
          )}

          {/* Video Details */}
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About this video
            </h2>
            
            {video.transcript && (
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Transcript
                </h3>
                <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {video.transcript}
                </p>
              </div>
            )}

            {video.tags && (
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {video.tags.split(',').map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</p>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {video.category}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Published</p>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(video.upload_date || video.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {video.featured ? 'Featured' : 'Published'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>


      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}