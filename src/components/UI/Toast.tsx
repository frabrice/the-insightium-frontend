import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onRemove: (id: string) => void;
  isDarkMode?: boolean;
}

export function Toast({ toast, onRemove, isDarkMode = false }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onRemove(toast.id), 300);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: isDarkMode ? 'bg-green-900/90' : 'bg-green-50',
          border: 'border-green-200 dark:border-green-700',
          icon: 'text-green-600 dark:text-green-400',
          title: isDarkMode ? 'text-green-100' : 'text-green-800',
          message: isDarkMode ? 'text-green-200' : 'text-green-600'
        };
      case 'error':
        return {
          bg: isDarkMode ? 'bg-red-900/90' : 'bg-red-50',
          border: 'border-red-200 dark:border-red-700',
          icon: 'text-red-600 dark:text-red-400',
          title: isDarkMode ? 'text-red-100' : 'text-red-800',
          message: isDarkMode ? 'text-red-200' : 'text-red-600'
        };
      case 'warning':
        return {
          bg: isDarkMode ? 'bg-yellow-900/90' : 'bg-yellow-50',
          border: 'border-yellow-200 dark:border-yellow-700',
          icon: 'text-yellow-600 dark:text-yellow-400',
          title: isDarkMode ? 'text-yellow-100' : 'text-yellow-800',
          message: isDarkMode ? 'text-yellow-200' : 'text-yellow-600'
        };
      case 'info':
        return {
          bg: isDarkMode ? 'bg-blue-900/90' : 'bg-blue-50',
          border: 'border-blue-200 dark:border-blue-700',
          icon: 'text-blue-600 dark:text-blue-400',
          title: isDarkMode ? 'text-blue-100' : 'text-blue-800',
          message: isDarkMode ? 'text-blue-200' : 'text-blue-600'
        };
      default:
        return {
          bg: isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50',
          border: 'border-gray-200 dark:border-gray-700',
          icon: 'text-gray-600 dark:text-gray-400',
          title: isDarkMode ? 'text-gray-100' : 'text-gray-800',
          message: isDarkMode ? 'text-gray-200' : 'text-gray-600'
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`${
        isVisible ? 'animate-in slide-in-from-right' : 'animate-out slide-out-to-right'
      } transition-all duration-300 ${colors.bg} ${colors.border} border rounded-lg shadow-lg p-4 mb-3 max-w-sm backdrop-blur-sm`}
    >
      <div className="flex items-start space-x-3">
        <div className={`${colors.icon} flex-shrink-0 mt-0.5`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${colors.title}`}>
            {toast.title}
          </h4>
          {toast.message && (
            <p className={`text-xs mt-1 ${colors.message}`}>
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
          }}
          className={`${colors.icon} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: string) => void;
  isDarkMode?: boolean;
}

export function ToastContainer({ toasts, onRemove, isDarkMode = false }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
}