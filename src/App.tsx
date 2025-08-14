import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import MagazinePage from './pages/MagazinePage';
import TVShowPage from './pages/TVShowPage';
import PodcastPage from './pages/PodcastPage';
import AboutUsPage from './pages/AboutUsPage';
import ArticlePage from './pages/ArticlePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ContactUsPage from './pages/ContactUsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ArticlesManagement from './components/Dashboard/Magazine/ArticlesManagement';
import MainArticlesManagement from './components/Dashboard/Magazine/MainArticlesManagement';
import FeaturedArticlesManagement from './components/Dashboard/Magazine/FeaturedArticlesManagement';
import EditorsPickManagement from './components/Dashboard/Magazine/EditorsPickManagement';
import TrendingManagement from './components/Dashboard/Magazine/TrendingManagement';
import CategoriesManagement from './components/Dashboard/Magazine/CategoriesManagement';
import VideosManagement from './components/Dashboard/Magazine/VideosManagement';
import TVShowManagement from './components/Dashboard/TVShow/TVShowManagement';
import PodcastManagement from './components/Dashboard/Podcast/PodcastManagement';
import UsersManagement from './components/Dashboard/Users/UsersManagement';
import AnalyticsManagement from './components/Dashboard/Analytics/AnalyticsManagement';
import SettingsManagement from './components/Dashboard/Settings/SettingsManagement';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Main Website Routes */}
            <Route 
              path="/" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <MagazinePage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            <Route 
              path="/magazine" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <MagazinePage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            <Route 
              path="/tv-show" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <TVShowPage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            <Route 
              path="/podcast" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <PodcastPage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            <Route 
              path="/about" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <AboutUsPage isDarkMode={isDarkMode} />
                </div>
              } 
            />

            {/* Article Page Route */}
            <Route 
              path="/article/:id" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <ArticlePage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            <Route 
              path="/contact" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <ContactUsPage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            <Route 
              path="/search" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <SearchResultsPage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            {/* Admin Login Route */}
            <Route 
              path="/admin/login" 
              element={<AdminLoginPage isDarkMode={isDarkMode} />} 
            />
            
            {/* Protected Admin Dashboard Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <AdminDashboardPage 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                </ProtectedRoute>
              } 
            />
            
            {/* Magazine Management Routes */}
            <Route 
              path="/admin/magazine/articles" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <ArticlesManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/magazine/main-articles" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <MainArticlesManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/magazine/featured" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <FeaturedArticlesManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/magazine/editors-pick" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <EditorsPickManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/magazine/trending" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <TrendingManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/magazine/categories" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <CategoriesManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/magazine/videos" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <VideosManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* TV Show Management Routes */}
            <Route 
              path="/admin/tv-show" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <TVShowManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Podcast Management Routes */}
            <Route 
              path="/admin/podcast" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <PodcastManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Users Management Routes */}
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <UsersManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Analytics Management Routes */}
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <AnalyticsManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Settings Management Routes */}
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute isDarkMode={isDarkMode}>
                  <DashboardLayout 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  >
                    <SettingsManagement isDarkMode={isDarkMode} />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all other routes and redirect to home */}
            <Route 
              path="*" 
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;