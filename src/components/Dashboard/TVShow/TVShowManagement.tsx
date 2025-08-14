import React, { useState } from 'react';
import TVShowForm from './TVShowForm';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Tv,
  Upload,
  BarChart3
} from 'lucide-react';
import { useData } from '../../../contexts/DataContext';
import { db } from '../../../lib/supabase';

interface TVShowManagementProps {
  isDarkMode: boolean;
}

export default function TVShowManagement({ isDarkMode }: TVShowManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  // Fetch episodes and seasons
  React.useEffect(() => {
    // Use dummy data instead of database calls
    setEpisodes(defaultEpisodes);
    setSeasons([
      { id: '1', season_number: 1, title: 'Season 1: Foundation' },
      { id: '2', season_number: 2, title: 'Season 2: Innovation' }
    ]);
    setIsLoading(false);
  }, []);

  const defaultEpisodes = [
    {
      id: '1',
      title: 'Innovation Challenge: Episode 12',
      description: 'Young innovators present groundbreaking solutions to Africa\'s educational challenges',
      duration: '58:42',
      views: '125K',
      uploadDate: '2024-03-15',
      status: 'published',
      category: 'Full Episodes',
      section: 'FullEpisodes',
      rating: 4.9,
      isNew: true,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '2',
      title: 'Mathematics Showdown',
      description: 'Intense mathematical problem-solving under pressure',
      duration: '15:22',
      views: '245K',
      uploadDate: '2024-03-12',
      status: 'published',
      category: 'Mind Battles',
      section: 'MindBattles',
      rating: 4.9,
      isNew: true,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '3',
      title: 'Science Quiz Championship',
      description: 'Students compete in an exciting science knowledge battle',
      duration: '32:15',
      views: '89K',
      uploadDate: '2024-03-10',
      status: 'published',
      category: 'Mind Battles',
      section: 'MindBattles',
      rating: 4.7,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '4',
      title: 'Pitch Perfect: Startup Ideas',
      description: 'Young entrepreneurs pitch their innovative business ideas',
      duration: '45:30',
      views: '67K',
      uploadDate: '2024-03-08',
      status: 'draft',
      category: 'Pitch Perfect',
      section: 'PitchPerfect',
      rating: 4.5,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const displayEpisodes = episodes.length > 0 ? episodes : defaultEpisodes;

  const categories = ['Full Episodes', 'Mind Battles', 'Pitch Perfect', 'Insight Stories', 'Behind Insight'];

  // Filter episodes
  const filteredEpisodes = displayEpisodes.filter(episode => {
    const matchesSearch = !searchQuery || 
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || episode.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || episode.status === selectedStatus;
    const matchesSeason = selectedSeason === 'all' || 
      (episode.tv_show_seasons && episode.tv_show_seasons.season_number.toString() === selectedSeason);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSeason;
  });

  const handleNewEpisode = () => {
    setEditingEpisode(null);
    setShowEpisodeForm(true);
  };

  const handleEditEpisode = (episode: any) => {
    setEditingEpisode(episode);
    setShowEpisodeForm(true);
  };

  const handleSaveEpisode = async (episodeData: any) => {
      console.log('Episode saved successfully:', episodeData);
      setSaveMessage('Episode saved successfully!');
      
      // Simulate refresh
      setTimeout(() => {
        setSaveMessage('');
      }, 1000);
      
    setShowEpisodeForm(false);
    setEditingEpisode(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-3 h-3" />;
      case 'draft': return <AlertCircle className="w-3 h-3" />;
      case 'scheduled': return <Clock className="w-3 h-3" />;
      default: return <XCircle className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'draft': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'scheduled': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            TV Show Management
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage Project Insight TV show episodes and content
          </p>
        </div>
        <button 
          onClick={handleNewEpisode}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1" 
          style={{ backgroundColor: '#F21717' }}
        >
          <Plus className="w-3 h-3" />
          <span>New Episode</span>
        </button>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`${saveMessage.includes('Error') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'} rounded-lg border p-3`}>
          <p className="text-sm">{saveMessage}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Episodes
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {displayEpisodes.length}
              </p>
            </div>
            <div className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-2 rounded-lg">
              <Tv className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Views
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                526K
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-lg">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Avg Rating
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                4.8
              </p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 p-2 rounded-lg">
              <Star className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Published
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {displayEpisodes.filter(e => e.status === 'published').length}
              </p>
            </div>
            <div className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-7 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
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

          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Seasons</option>
            {seasons.map(season => (
              <option key={season.id} value={season.season_number}>Season {season.season_number}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Episodes Grid */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading episodes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEpisodes.map((episode) => (
          <div key={episode.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300`}>
            {/* Episode Thumbnail */}
            <div className="relative">
              <img 
                src={episode.thumbnail}
                alt={episode.title}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white" />
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(episode.status)}`}>
                  {getStatusIcon(episode.status)}
                  <span className="capitalize">{episode.status}</span>
                </span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {episode.duration}
              </div>

              {/* New Badge */}
              {episode.isNew && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  NEW
                </div>
              )}
            </div>

            {/* Episode Content */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded text-xs">
                  {episode.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {episode.rating}
                  </span>
                </div>
              </div>

              <h3 className={`text-sm font-bold mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {episode.title}
              </h3>

              <p className={`text-xs mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {episode.description}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-gray-400" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{episode.views}</span>
                  </div>
                  {episode.tv_show_seasons && (
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      S{episode.tv_show_seasons.season_number}
                      {episode.episode_number && `E${episode.episode_number}`}
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {new Date(episode.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Eye className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleEditEpisode(episode)}
                    className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MoreHorizontal className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Episode Form Modal */}
      {showEpisodeForm && (
        <TVShowForm
          isDarkMode={isDarkMode}
          onClose={() => {
            setShowEpisodeForm(false);
            setEditingEpisode(null);
          }}
          onSave={handleSaveEpisode}
          initialData={editingEpisode}
          mode={editingEpisode ? 'edit' : 'create'}
          seasons={seasons}
        />
      )}
    </div>
  );
}