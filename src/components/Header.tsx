import React, { useState, useEffect } from 'react';
import { Menu, Search, ChevronDown, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import TopMenuBar from './TopMenuBar';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Update search query from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const menuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Team', path: '/team' }, 
    { name: 'Contact Us', path: '/contact' },
    { name: 'The Magazine', path: '/magazine' },
    { name: 'TV Show', path: '/tv-show' },
    { name: 'The Podcast', path: '/podcast' }
  ];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      window.scrollTo(0, 0);
    }
  };

  // Handle mobile search
  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      window.scrollTo(0, 0);
    }
  };

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const getActiveSection = () => {
    if (location.pathname === '/' || location.pathname === '/magazine') return 'magazine';
    if (location.pathname === '/tv-show') return 'tv';
    if (location.pathname === '/podcast') return 'podcast';
    if (location.pathname === '/about') return 'about';
    if (location.pathname.startsWith('/article/')) return 'magazine';
    return 'magazine';
  };

  const activeSection = getActiveSection();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <TopMenuBar isDarkMode={isDarkMode} />
      <header className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} shadow-lg border-b sticky top-0 z-50 transition-colors`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Left Section - Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-6">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center space-x-1 sm:space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-600'} transition-colors`}
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium hidden sm:inline">Menu</span>
                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMenuOpen && (
                <>
                  {/* Backdrop for mobile */}
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                    onClick={() => setIsMenuOpen(false)}
                  ></div>
                  
                  <div className={`absolute top-full left-0 mt-2 w-72 sm:w-64 lg:w-56 ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-100'} rounded-xl shadow-xl border py-2 z-50 max-h-96 overflow-y-auto`}>
                    <div className={`flex items-center justify-between px-4 py-2 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                      <span className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Navigation</span>
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleMenuItemClick(item.path)}
                        className={`block w-full text-left px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-red-400' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'} transition-colors ${
                          location.pathname === item.path
                            ? `${isDarkMode ? 'bg-gray-700 text-red-400' : 'bg-red-50 text-red-600'} font-medium`
                            : ''
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search Field */}
            <div className="relative hidden lg:block">
              <form onSubmit={handleSearch}>
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 w-40 xl:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-sm ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </form>
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <button 
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
              className="text-lg sm:text-xl lg:text-2xl font-bold hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              <span className="text-blue-600">The </span>
              <span className="text-red-600" style={{ color: '#F21717' }}>Insightium</span>
            </button>
          </div>

          {/* Right Section - Product Navigation & Dark Mode Toggle */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Mobile Search Icon */}
            <button 
              className="lg:hidden p-1 sm:p-2 rounded-lg transition-colors"
              onClick={() => navigate('/search')}
            >
              <Search className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>

            {/* Product Navigation - Hidden on small screens, shown on medium+ */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => {
                  navigate('/magazine');
                  window.scrollTo(0, 0);
                }}
                className={`px-2 md:px-3 lg:px-4 py-2 rounded-lg font-medium transition-all text-xs md:text-sm lg:text-base ${
                  activeSection === 'magazine'
                    ? `${isDarkMode ? 'bg-gray-700 text-white border-2 border-gray-500' : 'bg-gray-200 text-gray-900 border-2 border-gray-400'} shadow-md`
                    : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }`}
              >
                The Magazine
              </button>
              <button
                onClick={() => {
                  navigate('/tv-show');
                  window.scrollTo(0, 0);
                }}
                className={`px-2 md:px-3 lg:px-4 py-2 rounded-lg font-medium transition-all text-xs md:text-sm lg:text-base ${
                  activeSection === 'tv'
                    ? `${isDarkMode ? 'bg-gray-700 text-white border-2 border-gray-500' : 'bg-gray-200 text-gray-900 border-2 border-gray-400'} shadow-md`
                    : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }`}
              >
                TV Show
              </button>
              <button
                onClick={() => {
                  navigate('/podcast');
                  window.scrollTo(0, 0);
                }}
                className={`px-2 md:px-3 lg:px-4 py-2 rounded-lg font-medium transition-all text-xs md:text-sm lg:text-base ${
                  activeSection === 'podcast'
                    ? `${isDarkMode ? 'bg-gray-700 text-white border-2 border-gray-500' : 'bg-gray-200 text-gray-900 border-2 border-gray-400'} shadow-md`
                    : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }`}
              >
                The Podcast
              </button>
            </div>

            {/* Mobile Product Navigation Dropdown */}
            <div className="md:hidden relative">
              <select
                value={location.pathname}
                onChange={(e) => {
                  navigate(e.target.value);
                  window.scrollTo(0, 0);
                }}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg border font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                }`}
              >
                <option value="/magazine">Magazine</option>
                <option value="/tv-show">TV Show</option>
                <option value="/podcast">Podcast</option>
              </select>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-1 sm:p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Below header on small screens */}
        <div className="lg:hidden mt-2 sm:mt-3">
          <form onSubmit={handleMobileSearch}>
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-sm ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </form>
        </div>
        </div>
      </header>
    </>
  );
}