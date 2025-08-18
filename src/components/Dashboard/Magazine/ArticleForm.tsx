import React, { useState } from 'react';
import { articlesApi } from '../../../api/articles';
import { useToast } from '../../../contexts/ToastContext';
import { 
  Save, 
  X, 
  Upload, 
  Eye, 
  FileText, 
  User, 
  Calendar, 
  Tag, 
  Image as ImageIcon,
  Clock,
  Globe,
  MessageSquare,
  Star,
  TrendingUp,
  Plus
} from 'lucide-react';

interface ArticleFormProps {
  isDarkMode: boolean;
  onClose: () => void;
  onSave: (articleData: any) => void;
  initialData?: any;
  mode?: 'create' | 'edit';
}

export default function ArticleForm({ isDarkMode, onClose, onSave, initialData, mode = 'create' }: ArticleFormProps) {
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.categoryName || initialData?.category || 'Tech Trends',
    author: initialData?.author || '',
    authorBio: initialData?.authorBio || '',
    publishDate: initialData?.publishDate ? new Date(initialData.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    readTime: initialData?.readTime || '',
    tags: initialData?.tags || '',
    featuredImage: initialData?.featuredImage || '',
    featuredImageAlt: initialData?.featuredImageAlt || '',
    additionalImages: initialData?.additionalImages || [],
    metaDescription: initialData?.metaDescription || '',
    status: initialData?.status || 'published',
    allowComments: initialData?.allowComments !== undefined ? initialData.allowComments : true,
    featured: initialData?.featured || false,
    trending: initialData?.trending || false,
    editorsPick: initialData?.editorsPick || false
  });

  const [activeTab, setActiveTab] = useState('content');
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.featuredImage.trim()) {
      newErrors.featuredImage = 'Featured image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status: string = 'published') => {
    if (!validateForm()) {
      showError('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    const articleData = {
      title: formData.title,
      subtitle: formData.subtitle,
      excerpt: formData.excerpt,
      content: formData.content,
      category_name: formData.category,
      author: formData.author,
      author_bio: formData.authorBio,
      tags: formData.tags,
      featured_image: formData.featuredImage,
      featured_image_alt: formData.featuredImageAlt,
      additional_images: formData.additionalImages,
      meta_description: formData.metaDescription,
      read_time: formData.readTime,
      allow_comments: formData.allowComments,
      featured: formData.featured,
      trending: formData.trending,
      editors_pick: formData.editorsPick,
      status,
      publish_date: formData.publishDate
    };
    
    try {
      let response;
      if (mode === 'edit' && initialData?._id) {
        response = await articlesApi.updateArticle(initialData._id, articleData);
        showSuccess('Article updated successfully!', 'Your changes have been saved.');
      } else {
        response = await articlesApi.createArticle(articleData);
        showSuccess('Article created successfully!', 'Your article has been published.');
      }
      onSave(response.data);
    } catch (error: any) {
      console.error('Article save error:', error);
      
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
                  'featured_image': 'featuredImage',
                  'category_name': 'category',
                  'author': 'author',
                  'title': 'title',
                  'excerpt': 'excerpt',
                  'content': 'content'
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
      let cleanErrorMessage = 'Failed to save article. Please try again.';
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

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Auto-calculate read time when content changes
  React.useEffect(() => {
    if (formData.content) {
      const estimatedTime = estimateReadTime(formData.content);
      if (formData.readTime !== estimatedTime) {
        handleInputChange('readTime', estimatedTime);
      }
    }
  }, [formData.content]);

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'gallery', label: 'Image Gallery', icon: ImageIcon },
    { id: 'seo', label: 'SEO & Meta', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Tag }
  ];

  const addImage = () => {
    if (newImageUrl.trim()) {
      const newImage = {
        id: Date.now().toString(),
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || 'Article image',
        caption: newImageCaption.trim()
      };
      
      handleInputChange('additionalImages', [...formData.additionalImages, newImage]);
      setNewImageUrl('');
      setNewImageAlt('');
      setNewImageCaption('');
    }
  };

  const removeImage = (imageId: string) => {
    handleInputChange('additionalImages', formData.additionalImages.filter(img => img.id !== imageId));
  };

  const insertImageIntoContent = (imageUrl: string, alt: string, caption: string) => {
    const imageMarkdown = caption 
      ? `![${alt}](${imageUrl})\n*${caption}*\n\n`
      : `![${alt}](${imageUrl})\n\n`;
    
    const newContent = formData.content + imageMarkdown;
    handleInputChange('content', newContent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-red-600" style={{ color: '#F21717' }} />
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {mode === 'create' ? 'Create New Article' : 'Edit Article'}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Fill in the details to create a compelling article
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
              {/* Article Preview */}
              <div className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-xl p-6 border`}>
                <div className="mb-4">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
                    {formData.category}
                  </span>
                </div>
                <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formData.title || 'Article Title'}
                </h1>
                {formData.subtitle && (
                  <h2 className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formData.subtitle}
                  </h2>
                )}
                <div className="flex items-center space-x-4 mb-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span>{formData.author || 'Author Name'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{new Date(formData.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span>{formData.readTime}</span>
                  </div>
                </div>
                {formData.featuredImage && (
                  <img 
                    src={formData.featuredImage} 
                    alt={formData.featuredImageAlt}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formData.excerpt}
                </p>
                <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                  <div className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {formData.content.split('\n\n').map((paragraph, index) => {
                      // Check if paragraph is an image markdown
                      const imageMatch = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                      if (imageMatch) {
                        const [, alt, src] = imageMatch;
                        const captionMatch = paragraph.match(/\*(.+?)\*/);
                        const caption = captionMatch ? captionMatch[1] : '';
                        
                        return (
                          <div key={index} className="mb-6">
                            <img 
                              src={src} 
                              alt={alt}
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                            {caption && (
                              <p className={`text-xs mt-2 text-center italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {caption}
                              </p>
                            )}
                          </div>
                        );
                      }
                      
                      return <p key={index} className="mb-4">{paragraph}</p>;
                    })}
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
                        Article Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter compelling article title"
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

                    {/* Subtitle */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => handleInputChange('subtitle', e.target.value)}
                        placeholder="Optional subtitle for additional context"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Excerpt *
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Brief summary that appears in article listings"
                        rows={3}
                        maxLength={500}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm resize-none ${
                          errors.excerpt 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'focus:ring-red-500'
                        } ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <div>
                          {errors.excerpt && (
                            <p className="text-xs text-red-600">{errors.excerpt}</p>
                          )}
                        </div>
                        <p className={`text-xs ${
                          formData.excerpt.length > 500 
                            ? 'text-red-600' 
                            : formData.excerpt.length > 450 
                              ? 'text-yellow-600' 
                              : isDarkMode 
                                ? 'text-gray-400' 
                                : 'text-gray-500'
                        }`}>
                          {formData.excerpt.length}/500 characters
                        </p>
                      </div>
                    </div>

                    {/* Category & Author */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.category 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'focus:ring-red-500'
                          } ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="text-xs text-red-600 mt-1">{errors.category}</p>
                        )}
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Author *
                        </label>
                        <input
                          type="text"
                          value={formData.author}
                          onChange={(e) => handleInputChange('author', e.target.value)}
                          placeholder="Author name"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.author 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'focus:ring-red-500'
                          } ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                        {errors.author && (
                          <p className="text-xs text-red-600 mt-1">{errors.author}</p>
                        )}
                      </div>
                    </div>

                    {/* Author Bio */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Author Bio
                      </label>
                      <input
                        type="text"
                        value={formData.authorBio}
                        onChange={(e) => handleInputChange('authorBio', e.target.value)}
                        placeholder="Brief author description"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Content */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Article Content *
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="Write your article content here..."
                        rows={12}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm resize-none ${
                          errors.content 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'focus:ring-red-500'
                        } ${
                          isDarkMode 
                            ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {errors.content && (
                        <p className="text-xs text-red-600 mt-1">{errors.content}</p>
                      )}
                    </div>

                    {/* Publish Date & Read Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Publish Date
                        </label>
                        <input
                          type="date"
                          value={formData.publishDate}
                          onChange={(e) => handleInputChange('publishDate', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={formData.readTime}
                          onChange={(e) => handleInputChange('readTime', e.target.value)}
                          placeholder="Auto-calculated"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
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
                        placeholder="Comma-separated tags (e.g., AI, Education, Technology)"
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
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Featured Image */}
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Featured Image URL *
                        </label>
                        <input
                          type="url"
                          value={formData.featuredImage}
                          onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.featuredImage 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'focus:ring-red-500'
                          } ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                        {errors.featuredImage && (
                          <p className="text-xs text-red-600 mt-1">{errors.featuredImage}</p>
                        )}
                      </div>

                      {/* Image Alt Text */}
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Image Alt Text
                        </label>
                        <input
                          type="text"
                          value={formData.featuredImageAlt}
                          onChange={(e) => handleInputChange('featuredImageAlt', e.target.value)}
                          placeholder="Describe the image for accessibility"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            errors.featuredImageAlt 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'focus:ring-red-500'
                          } ${
                            isDarkMode 
                              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                        {errors.featuredImageAlt && (
                          <p className="text-xs text-red-600 mt-1">{errors.featuredImageAlt}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      {/* Image Preview */}
                      {formData.featuredImage && (
                        <div>
                          <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Image Preview
                          </label>
                          <div className="border rounded-lg overflow-hidden">
                            <img 
                              src={formData.featuredImage} 
                              alt={formData.featuredImageAlt}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Image Gallery Tab */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Add New Image */}
                  <div className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg p-4 border`}>
                    <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Add New Image
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Image URL *
                        </label>
                        <input
                          type="url"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={newImageAlt}
                          onChange={(e) => setNewImageAlt(e.target.value)}
                          placeholder="Describe the image"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Caption (Optional)
                        </label>
                        <input
                          type="text"
                          value={newImageCaption}
                          onChange={(e) => setNewImageCaption(e.target.value)}
                          placeholder="Image caption"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Images will be available to insert into your article content
                      </p>
                      <button
                        type="button"
                        onClick={addImage}
                        disabled={!newImageUrl.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Image</span>
                      </button>
                    </div>
                  </div>

                  {/* Image Gallery */}
                  {formData.additionalImages.length > 0 && (
                    <div>
                      <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Image Gallery ({formData.additionalImages.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {formData.additionalImages.map((image) => (
                          <div key={image.id} className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
                            <div className="relative">
                              <img 
                                src={image.url} 
                                alt={image.alt}
                                className="w-full h-32 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                                }}
                              />
                              <button
                                onClick={() => removeImage(image.id)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="p-3">
                              <p className={`text-xs font-medium mb-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {image.alt}
                              </p>
                              {image.caption && (
                                <p className={`text-xs mb-2 line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {image.caption}
                                </p>
                              )}
                              <button
                                onClick={() => insertImageIntoContent(image.url, image.alt, image.caption)}
                                className="w-full px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Insert into Article</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Usage Instructions */}
                  <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border p-4`}>
                    <div className="flex items-start space-x-3">
                      <ImageIcon className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                          How to Use Images
                        </h3>
                        <ul className={`text-xs mt-1 space-y-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          <li>• Add images to your gallery using the form above</li>
                          <li>• Click "Insert into Article" to add the image to your content</li>
                          <li>• Images will appear in the article preview and final published article</li>
                          <li>• You can add captions that will appear below the images</li>
                        </ul>
                      </div>
                    </div>
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
                      placeholder="Brief description for search engines (150-160 characters)"
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
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Status */}
                      <div>
                        <label className={`block text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Publication Status
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

                      {/* Checkboxes */}
                      <div className="space-y-3">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.allowComments}
                            onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Allow Comments
                          </span>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => handleInputChange('featured', e.target.checked)}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Featured Article
                          </span>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.trending}
                            onChange={(e) => handleInputChange('trending', e.target.checked)}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Trending Article
                          </span>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.editorsPick}
                            onChange={(e) => handleInputChange('editorsPick', e.target.checked)}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Editor's Pick
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Article Stats Preview */}
                      <div className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg p-4 border`}>
                        <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Article Preview Stats
                        </h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Word Count:</span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{formData.content.split(' ').length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Character Count:</span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{formData.content.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Estimated Read Time:</span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{estimateReadTime(formData.content)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
              <span>{isSubmitting ? 'Publishing...' : mode === 'edit' ? 'Update Article' : 'Publish Article'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}