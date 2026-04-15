import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, BookOpen, BarChart2,
  MessageSquare, Mail, Settings, LogOut, Menu, ChevronRight, Shield
} from 'lucide-react';
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/super-admin/dashboard' },
  { icon: BookOpen, label: 'Editorial Speak', href: '/super-admin/editorial' },
  { icon: FileText, label: 'All Content', href: '/super-admin/content' },
  { icon: Users, label: 'Users', href: '/super-admin/users' },
  { icon: MessageSquare, label: 'Comments', href: '/super-admin/comments' },
  { icon: BarChart2, label: 'Analytics', href: '/super-admin/analytics' },
  { icon: Mail, label: 'Newsletter', href: '/super-admin/newsletter' },
  { icon: Settings, label: 'Settings', href: '/super-admin/settings' },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <aside className="w-56 flex-shrink-0 bg-brand-black border-r border-neutral-800 flex flex-col h-full">
      <div className="p-5 border-b border-neutral-800">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display font-bold text-white text-base">The</span>
          <span className="font-display font-black text-brand-red text-base">Insightium</span>
        </Link>
        <div className="flex items-center gap-1.5 mt-1">
          <Shield size={10} className="text-brand-red" />
          <p className="text-[10px] text-brand-red uppercase tracking-widest font-medium">Super Admin</p>
        </div>
      </div>

      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            S
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Super Admin</p>
            <p className="text-[10px] text-neutral-500">admin@theinsightium.com</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.href || (item.href !== '/super-admin/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors ${
                  active
                    ? 'bg-brand-red text-white'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t border-neutral-800">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded text-xs text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors w-full mb-1"
        >
          Switch to Admin
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded text-sm text-neutral-500 hover:text-brand-red hover:bg-red-950 transition-colors w-full"
        >
          <LogOut size={15} />
          Exit to Site
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-neutral-950">
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-56 animate-slide-left">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-4 lg:px-6 bg-brand-black border-b border-neutral-800 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 text-neutral-500 hover:text-white"
          >
            <Menu size={18} />
          </button>
          <div className="hidden lg:flex items-center gap-1 text-sm text-neutral-500">
            {location.pathname.split('/').filter(Boolean).map((seg, i, arr) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={12} />}
                <span className={i === arr.length - 1 ? 'text-white font-medium capitalize' : 'capitalize'}>
                  {seg.replace(/-/g, ' ')}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors px-2 py-1 hidden sm:block">
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
