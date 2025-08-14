import React, { useState } from 'react';
import PodcastForm from './PodcastForm';
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
import { useData } from '../../../contexts/DataContext';

interface PodcastManagementProps {
  isDarkMode: boolean;
}

export default function PodcastManagement({ isDarkMode }: PodcastManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  // Fetch episodes, guests, and series
  React.useEffect(() => {
    // Use dummy data instead of database calls
    setEpisodes(defaultEpisodes);
    setGuests([
      { id: '1', full_name: 'Dr. Kwame Asante', title: 'AI in Education Researcher', organization: 'University of Ghana' },
      { id: '2', full_name: 'Prof. Amina Hassan', title: 'Inclusive Education Specialist', organization: 'Cairo University' }
    ]);
    setSeries([
      { id: '1', title: 'Library Talk: Education Leaders' },
      { id: '2', title: 'Library Talk: Student Voices' }
    ]);
    setIsLoading(false);
  }, []);

  const defaultEpisodes = [
    {
      id: '1',
      title: 'The Future of Learning: AI in Education',
      guest: 'Dr. Kwame Asante',
      duration: '58 min',
      plays: '12.5K',
      downloads: '5.2K',
      publishDate: '2024-03-15',
      status: 'published',
      description: 'Join us for an in-depth conversation with leading AI researchers and educators as we explore how artificial intelligence is reshaping the educational landscape.',
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
      status: 'published',
      description: 'Exploring strategies for creating educational spaces that welcome and support all learners.',
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
      status: 'published',
      description: 'How narrative techniques can transform the way we teach and learn complex subjects.',
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
      status: 'draft',
      description: 'Addressing mental health challenges and support systems in educational institutions.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.7
    }
  ];

  const displayEpisodes = episodes.length > 0 ? episodes : defaultEpisodes;

  // Filter episodes
  const filteredEpisodes = displayEpisodes.filter(episode => {
    const matchesSearch = !searchQuery || 
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (episode.guest_profiles?.full_name || episode.guest || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || episode.status === selectedStatus;
    const matchesSeries = selectedSeries === 'all' || 
      (episode.podcast_series && episode.podcast_series.title === selectedSeries);
    
    return matchesSearch && matchesStatus && matchesSeries;
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
      setSaveMessage('Podcast episode saved successfully!');
      
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
                37.2K
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
                16.1K
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
                4.8
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
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
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

      {/* Episodes List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading episodes...</p>
        </div>
      ) : (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredEpisodes.map((episode) => (
            <div key={episode.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
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
                            with {episode.guest_profiles?.full_name || episode.guest}
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
                          {new Date(episode.publishDate).toLocaleDateString()}
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
              </div>
            </div>
          ))}
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
    </div>
  );
}