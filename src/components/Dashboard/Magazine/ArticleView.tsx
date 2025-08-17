import React from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Clock,
  Tag,
  Eye,
  MessageSquare,
  Star,
  TrendingUp
} from 'lucide-react';

interface ArticleViewProps {
  isDarkMode: boolean;
  article: any;
  onClose: () => void;
}

export default function ArticleView({ isDarkMode, article, onClose }: ArticleViewProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden`}>
        <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Article Preview
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              article.status === 'published' 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                : article.status === 'review'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {article.status}
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
              {article.categoryName || article.category}
            </span>
            {article.featured && (
              <span className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3" />
                Featured
              </span>
            )}
            {article.trending && (
              <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            )}
          </div>

          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {article.title}
          </h1>
          
          {article.subtitle && (
            <h2 className={`text-xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {article.subtitle}
            </h2>
          )}

          <div className="flex items-center space-x-4 mb-6 text-sm">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4 text-gray-400" />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {article.author}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {new Date(article.publishDate || article.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {article.readTime || 'N/A'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {article.views || 0} views
              </span>
            </div>
          </div>

          {article.authorBio && (
            <div className={`mb-6 p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className="font-medium">About the author:</span> {article.authorBio}
              </p>
            </div>
          )}

          {article.featuredImage && (
            <div className="mb-6">
              <img 
                src={article.featuredImage} 
                alt={article.featuredImageAlt || article.title}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                }}
              />
              {article.featuredImageAlt && (
                <p className={`text-xs mt-2 text-center italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {article.featuredImageAlt}
                </p>
              )}
            </div>
          )}

          <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
            <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Excerpt
            </h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {article.excerpt}
            </p>
          </div>

          <div className="mb-6">
            <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Content
            </h3>
            <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
              <div className={`leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {article.content}
              </div>
            </div>
          </div>

          {article.tags && (
            <div className="mb-6">
              <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.split(',').map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {article.metaDescription && (
            <div className={`mb-6 p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
              <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Meta Description
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {article.metaDescription}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Comments
                </span>
                <span className={`text-sm font-medium ${article.allowComments ? 'text-green-600' : 'text-red-600'}`}>
                  {article.allowComments ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Article ID
                </span>
                <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article._id || article.id}
                </span>
              </div>
            </div>
          </div>

          {article.additionalImages && article.additionalImages.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Additional Images ({article.additionalImages.length})
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {article.additionalImages.map((image: any, index: number) => (
                  <div key={image.id || index} className="space-y-2">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-40 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                    {image.caption && (
                      <p className={`text-xs italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {image.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>Created: {new Date(article.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(article.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}