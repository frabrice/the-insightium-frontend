import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { Article } from '../../lib/publicApi';

interface LatestArticlesProps {
  articles: Article[];
}

const PLACEHOLDERS = [
  'https://images.pexels.com/photos/3184456/pexels-photo-3184456.jpeg?auto=compress&cs=tinysrgb&w=640&h=480&dpr=2',
  'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=640&h=480&dpr=2',
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=640&h=480&dpr=2',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=640&h=480&dpr=2',
];

export default function LatestArticles({ articles }: LatestArticlesProps) {
  const [visibleCount, setVisibleCount] = useState(8);

  if (!articles.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-label text-brand-red text-xs mb-1">Latest</p>
          <h2 className="font-display font-bold text-brand-black dark:text-white text-2xl lg:text-3xl">
            Recent Articles
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, visibleCount).map((article, i) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="group flex flex-col animate-fade-up"
            style={{ animationDelay: `${Math.min(i, 7) * 60}ms` }}
          >
            <div className="img-zoom rounded-sm overflow-hidden aspect-[4/3] mb-3">
              <img
                src={article.featured_image || PLACEHOLDERS[i % PLACEHOLDERS.length]}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-label text-brand-red text-[9px]">{article.category_name}</span>
              <h3 className="font-display font-semibold text-brand-black dark:text-white text-base leading-snug mt-1 mb-2 group-hover:text-brand-red transition-colors line-clamp-3">
                {article.title}
              </h3>
              <p className="text-neutral-500 text-xs font-serif line-clamp-2 leading-relaxed mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-medium text-neutral-600 dark:text-neutral-400 truncate">{article.author}</span>
                <span className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <Clock size={10} />
                  {article.read_time || '3 min'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < articles.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(v => v + 4)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-brand-red text-brand-red text-sm font-medium rounded-sm hover:bg-brand-red hover:text-white transition-all duration-200"
          >
            Load More Articles <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
