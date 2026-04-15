import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface ReaderProfile {
  id: string;
  auth_id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

interface ReaderAuthContextType {
  user: User | null;
  session: Session | null;
  profile: ReaderProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<ReaderProfile>) => Promise<{ error: string | null }>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalTab: 'signin' | 'signup';
  setAuthModalTab: (tab: 'signin' | 'signup') => void;
}

const ReaderAuthContext = createContext<ReaderAuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
  showAuthModal: false,
  setShowAuthModal: () => {},
  authModalTab: 'signin',
  setAuthModalTab: () => {},
});

export function ReaderAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ReaderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        (async () => {
          await fetchProfile(session.user.id);
        })();
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(authId: string) {
    const { data } = await supabase
      .from('reader_profiles')
      .select('*')
      .eq('auth_id', authId)
      .maybeSingle();
    setProfile(data);
    setIsLoading(false);
  }

  async function signUp(email: string, password: string, displayName: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    if (data.user) {
      const { error: profileError } = await supabase.from('reader_profiles').insert({
        auth_id: data.user.id,
        display_name: displayName,
      });
      if (profileError) return { error: profileError.message };
    }
    return { error: null };
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function updateProfile(updates: Partial<ReaderProfile>) {
    if (!user) return { error: 'Not authenticated' };
    const { error } = await supabase
      .from('reader_profiles')
      .update(updates)
      .eq('auth_id', user.id);
    if (error) return { error: error.message };
    await fetchProfile(user.id);
    return { error: null };
  }

  return (
    <ReaderAuthContext.Provider value={{
      user,
      session,
      profile,
      isLoading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      showAuthModal,
      setShowAuthModal,
      authModalTab,
      setAuthModalTab,
    }}>
      {children}
    </ReaderAuthContext.Provider>
  );
}

export function useReaderAuth() {
  return useContext(ReaderAuthContext);
}
