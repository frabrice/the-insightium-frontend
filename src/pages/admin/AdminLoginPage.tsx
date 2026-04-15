import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { adminAuth } from '../../lib/adminAuth';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export default function AdminLoginPage() {
  const { adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (adminUser) {
      navigate('/admin/dashboard');
    }
  }, [adminUser]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const { adminUser: user, error: err } = await adminAuth.signIn(email, password);
    setIsLoading(false);
    if (err) {
      setError(err);
    } else if (user) {
      navigate('/admin/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-baseline gap-1 mb-6">
            <span className="font-display font-bold text-brand-black dark:text-white text-2xl">The</span>
            <span className="font-display font-black text-brand-red text-2xl">Insightium</span>
          </Link>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-widest">Admin Portal</p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-sm shadow-editorial p-8">
          <h2 className="font-display font-bold text-brand-black dark:text-white text-xl mb-1">Sign In</h2>
          <p className="text-neutral-500 text-sm mb-6 font-serif">Access your editorial dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@insightium.africa"
                  className="w-full bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-brand-black dark:text-white text-sm pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
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
                  required
                  className="w-full bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-brand-black dark:text-white text-sm pl-9 pr-9 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
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
              {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700 text-center">
            <Link to="/super-admin/login" className="text-xs text-neutral-400 hover:text-brand-red transition-colors">
              Super Admin Login
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
            <ArrowLeft size={11} /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
