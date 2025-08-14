import React from 'react';
import { BookOpen, TrendingUp, Users, Globe } from 'lucide-react';

interface HeroSectionProps {
  isDarkMode: boolean;
}

export default function HeroSection({ isDarkMode }: HeroSectionProps) {
  return (
    <section className={`py-20 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 via-white to-red-50'} overflow-hidden transition-colors`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-red-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-purple-500 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)', color: '#F21717' }}>
            <BookOpen className="w-4 h-4" />
            <span>The Insightium Magazine</span>
          </div>

          {/* Main Title */}
          <h1 className={`text-5xl lg:text-7xl font-bold leading-tight mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Stories That
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
              Shape Minds
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Dive into thought-provoking articles, cutting-edge research, and inspiring stories that are transforming education across Africa and beyond.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>247</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Articles Published</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2.4M</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>15</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Countries Reached</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>98%</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reader Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}