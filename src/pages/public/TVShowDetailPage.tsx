import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import { publicApi } from '../../lib/publicApi';

export default function TVShowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<any>(null);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const [showRes, seasonsRes] = await Promise.all([
        publicApi.tvShows.getById(id!),
        publicApi.tvShows.getSeasons(id!),
      ]);
      setShow(showRes.data);
      setSeasons(seasonsRes.data || []);
      if (seasonsRes.data?.length) {
        const firstEpisode = seasonsRes.data[0]?.tv_show_episodes?.[0];
        if (firstEpisode) setActiveEpisode(firstEpisode);
      }
      setIsLoading(false);
    }
    load();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading || !show) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeSznData = seasons[activeSeason];
  const episodes = activeSznData?.tv_show_episodes || [];

  return (
    <div className="bg-brand-black min-h-screen page-enter">
      <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden">
        <img
          src={show.thumbnail || 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Link to="/tv-show" className="inline-flex items-center gap-1 text-neutral-400 hover:text-white text-xs mb-4 transition-colors">
            <ArrowLeft size={12} /> Back to TV Shows
          </Link>
          {show.genre && <span className="category-chip mb-3 inline-block">{show.genre}</span>}
          <h1 className="font-display font-black text-white mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            {show.title}
          </h1>
          <p className="text-neutral-300 text-base font-serif max-w-xl line-clamp-2">{show.description}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-neutral-400">
            {show.rating && (
              <span className="flex items-center gap-1">
                <Star size={12} className="text-brand-gold" fill="currentColor" /> {show.rating}
              </span>
            )}
            {show.total_seasons && <span>{show.total_seasons} Season{show.total_seasons > 1 ? 's' : ''}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeEpisode?.youtube_url && (
          <div className="mb-10">
            <h3 className="text-white font-display font-bold text-lg mb-3">
              {activeEpisode.title}
            </h3>
            <div className="aspect-video bg-black rounded-sm overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${activeEpisode.youtube_url.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '')}`}
                title={activeEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            {activeEpisode.description && (
              <p className="text-neutral-400 text-sm font-serif mt-3 leading-relaxed">{activeEpisode.description}</p>
            )}
          </div>
        )}

        {seasons.length > 1 && (
          <div className="flex gap-2 mb-6">
            {seasons.map((season: any, i: number) => (
              <button
                key={season.id}
                onClick={() => { setActiveSeason(i); setActiveEpisode(season.tv_show_episodes?.[0] || null); }}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                  activeSeason === i
                    ? 'bg-brand-red text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
              >
                Season {season.season_number}
              </button>
            ))}
          </div>
        )}

        {episodes.length > 0 ? (
          <div>
            <h3 className="font-display font-bold text-white text-xl mb-5">Episodes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {episodes.map((ep: any) => (
                <button
                  key={ep.id}
                  onClick={() => setActiveEpisode(ep)}
                  className={`group text-left rounded-sm overflow-hidden transition-all ${
                    activeEpisode?.id === ep.id
                      ? 'ring-2 ring-brand-red'
                      : 'hover:ring-1 hover:ring-neutral-600'
                  }`}
                >
                  <div className="relative aspect-video img-zoom">
                    <img
                      src={ep.thumbnail || show.thumbnail || 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="hero-gradient absolute inset-0" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={24} className="text-white" fill="white" />
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="text-xs bg-black/70 text-white px-1.5 py-0.5 rounded-sm">Ep {ep.episode_number}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-900">
                    <p className="text-white text-sm font-medium line-clamp-1">{ep.title}</p>
                    {ep.duration && <p className="text-neutral-500 text-xs mt-0.5">{ep.duration}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-600">
            <p className="text-sm">No episodes available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
