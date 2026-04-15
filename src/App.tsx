import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReaderAuthProvider } from './contexts/ReaderAuthContext';
import { ToastProvider } from './contexts/ToastContext';
import PublicLayout from './components/layout/PublicLayout';
import LoadingScreen from './components/shared/LoadingScreen';

const MagazinePage = lazy(() => import('./pages/public/MagazinePage'));
const ArticleDetailPage = lazy(() => import('./pages/public/ArticleDetailPage'));
const TVShowPage = lazy(() => import('./pages/public/TVShowPage'));
const TVShowDetailPage = lazy(() => import('./pages/public/TVShowDetailPage'));
const PodcastPage = lazy(() => import('./pages/public/PodcastPage'));
const SearchPage = lazy(() => import('./pages/public/SearchPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const ReaderProfilePage = lazy(() => import('./pages/public/ReaderProfilePage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const SuperAdminDashboard = lazy(() => import('./pages/super-admin/SuperAdminDashboard'));

function App() {
  return (
    <ThemeProvider>
      <ReaderAuthProvider>
        <ToastProvider isDarkMode={false}>
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<MagazinePage />} />
                  <Route path="/magazine" element={<MagazinePage />} />
                  <Route path="/article/:id" element={<ArticleDetailPage />} />
                  <Route path="/tv-show" element={<TVShowPage />} />
                  <Route path="/tv-show/:id" element={<TVShowDetailPage />} />
                  <Route path="/podcast" element={<PodcastPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profile" element={<ReaderProfilePage />} />
                </Route>

                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/*" element={<AdminDashboard />} />

                <Route path="/super-admin/login" element={<Navigate to="/super-admin/dashboard" replace />} />
                <Route path="/super-admin/*" element={<SuperAdminDashboard />} />

                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </ToastProvider>
      </ReaderAuthProvider>
    </ThemeProvider>
  );
}

export default App;
