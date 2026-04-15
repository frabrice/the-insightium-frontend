import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Film, ArrowRight } from 'lucide-react';
import { publicApi } from '../../lib/publicApi';
import type { TVShow } from '../../lib/publicApi';
import NewsletterBanner from '../../components/shared/NewsletterBanner';

export default function TVShowPage() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    publicApi.tvShows.getAll().then(({ data }) => {
      setShows(data || []);
      setIsLoading(false);
    });
  }, []);

  const placeholders = [
    'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  ];

  return (
    <div className="bg-brand-cream dark:bg-brand-black page-enter">
      <div className="bg-brand-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <Film size={16} className="text-brand-red" />
              <p className="text-label text-brand-red text-xs">Watch</p>
            </div>
            <h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>
              The Insightium<br />
              <span className="text-brand-red">TV</span>
            </h1>
            <p className="text-neutral-400 text-lg font-serif max-w-xl leading-relaxed">
              Original shows, documentaries, and series exploring Africa&apos;s transformative stories.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse aspect-video" />
            ))}
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-20">
            <Film size={48} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
            <h3 className="font-display font-bold text-brand-black dark:text-white text-xl mb-2">Coming Soon</h3>
            <p className="text-neutral-500 text-sm font-serif">TV shows are being prepared. Check back soon.</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-label text-brand-red text-xs mb-1">All Shows</p>
              <h2 className="font-display font-bold text-brand-black dark:text-white text-2xl lg:text-3xl">Featured Series</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shows.map((show, i) => (
                <Link
                  key={show.id}
                  to={`/tv-show/${show.id}`}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative img-zoom aspect-video rounded-sm overflow-hidden mb-4">
                    <img
                      src={show.thumbnail || placeholders[i % placeholders.length]}
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="hero-gradient absolute inset-0" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <Play size={22} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                    {show.rating && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-sm">
                        <Star size={10} fill="currentColor" className="text-brand-gold" />
                        {show.rating}
                      </div>
                    )}
                  </div>
                  <div>
                    {show.genre && <span className="category-chip mb-2 inline-block">{show.genre}</span>}
                    <h3 className="font-display font-bold text-brand-black dark:text-white text-lg leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                      {show.title}
                    </h3>
                    <p className="text-sm text-neutral-500 font-serif mt-1.5 line-clamp-2 leading-relaxed">
                      {show.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                      {show.total_seasons && <span>{show.total_seasons} Season{show.total_seasons > 1 ? 's' : ''}</span>}
                      {show.total_episodes && <span>{show.total_episodes} Episodes</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <NewsletterBanner />
    </div>
  );
}
