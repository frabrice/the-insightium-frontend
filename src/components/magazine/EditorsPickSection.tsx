import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { Article } from '../../lib/publicApi';

interface EditorsPickSectionProps {
  articles: Article[];
}

const PLACEHOLDERS = [
  'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
];

export default function EditorsPickSection({ articles }: EditorsPickSectionProps) {
  if (!articles.length) return null;

  const [primary, ...rest] = articles;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-6 h-px bg-brand-red" />
          <p className="text-label text-brand-red text-xs">Editor&apos;s Pick</p>
        </div>
        <h2 className="font-display font-bold text-brand-black dark:text-white text-2xl lg:text-3xl">
          Handpicked for You
        </h2>
      </div>

      <div className="space-y-6">
        <Link
          to={`/article/${primary.id}`}
          className="group block animate-fade-up"
        >
          <div className="img-zoom rounded-sm overflow-hidden aspect-[16/9] mb-4">
            <img
              src={primary.featured_image || PLACEHOLDERS[0]}
              alt={primary.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="category-chip mb-2 inline-block">{primary.category_name}</div>
          <h3 className="font-display font-bold text-brand-black dark:text-white text-xl lg:text-2xl leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-3">
            {primary.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-3 font-serif leading-relaxed">
            {primary.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">{primary.author}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {primary.read_time || '4 min'}</span>
          </div>
        </Link>

        <div className="space-y-4">
          {rest.slice(0, 3).map((article, i) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="group flex gap-3 py-3 border-t border-neutral-200 dark:border-neutral-700 first:border-t-0 animate-fade-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="flex-1 min-w-0">
                <span className="text-label text-brand-red text-[9px]">{article.category_name}</span>
                <h4 className="font-display font-semibold text-brand-black dark:text-white text-base leading-snug mt-0.5 group-hover:text-brand-red transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-neutral-500">
                  <span>{article.author}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {article.read_time || '3 min'}</span>
                </div>
              </div>
              <div className="img-zoom w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden">
                <img
                  src={article.featured_image || PLACEHOLDERS[i + 1]}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
