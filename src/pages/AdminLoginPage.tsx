import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../components/Auth/AdminLogin';

interface AdminLoginPageProps {
  isDarkMode: boolean;
}

export default function AdminLoginPage({ isDarkMode }: AdminLoginPageProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <AdminLogin isDarkMode={isDarkMode} />;
}