import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/super-admin/SuperAdminLayout';
import SuperAdminOverview from '../../components/super-admin/SuperAdminOverview';
import EditorialSpeak from '../../components/super-admin/EditorialSpeak';
import SuperAdminContent from '../../components/super-admin/SuperAdminContent';
import SuperAdminUsers from '../../components/super-admin/SuperAdminUsers';
import SuperAdminComments from '../../components/super-admin/SuperAdminComments';
import SuperAdminAnalytics from '../../components/super-admin/SuperAdminAnalytics';
import SuperAdminNewsletter from '../../components/super-admin/SuperAdminNewsletter';
import SuperAdminSettings from '../../components/super-admin/SuperAdminSettings';

export default function SuperAdminDashboard() {
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
