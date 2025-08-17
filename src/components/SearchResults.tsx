import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, SortAsc, SortDesc, Calendar, User, Clock, Eye, Play, Mic, BookOpen, X } from 'lucide-react';
import { usePublicData } from '../contexts/PublicDataContext';
import Footer from './shared/Footer';

interface SearchResultsProps {
  isDarkMode: boolean;
}

interface SearchResult {
  id: string;
  type: 'article' | 'video' | 'tvshow' | 'podcast';
  title: string;
  description: string;
  category: string;
  author?: string;
  guest?: string;
  publishDate: string;
  readTime?: string;
  duration?: string;
  views?: string;
  plays?: string;
  image: string;
  relevanceScore: number;
}

export default function SearchResults({ isDarkMode }: SearchResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { articles, videos, tvShows, podcastEpisodes } = usePublicData();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'popularity'>('relevance');
  const [filterBy, setFilterBy] = useState<'all' | 'articles' | 'videos' | 'tvshows' | 'podcasts'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    'Research World',
    'Spirit of Africa',
    'Tech Trends',
    'Need to Know',
    'Echoes of Home',
    'Career Campus',
    'Mind and Body Quest',
    'E! Corner'
  ];

  // Calculate relevance score based on search query
  const calculateRelevance = (item: any, query: string): number => {
    if (!query) return 0;
    
    const queryLower = query.toLowerCase();
    let score = 0;
    
    // Title match (highest weight)
    if (item.title?.toLowerCase().includes(queryLower)) {
      score += 10;
      if (item.title?.toLowerCase().startsWith(queryLower)) score += 5;
    }
    
    // Category match
    const category = item.categoryName || item.category;
    if (category?.toLowerCase().includes(queryLower)) score += 5;
    
    // Description/excerpt match
    const description = item.description || item.excerpt || '';
    if (description.toLowerCase().includes(queryLower)) score += 3;
    
    // Author/guest match
    const person = item.author || item.guest_name || item.guest || '';
    if (person.toLowerCase().includes(queryLower)) score += 4;
    
    // Tags match (for articles)
    if (item.tags?.toLowerCase().includes(queryLower)) score += 2;
    
    return score;
  };

  // Perform search across all content types
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setFilteredResults([]);
      return;
    }

    setIsLoading(true);
    
    const searchResults: SearchResult[] = [];

    // Search articles
    articles.forEach(article => {
      const relevance = calculateRelevance(article, query);
      if (relevance > 0) {
        searchResults.push({
          id: article._id || article.id,
          type: 'article',
          title: article.title,
          description: article.excerpt || '',
          category: article.categoryName || article.category || '',
          author: article.author,
          publishDate: article.publishDate,
          readTime: article.readTime,
          views: article.views?.toString() || '0',
          image: article.featuredImage || article.featured_image || '',
          relevanceScore: relevance
        });
      }
    });

    // Search videos
    videos.forEach(video => {
      const relevance = calculateRelevance(video, query);
      if (relevance > 0) {
        searchResults.push({
          id: video._id || video.id,
          type: 'video',
          title: video.title,
          description: video.description || '',
          category: video.category,
          publishDate: video.upload_date || '',
          duration: video.duration,
          views: video.views?.toString() || '0',
          image: video.thumbnail || video.thumbnail_url || '',
          relevanceScore: relevance
        });
      }
    });

    // Search TV shows
    tvShows.forEach(tvShow => {
      const relevance = calculateRelevance(tvShow, query);
      if (relevance > 0) {
        searchResults.push({
          id: tvShow._id || tvShow.id,
          type: 'tvshow',
          title: tvShow.title,
          description: tvShow.description || '',
          category: tvShow.category,
          publishDate: tvShow.upload_date || '',
          duration: tvShow.duration,
          views: tvShow.views?.toString() || '0',
          image: tvShow.thumbnail || '',
          relevanceScore: relevance
        });
      }
    });

    // Search podcast episodes
    podcastEpisodes.forEach(episode => {
      const relevance = calculateRelevance(episode, query);
      if (relevance > 0) {
        searchResults.push({
          id: episode._id || episode.id,
          type: 'podcast',
          title: episode.title,
          description: episode.description || '',
          category: 'Podcast',
          guest: episode.guest_name,
          publishDate: episode.publish_date || '',
          duration: episode.duration,
          plays: episode.views?.toString() || '0',
          image: episode.thumbnail || '',
          relevanceScore: relevance
        });
      }
    });

    setResults(searchResults);
    setIsLoading(false);
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results];

    // Apply type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(result => {
        if (filterBy === 'articles') return result.type === 'article';
        if (filterBy === 'videos') return result.type === 'video';
        if (filterBy === 'tvshows') return result.type === 'tvshow';
        if (filterBy === 'podcasts') return result.type === 'podcast';
        return true;
      });
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(result => result.category === categoryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        case 'date':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'popularity':
          const aViews = parseInt((a.views || a.plays || '0').replace('K', '')) * (a.views?.includes('K') ? 1000 : 1);
          const bViews = parseInt((b.views || b.plays || '0').replace('K', '')) * (b.views?.includes('K') ? 1000 : 1);
          return bViews - aViews;
        default:
          return 0;
      }
    });

    setFilteredResults(filtered);
  }, [results, filterBy, categoryFilter, sortBy]);

  // Handle search on mount and when query changes
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    performSearch(query);
  }, [searchParams, articles, videos, tvShows, podcastEpisodes]);

  // Handle new search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'article') {
      navigate(`/article/${result.id}`);
    } else if (result.type === 'video') {
      navigate(`/video/${result.id}`);
    } else if (result.type === 'tvshow') {
      navigate(`/tvshow/${result.id}`);
    } else if (result.type === 'podcast') {
      navigate('/podcast');
    }
    window.scrollTo(0, 0);
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Play className="w-4 h-4" />;
      case 'tvshow': return <Play className="w-4 h-4" />;
      case 'podcast': return <Mic className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-600';
      case 'video': return 'bg-red-100 text-red-600';
      case 'tvshow': return 'bg-purple-100 text-purple-600';
      case 'podcast': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      {/* Search Header */}
      <section className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back to Home */}
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className={`flex items-center space-x-2 mb-6 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors group`}
          >
            <span className="font-medium">← Back to Home</span>
          </button>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, videos, podcasts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors text-lg ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Search Stats */}
          {searchQuery && (
            <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isLoading ? (
                <p>Searching...</p>
              ) : (
                <p>
                  Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} 
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              )}
            </div>
          )}

          {/* Filters and Sorting */}
          {results.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Content Type Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Content</option>
                  <option value="articles">Articles Only</option>
                  <option value="videos">Videos Only</option>
                  <option value="tvshows">TV Shows Only</option>
                  <option value="podcasts">Podcasts Only</option>
                </select>
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
                <option value="Podcast">Podcast</option>
              </select>

              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                {sortBy === 'date' ? <SortDesc className="w-5 h-5 text-gray-400" /> : <SortAsc className="w-5 h-5 text-gray-400" />}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="date">Newest First</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search Results */}
      <section className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" style={{ borderColor: '#F21717' }}></div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Searching...</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-6">
              {filteredResults.map((result, index) => (
                <div
                  key={`${result.type}-${result.id}-${index}`}
                  className={`group cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300`}
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start space-x-6">
                    {/* Result Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={result.image}
                        alt={result.title}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>

                    {/* Result Content */}
                    <div className="flex-1 min-w-0">
                      {/* Type and Category Badges */}
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)}
                          <span className="capitalize">{result.type}</span>
                        </span>
                        <span 
                          className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold text-xs shadow-md"
                        >
                          {result.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-xl sm:text-2xl font-bold mb-3 leading-tight group-hover:text-red-600 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {result.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-sm sm:text-base leading-relaxed mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {result.description}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {result.author && (
                          <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <User className="w-4 h-4" />
                            <span>{result.author}</span>
                          </span>
                        )}
                        {result.guest && (
                          <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <User className="w-4 h-4" />
                            <span>with {result.guest}</span>
                          </span>
                        )}
                        <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(result.publishDate).toLocaleDateString()}</span>
                        </span>
                        {result.readTime && (
                          <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Clock className="w-4 h-4" />
                            <span>{result.readTime}</span>
                          </span>
                        )}
                        {result.duration && (
                          <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Clock className="w-4 h-4" />
                            <span>{result.duration}</span>
                          </span>
                        )}
                        {result.views && (
                          <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Eye className="w-4 h-4" />
                            <span>{result.views} views</span>
                          </span>
                        )}
                        {result.plays && (
                          <span className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Play className="w-4 h-4" />
                            <span>{result.plays} plays</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            /* No Results */
            <div className="text-center py-20">
              <div className={`text-8xl mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>🔍</div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No results found
              </h3>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                We couldn't find anything matching "{searchQuery}"
              </p>
              <div className={`text-left max-w-md mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p className="mb-2">Try:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Checking your spelling</li>
                  <li>Using different keywords</li>
                  <li>Searching for broader terms</li>
                  <li>Browsing our categories</li>
                </ul>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className={`text-8xl mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>🔍</div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Search The Insightium
              </h3>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Find articles, videos, and podcast episodes across our entire platform
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}