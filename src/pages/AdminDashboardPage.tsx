import React, { useEffect } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import DashboardHome from '../components/Dashboard/DashboardHome';

interface AdminDashboardPageProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function AdminDashboardPage({ isDarkMode, onToggleDarkMode }: AdminDashboardPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DashboardLayout isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode}>
      <DashboardHome isDarkMode={isDarkMode} />
    </DashboardLayout>
  );
}