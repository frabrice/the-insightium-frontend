import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHome from '../../components/admin/AdminHome';
import AdminProfile from '../../components/admin/AdminProfile';
import AdminArticles from '../../components/admin/AdminArticles';
import AdminArticleEditor from '../../components/admin/AdminArticleEditor';
import AdminVideos from '../../components/admin/AdminVideos';
import AdminPodcasts from '../../components/admin/AdminPodcasts';
import AdminTVShows from '../../components/admin/AdminTVShows';
import LoadingScreen from '../../components/shared/LoadingScreen';

function AdminRoutes() {
  const { adminUser, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !adminUser) {
      navigate('/admin/login');
    }
  }, [adminUser, isLoading]);

  if (isLoading) return <LoadingScreen />;
  if (!adminUser) return null;

  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminHome />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="articles" element={<AdminArticles />} />
        <Route path="articles/new" element={<AdminArticleEditor />} />
        <Route path="articles/:id/edit" element={<AdminArticleEditor />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="podcasts" element={<AdminPodcasts />} />
        <Route path="tv-shows" element={<AdminTVShows />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export default function AdminDashboard() {
  return (
    <AdminAuthProvider>
      <AdminRoutes />
    </AdminAuthProvider>
  );
}
