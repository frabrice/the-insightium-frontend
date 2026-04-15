import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminAuth } from '../lib/adminAuth';
import type { AdminUser } from '../lib/adminAuth';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isSuperAdmin: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  adminUser: null,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  isSuperAdmin: false,
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAuth.getCurrentAdmin().then(user => {
      setAdminUser(user);
      setIsLoading(false);
    });
  }, []);

  async function signIn(email: string, password: string) {
    const { adminUser: user, error } = await adminAuth.signIn(email, password);
    if (error) return { error };
    setAdminUser(user);
    return { error: null };
  }

  async function signOut() {
    await adminAuth.signOut();
    setAdminUser(null);
  }

  const isSuperAdmin = adminUser?.role === 'super_admin';

  return (
    <AdminAuthContext.Provider value={{ adminUser, isLoading, signIn, signOut, isSuperAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
