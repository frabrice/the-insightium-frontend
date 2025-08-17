import React, { useState, useRef, useEffect } from 'react';
import { Play, User, Pause, Volume2, Mic, RefreshCw, ArrowLeft } from 'lucide-react';
import { usePublicData } from '../contexts/PublicDataContext';
import { useNavigate } from 'react-router-dom';
import Footer from './shared/Footer';

interface PodcastProps {
  isDarkMode: boolean;
}

export default function Podcast({ isDarkMode }: PodcastProps) {
  const { podcastEpisodes } = usePublicData();
  const navigate = useNavigate();
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const latestEpisodes = podcastEpisodes.slice(0, 4);

  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentWindow && isPlaying) {
        // Request current time and duration from YouTube player
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"getCurrentTime","args":""}',
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"getDuration","args":""}',
          '*'
        );
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handlePlayPause = (episodeId: string) => {
    const episode = podcastEpisodes.find(ep => (ep._id || ep.id) === episodeId);
    
    if (playingEpisode === episodeId && isPlaying) {
      // Pause current episode
      setIsPlaying(false);
      stopProgressTracking();
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    } else if (playingEpisode === episodeId && !isPlaying) {
      // Resume current episode
      setIsPlaying(true);
      startProgressTracking();
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    } else {
      // Stop current and play new episode
      stopProgressTracking();
      setPlayingEpisode(episodeId);
      setIsPlaying(true);
      setCurrentTime(0);
      
      // Set duration from episode data (rough estimate)
      const durationStr = episode?.duration || '0:00';
      const [mins, secs] = durationStr.split(':').map(Number);
      setDuration((mins || 0) * 60 + (secs || 0));
      
      startProgressTracking();
    }
  };

  useEffect(() => {
    // When episode changes, update iframe
    if (playingEpisode && isPlaying) {
      const episode = podcastEpisodes.find(ep => (ep._id || ep.id) === playingEpisode);
      const videoId = getYouTubeVideoId(episode?.youtube_url || '');
      
      if (videoId && iframeRef.current) {
        iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&controls=0&origin=${window.location.origin}`;
      }
    }
  }, [playingEpisode, isPlaying, podcastEpisodes]);

  useEffect(() => {
    // Listen for YouTube player messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = JSON.parse(event.data);
        
        // Handle info delivery (currentTime and duration)
        if (data.event === 'infoDelivery') {
          if (data.info && typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
          }
          if (data.info && typeof data.info.duration === 'number') {
            setDuration(data.info.duration);
          }
        }
        
        // Handle player state changes
        if (data.event === 'onStateChange') {
          if (data.info === 1) { // Playing
            setIsPlaying(true);
          } else if (data.info === 2) { // Paused
            setIsPlaying(false);
          } else if (data.info === 0) { // Ended
            setIsPlaying(false);
            setPlayingEpisode(null);
            setCurrentTime(0);
          }
        }
      } catch (error) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      stopProgressTracking();
    };
  }, []);

  // Enhanced empty state when no podcast episodes are available
  if (podcastEpisodes.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className={`text-center py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl`}>
            <div className="flex justify-center mb-8">
              <div className={`p-6 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Mic className={`w-16 h-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No Podcast Episodes Available Yet
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're working on bringing you amazing conversations and interviews. 
              In the meantime, explore our other content!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/magazine')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Browse Articles</span>
              </button>
              <button
                onClick={() => navigate('/tv-show')}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl transition-colors font-semibold ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>Watch TV Shows</span>
              </button>
              <button
                onClick={() => window.location.reload()}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl transition-colors font-semibold border-2 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Compact Horizontal Podcast Listing */}
        <div className="space-y-4">
          {latestEpisodes.map((episode, index) => (
              <div key={episode._id || episode.id} className={`group ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}>
                <div className="flex items-center p-4">
                  {/* Episode Image - Compact */}
                  <div className="w-20 h-20 relative overflow-hidden rounded-lg flex-shrink-0">
                    <img 
                      src={episode.image}
                      alt={episode.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <button
                        onClick={() => handlePlayPause(episode._id || episode.id)}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-lg transition-all duration-300"
                      >
                        {playingEpisode === (episode._id || episode.id) && isPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Episode Info - Main Content */}
                  <div className="flex-1 min-w-0 mx-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Episode Number & Title */}
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                            EP {latestEpisodes.length - index}
                          </span>
                          <span className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded text-xs">
                            {episode.duration}
                          </span>
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {episode.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {episode.guest}
                          </span>
                        </div>
                        
                        <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {episode.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button - Right Side */}
                  <div className="flex items-center">
                    <button
                      onClick={() => handlePlayPause(episode._id || episode.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300"
                    >
                      {playingEpisode === (episode._id || episode.id) && isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span className="hidden sm:inline">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span className="hidden sm:inline">Play</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Playing Indicator */}
                {playingEpisode === (episode._id || episode.id) && (
                  <div className="bg-green-600 px-4 py-2">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className={`w-1 h-3 bg-white rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                          <div className={`w-1 h-3 bg-white rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.1s' }}></div>
                          <div className={`w-1 h-3 bg-white rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs font-medium">{isPlaying ? 'Now Playing' : 'Paused'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Hidden YouTube iframe for audio playback */}
      {playingEpisode && (
        <div style={{ position: 'fixed', top: '-1000px', left: '-1000px' }}>
          <iframe
            ref={iframeRef}
            width="1"
            height="1"
            src=""
            title="YouTube Audio Player"
            frameBorder="0"
            allow="autoplay"
          />
        </div>
      )}

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}