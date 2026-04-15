import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-brand-cream dark:bg-brand-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-4">
          <span className="font-display text-3xl font-bold text-brand-black dark:text-white">
            The <span className="text-brand-red">Insightium</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
