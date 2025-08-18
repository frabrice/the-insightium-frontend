import React, { useState } from 'react';
import { 
  Save, 
  X, 
  Upload, 
  Eye, 
  Video, 
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
import { useToast } from '../../../contexts/ToastContext';

interface VideoFormProps {
  isDarkMode: boolean;
  onClose: () => void;
  onSave: (videoData: any) => void;
  initialData?: any;
  mode?: 'create' | 'edit';
}

export default function VideoForm({ isDarkMode, onClose, onSave, initialData, mode = 'create' }: VideoFormProps) {
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    duration: initialData?.duration || '',
    category: initialData?.category || 'Tech Trends',
    section: 'Magazine', // Fixed to Magazine for this form
    thumbnail: initialData?.thumbnail || '',
    youtubeUrl: initialData?.youtubeUrl || '',
    tags: initialData?.tags || '',
    metaDescription: initialData?.metaDescription || '',
    status: initialData?.status || 'published',
    isNew: initialData?.isNew || false,
    rating: initialData?.rating || 0,
    uploadDate: initialData?.uploadDate ? new Date(initialData.uploadDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  const [activeTab, setActiveTab] = useState('content');
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const videoData = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        category: formData.category,
        section: formData.section,
        thumbnail: formData.thumbnail,
        youtube_url: formData.youtubeUrl,
        tags: formData.tags,
        meta_description: formData.metaDescription,
        is_new: formData.isNew,
        rating: parseFloat(formData.rating.toString()),
        status,
        upload_date: formData.uploadDate,
        updated_at: new Date().toISOString()
      };

      await onSave({ ...videoData, id: initialData?.id || Date.now().toString() });
    } catch (error: any) {
      console.error('Video save error:', error);
      
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
                  'thumbnail': 'thumbnail',
                  'youtube_url': 'youtubeUrl',
                  'title': 'title',
                  'description': 'description',
                  'duration': 'duration'
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
      let cleanErrorMessage = 'Failed to save video. Please try again.';
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
    { id: 'content', label: 'Content', icon: Video },
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
            <Video className="w-5 h-5 text-red-600" style={{ color: '#F21717' }} />
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {mode === 'create' ? 'Create New Video' : 'Edit Video'}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Add a new video to the magazine videos section
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
                        {/* Educational Content Overlay */}
                        <div className="absolute top-3 left-3 right-3">
                          <div className="text-white">
                            <div className="text-sm font-bold tracking-wider">THE INSIGHTIUM</div>
                            <div className="text-xs opacity-90">EDUCATIONAL CONTENT</div>
                          </div>
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
                      {formData.title || 'Video Title'}
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
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter video title"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                          errors.title 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'focus:ring-red-500'
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
                        placeholder="Video description"
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm resize-none ${
                          errors.description 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'focus:ring-red-500'
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

                    {/* Category */}
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

                    {/* Duration & Rating */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Duration
                        </label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          placeholder="25:30"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.duration 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'focus:ring-red-500'
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
                  </div>

                  <div className="space-y-4">
                    {/* YouTube URL */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        YouTube URL
                      </label>
                      <input
                        type="url"
                        value={formData.youtubeUrl}
                        onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                          errors.youtubeUrl 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'focus:ring-red-500'
                        } ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {errors.youtubeUrl && (
                        <p className="text-xs text-red-600 mt-1">{errors.youtubeUrl}</p>
                      )}
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

                    {/* Section Info */}
                    <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border p-3`}>
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-blue-600" />
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                          Magazine Section Video
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        This video will appear in the magazine videos section (max 4 videos)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                      placeholder="https://example.com/thumbnail.jpg"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                        errors.thumbnail 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'focus:ring-red-500'
                      } ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    {errors.thumbnail && (
                      <p className="text-xs text-red-600 mt-1">{errors.thumbnail}</p>
                    )}
                  </div>

                  {formData.thumbnail && (
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Thumbnail Preview
                      </label>
                      <div className="relative">
                        <img 
                          src={formData.thumbnail} 
                          alt="Thumbnail preview"
                          className="w-full max-w-md h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                        {/* Preview overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute top-3 left-3 right-3">
                          <div className="text-white">
                            <div className="text-sm font-bold tracking-wider">THE INSIGHTIUM</div>
                            <div className="text-xs opacity-90">EDUCATIONAL CONTENT</div>
                          </div>
                        </div>
                      </div>
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
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors flex items-center space-x-1 disabled:opacity-50"
              style={{ backgroundColor: '#F21717' }}
            >
              <Save className="w-3 h-3" />
              <span>{isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Video' : 'Save Video'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}