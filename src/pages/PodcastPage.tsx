import React, { useEffect } from 'react';
import Podcast from '../components/Podcast';

interface PodcastPageProps {
  isDarkMode: boolean;
}

export default function PodcastPage({ isDarkMode }: PodcastPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <Podcast isDarkMode={isDarkMode} />
    </div>
  );
}