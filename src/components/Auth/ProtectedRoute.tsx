import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isDarkMode: boolean;
}

export default function ProtectedRoute({ children, isDarkMode }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full" style={{ backgroundColor: 'rgba(242, 23, 23, 0.1)' }}>
              <Shield className="w-8 h-8 text-red-600 animate-pulse" style={{ color: '#F21717' }} />
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Loader className="w-5 h-5 animate-spin text-red-600" style={{ color: '#F21717' }} />
            <span className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Checking authentication...
            </span>
          </div>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Please wait while we verify your access
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}