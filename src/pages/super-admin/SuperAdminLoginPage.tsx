import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { adminAuth } from '../../lib/adminAuth';

export default function SuperAdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    adminAuth.getCurrentAdmin().then(admin => {
      if (admin?.role === 'super_admin') navigate('/super-admin/dashboard');
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const { adminUser, error: err } = await adminAuth.signIn(email, password);
    setIsLoading(false);
    if (err) {
      setError(err);
      return;
    }
    if (adminUser?.role !== 'super_admin') {
      await adminAuth.signOut();
      setError('Super admin access required.');
      return;
    }
    navigate('/super-admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mx-auto mb-4">
            <Shield size={24} className="text-brand-red" />
          </div>
          <div className="flex items-baseline gap-1 justify-center mb-1">
            <span className="font-display font-bold text-white text-2xl">The</span>
            <span className="font-display font-black text-brand-red text-2xl">Insightium</span>
          </div>
          <p className="text-neutral-400 text-sm">Super Admin Portal</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-neutral-800 border border-neutral-700 text-white text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-neutral-800 border border-neutral-700 text-white text-sm px-3 py-2.5 pr-10 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-900/20 border border-red-800/30 px-3 py-2 rounded-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-brand-red text-white py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors disabled:opacity-60 mt-2"
            >
              {isLoading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Lock size={14} />
              }
              Sign In to Super Admin
            </button>
          </form>
        </div>

        <p className="text-center mt-4">
          <a href="/admin/login" className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors">
            Admin login instead
          </a>
        </p>
      </div>
    </div>
  );
}
