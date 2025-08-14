import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const savedSession = localStorage.getItem('admin_session');
      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession);
          const expiryTime = new Date(sessionData.expiresAt);
          
          if (expiryTime > new Date()) {
            setUser(sessionData.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('admin_session');
          }
        } catch (error) {
          localStorage.removeItem('admin_session');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials - in production, this would be a real API call
      const validCredentials = [
        { email: 'admin@theinsightium.com', password: 'admin123', name: 'Admin User', role: 'admin' },
        { email: 'editor@theinsightium.com', password: 'editor123', name: 'Editor User', role: 'editor' }
      ];

      const validUser = validCredentials.find(
        cred => cred.email === email && cred.password === password
      );

      if (validUser) {
        const adminUser: AdminUser = {
          id: '1',
          email: validUser.email,
          name: validUser.name,
          role: validUser.role
        };

        // Create session that expires in 8 hours
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 8);

        const sessionData = {
          user: adminUser,
          expiresAt: expiresAt.toISOString()
        };

        localStorage.setItem('admin_session', JSON.stringify(sessionData));
        setUser(adminUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_session');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};