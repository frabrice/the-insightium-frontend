import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Clock, Tag } from 'lucide-react';
import { publicApi } from '../../lib/publicApi';
import type { Article } from '../../lib/publicApi';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isCategory = Boolean(category && !query);

  useEffect(() => {
    const term = query || category;
    if (!term) return;
    setIsLoading(true);
    const request = isCategory
      ? publicApi.articles.getByCategory(category)
      : publicApi.articles.search(query);
    request.then(({ data }) => {
      setResults((data as Article[]) || []);
      setIsLoading(false);
    });
  }, [query, category]);

  const displayTitle = category
    ? category
    : query
    ? `Results for "${query}"`
    : 'Search Articles';

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-black page-enter">
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isCategory ? (
            <div className="flex items-center gap-2 mb-2">
              <Tag size={12} className="text-brand-red" />
              <p className="text-label text-brand-red text-xs">Category</p>
            </div>
          ) : (
            <p className="text-label text-brand-red text-xs mb-2">Search Results</p>
          )}
          <h1 className="font-display font-bold text-brand-black dark:text-white text-3xl">
            {displayTitle}
          </h1>
          {!isLoading && (query || category) && (
            <p className="text-neutral-500 text-sm mt-2">
              {results.length} article{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-800 rounded flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded mb-1" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 && (query || category) ? (
          <div className="text-center py-20">
            <Search size={40} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
            <h3 className="font-display font-bold text-xl text-brand-black dark:text-white mb-2">No results found</h3>
            <p className="text-neutral-500 text-sm">
              {isCategory
                ? `No articles found in the "${category}" category yet.`
                : 'Try different keywords or browse our sections.'}
            </p>
          </div>
        ) : !query && !category ? (
          <div className="text-center py-20">
            <Search size={40} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
            <h3 className="font-display font-bold text-xl text-brand-black dark:text-white mb-2">Search our articles</h3>
            <p className="text-neutral-500 text-sm">Use the search bar above or click a category in the ticker.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((article, i) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group flex gap-4 bg-white dark:bg-neutral-900 p-4 rounded-sm border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-card transition-all animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {article.featured_image && (
                  <div className="img-zoom w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden">
                    <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-label text-brand-red text-[9px]">{article.category_name}</span>
                  <h3 className="font-display font-semibold text-brand-black dark:text-white text-base leading-snug mt-0.5 line-clamp-2 group-hover:text-brand-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mt-1.5 line-clamp-2 font-serif">{article.excerpt}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                    <span>{article.author}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {article.read_time || '3 min'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
