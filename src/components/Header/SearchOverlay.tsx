import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface SearchResult {
  id: string;
  title: string;
  category_name: string;
  featured_image: string;
  publish_date: string;
}

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const { data } = await supabase
        .from('articles')
        .select('id, title, category_name, featured_image, publish_date')
        .eq('status', 'published')
        .ilike('title', `%${query}%`)
        .limit(6);
      setResults(data || []);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  }

  function handleResultClick(id: string) {
    navigate(`/article/${id}`);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="max-w-2xl mx-auto mt-20 px-4 animate-fade-up">
        <div className="bg-white dark:bg-neutral-850 rounded shadow-editorial overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
              <Search size={20} className="text-neutral-400 mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search articles, topics, authors..."
                className="flex-1 bg-transparent text-brand-black dark:text-white placeholder-neutral-400 text-base outline-none font-sans"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors ml-3"
              >
                <X size={18} />
              </button>
            </div>
          </form>

          <div className="max-h-96 overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <div className="py-2">
                {results.map(result => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left"
                  >
                    {result.featured_image && (
                      <img
                        src={result.featured_image}
                        alt={result.title}
                        className="w-12 h-12 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-black dark:text-white line-clamp-1">{result.title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{result.category_name}</p>
                    </div>
                    <Search size={14} className="text-neutral-300 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {!isSearching && query.trim() && results.length === 0 && (
              <div className="text-center py-10">
                <p className="text-neutral-400 text-sm">No results for &ldquo;{query}&rdquo;</p>
              </div>
            )}

            {!query && (
              <div className="px-4 py-4">
                <p className="text-label text-neutral-400 mb-3">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {['Education', 'Technology', 'Innovation', 'Africa', 'Leadership', 'Culture'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-3 py-1.5 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
