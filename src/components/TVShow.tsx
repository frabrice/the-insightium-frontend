import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Eye, Star, Tv, RefreshCw, ArrowLeft } from 'lucide-react';
import { usePublicData } from '../contexts/PublicDataContext';
import Footer from './shared/Footer';

interface TVShowProps {
  isDarkMode: boolean;
}

export default function TVShow({ isDarkMode }: TVShowProps) {
  const { tvShowVideos } = usePublicData();
  const navigate = useNavigate();

  // Enhanced empty state when no TV shows are available
  if (tvShowVideos.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        {/* Header */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="text-center">
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                TV Shows
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your favorite episodes and series
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className={`text-center py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl`}>
            <div className="flex justify-center mb-8">
              <div className={`p-6 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Tv className={`w-16 h-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No TV Shows Available Yet
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're working hard to bring you amazing episodes and series. 
              In the meantime, check out our other content!
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
                onClick={() => navigate('/podcast')}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl transition-colors font-semibold ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>Check Podcasts</span>
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

  const latestTVShows = tvShowVideos.slice(0, 4);

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Latest TV Shows
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Watch our {latestTVShows.length} latest episodes
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestTVShows.map((video) => (
                <Link 
                  key={video._id || video.id} 
                  to={`/tvshow/${video._id || video.id}`}
                  className={`group cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-300 block`}
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Play className="w-6 h-6 text-gray-900 fill-current" />
                      </div>
                    </div>
                    
                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                    
                    {/* New Badge */}
                    {video.isNew && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        NEW
                      </div>
                    )}
                    
                    {/* Category */}
                    <div className="absolute top-2 right-2">
                      <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className={`text-sm font-bold mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {video.title}
                    </h3>
                    <p className={`text-xs mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {video.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-gray-400" />
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{video.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{video.rating}</span>
                        </div>
                      </div>
                      {formatDate(video.uploadDate) && (
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(video.uploadDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}