import React, { useState } from 'react';
import { 
  Save, 
  X, 
  Upload, 
  Eye, 
  Tv, 
  User, 
  Calendar, 
  Tag, 
  Image as ImageIcon,
  Clock,
  Globe,
  Star,
  TrendingUp,
  Play,
  Youtube
} from 'lucide-react';
import { db } from '../../../lib/supabase';

interface TVShowFormProps {
  isDarkMode: boolean;
  onClose: () => void;
  onSave: (episodeData: any) => void;
  initialData?: any;
  mode?: 'create' | 'edit';
  seasons: any[];
}

export default function TVShowForm({ isDarkMode, onClose, onSave, initialData, mode = 'create', seasons }: TVShowFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    duration: initialData?.duration || '',
    category: initialData?.category || 'Full Episodes',
    section: initialData?.section || 'FullEpisodes',
    seasonId: initialData?.season_id || '',
    episodeNumber: initialData?.episode_number || '',
    thumbnail: initialData?.thumbnail || '',
    youtubeUrl: initialData?.youtube_url || '',
    tags: initialData?.tags || '',
    metaDescription: initialData?.meta_description || '',
    status: initialData?.status || 'published',
    featured: initialData?.featured || false,
    isNew: initialData?.is_new || false,
    rating: initialData?.rating || 0,
    uploadDate: initialData?.upload_date ? new Date(initialData.upload_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  const [activeTab, setActiveTab] = useState('content');
  const [previewMode, setPreviewMode] = useState(false);

  const categories = ['Full Episodes', 'Mind Battles', 'Pitch Perfect', 'Insight Stories', 'Behind Insight'];
  const sections = [
    { value: 'FullEpisodes', label: 'Full Episodes' },
    { value: 'MindBattles', label: 'Mind Battles' },
    { value: 'PitchPerfect', label: 'Pitch Perfect' },
    { value: 'InsightStories', label: 'Insight Stories' },
    { value: 'BehindInsight', label: 'Behind Insight' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (status: string) => {
      const episodeData = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        category: formData.category,
        section: formData.section,
        season_id: formData.seasonId || null,
        episode_number: formData.episodeNumber ? parseInt(formData.episodeNumber) : null,
        thumbnail: formData.thumbnail,
        youtube_url: formData.youtubeUrl,
        tags: formData.tags,
        meta_description: formData.metaDescription,
        featured: formData.featured,
        is_new: formData.isNew,
        rating: parseFloat(formData.rating.toString()),
        status,
        upload_date: formData.uploadDate,
        updated_at: new Date().toISOString(),
        id: initialData?.id || Date.now().toString()
      };

      onSave(episodeData);
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: Tv },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'seo', label: 'SEO & Meta', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Tag }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <Tv className="w-5 h-5 text-red-600" style={{ color: '#F21717' }} />
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {mode === 'create' ? 'Create New Episode' : 'Edit Episode'}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Add a new episode to Project Insight TV Show
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
          <div className={`flex items-center space-x-1 p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : `${isDarkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`
                }`}
                style={activeTab === tab.id ? { backgroundColor: '#F21717' } : {}}
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
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    {formData.thumbnail && (
                      <div className="relative mb-4">
                        <img 
                          src={formData.thumbnail} 
                          alt={formData.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          {formData.duration}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
                        {formData.category}
                      </span>
                    </div>
                    <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formData.title || 'Episode Title'}
                    </h1>
                    <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {formData.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{new Date(formData.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{formData.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{formData.rating}</span>
                      </div>
                    </div>
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
                        Episode Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter episode title"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Episode description"
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    {/* Category & Section */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Section *
                        </label>
                        <select
                          value={formData.section}
                          onChange={(e) => handleInputChange('section', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {sections.map(section => (
                            <option key={section.value} value={section.value}>{section.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Season & Episode Number */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Season
                        </label>
                        <select
                          value={formData.seasonId}
                          onChange={(e) => handleInputChange('seasonId', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="">No Season</option>
                          {seasons.map(season => (
                            <option key={season.id} value={season.id}>
                              Season {season.season_number}: {season.title}
                            </option>
                          ))}
                        </select>
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
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Duration & Rating */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Duration *
                        </label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          placeholder="25:30"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Rating
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={formData.rating}
                          onChange={(e) => handleInputChange('rating', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* YouTube URL */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        YouTube URL *
                      </label>
                      <input
                        type="url"
                        value={formData.youtubeUrl}
                        onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    {/* Upload Date */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Upload Date
                      </label>
                      <input
                        type="date"
                        value={formData.uploadDate}
                        onChange={(e) => handleInputChange('uploadDate', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
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
                        placeholder="education, innovation, technology"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Thumbnail URL *
                    </label>
                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                      placeholder="https://example.com/thumbnail.jpg"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  {formData.thumbnail && (
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Thumbnail Preview
                      </label>
                      <img 
                        src={formData.thumbnail} 
                        alt="Thumbnail preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    </div>
                  )}
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
                      maxLength={160}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formData.metaDescription.length}/160 characters
                    </p>
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
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
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Featured Episode
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={(e) => handleInputChange('isNew', e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Mark as New
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
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Status: 
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              formData.status === 'published' 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center justify-end">
            <button
              onClick={() => handleSave('published')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
              style={{ backgroundColor: '#F21717' }}
            >
              <Save className="w-3 h-3" />
              <span>Save Episode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}