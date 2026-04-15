import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { useReaderAuth } from '../../contexts/ReaderAuthContext';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { authModalTab, setAuthModalTab, signIn, signUp } = useReaderAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (authModalTab === 'signin') {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err);
      } else {
        onClose();
      }
    } else {
      if (!displayName.trim()) {
        setError('Please enter your display name');
        setIsLoading(false);
        return;
      }
      const { error: err } = await signUp(email, password, displayName);
      if (err) {
        setError(err);
      } else {
        setSuccess('Account created! Please check your email to verify.');
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-sm shadow-editorial animate-scale-in overflow-hidden">
        <div className="bg-brand-black p-6 relative">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="font-display font-bold text-white text-lg">The</span>
            <span className="font-display font-black text-brand-red text-lg">Insightium</span>
          </div>
          <p className="text-neutral-400 text-sm font-serif">
            {authModalTab === 'signin' ? 'Welcome back. Sign in to continue.' : 'Join our community of readers.'}
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex border-b border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => { setAuthModalTab('signin'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              authModalTab === 'signin'
                ? 'text-brand-red border-b-2 border-brand-red'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthModalTab('signup'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              authModalTab === 'signup'
                ? 'text-brand-red border-b-2 border-brand-red'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-3">
                <Check size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <p className="font-medium text-brand-black dark:text-white mb-1">Account Created!</p>
              <p className="text-sm text-neutral-500 font-serif">{success}</p>
              <button
                onClick={onClose}
                className="mt-4 text-sm text-brand-red hover:underline"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authModalTab === 'signup' && (
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Display Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    required
                    minLength={8}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-black dark:text-white text-sm pl-9 pr-9 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-xs p-3 rounded-sm">
                  <AlertCircle size={13} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-red text-white py-3 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  authModalTab === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
