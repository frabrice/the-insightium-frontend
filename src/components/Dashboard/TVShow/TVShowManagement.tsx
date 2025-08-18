import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TVShowForm from './TVShowForm';
import { tvShowsApi } from '../../../api/tvshows';
import { useToast } from '../../../contexts/ToastContext';
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

interface TVShowManagementProps {
  isDarkMode: boolean;
}

export default function TVShowManagement({ isDarkMode }: TVShowManagementProps) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingEpisode, setDeletingEpisode] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadTVShows();
  }, [currentPage, selectedCategory, selectedStatus]);

  const loadTVShows = async () => {
    try {
      setLoading(true);
      const response = await tvShowsApi.getTVShows({
        page: currentPage,
        limit: 4,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      });
      
      if (response.success) {
        setEpisodes(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setEpisodes([]);
        setTotalPages(1);
      }
      
      // Set dummy seasons data
      setSeasons([
        { id: '1', season_number: 1, title: 'Season 1: Foundation' },
        { id: '2', season_number: 2, title: 'Season 2: Innovation' }
      ]);
    } catch (error) {
      console.error('Error loading TV shows:', error);
      showError('Error loading TV shows');
      setEpisodes([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };


  const categories = ['Full Episodes', 'Mind Battles', 'Pitch Perfect', 'Insight Stories', 'Behind Insight'];

  // Filter episodes by search query
  const filteredEpisodes = episodes.filter(episode => {
    if (!searchQuery) return true;
    return episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           episode.description?.toLowerCase().includes(searchQuery.toLowerCase());
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
    try {
      if (editingEpisode) {
        await tvShowsApi.updateTVShow(editingEpisode._id || editingEpisode.id, episodeData);
        showSuccess('TV show episode updated successfully!');
      } else {
        await tvShowsApi.createTVShow(episodeData);
        showSuccess('TV show episode created successfully!');
      }
      
      await loadTVShows();
      setShowEpisodeForm(false);
      setEditingEpisode(null);
    } catch (error: any) {
      console.error('Error saving TV show episode:', error);
      
      // Re-throw the error so the form can handle validation errors
      throw error;
    }
  };

  const handleDeleteClick = (episode: any) => {
    setDeletingEpisode(episode);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEpisode) return;
    
    setLoading(true);
    
    try {
      await tvShowsApi.deleteTVShow(deletingEpisode._id || deletingEpisode.id);
      showSuccess('TV show episode deleted successfully!');
      await loadTVShows();
    } catch (error: any) {
      console.error('Error deleting TV show episode:', error);
      showError('Error deleting TV show episode');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeletingEpisode(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletingEpisode(null);
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Episodes
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {episodes.length}
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
                {episodes.reduce((total, episode) => {
                  const viewsStr = episode.views?.toString() || '0';
                  const views = parseInt(viewsStr.replace(/[K,]/g, '')) || 0;
                  return total + (viewsStr.includes('K') ? views * 1000 : views);
                }, 0).toLocaleString()}
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
                {episodes.length > 0 ? (
                  (episodes.reduce((total, episode) => total + (episode.rating || 0), 0) / episodes.length).toFixed(1)
                ) : '0.0'}
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
                {episodes.filter(e => e.status === 'published').length}
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
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading TV show episodes...
          </span>
        </div>
      )}

      {/* Episodes Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEpisodes.map((episode) => {
            const episodeId = episode._id || episode.id;
            return (
          <div key={episodeId} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer`} onClick={() => navigate(`/admin/tvshow/${episodeId}`)}>
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
              {episode.is_new && (
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
                  {episode.season_id && (
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      S{episode.season_id}
                      {episode.episode_number && `E${episode.episode_number}`}
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {new Date(episode.upload_date || episode.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEpisode(episode);
                    }}
                    className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(episode);
                    }}
                    className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && filteredEpisodes.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-6">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
              currentPage === 1
                ? isDarkMode 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : isDarkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <span>← Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isCurrentPage = pageNum === currentPage;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCurrentPage
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
              currentPage === totalPages
                ? isDarkMode 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : isDarkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <span>Next →</span>
          </button>
        </div>
      )}

      {/* Page Info */}
      {!loading && filteredEpisodes.length > 0 && (
        <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Showing page {currentPage} of {totalPages} ({filteredEpisodes.length} episodes)
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingEpisode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-2xl w-full max-w-md`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Delete Episode
                  </h2>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                Are you sure you want to delete "<span className="font-medium">{deletingEpisode.title}</span>"? 
                This will permanently remove the episode and all its data.
              </p>
              
              <div className={`${isDarkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} rounded-lg border p-3`}>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                      Warning
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                      This action is permanent and cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-end space-x-3 p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={handleDeleteCancel}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Episode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}