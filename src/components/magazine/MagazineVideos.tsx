import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Eye, ArrowRight } from 'lucide-react';
import type { Video } from '../../lib/publicApi';

interface MagazineVideosProps {
  videos: Video[];
}

export default function MagazineVideos({ videos }: MagazineVideosProps) {
  if (!videos.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-label text-neutral-400 text-xs mb-1">Watch</p>
          <h2 className="font-display font-bold text-white text-2xl lg:text-3xl">
            Video Stories
          </h2>
        </div>
        <Link to="/tv-show" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
          All Videos <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.slice(0, 6).map((video, i) => (
          <Link
            key={video.id}
            to={`/tv-show`}
            className="group relative overflow-hidden rounded-sm animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="img-zoom aspect-video">
              <img
                src={video.thumbnail || 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&dpr=2'}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hero-gradient absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Play size={20} className="text-white ml-0.5" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-label text-neutral-400 text-[9px] mb-1">{video.section}</p>
              <h4 className="font-display font-semibold text-white text-sm leading-snug line-clamp-2 group-hover:text-brand-cream transition-colors">
                {video.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                <span>{video.duration}</span>
                {video.views && (
                  <>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {video.views}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
