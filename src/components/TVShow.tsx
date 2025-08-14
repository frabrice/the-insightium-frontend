import React, { useState, useEffect } from 'react';
import { Play, Clock, Eye, Star, Filter, Search, Calendar, Grid, List, ChevronDown } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Footer from './shared/Footer';

interface TVShowProps {
  isDarkMode: boolean;
}

export default function TVShow({ isDarkMode }: TVShowProps) {
  const { tvShowVideos } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);

  // Sample TV show data with different categories
  const defaultVideos = [
    {
      id: '1',
      title: 'Innovation Challenge: Episode 12',
      description: 'Young innovators present groundbreaking solutions to Africa\'s educational challenges',
      duration: '58:42',
      views: '125K',
      uploadDate: '2024-03-15',
      category: 'Full Episodes',
      rating: 4.9,
      isNew: true,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '2',
      title: 'Mathematics Showdown',
      description: 'Intense mathematical problem-solving under pressure',
      duration: '15:22',
      views: '245K',
      uploadDate: '2024-03-12',
      category: 'Mind Battles',
      rating: 4.9,
      isNew: true,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '3',
      title: 'Science Quiz Championship',
      description: 'Students compete in an exciting science knowledge battle',
      duration: '32:15',
      views: '89K',
      uploadDate: '2024-03-10',
      category: 'Mind Battles',
      rating: 4.7,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '4',
      title: 'Pitch Perfect: Startup Ideas',
      description: 'Young entrepreneurs pitch their innovative business ideas',
      duration: '45:30',
      views: '67K',
      uploadDate: '2024-03-08',
      category: 'Pitch Perfect',
      rating: 4.5,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '5',
      title: 'Behind the Scenes: Making of Project Insight',
      description: 'Exclusive look at how our educational TV show is produced',
      duration: '28:45',
      views: '156K',
      uploadDate: '2024-03-05',
      category: 'Behind Insight',
      rating: 4.6,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '6',
      title: 'Innovation Challenge: Episode 11',
      description: 'Previous episode featuring amazing student innovations',
      duration: '55:12',
      views: '198K',
      uploadDate: '2024-02-28',
      category: 'Full Episodes',
      rating: 4.8,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '7',
      title: 'Geography Challenge',
      description: 'Testing geographical knowledge across African countries',
      duration: '22:30',
      views: '134K',
      uploadDate: '2024-02-25',
      category: 'Mind Battles',
      rating: 4.4,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '8',
      title: 'Student Stories: From Village to Victory',
      description: 'Inspiring stories of students who overcame challenges',
      duration: '35:18',
      views: '87K',
      uploadDate: '2024-02-20',
      category: 'Insight Stories',
      rating: 4.7,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const categories = ['Full Episodes', 'Mind Battles', 'Pitch Perfect', 'Insight Stories', 'Behind Insight'];
  const displayVideos = tvShowVideos.length > 0 ? tvShowVideos : defaultVideos;

  useEffect(() => {
    let filtered = [...displayVideos];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        case 'popular':
          return parseInt(b.views.replace('K', '')) - parseInt(a.views.replace('K', ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredVideos(filtered);
  }, [searchQuery, selectedCategory, sortBy, displayVideos]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title */}
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Project Insight TV Show
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredVideos.length} episodes available
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search episodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64 ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${
                    viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : `${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${
                    viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : `${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filteredVideos.length > 0 ? (
          viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className={`group cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-300`}>
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
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(video.uploadDate)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredVideos.map((video) => (
                <div key={video.id} className={`group cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 shadow-lg border hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-start space-x-4">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-32 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <Play className="w-6 h-6 text-white fill-current" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white px-1 py-0.5 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded text-xs font-medium">
                              {video.category}
                            </span>
                            {video.isNew && (
                              <span className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                                NEW
                              </span>
                            )}
                          </div>
                          <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {video.title}
                          </h3>
                          <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {video.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{video.views} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{video.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{formatDate(video.uploadDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* No Results */
          <div className="text-center py-20">
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>📺</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No episodes found
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}