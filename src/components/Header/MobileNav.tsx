import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useReaderAuth } from '../../contexts/ReaderAuthContext';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileNav({ onClose, navItems }: MobileNavProps) {
  const { user, profile, signOut, setShowAuthModal, setAuthModalTab } = useReaderAuth();

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-neutral-900 shadow-editorial animate-slide-left">
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-brand-black dark:text-white text-xl">The</span>
            <span className="font-display font-black text-brand-red text-xl">Insightium</span>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
            <X size={20} />
          </button>
        </div>

        {user && (
          <div className="p-5 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm">
                {(profile?.display_name || user.email || 'R')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-brand-black dark:text-white">{profile?.display_name || 'Reader'}</p>
                <p className="text-xs text-neutral-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="p-5">
          <p className="text-label text-neutral-400 mb-3 text-xs">Navigation</p>
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-3 text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-brand-red dark:hover:text-brand-red hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded transition-colors animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-neutral-100 dark:border-neutral-800">
          {user ? (
            <div className="space-y-2">
              <Link
                to="/profile"
                onClick={onClose}
                className="block w-full text-center py-2.5 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                My Profile
              </Link>
              <button
                onClick={async () => { await signOut(); onClose(); }}
                className="block w-full text-center py-2.5 text-sm font-medium text-brand-red rounded-sm hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => { setAuthModalTab('signin'); setShowAuthModal(true); onClose(); }}
                className="block w-full text-center py-2.5 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthModalTab('signup'); setShowAuthModal(true); onClose(); }}
                className="block w-full text-center py-2.5 text-sm font-medium bg-brand-red text-white rounded-sm hover:bg-brand-red-dark transition-colors"
              >
                Join Free
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
