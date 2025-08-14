import React, { useEffect } from 'react';
import ContactUs from '../components/ContactUs';
import Footer from '../components/shared/Footer';

interface ContactUsPageProps {
  isDarkMode: boolean;
}

export default function ContactUsPage({ isDarkMode }: ContactUsPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors`}>
      <ContactUs isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}