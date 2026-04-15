import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock } from 'lucide-react';
import type { Article } from '../../lib/publicApi';

interface TrendingSectionProps {
  articles: Article[];
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  if (!articles.length) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-sm p-6 shadow-card">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={16} className="text-brand-red" />
        <div>
          <p className="text-label text-brand-red text-xs mb-0.5">Most Read</p>
          <h2 className="font-display font-bold text-brand-black dark:text-white text-xl">
            Trending Now
          </h2>
        </div>
      </div>

      <div className="space-y-5">
        {articles.slice(0, 6).map((article, i) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="group flex items-start gap-4 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="font-display font-black text-3xl leading-none text-neutral-200 dark:text-neutral-700 group-hover:text-brand-red transition-colors flex-shrink-0 w-8 text-right">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0 border-l border-neutral-100 dark:border-neutral-800 pl-4 group-hover:border-brand-red transition-colors">
              <span className="text-label text-brand-red text-[9px] block mb-0.5">{article.category_name}</span>
              <h4 className="font-display font-semibold text-brand-black dark:text-white text-sm leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                {article.title}
              </h4>
              <div className="flex items-center gap-1 mt-1 text-xs text-neutral-500">
                <Clock size={10} />
                <span>{article.read_time || '3 min read'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <Link
          to="/search?sort=trending"
          className="text-xs font-medium text-brand-red hover:text-brand-red-dark transition-colors flex items-center gap-1"
        >
          View all trending <TrendingUp size={11} />
        </Link>
      </div>
    </div>
  );
}
