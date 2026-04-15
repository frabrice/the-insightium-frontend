import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { publicApi } from '../../lib/publicApi';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setError('');
    const { error: err } = await publicApi.newsletter.subscribe(email.trim(), name.trim() || undefined);
    setIsLoading(false);
    if (err) {
      setError('Something went wrong. Please try again.');
    } else {
      setIsSuccess(true);
    }
  }

  return (
    <div className="bg-brand-black dark:bg-neutral-950 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-sm px-3 py-1.5 mb-6">
            <Mail size={12} className="text-brand-red" />
            <span className="text-label text-brand-red text-[10px]">Newsletter</span>
          </div>
          <h2 className="font-display font-bold text-white text-3xl lg:text-4xl mb-4" style={{ lineHeight: '1.15' }}>
            Stay Informed on Africa&apos;s<br />
            <span className="text-brand-red">Next Big Story</span>
          </h2>
          <p className="text-neutral-400 text-base mb-8 font-serif leading-relaxed">
            Weekly digest of our best articles on education, technology, and innovation across Africa. No spam, ever.
          </p>

          {isSuccess ? (
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">You&apos;re in!</p>
                <p className="text-neutral-400 text-sm">Thanks for subscribing to The Insightium.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="flex-1 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
              />
              <div className="flex gap-3 sm:contents">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-brand-red transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-3 bg-brand-red text-white text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors flex items-center gap-2 disabled:opacity-60 flex-shrink-0"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Subscribe <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs col-span-full">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
