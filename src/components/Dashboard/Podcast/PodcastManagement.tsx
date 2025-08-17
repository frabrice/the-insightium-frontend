import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PodcastForm from './PodcastForm';
import { podcastsApi } from '../../../api/podcasts';
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
  Mic,
  Download,
  BarChart3,
  Headphones
} from 'lucide-react';

interface PodcastManagementProps {
  isDarkMode: boolean;
}

export default function PodcastManagement({ isDarkMode }: PodcastManagementProps) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingEpisode, setDeletingEpisode] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadPodcasts();
  }, [currentPage, selectedStatus]);

  const loadPodcasts = async () => {
    try {
      setLoading(true);
      const response = await podcastsApi.getPodcasts({
        page: currentPage,
        limit: 10,
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      });
      
      if (response.success) {
        setEpisodes(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setEpisodes([]);
        setTotalPages(1);
      }
      
      // Set dummy data for guests and series
      setGuests([
        { id: '1', full_name: 'Dr. Kwame Asante', title: 'AI in Education Researcher', organization: 'University of Ghana' },
        { id: '2', full_name: 'Prof. Amina Hassan', title: 'Inclusive Education Specialist', organization: 'Cairo University' }
      ]);
      setSeries([
        { id: '1', title: 'Library Talk: Education Leaders' },
        { id: '2', title: 'Library Talk: Student Voices' }
      ]);
    } catch (error) {
      console.error('Error loading podcasts:', error);
      showError('Error loading podcasts');
      setEpisodes([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Filter episodes by search query
  const filteredEpisodes = episodes.filter(episode => {
    if (!searchQuery) return true;
    return episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           episode.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (episode.guest_name || '').toLowerCase().includes(searchQuery.toLowerCase());
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
        await podcastsApi.updatePodcast(editingEpisode._id || editingEpisode.id, episodeData);
        showSuccess('Podcast episode updated successfully!');
      } else {
        await podcastsApi.createPodcast(episodeData);
        showSuccess('Podcast episode created successfully!');
      }
      
      await loadPodcasts();
      setShowEpisodeForm(false);
      setEditingEpisode(null);
    } catch (error: any) {
      console.error('Error saving podcast episode:', error);
      if (editingEpisode) {
        showError('Error updating podcast episode');
      } else {
        showError('Error creating podcast episode');
      }
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
      await podcastsApi.deletePodcast(deletingEpisode._id || deletingEpisode.id);
      showSuccess('Podcast episode deleted successfully!');
      await loadPodcasts();
    } catch (error: any) {
      console.error('Error deleting podcast episode:', error);
      showError('Error deleting podcast episode');
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
            Podcast Management
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage Library Talk podcast episodes and content
          </p>
        </div>
        <button 
          onClick={handleNewEpisode}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1"
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
            <div className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-lg">
              <Mic className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Plays
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {episodes.reduce((total, episode) => {
                  const playsStr = episode.plays?.toString() || '0';
                  const plays = parseInt(playsStr.replace(/[K,]/g, '')) || 0;
                  return total + (playsStr.includes('K') ? plays * 1000 : plays);
                }, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-lg">
              <Headphones className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Downloads
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {episodes.reduce((total, episode) => {
                  const downloadsStr = episode.downloads?.toString() || '0';
                  const downloads = parseInt(downloadsStr.replace(/[K,]/g, '')) || 0;
                  return total + (downloadsStr.includes('K') ? downloads * 1000 : downloads);
                }, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 p-2 rounded-lg">
              <Download className="w-4 h-4" />
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
              className={`w-full pl-7 pr-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xs ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
          </select>

          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className={`px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xs ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Series</option>
            {series.map(s => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className={`ml-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading podcast episodes...
          </span>
        </div>
      )}

      {/* Episodes List */}
      {!loading && (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredEpisodes.map((episode) => {
            const episodeId = episode._id || episode.id;
            return (
            <div key={episodeId} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer" onClick={() => navigate(`/admin/podcast/${episodeId}`)}>
              <div className="flex items-start space-x-4">
                {/* Episode Image */}
                <div className="flex-shrink-0 relative">
                  <img 
                    src={episode.image}
                    alt={episode.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Episode Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-bold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {episode.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(episode.status)}`}>
                          {getStatusIcon(episode.status)}
                          <span className="capitalize">{episode.status}</span>
                        </span>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            with {episode.guest_name || episode.guest || 'Guest'}
                          </span>
                        </div>
                        {episode.podcast_series && (
                          <span className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded text-xs">
                            {episode.podcast_series.title}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-2 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {episode.description}
                      </p>
                    </div>

                    {/* Episode Stats */}
                    <div className="flex items-center space-x-4 ml-4">
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {episode.plays}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          plays
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {episode.downloads}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          downloads
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {episode.duration}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          duration
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {new Date(episode.publish_date || episode.createdAt).toLocaleDateString()}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          published
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {episode.rating}
                        </span>
                      </div>

                      {/* Actions */}
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
              </div>
            </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Episode Form Modal */}
      {showEpisodeForm && (
        <PodcastForm
          isDarkMode={isDarkMode}
          onClose={() => {
            setShowEpisodeForm(false);
            setEditingEpisode(null);
          }}
          onSave={handleSaveEpisode}
          initialData={editingEpisode}
          mode={editingEpisode ? 'edit' : 'create'}
          guests={guests}
          series={series}
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
                This will permanently remove the podcast episode and all its data.
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