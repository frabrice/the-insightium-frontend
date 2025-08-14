import React, { useState, useEffect } from 'react';
import { Play, Clock, Headphones, Star, Search, Calendar, Download, User, Pause, Volume2, Share2, Heart, Bookmark, ExternalLink } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Footer from './shared/Footer';

interface PodcastProps {
  isDarkMode: boolean;
}

export default function Podcast({ isDarkMode }: PodcastProps) {
  const { podcastEpisodes } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredEpisodes, setFilteredEpisodes] = useState<any[]>([]);
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);

  // Sample podcast data
  const defaultEpisodes = [
    {
      id: '1',
      title: 'The Future of Learning: AI in Education',
      guest: 'Dr. Kwame Asante',
      duration: '58 min',
      plays: '12.5K',
      downloads: '5.2K',
      publishDate: '2024-03-15',
      description: 'Join us for an in-depth conversation with leading AI researchers and educators as we explore how artificial intelligence is reshaping the educational landscape. We dive deep into machine learning applications, personalized learning systems, and the future of intelligent tutoring.',
      image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Building Inclusive Learning Environments',
      guest: 'Prof. Amina Hassan',
      duration: '45 min',
      plays: '8.2K',
      downloads: '3.7K',
      publishDate: '2024-03-08',
      description: 'Exploring comprehensive strategies for creating educational spaces that welcome and support all learners, regardless of their background, abilities, or learning styles. We discuss practical implementation methods and real-world success stories.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.6
    },
    {
      id: '3',
      title: 'The Power of Storytelling in Education',
      guest: 'Marcus Johnson',
      duration: '52 min',
      plays: '9.7K',
      downloads: '4.3K',
      publishDate: '2024-03-01',
      description: 'How narrative techniques can transform the way we teach and learn complex subjects. We explore the psychology of storytelling, practical applications in various subjects, and techniques for engaging student imagination.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9
    },
    {
      id: '4',
      title: 'Mental Health in Academic Settings',
      guest: 'Dr. Sarah Ochieng',
      duration: '41 min',
      plays: '6.8K',
      downloads: '2.9K',
      publishDate: '2024-02-25',
      description: 'Addressing mental health challenges and support systems in educational institutions. We discuss early intervention strategies, campus wellness programs, and creating supportive academic environments.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.7
    },
    {
      id: '5',
      title: 'Digital Transformation in African Universities',
      guest: 'Prof. David Kimani',
      duration: '49 min',
      plays: '11.3K',
      downloads: '4.8K',
      publishDate: '2024-02-18',
      description: 'How universities across Africa are embracing digital technologies to enhance learning experiences. We examine successful digital transformation cases, infrastructure challenges, and innovative solutions.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.5
    },
    {
      id: '6',
      title: 'Women in STEM Education Leadership',
      guest: 'Dr. Grace Wanjiku',
      duration: '38 min',
      plays: '7.4K',
      downloads: '3.1K',
      publishDate: '2024-02-11',
      description: 'Celebrating female leaders who are transforming STEM education across the continent. We highlight breakthrough achievements, leadership strategies, and initiatives empowering the next generation.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8
    },
    {
      id: '7',
      title: 'Community-Based Learning Models',
      guest: 'Samuel Mutua',
      duration: '44 min',
      plays: '5.9K',
      downloads: '2.6K',
      publishDate: '2024-02-04',
      description: 'Exploring how communities are taking ownership of educational initiatives and creating sustainable learning ecosystems. We discuss grassroots movements, local partnerships, and community-driven solutions.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.4
    },
    {
      id: '8',
      title: 'The Role of Arts in Education',
      guest: 'Maria Santos',
      duration: '36 min',
      plays: '8.1K',
      downloads: '3.5K',
      publishDate: '2024-01-28',
      description: 'How creative arts are being integrated into educational curricula to enhance learning outcomes. We explore interdisciplinary approaches, creativity in STEM, and arts-based pedagogical methods.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.6
    }
  ];

  const displayEpisodes = podcastEpisodes.length > 0 ? podcastEpisodes : defaultEpisodes;

  useEffect(() => {
    let filtered = [...displayEpisodes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(episode =>
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'oldest':
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case 'popular':
          return parseFloat(b.plays.replace('K', '')) - parseFloat(a.plays.replace('K', ''));
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return parseInt(b.duration) - parseInt(a.duration);
        default:
          return 0;
      }
    });

    setFilteredEpisodes(filtered);
  }, [searchQuery, sortBy, displayEpisodes]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handlePlayPause = (episodeId: string) => {
    if (playingEpisode === episodeId) {
      setPlayingEpisode(null);
    } else {
      setPlayingEpisode(episodeId);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-40 backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title */}
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Library Talk
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Real conversations in real libraries
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                {filteredEpisodes.length} episodes • Updated weekly
              </p>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search episodes or guests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-80 ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Longest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {filteredEpisodes.length > 0 ? (
          /* Compact Horizontal Podcast Listing */
          <div className="space-y-4">
            {filteredEpisodes.map((episode, index) => (
              <div key={episode.id} className={`group ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}>
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
                        onClick={() => handlePlayPause(episode.id)}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-lg transition-all duration-300"
                      >
                        {playingEpisode === episode.id ? (
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
                            EP {filteredEpisodes.length - index}
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

                  {/* Stats & Actions - Right Side */}
                  <div className="flex items-center space-x-6">
                    {/* Stats */}
                    <div className="hidden md:flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {episode.plays}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          plays
                        </p>
                      </div>
                      <div className="text-center">
                        <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {episode.downloads}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          downloads
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {episode.rating}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePlayPause(episode.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300"
                      >
                        {playingEpisode === episode.id ? (
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
                      
                      <button className={`p-2 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-400 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}>
                        <Download className="w-4 h-4" />
                      </button>
                      
                      <button className={`p-2 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-400 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}>
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Playing Indicator */}
                {playingEpisode === episode.id && (
                  <div className="bg-green-600 px-4 py-2">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
                          <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs font-medium">Now Playing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-3 h-3" />
                        <span className="text-xs">0:00 / {episode.duration}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-20">
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>🎙️</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No episodes found
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}