import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { publicApi, PublicArticle, PublicVideo, PublicTVShow, PublicPodcast } from '../api/public';

interface PublicDataContextType {
  // Articles
  articles: PublicArticle[];
  featuredArticles: PublicArticle[];
  trendingArticles: PublicArticle[];
  getArticleById: (id: string) => PublicArticle | null;
  
  // Videos
  videos: PublicVideo[];
  magazineVideos: PublicVideo[];
  getVideoById: (id: string) => PublicVideo | null;
  
  // TV Shows
  tvShows: PublicTVShow[];
  tvShowVideos: PublicTVShow[];
  getTVShowById: (id: string) => PublicTVShow | null;
  
  // Podcasts
  podcasts: PublicPodcast[];
  podcastEpisodes: PublicPodcast[];
  getPodcastById: (id: string) => PublicPodcast | null;
  
  // Loading state
  isLoading: boolean;
  
  // Refresh data
  refreshData: () => Promise<void>;
}

const PublicDataContext = createContext<PublicDataContextType | undefined>(undefined);

export const usePublicData = () => {
  const context = useContext(PublicDataContext);
  if (context === undefined) {
    throw new Error('usePublicData must be used within a PublicDataProvider');
  }
  return context;
};

interface PublicDataProviderProps {
  children: ReactNode;
}

export const PublicDataProvider: React.FC<PublicDataProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<PublicArticle[]>([]);
  const [videos, setVideos] = useState<PublicVideo[]>([]);
  const [tvShows, setTVShows] = useState<PublicTVShow[]>([]);
  const [podcasts, setPodcasts] = useState<PublicPodcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // Fetch all data in parallel
      const [articlesResponse, videosResponse, tvShowsResponse, podcastsResponse] = await Promise.all([
        publicApi.getArticles({ limit: 50 }),
        publicApi.getVideos({ limit: 50 }),
        publicApi.getTVShows({ limit: 50 }),
        publicApi.getPodcasts({ limit: 50 })
      ]);

      // Set articles
      if (articlesResponse.success && articlesResponse.data) {
        setArticles(articlesResponse.data.articles);
      } else {
        setArticles([]);
      }

      // Set videos
      if (videosResponse.success && videosResponse.data) {
        setVideos(videosResponse.data.videos);
      } else {
        setVideos([]);
      }

      // Set TV shows
      if (tvShowsResponse.success && tvShowsResponse.data) {
        setTVShows(tvShowsResponse.data.tvShows);
      } else {
        setTVShows([]);
      }

      // Set podcasts
      if (podcastsResponse.success && podcastsResponse.data) {
        setPodcasts(podcastsResponse.data.podcasts);
      } else {
        setPodcasts([]);
      }

    } catch (error) {
      console.error('Error fetching public data:', error);
      setArticles([]);
      setVideos([]);
      setTVShows([]);
      setPodcasts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Derived data
  const featuredArticles = articles.filter(article => article.featured);
  const trendingArticles = articles.filter(article => article.trending);
  const magazineVideos = videos; // All videos are magazine videos in public context
  const tvShowVideos = tvShows; // All TV shows are videos in public context
  const podcastEpisodes = podcasts; // All podcasts are episodes in public context

  // Helper functions
  const getArticleById = (id: string): PublicArticle | null => {
    return articles.find(article => article._id === id || article.id === id) || null;
  };

  const getVideoById = (id: string): PublicVideo | null => {
    return videos.find(video => video._id === id || video.id === id) || null;
  };

  const getTVShowById = (id: string): PublicTVShow | null => {
    return tvShows.find(show => show._id === id || show.id === id) || null;
  };

  const getPodcastById = (id: string): PublicPodcast | null => {
    return podcasts.find(podcast => podcast._id === id || podcast.id === id) || null;
  };

  const refreshData = async () => {
    await fetchAllData();
  };

  const value: PublicDataContextType = {
    // Articles
    articles,
    featuredArticles,
    trendingArticles,
    getArticleById,
    
    // Videos
    videos,
    magazineVideos,
    getVideoById,
    
    // TV Shows
    tvShows,
    tvShowVideos,
    getTVShowById,
    
    // Podcasts
    podcasts,
    podcastEpisodes,
    getPodcastById,
    
    // Loading state
    isLoading,
    
    // Refresh data
    refreshData
  };

  return (
    <PublicDataContext.Provider value={value}>
      {children}
    </PublicDataContext.Provider>
  );
};