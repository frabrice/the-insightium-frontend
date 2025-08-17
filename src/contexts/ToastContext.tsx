import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastData, ToastContainer } from '../components/UI/Toast';

interface ToastContextType {
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
  showError: (title: string, message?: string) => void;
  showSuccess: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

export function ToastProvider({ children, isDarkMode = false }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newToast: ToastData = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showError = useCallback((title: string, message?: string) => {
    addToast({
      type: 'error',
      title,
      message,
      duration: 7000,
    });
  }, [addToast]);

  const showSuccess = useCallback((title: string, message?: string) => {
    addToast({
      type: 'success',
      title,
      message,
      duration: 4000,
    });
  }, [addToast]);

  const showWarning = useCallback((title: string, message?: string) => {
    addToast({
      type: 'warning',
      title,
      message,
      duration: 5000,
    });
  }, [addToast]);

  const showInfo = useCallback((title: string, message?: string) => {
    addToast({
      type: 'info',
      title,
      message,
      duration: 4000,
    });
  }, [addToast]);

  const value: ToastContextType = {
    addToast,
    removeToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onRemove={removeToast} 
        isDarkMode={isDarkMode}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}