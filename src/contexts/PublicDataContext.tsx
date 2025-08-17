import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { publicApi, PublicArticle, PublicVideo, PublicTVShow, PublicPodcast } from '../api/public';

interface PublicDataContextType {
  // Articles
  articles: PublicArticle[];
  featuredArticles: PublicArticle[];
  trendingArticles: PublicArticle[];
  editorsPickArticles: PublicArticle[];
  regularArticles: PublicArticle[];
  dedicatedFeaturedArticles: PublicArticle[];
  mainArticle: PublicArticle | null;
  secondMainArticle: PublicArticle | null;
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
  isLoadingEditorsPick: boolean;
  isLoadingMainArticles: boolean;
  isLoadingFeaturedArticles: boolean;
  
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
  const [editorsPickArticles, setEditorsPickArticles] = useState<PublicArticle[]>([]);
  const [regularArticles, setRegularArticles] = useState<PublicArticle[]>([]);
  const [dedicatedFeaturedArticles, setDedicatedFeaturedArticles] = useState<PublicArticle[]>([]);
  const [mainArticle, setMainArticle] = useState<PublicArticle | null>(null);
  const [secondMainArticle, setSecondMainArticle] = useState<PublicArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEditorsPick, setIsLoadingEditorsPick] = useState(true);
  const [isLoadingMainArticles, setIsLoadingMainArticles] = useState(true);
  const [isLoadingRegularArticles, setIsLoadingRegularArticles] = useState(true);
  const [isLoadingFeaturedArticles, setIsLoadingFeaturedArticles] = useState(true);

  const fetchRegularArticles = async () => {
    setIsLoadingRegularArticles(true);
    try {
      const regularResponse = await publicApi.getRegularArticles({ limit: 20 });
      
      if (regularResponse.success && regularResponse.data) {
        setRegularArticles(regularResponse.data.articles);
      } else {
        setRegularArticles([]);
      }
    } catch (error) {
      console.error('Error fetching regular articles:', error);
      setRegularArticles([]);
    } finally {
      setIsLoadingRegularArticles(false);
    }
  };

  const fetchMainArticles = async () => {
    setIsLoadingMainArticles(true);
    try {
      const mainArticlesResponse = await publicApi.getMainArticles();
      
      if (mainArticlesResponse.success && mainArticlesResponse.data) {
        setMainArticle(mainArticlesResponse.data.mainArticle);
        setSecondMainArticle(mainArticlesResponse.data.secondMainArticle);
      } else {
        setMainArticle(null);
        setSecondMainArticle(null);
      }
    } catch (error) {
      console.error('Error fetching main articles:', error);
      setMainArticle(null);
      setSecondMainArticle(null);
    } finally {
      setIsLoadingMainArticles(false);
    }
  };

  const fetchEditorsPickArticles = async () => {
    setIsLoadingEditorsPick(true);
    try {
      const editorsPickResponse = await publicApi.getEditorsPickArticles();
      
      if (editorsPickResponse.success && editorsPickResponse.data) {
        setEditorsPickArticles(editorsPickResponse.data);
      } else {
        setEditorsPickArticles([]);
      }
    } catch (error) {
      console.error('Error fetching editor\'s pick articles:', error);
      setEditorsPickArticles([]);
    } finally {
      setIsLoadingEditorsPick(false);
    }
  };

  const fetchFeaturedArticles = async () => {
    setIsLoadingFeaturedArticles(true);
    try {
      const featuredResponse = await publicApi.getFeaturedArticles();
      
      if (featuredResponse.success && featuredResponse.data) {
        setDedicatedFeaturedArticles(featuredResponse.data);
      } else {
        setDedicatedFeaturedArticles([]);
      }
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      setDedicatedFeaturedArticles([]);
    } finally {
      setIsLoadingFeaturedArticles(false);
    }
  };

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
    fetchEditorsPickArticles();
    fetchMainArticles();
    fetchRegularArticles();
    fetchFeaturedArticles();
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
    await Promise.all([
      fetchAllData(),
      fetchEditorsPickArticles(),
      fetchMainArticles(),
      fetchRegularArticles(),
      fetchFeaturedArticles()
    ]);
  };

  const value: PublicDataContextType = {
    // Articles
    articles,
    featuredArticles,
    trendingArticles,
    editorsPickArticles,
    regularArticles,
    dedicatedFeaturedArticles,
    mainArticle,
    secondMainArticle,
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
    isLoadingEditorsPick,
    isLoadingMainArticles,
    isLoadingRegularArticles,
    isLoadingFeaturedArticles,
    
    // Refresh data
    refreshData
  };

  return (
    <PublicDataContext.Provider value={value}>
      {children}
    </PublicDataContext.Provider>
  );
};