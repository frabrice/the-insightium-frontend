import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import type { Article } from '../../lib/publicApi';

interface HeroSectionProps {
  mainArticle?: Article;
  secondArticle?: Article;
  allArticles: Article[];
}

const PLACEHOLDER_MAIN = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const PLACEHOLDER_SIDE = 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=640&h=480&dpr=2';

export default function HeroSection({ mainArticle, secondArticle, allArticles }: HeroSectionProps) {
  const main = mainArticle || allArticles[0];
  const second = secondArticle || allArticles[1];
  const thirds = allArticles.slice(2, 4);

  if (!main) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="lg:col-span-7 animate-fade-up">
          <Link to={`/article/${main.id}`} className="group block relative overflow-hidden rounded-sm shadow-editorial-hover">
            <div className="img-zoom aspect-[16/10]">
              <img
                src={main.featured_image || PLACEHOLDER_MAIN}
                alt={main.featured_image_alt || main.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hero-gradient absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="category-chip mb-3 inline-block">{main.category_name}</div>
              <h1 className="font-display font-bold text-white leading-tight mb-3 group-hover:text-brand-cream transition-colors"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: '1.15' }}>
                {main.title}
              </h1>
              {main.subtitle && (
                <p className="text-neutral-300 text-sm line-clamp-2 mb-3 hidden lg:block font-serif">
                  {main.subtitle}
                </p>
              )}
              <div className="flex items-center gap-4 text-neutral-400 text-xs font-sans">
                <span className="font-medium text-neutral-300">{main.author}</span>
                {main.read_time && (
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {main.read_time}
                  </span>
                )}
                {(main.view_count || main.views) && (
                  <span className="flex items-center gap-1">
                    <Eye size={11} /> {main.view_count || main.views}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          {second && (
            <Link to={`/article/${second.id}`} className="group block relative overflow-hidden rounded-sm flex-1 animate-fade-up delay-100">
              <div className="img-zoom h-48 lg:h-auto lg:flex-1">
                <img
                  src={second.featured_image || PLACEHOLDER_SIDE}
                  alt={second.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hero-gradient absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="category-chip mb-2 inline-block">{second.category_name}</div>
                <h2 className="font-display font-bold text-white text-lg leading-tight group-hover:text-brand-cream transition-colors line-clamp-2">
                  {second.title}
                </h2>
                <p className="text-neutral-400 text-xs mt-1.5">{second.author}</p>
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-3 animate-fade-up delay-200">
            {thirds.map((article, i) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group flex gap-3 bg-white dark:bg-neutral-850 p-3 rounded-sm hover:shadow-card-hover transition-all duration-200"
              >
                <div className="img-zoom w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden">
                  <img
                    src={article.featured_image || PLACEHOLDER_SIDE}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-label text-brand-red text-[9px]">{article.category_name}</span>
                  <h3 className="font-display font-semibold text-brand-black dark:text-white text-sm leading-snug mt-0.5 line-clamp-2 group-hover:text-brand-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-caption mt-1">{article.author} &bull; {article.read_time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
