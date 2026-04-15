import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Video, Mic, Tv, User, LogOut,
  Menu, X, ChevronRight, Bell
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'My Articles', href: '/admin/articles' },
  { icon: Video, label: 'Videos', href: '/admin/videos' },
  { icon: Mic, label: 'Podcasts', href: '/admin/podcasts' },
  { icon: Tv, label: 'TV Shows', href: '/admin/tv-shows' },
  { icon: User, label: 'My Profile', href: '/admin/profile' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { adminUser, signOut } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  const Sidebar = () => (
    <aside className="w-56 flex-shrink-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full">
      <div className="p-5 border-b border-neutral-100 dark:border-neutral-800">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display font-bold text-brand-black dark:text-white text-base">The</span>
          <span className="font-display font-black text-brand-red text-base">Insightium</span>
        </Link>
        <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-widest font-medium">Admin Portal</p>
      </div>

      <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {(adminUser?.full_name || adminUser?.email || 'A')[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-brand-black dark:text-white truncate">{adminUser?.full_name || 'Admin'}</p>
            <p className="text-[10px] text-neutral-400 capitalize">{adminUser?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest px-2 mb-2">Navigation</p>
        <div className="space-y-0.5">
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors ${
                  active
                    ? 'bg-brand-red text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-brand-black dark:hover:text-white'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded text-sm text-neutral-500 hover:text-brand-red hover:bg-red-50 dark:hover:bg-red-950 transition-colors w-full"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950">
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-56 animate-slide-left">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-4 lg:px-6 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <Menu size={18} />
          </button>
          <div className="hidden lg:flex items-center gap-1 text-sm text-neutral-500">
            {location.pathname.split('/').filter(Boolean).map((seg, i, arr) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={12} />}
                <span className={i === arr.length - 1 ? 'text-brand-black dark:text-white font-medium capitalize' : 'capitalize'}>
                  {seg}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors rounded">
              <Bell size={16} />
            </button>
            <Link to="/" className="text-xs text-neutral-400 hover:text-brand-red transition-colors px-2 py-1 rounded hidden sm:block">
              View Site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
