import React, { useEffect } from 'react';
import CategoriesScrollBar from '../components/Magazine/CategoriesScrollBar';
import MainArticlesSection from '../components/Magazine/MainArticlesSection';
import FeaturedArticlesSection from '../components/Magazine/FeaturedArticlesSection';
import EditorsPickSection from '../components/Magazine/EditorsPickSection';
import VideosSection from '../components/Magazine/VideosSection';
import OtherArticlesSection from '../components/Magazine/OtherArticlesSection';
import Footer from '../components/shared/Footer';

interface MagazinePageProps {
  isDarkMode: boolean;
}

export default function MagazinePage({ isDarkMode }: MagazinePageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <CategoriesScrollBar isDarkMode={isDarkMode} />
      <MainArticlesSection isDarkMode={isDarkMode} />
      <FeaturedArticlesSection isDarkMode={isDarkMode} />
      <EditorsPickSection isDarkMode={isDarkMode} />
      <VideosSection isDarkMode={isDarkMode} />
      <OtherArticlesSection isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}