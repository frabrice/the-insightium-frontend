import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { Article } from '../../lib/publicApi';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-label text-brand-red text-xs mb-1">More to Read</p>
          <h3 className="font-display font-bold text-brand-black dark:text-white text-2xl">Related Articles</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((article, i) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="group animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="img-zoom aspect-[4/3] rounded-sm overflow-hidden mb-3">
              <img
                src={article.featured_image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-label text-brand-red text-[9px]">{article.category_name}</span>
            <h4 className="font-display font-semibold text-brand-black dark:text-white text-sm leading-snug mt-1 line-clamp-3 group-hover:text-brand-red transition-colors">
              {article.title}
            </h4>
            <p className="text-xs text-neutral-500 mt-1.5 flex items-center gap-1">
              <Clock size={10} /> {article.read_time || '3 min read'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
