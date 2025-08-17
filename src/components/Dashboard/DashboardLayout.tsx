import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Tv, 
  Mic, 
  Users, 
  Settings, 
  FileText,
  BarChart3,
  Video,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Plus,
  Edit,
  Eye,
  Trash2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  children?: MenuItem[];
}

export default function DashboardLayout({ children, isDarkMode, onToggleDarkMode }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>(['magazine']);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      id: 'magazine',
      label: 'Magazine',
      icon: BookOpen,
      path: '/admin/magazine',
      children: [
        { id: 'articles', label: 'All Articles', icon: FileText, path: '/admin/magazine/articles' },
        { id: 'main-articles', label: 'Main Articles', icon: Home, path: '/admin/magazine/main-articles' },
        { id: 'featured', label: 'Featured Articles', icon: Plus, path: '/admin/magazine/featured' },
        { id: 'editors-pick', label: 'Editor\'s Pick', icon: Edit, path: '/admin/magazine/editors-pick' },
        { id: 'trending', label: 'Trending', icon: BarChart3, path: '/admin/magazine/trending' },
        { id: 'videos', label: 'Videos', icon: Video, path: '/admin/magazine/videos' }
      ]
    },
    {
      id: 'tv-show',
      label: 'TV Show',
      icon: Tv,
      path: '/admin/tv-show'
    },
    {
      id: 'podcast',
      label: 'Podcast',
      icon: Mic,
      path: '/admin/podcast'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (item: MenuItem) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-64' : 'w-16'} ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold">
                <span className="text-blue-600">The </span>
                <span className="text-red-600" style={{ color: '#F21717' }}>Insightium</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                Admin
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Main Menu Item */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                  isActive(item.path) || isParentActive(item)
                    ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-50 text-blue-600'}`
                    : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.id);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </div>
                {sidebarOpen && item.children && (
                  <div className="flex-shrink-0">
                    {expandedItems.includes(item.id) ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </div>
                )}
              </div>

              {/* Submenu Items */}
              {sidebarOpen && item.children && expandedItems.includes(item.id) && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <div
                      key={child.id}
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                        isActive(child.path)
                          ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-50 text-blue-600'}`
                          : `${isDarkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`
                      }`}
                      onClick={() => handleNavigation(child.path)}
                    >
                      <child.icon className="w-3 h-3 flex-shrink-0" />
                      <span>{child.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name || 'Admin User'}
                  </p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email || 'admin@theinsightium.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                title="Logout"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Top Header */}
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Admin Dashboard
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Manage your content and settings
              </p>
            </div>
            
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}