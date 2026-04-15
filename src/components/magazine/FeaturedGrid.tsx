import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { Article } from '../../lib/publicApi';

interface FeaturedGridProps {
  articles: Article[];
}

const PLACEHOLDERS = [
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
];

export default function FeaturedGrid({ articles }: FeaturedGridProps) {
  if (!articles.length) return null;

  const [first, second, third] = articles;

  return (
    <section className="bg-white dark:bg-neutral-900 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-label text-brand-red text-xs mb-1">Curated</p>
            <h2 className="font-display font-bold text-brand-black dark:text-white text-2xl lg:text-3xl">
              Featured Stories
            </h2>
          </div>
          <Link
            to="/magazine"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-brand-red hover:gap-3 transition-all"
          >
            All Stories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[first, second, third].filter(Boolean).map((article, i) => (
            <Link
              key={article!.id}
              to={`/article/${article!.id}`}
              className="group flex flex-col animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="img-zoom rounded-sm overflow-hidden aspect-[4/3] mb-4">
                <img
                  src={article!.featured_image || PLACEHOLDERS[i]}
                  alt={article!.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="category-chip">{article!.category_name}</span>
                </div>
                <h3 className="font-display font-bold text-brand-black dark:text-white text-xl leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-3">
                  {article!.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-4 font-serif leading-relaxed">
                  {article!.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{article!.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>{article!.read_time || '3 min read'}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-px bg-neutral-100 dark:bg-neutral-800 group-hover:bg-brand-red transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
