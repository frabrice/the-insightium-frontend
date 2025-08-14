import React, { useEffect } from 'react';
import SearchResults from '../components/SearchResults';

interface SearchResultsPageProps {
  isDarkMode: boolean;
}

export default function SearchResultsPage({ isDarkMode }: SearchResultsPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <SearchResults isDarkMode={isDarkMode} />;
}