import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { PublicDataProvider } from './contexts/PublicDataContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Header from './components/Header';
import MagazinePage from './pages/MagazinePage';
import TVShowPage from './pages/TVShowPage';
import TVShowDetailPage from './pages/TVShowDetailPage';
import PodcastPage from './pages/PodcastPage';
import AboutUsPage from './pages/AboutUsPage';
import ArticlePage from './pages/ArticlePage';
import VideoPage from './pages/VideoPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ContactUsPage from './pages/ContactUsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ArticlesManagement from './components/Dashboard/Magazine/ArticlesManagement';
import AdminArticleView from './components/Dashboard/Magazine/AdminArticleView';
import AdminVideoView from './components/Dashboard/Magazine/AdminVideoView';
import AdminTVShowView from './components/Dashboard/TVShow/AdminTVShowView';
import AdminPodcastView from './components/Dashboard/Podcast/AdminPodcastView';
import MainArticlesManagement from './components/Dashboard/Magazine/MainArticlesManagement';
import FeaturedArticlesManagement from './components/Dashboard/Magazine/FeaturedArticlesManagement';
import EditorsPickManagement from './components/Dashboard/Magazine/EditorsPickManagement';
import TrendingManagement from './components/Dashboard/Magazine/TrendingManagement';
import VideosManagement from './components/Dashboard/Magazine/VideosManagement';
import TVShowManagement from './components/Dashboard/TVShow/TVShowManagement';
import PodcastManagement from './components/Dashboard/Podcast/PodcastManagement';
import SettingsManagement from './components/Dashboard/Settings/SettingsManagement';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider isDarkMode={isDarkMode}>
        <Router>
        <Routes>
            {/* Public Website Routes with PublicDataProvider */}
            <Route 
              path="/" 
              element={
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <MagazinePage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />
            
            <Route 
              path="/magazine" 
              element={
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <MagazinePage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />
            
            <Route 
              path="/tv-show" 
              element={
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <TVShowPage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />
            
            <Route 
              path="/tvshow/:id" 
              element={
                <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                  <Header 
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  />
                  <TVShowDetailPage isDarkMode={isDarkMode} />
                </div>
              } 
            />
            
            <Route 
              path="/podcast" 
              element={
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <PodcastPage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />
            
            <Route 
              path="/about" 
              element={
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <AboutUsPage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />

            {/* Article Page Route */}
            <Route 
              path="/article/:id" 
              element={
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <ArticlePage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />

            {/* Video Page Route */}
            <Route 
              path="/video/:id" 
              element={
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <VideoPage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />
            
            {/* Admin Article View Route */}
            <Route 
              path="/admin/article/:id" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <AdminArticleView isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* Admin Video View Route */}
            <Route 
              path="/admin/video/:id" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <AdminVideoView isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* Admin TV Show View Route */}
            <Route 
              path="/admin/tvshow/:id" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <AdminTVShowView isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* Admin Podcast View Route */}
            <Route 
              path="/admin/podcast/:id" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <AdminPodcastView isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
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
                <PublicDataProvider>
                  <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
                    <Header 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                    <SearchResultsPage isDarkMode={isDarkMode} />
                  </div>
                </PublicDataProvider>
              } 
            />
            
            {/* Admin Authentication Routes */}
            <Route 
              path="/admin/login" 
              element={<AdminLoginPage isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/admin/forgot-password" 
              element={<ForgotPasswordPage isDarkMode={isDarkMode} />} 
            />
            <Route 
              path="/admin/reset-password/:token" 
              element={<ResetPasswordPage isDarkMode={isDarkMode} />} 
            />
            
            {/* Protected Admin Dashboard Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <AdminDashboardPage 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* Magazine Management Routes */}
            <Route 
              path="/admin/magazine/articles" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <ArticlesManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            <Route 
              path="/admin/magazine/main-articles" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <MainArticlesManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            <Route 
              path="/admin/magazine/featured" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <FeaturedArticlesManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            <Route 
              path="/admin/magazine/editors-pick" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <EditorsPickManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            <Route 
              path="/admin/magazine/trending" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <TrendingManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            <Route 
              path="/admin/magazine/videos" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <VideosManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* TV Show Management Routes */}
            <Route 
              path="/admin/tv-show" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <TVShowManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* Podcast Management Routes */}
            <Route 
              path="/admin/podcast" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <PodcastManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* Settings Management Routes */}
            <Route 
              path="/admin/settings" 
              element={
                <DataProvider>
                  <ProtectedRoute isDarkMode={isDarkMode}>
                    <DashboardLayout 
                      isDarkMode={isDarkMode}
                      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    >
                      <SettingsManagement isDarkMode={isDarkMode} />
                    </DashboardLayout>
                  </ProtectedRoute>
                </DataProvider>
              } 
            />
            
            {/* Catch all other routes and redirect to home */}
            <Route 
              path="*" 
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;