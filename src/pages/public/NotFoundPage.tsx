import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg animate-fade-up">
        <div className="mb-8">
          <p className="font-display font-black text-[8rem] leading-none text-brand-red/10 dark:text-brand-red/5 select-none">
            404
          </p>
        </div>
        <div className="-mt-12">
          <p className="text-label text-brand-red text-xs mb-3">Page Not Found</p>
          <h1 className="font-display font-bold text-brand-black dark:text-white text-3xl mb-4">
            This Story Doesn&apos;t Exist
          </h1>
          <p className="text-neutral-500 font-serif leading-relaxed mb-8">
            The page you&apos;re looking for may have been moved, deleted, or never existed. Let&apos;s get you back to the stories that matter.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <Link
              to="/magazine"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-red dark:hover:text-brand-red transition-colors border border-neutral-300 dark:border-neutral-600 px-5 py-2.5 rounded-sm"
            >
              <BookOpen size={14} /> Browse Magazine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
