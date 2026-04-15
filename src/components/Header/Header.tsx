import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, User, Menu, X, Bookmark, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useReaderAuth } from '../../contexts/ReaderAuthContext';
import { supabase } from '../../lib/supabase';
import CategoryTicker from './CategoryTicker';
import SearchOverlay from './SearchOverlay';
import MobileNav from './MobileNav';

const NAV_ITEMS = [
  { label: 'Magazine', href: '/magazine' },
  { label: 'TV Show', href: '/tv-show' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { user, profile, signOut, setShowAuthModal, setAuthModalTab } = useReaderAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowMobileNav(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSignIn() {
    setAuthModalTab('signin');
    setShowAuthModal(true);
  }

  function handleSignUp() {
    setAuthModalTab('signup');
    setShowAuthModal(true);
  }

  async function handleSignOut() {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass border-b border-neutral-200 dark:border-neutral-800 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setShowMobileNav(true)}
              className="md:hidden p-2 -ml-2 text-brand-black dark:text-white hover:text-brand-red transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <Link to="/" className="flex-shrink-0 group">
              <div className="flex items-baseline gap-1">
                <span className={`font-display font-bold tracking-tight transition-colors ${
                  isScrolled ? 'text-brand-black dark:text-white' : 'text-brand-black dark:text-white'
                }`} style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                  The
                </span>
                <span className="font-display font-black text-brand-red group-hover:text-brand-red-dark transition-colors" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                  Insightium
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors relative group ${
                    location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                      ? 'text-brand-red'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-brand-red dark:hover:text-brand-red'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-brand-red transform transition-transform origin-left ${
                    location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSearch(true)}
                className="p-2.5 text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors rounded-sm"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2.5 text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-brand-red transition-colors rounded-sm"
                aria-label={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(v => !v)}
                    className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 text-neutral-700 dark:text-neutral-300 hover:text-brand-red dark:hover:text-brand-red transition-colors rounded-sm"
                  >
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile.display_name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold">
                        {(profile?.display_name || user.email || 'R')[0].toUpperCase()}
                      </div>
                    )}
                    <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 rounded shadow-card-hover py-1 animate-scale-in">
                      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-700">
                        <p className="text-sm font-medium text-brand-black dark:text-white truncate">{profile?.display_name || 'Reader'}</p>
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <User size={14} />
                        My Profile
                      </Link>
                      <Link
                        to="/profile?tab=bookmarks"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Bookmark size={14} />
                        Bookmarks
                      </Link>
                      <hr className="border-neutral-100 dark:border-neutral-700 my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-brand-red hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2 ml-1">
                  <button
                    onClick={handleSignIn}
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-red dark:hover:text-brand-red transition-colors px-3 py-1.5"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="text-sm font-medium bg-brand-red text-white px-4 py-1.5 rounded-sm hover:bg-brand-red-dark transition-colors"
                  >
                    Join Free
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <CategoryTicker />
      </header>

      <div className="h-[104px]" />

      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
      {showMobileNav && <MobileNav onClose={() => setShowMobileNav(false)} navItems={NAV_ITEMS} />}
    </>
  );
}
