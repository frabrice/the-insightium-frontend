import React, { useEffect, useState } from 'react';
import { Mic, Play, Download, Clock, Calendar } from 'lucide-react';
import { publicApi } from '../../lib/publicApi';
import type { PodcastEpisode } from '../../lib/publicApi';
import NewsletterBanner from '../../components/shared/NewsletterBanner';

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    publicApi.podcasts.getAll().then(({ data }) => {
      const eps = data as PodcastEpisode[] || [];
      setEpisodes(eps);
      if (eps.length) setActiveEpisode(eps[0]);
      setIsLoading(false);
    });
  }, []);

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="bg-brand-cream dark:bg-brand-black page-enter">
      <div className="bg-brand-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <Mic size={16} className="text-brand-red" />
              <p className="text-label text-brand-red text-xs">Listen</p>
            </div>
            <h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>
              The Insightium<br />
              <span className="text-brand-red">Podcast</span>
            </h1>
            <p className="text-neutral-400 text-lg font-serif max-w-xl leading-relaxed">
              In-depth conversations with Africa&apos;s most inspiring educators, innovators, and leaders.
            </p>
          </div>
        </div>
      </div>

      {activeEpisode && (
        <div className="bg-neutral-900 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-label text-brand-red text-xs mb-2">Now Playing</p>
                <h2 className="font-display font-bold text-white text-2xl mb-2 line-clamp-2">{activeEpisode.title}</h2>
                {activeEpisode.guest && (
                  <p className="text-neutral-400 text-sm mb-3">Guest: <span className="text-white">{activeEpisode.guest}</span></p>
                )}
                <p className="text-neutral-500 text-sm font-serif line-clamp-3 leading-relaxed mb-4">{activeEpisode.description}</p>
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1"><Clock size={11} /> {activeEpisode.duration}</span>
                  <span className="flex items-center gap-1"><Play size={11} /> {activeEpisode.plays || 0} plays</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(activeEpisode.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
              {activeEpisode.youtube_url && getYoutubeId(activeEpisode.youtube_url) && (
                <div className="aspect-video rounded-sm overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeId(activeEpisode.youtube_url)}`}
                    title={activeEpisode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            ))}
          </div>
        ) : episodes.length === 0 ? (
          <div className="text-center py-20">
            <Mic size={48} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
            <h3 className="font-display font-bold text-brand-black dark:text-white text-xl mb-2">Coming Soon</h3>
            <p className="text-neutral-500 text-sm">Episodes are being prepared. Check back soon.</p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <p className="text-label text-brand-red text-xs mb-1">All Episodes</p>
              <h2 className="font-display font-bold text-brand-black dark:text-white text-2xl">Episodes</h2>
            </div>
            <div className="space-y-3">
              {episodes.map((episode, i) => (
                <button
                  key={episode.id}
                  onClick={() => { setActiveEpisode(episode); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full text-left flex gap-4 p-4 rounded-sm transition-all animate-fade-up ${
                    activeEpisode?.id === episode.id
                      ? 'bg-brand-red/10 border border-brand-red/30'
                      : 'bg-white dark:bg-neutral-900 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-card'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-neutral-200 dark:bg-neutral-800">
                    {episode.cover_image || episode.image ? (
                      <img
                        src={episode.cover_image || episode.image!}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-red/10">
                        <Mic size={20} className="text-brand-red" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {episode.episode_number && (
                          <p className="text-label text-neutral-400 text-[9px] mb-0.5">Episode {episode.episode_number}</p>
                        )}
                        <h4 className="font-display font-semibold text-brand-black dark:text-white text-base line-clamp-1">
                          {episode.title}
                        </h4>
                        {episode.guest && (
                          <p className="text-sm text-neutral-500 mt-0.5">Guest: {episode.guest}</p>
                        )}
                        <p className="text-xs text-neutral-400 mt-1.5 line-clamp-1 font-serif">{episode.description}</p>
                      </div>
                      <div className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 ${
                        activeEpisode?.id === episode.id ? 'bg-brand-red' : 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-brand-red'
                      }`}>
                        <Play size={14} className={activeEpisode?.id === episode.id ? 'text-white' : 'text-neutral-500'} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                      <span className="flex items-center gap-1"><Clock size={10} /> {episode.duration}</span>
                      <span>&bull;</span>
                      <span>{new Date(episode.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <NewsletterBanner />
    </div>
  );
}
