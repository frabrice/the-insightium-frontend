import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePublicData } from '../../contexts/PublicDataContext';

interface VideosSectionProps {
  isDarkMode: boolean;
}

export default function VideosSection({ isDarkMode }: VideosSectionProps) {
  const { magazineVideos } = usePublicData();
  const navigate = useNavigate();

  // Only show if we have real videos
  if (magazineVideos.length === 0) {
    return null; // Hide the entire section if no videos
  }

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal mb-6 sm:mb-8 text-white">
          Videos
        </h2>

        {/* Videos Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {magazineVideos.slice(0, 4).map((video, index) => (
            <div 
              key={index}
              className="group cursor-pointer bg-gray-900 border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border hover:shadow-xl transition-all duration-300"
              onClick={() => {
                navigate(`/video/${video._id || video.id}`);
                window.scrollTo(0, 0);
              }}
            >
              {/* Video Thumbnail */}
              <div className="relative overflow-hidden">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                  }}
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-3 sm:p-4">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 fill-current" />
                  </div>
                </div>

                {/* Video overlay text */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4">
                  <div className="text-white">
                    <div className="text-sm sm:text-lg font-bold tracking-wider">THE INSIGHTIUM</div>
                    <div className="text-xs sm:text-sm opacity-90">EDUCATIONAL CONTENT</div>
                  </div>
                </div>
              </div>

              {/* Video Content */}
              <div className="p-4 sm:p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-xs shadow-md">
                    Educational Content
                  </span>
                </div>
                
                <h3 className="text-sm sm:text-base font-bold mb-2 leading-tight text-white line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3 sm:mb-4 text-gray-300 line-clamp-2">
                  {video.description}
                </p>
                
                {/* Watch Now Button */}
                <div className="text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-2 font-medium text-sm">
                  <Play className="w-4 h-4" />
                  <span>Watch Now</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}