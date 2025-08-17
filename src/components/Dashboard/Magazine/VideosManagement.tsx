import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoForm from './VideoForm';
import { videosApi } from '../../../api/videos';
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
  Video,
  Upload,
  BarChart3
} from 'lucide-react';

interface VideosManagementProps {
  isDarkMode: boolean;
}

export default function VideosManagement({ isDarkMode }: VideosManagementProps) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingVideo, setDeletingVideo] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadVideos();
  }, [currentPage, selectedCategory, selectedStatus]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const response = await videosApi.getVideos({
        page: currentPage,
        limit: 10,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      });
      
      if (response.success) {
        setVideos(response.data || []);
        setTotalPages(response.pagination?.totalPages || 1);
      } else {
        setVideos([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
      showError('Error loading videos');
      setVideos([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

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

  // Filter videos by search query
  const filteredVideos = videos.filter(video => {
    if (!searchQuery) return true;
    return video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           video.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleNewVideo = () => {
    setEditingVideo(null);
    setShowVideoForm(true);
  };

  const handleEditVideo = (video: any) => {
    setEditingVideo(video);
    setShowVideoForm(true);
  };

  const handleSaveVideo = async (videoData: any) => {
    try {
      if (editingVideo) {
        await videosApi.updateVideo(editingVideo._id || editingVideo.id, videoData);
        showSuccess('Video updated successfully!');
      } else {
        await videosApi.createVideo(videoData);
        showSuccess('Video created successfully!');
      }
      
      await loadVideos();
      setShowVideoForm(false);
      setEditingVideo(null);
    } catch (error: any) {
      console.error('Error saving video:', error);
      // Show simple error message instead of full JSON
      if (editingVideo) {
        showError('Error updating video');
      } else {
        showError('Error creating video');
      }
    }
  };

  const handleDeleteClick = (video: any) => {
    setDeletingVideo(video);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingVideo) return;
    
    setLoading(true);
    
    try {
      await videosApi.deleteVideo(deletingVideo._id || deletingVideo.id);
      showSuccess('Video deleted successfully!');
      await loadVideos();
    } catch (error: any) {
      console.error('Error deleting video:', error);
      showError('Error deleting video');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeletingVideo(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletingVideo(null);
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
            Magazine Videos
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage videos that appear in the magazine videos section (4 videos max)
          </p>
        </div>
        <button 
          onClick={handleNewVideo}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1" 
          style={{ backgroundColor: '#F21717' }}
        >
          <Plus className="w-3 h-3" />
          <span>New Video</span>
        </button>
      </div>


      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Videos
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {videos.length}
              </p>
            </div>
            <div className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-2 rounded-lg">
              <Video className="w-4 h-4" />
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
                {videos.reduce((total, video) => {
                  const viewsStr = video.views?.toString() || '0';
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
                {videos.length > 0 ? (
                  (videos.reduce((total, video) => total + (video.rating || 0), 0) / videos.length).toFixed(1)
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
                {videos.filter(v => v.status === 'published').length}
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
              placeholder="Search videos..."
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
            Loading videos...
          </span>
        </div>
      )}

      {/* Videos Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredVideos.map((video) => {
            const videoId = video._id || video.id;
            return (
          <div key={videoId} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer`} onClick={() => navigate(`/admin/video/${videoId}`)}>
            {/* Video Thumbnail */}
            <div className="relative">
              <img 
                src={video.thumbnail || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={video.title}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x200?text=No+Image';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white" />
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(video.status)}`}>
                  {getStatusIcon(video.status)}
                  <span className="capitalize">{video.status}</span>
                </span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </div>

              {/* New Badge */}
              {video.is_new && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  NEW
                </div>
              )}
            </div>

            {/* Video Content */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded text-xs">
                  {video.category}
                </span>
                {video.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {video.rating}
                    </span>
                  </div>
                )}
              </div>

              <h3 className={`text-sm font-bold mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {video.title}
              </h3>

              <p className={`text-xs mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {video.description}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-gray-400" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{video.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {new Date(video.upload_date || video.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditVideo(video);
                    }}
                    className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(video);
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

      {/* Info Box */}
      <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border p-4`}>
        <div className="flex items-start space-x-3">
          <Video className="w-4 h-4 text-blue-600 mt-0.5" />
          <div>
            <h3 className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
              Magazine Videos Section
            </h3>
            <ul className={`text-xs mt-1 space-y-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              <li>• Maximum of 4 videos can be displayed in the magazine videos section</li>
              <li>• Videos appear in a grid layout on the magazine page</li>
              <li>• Only published videos are shown to visitors</li>
              <li>• Videos are displayed with play buttons and educational content branding</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Video Form Modal */}
      {showVideoForm && (
        <VideoForm
          isDarkMode={isDarkMode}
          onClose={() => {
            setShowVideoForm(false);
            setEditingVideo(null);
          }}
          onSave={handleSaveVideo}
          initialData={editingVideo}
          mode={editingVideo ? 'edit' : 'create'}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingVideo && (
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
                    Delete Video
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
                Are you sure you want to delete "<span className="font-medium">{deletingVideo.title}</span>"? 
                This will permanently remove the video and all its data.
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
                    <span>Delete Video</span>
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