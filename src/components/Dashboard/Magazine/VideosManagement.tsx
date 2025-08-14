import React, { useState } from 'react';
import VideoForm from './VideoForm';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [saveMessage, setSaveMessage] = useState('');

  // Magazine videos data (4 videos for the magazine section)
  const magazineVideos = [
    {
      id: 'v1',
      title: "The Future of Education in Africa",
      description: "A comprehensive look at educational transformation across the continent",
      duration: "25:30",
      views: "125K",
      uploadDate: "2024-03-15",
      status: 'published',
      category: "Tech Trends",
      section: "Magazine",
      rating: 4.8,
      isNew: true,
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      youtubeUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: 'v2',
      title: "Digital Learning Revolution",
      description: "How technology is reshaping classrooms worldwide",
      duration: "18:45",
      views: "98K",
      uploadDate: "2024-03-12",
      status: 'published',
      category: "Tech Trends",
      section: "Magazine",
      rating: 4.6,
      isNew: false,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      youtubeUrl: "https://youtube.com/watch?v=example2"
    },
    {
      id: 'v3',
      title: "Women in STEM Education",
      description: "Inspiring stories of female leaders in science and technology education",
      duration: "22:15",
      views: "87K",
      uploadDate: "2024-03-10",
      status: 'published',
      category: "Career Campus",
      section: "Magazine",
      rating: 4.9,
      isNew: false,
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      youtubeUrl: "https://youtube.com/watch?v=example3"
    },
    {
      id: 'v4',
      title: "Innovation in Rural Schools",
      description: "Creative solutions for educational challenges in remote areas",
      duration: "20:30",
      views: "76K",
      uploadDate: "2024-03-08",
      status: 'published',
      category: "Spirit of Africa",
      section: "Magazine",
      rating: 4.7,
      isNew: false,
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      youtubeUrl: "https://youtube.com/watch?v=example4"
    }
  ];

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

  // Filter videos
  const filteredVideos = magazineVideos.filter(video => {
    const matchesSearch = !searchQuery || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
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
      console.log('Video saved successfully:', videoData);
      setSaveMessage('Video saved successfully!');
      
      // In a real app, this would update the videos list
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error saving video:', error);
      setSaveMessage('Error saving video. Please try again.');
    }
    
    setShowVideoForm(false);
    setEditingVideo(null);
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
                Total Videos
              </p>
              <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {magazineVideos.length}/4
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
                386K
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
                {magazineVideos.filter(v => v.status === 'published').length}
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
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredVideos.map((video) => (
          <div key={video.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300`}>
            {/* Video Thumbnail */}
            <div className="relative">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 object-cover"
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
              {video.isNew && (
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
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {video.rating}
                  </span>
                </div>
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
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Eye className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleEditVideo(video)}
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
    </div>
  );
}