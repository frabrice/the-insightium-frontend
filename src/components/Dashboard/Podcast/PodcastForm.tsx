import React, { useState } from 'react';
import { 
  Save, 
  X, 
  Upload, 
  Eye, 
  Mic, 
  User, 
  Calendar, 
  Tag, 
  Image as ImageIcon,
  Clock,
  Globe,
  Star,
  TrendingUp,
  Play,
  Youtube,
  Music,
  Headphones,
  Plus
} from 'lucide-react';
import { useToast } from '../../../contexts/ToastContext';

interface PodcastFormProps {
  isDarkMode: boolean;
  onClose: () => void;
  onSave: (episodeData: any) => void;
  initialData?: any;
  mode?: 'create' | 'edit';
  guests: any[];
  series: any[];
}

export default function PodcastForm({ isDarkMode, onClose, onSave, initialData, mode = 'create', guests, series }: PodcastFormProps) {
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    duration: initialData?.duration || '',
    guestName: initialData?.guest_name || initialData?.guest || '',
    seriesId: initialData?.series_id || '',
    episodeNumber: initialData?.episode_number || '',
    image: initialData?.image || '',
    youtubeUrl: initialData?.youtube_url || '',
    spotifyUrl: initialData?.spotify_url || '',
    appleUrl: initialData?.apple_url || '',
    googleUrl: initialData?.google_url || '',
    transcript: initialData?.transcript || '',
    tags: initialData?.tags || '',
    metaDescription: initialData?.meta_description || '',
    status: initialData?.status || 'published',
    featured: initialData?.featured || false,
    publishDate: initialData?.publish_date ? new Date(initialData.publish_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  const [activeTab, setActiveTab] = useState('content');
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (status: string) => {
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const episodeData = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        guest_name: formData.guestName,
        series_id: formData.seriesId || null,
        episode_number: formData.episodeNumber ? parseInt(formData.episodeNumber) : null,
        image: formData.image,
        youtube_url: formData.youtubeUrl,
        spotify_url: formData.spotifyUrl,
        apple_url: formData.appleUrl,
        google_url: formData.googleUrl,
        transcript: formData.transcript,
        tags: formData.tags,
        meta_description: formData.metaDescription,
        featured: formData.featured,
        status,
        publish_date: formData.publishDate,
        updated_at: new Date().toISOString(),
        id: initialData?.id || Date.now().toString()
      };

      await onSave(episodeData);
    } catch (error: any) {
      console.error('Episode save error:', error);
      
      // Handle validation errors from backend
      if (error.message && (error.message.includes('validation error') || error.message.includes('Validation error'))) {
        try {
          // Try to parse the error message as JSON
          let errorResponse;
          if (typeof error.message === 'string' && error.message.startsWith('{')) {
            errorResponse = JSON.parse(error.message);
          } else if (error.response?.data) {
            errorResponse = error.response.data;
          } else if (error.data) {
            errorResponse = error.data;
          }
          
          if (errorResponse && errorResponse.errors && Array.isArray(errorResponse.errors)) {
            const fieldErrors: {[key: string]: string} = {};
            let validationMessages: string[] = [];
            
            errorResponse.errors.forEach((err: any) => {
              if (err.path && err.msg) {
                // Map backend field names to frontend field names
                const fieldMap: {[key: string]: string} = {
                  'title': 'title',
                  'description': 'description',
                  'duration': 'duration',
                  'image': 'image',
                  'guest_name': 'guestName',
                  'episode_number': 'episodeNumber',
                  'youtube_url': 'youtubeUrl',
                  'spotify_url': 'spotifyUrl',
                  'apple_url': 'appleUrl',
                  'google_url': 'googleUrl',
                  'transcript': 'transcript',
                  'tags': 'tags',
                  'meta_description': 'metaDescription'
                };
                
                const frontendField = fieldMap[err.path] || err.path;
                fieldErrors[frontendField] = err.msg;
                validationMessages.push(err.msg);
              }
            });
            
            if (validationMessages.length > 0) {
              setErrors(fieldErrors);
              // Show the first validation error message instead of generic message
              showError('Validation Error', validationMessages[0]);
              return;
            }
          }
        } catch (parseError) {
          console.error('Error parsing validation response:', parseError);
        }
      }
      
      // Clean up error message - don't show raw JSON
      let cleanErrorMessage = 'Failed to save episode. Please try again.';
      if (error.message && typeof error.message === 'string') {
        // If it's not JSON, use the message directly
        if (!error.message.startsWith('{') && !error.message.includes('validation error')) {
          cleanErrorMessage = error.message;
        }
      }
      
      setErrors({ general: cleanErrorMessage });
      showError('Save Failed', cleanErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: Mic },
    { id: 'guest', label: 'Guest', icon: User },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'platforms', label: 'Platforms', icon: Music },
    { id: 'seo', label: 'SEO & Meta', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Tag }
  ];


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <Mic className="w-5 h-5 text-green-600" />
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {mode === 'create' ? 'Create New Episode' : 'Edit Episode'}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Add a new episode to Library Talk podcast
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                previewMode 
                  ? 'bg-blue-600 text-white' 
                  : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {!previewMode && (
          <div className={`flex items-center space-x-1 p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-x-auto`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : `${isDarkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`
                }`}
              >
                <tab.icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {previewMode ? (
            /* Preview Mode */
            <div className="space-y-6">
              <div className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-xl p-6 border`}>
                <div className="flex items-center space-x-6">
                  {formData.image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={formData.image} 
                        alt={formData.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                        EP {formData.episodeNumber || '1'}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {formData.duration}
                      </span>
                    </div>
                    <h1 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formData.title || 'Episode Title'}
                    </h1>
                    {formData.guestName && (
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          with {formData.guestName}
                        </span>
                      </div>
                    )}
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {formData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Form Mode */
            <div className="space-y-6">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Episode Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter episode title"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                          errors.title 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'focus:ring-green-500'
                        } ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {errors.title && (
                        <p className="text-xs text-red-600 mt-1">{errors.title}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Episode description"
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm resize-none ${
                          errors.description 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'focus:ring-green-500'
                        } ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {errors.description && (
                        <p className="text-xs text-red-600 mt-1">{errors.description}</p>
                      )}
                    </div>

                    {/* Duration & Episode Number */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Duration
                        </label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          placeholder="58 min"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.duration 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'focus:ring-green-500'
                          } ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                        {errors.duration && (
                          <p className="text-xs text-red-600 mt-1">{errors.duration}</p>
                        )}
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Episode Number
                        </label>
                        <input
                          type="number"
                          value={formData.episodeNumber}
                          onChange={(e) => handleInputChange('episodeNumber', e.target.value)}
                          placeholder="1"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.episodeNumber 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'focus:ring-green-500'
                          } ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                        {errors.episodeNumber && (
                          <p className="text-xs text-red-600 mt-1">{errors.episodeNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Series */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Podcast Series
                      </label>
                      <select
                        value={formData.seriesId}
                        onChange={(e) => handleInputChange('seriesId', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="">No Series</option>
                        {series.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Publish Date */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Publish Date
                      </label>
                      <input
                        type="date"
                        value={formData.publishDate}
                        onChange={(e) => handleInputChange('publishDate', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Tags
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="education, AI, innovation"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    {/* Transcript */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Transcript (Optional)
                      </label>
                      <textarea
                        value={formData.transcript}
                        onChange={(e) => handleInputChange('transcript', e.target.value)}
                        placeholder="Episode transcript..."
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Guest Tab */}
              {activeTab === 'guest' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Guest Name
                    </label>
                    <input
                      type="text"
                      value={formData.guestName}
                      onChange={(e) => handleInputChange('guestName', e.target.value)}
                      placeholder="Enter guest name"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                  
                  <div className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border p-4`}>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Enter the name of your podcast guest. This will be displayed on the episode listing.
                    </p>
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Episode Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="https://example.com/cover.jpg"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                        errors.image 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'focus:ring-green-500'
                      } ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    {errors.image && (
                      <p className="text-xs text-red-600 mt-1">{errors.image}</p>
                    )}
                  </div>

                  {formData.image && (
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Cover Image Preview
                      </label>
                      <img 
                        src={formData.image} 
                        alt="Cover preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Platforms Tab */}
              {activeTab === 'platforms' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={formData.youtubeUrl}
                      onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Spotify URL
                    </label>
                    <input
                      type="url"
                      value={formData.spotifyUrl}
                      onChange={(e) => handleInputChange('spotifyUrl', e.target.value)}
                      placeholder="https://open.spotify.com/episode/..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Apple Podcasts URL
                    </label>
                    <input
                      type="url"
                      value={formData.appleUrl}
                      onChange={(e) => handleInputChange('appleUrl', e.target.value)}
                      placeholder="https://podcasts.apple.com/episode/..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Google Podcasts URL
                    </label>
                    <input
                      type="url"
                      value={formData.googleUrl}
                      onChange={(e) => handleInputChange('googleUrl', e.target.value)}
                      placeholder="https://podcasts.google.com/episode/..."
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                      placeholder="Brief description for search engines"
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm resize-none ${
                        errors.metaDescription 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'focus:ring-green-500'
                      } ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    {errors.metaDescription && (
                      <p className="text-xs text-red-600 mt-1">{errors.metaDescription}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Featured Episode
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            {errors.general && (
              <span className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                {errors.general}
              </span>
            )}
            {!errors.general && (
              <>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Status: 
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  formData.status === 'published' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                    : formData.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg text-xs font-medium transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave('published')}
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <Save className="w-3 h-3" />
              <span>{isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Episode' : 'Save Episode'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}