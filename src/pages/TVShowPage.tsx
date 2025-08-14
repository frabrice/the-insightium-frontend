import React, { useEffect } from 'react';
import TVShow from '../components/TVShow';
import Footer from '../components/shared/Footer';

interface TVShowPageProps {
  isDarkMode: boolean;
}

export default function TVShowPage({ isDarkMode }: TVShowPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <TVShow isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}