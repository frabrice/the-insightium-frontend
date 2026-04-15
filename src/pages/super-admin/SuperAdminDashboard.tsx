import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from '../../contexts/AdminAuthContext';
import SuperAdminLayout from '../../components/super-admin/SuperAdminLayout';
import SuperAdminOverview from '../../components/super-admin/SuperAdminOverview';
import EditorialSpeak from '../../components/super-admin/EditorialSpeak';
import SuperAdminContent from '../../components/super-admin/SuperAdminContent';
import SuperAdminUsers from '../../components/super-admin/SuperAdminUsers';
import SuperAdminComments from '../../components/super-admin/SuperAdminComments';
import SuperAdminAnalytics from '../../components/super-admin/SuperAdminAnalytics';
import SuperAdminNewsletter from '../../components/super-admin/SuperAdminNewsletter';
import SuperAdminSettings from '../../components/super-admin/SuperAdminSettings';
import LoadingScreen from '../../components/shared/LoadingScreen';

function SuperAdminRoutes() {
  const { adminUser, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !adminUser) {
      navigate('/super-admin/login');
    } else if (!isLoading && adminUser && adminUser.role !== 'super_admin') {
      navigate('/admin/dashboard');
    }
  }, [adminUser, isLoading]);

  if (isLoading) return <LoadingScreen />;
  if (!adminUser || adminUser.role !== 'super_admin') return null;

  return (
    <SuperAdminLayout>
      <Routes>
        <Route path="dashboard" element={<SuperAdminOverview />} />
        <Route path="editorial" element={<EditorialSpeak />} />
        <Route path="content" element={<SuperAdminContent />} />
        <Route path="users" element={<SuperAdminUsers />} />
        <Route path="comments" element={<SuperAdminComments />} />
        <Route path="analytics" element={<SuperAdminAnalytics />} />
        <Route path="newsletter" element={<SuperAdminNewsletter />} />
        <Route path="settings" element={<SuperAdminSettings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </SuperAdminLayout>
  );
}

export default function SuperAdminDashboard() {
  return (
    <AdminAuthProvider>
      <SuperAdminRoutes />
    </AdminAuthProvider>
  );
}
