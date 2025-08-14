import React, { useState, useRef, useEffect } from 'react';

interface CategoriesScrollBarProps {
  isDarkMode: boolean;
}

export default function CategoriesScrollBar({ isDarkMode }: CategoriesScrollBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Triple the categories for seamless loop
  const extendedCategories = [...categories, ...categories, ...categories];

  return (
    <div className={`py-2 sm:py-3 lg:py-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b overflow-hidden transition-colors`}>
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex space-x-3 sm:space-x-4 lg:space-x-6 xl:space-x-8 animate-scroll"
          style={{ width: 'fit-content' }}
        >
          {extendedCategories.map((category, index) => (
            <React.Fragment key={`${category}-${index}`}>
              <button
                className={`whitespace-nowrap text-xs sm:text-sm lg:text-base xl:text-lg font-medium transition-all duration-300 hover:text-red-600 hover:underline group px-1 sm:px-2 lg:px-0 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ 
                  textDecorationColor: '#F21717',
                  textUnderlineOffset: '4px'
                }}
              >
                {category}
              </button>
              {index < extendedCategories.length - 1 && (
                <div className={`w-px h-3 sm:h-4 lg:h-5 xl:h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} self-center`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}