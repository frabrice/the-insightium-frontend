import React, { useEffect } from 'react';
import AboutUs from '../components/AboutUs';

interface AboutUsPageProps {
  isDarkMode: boolean;
}

export default function AboutUsPage({ isDarkMode }: AboutUsPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <AboutUs isDarkMode={isDarkMode} />;
}