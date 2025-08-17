import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface PublicApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalArticles?: number;
  totalVideos?: number;
  totalShows?: number;
  totalPodcasts?: number;
  hasMore: boolean;
}

export interface PublicArticle {
  _id: string;
  id: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: string;
  author: string;
  authorBio?: string;
  category?: string;
  categoryName?: string;
  featured: boolean;
  trending: boolean;
  publishDate: string;
  views: number;
  readTime?: string;
  tags?: string;
  featured_image?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  allowComments: boolean;
}

export interface PublicVideo {
  _id: string;
  id: string;
  title: string;
  description?: string;
  category: string;
  featured: boolean;
  youtube_url?: string;
  thumbnail?: string;
  thumbnail_url?: string;
  duration?: string;
  views: number;
  creator?: string;
  upload_date?: string;
  tags?: string;
  transcript?: string;
  meta_description?: string;
}

export interface PublicTVShow {
  _id: string;
  id: string;
  title: string;
  description?: string;
  category: string;
  section?: string;
  season_id?: string;
  episode_number?: number;
  featured: boolean;
  is_new?: boolean;
  youtube_url?: string;
  thumbnail?: string;
  duration?: string;
  views: number | string;
  upload_date?: string;
  tags?: string;
  meta_description?: string;
  rating?: number;
  likes?: number;
  comments_count?: number;
}

export interface PublicPodcast {
  _id: string;
  id: string;
  title: string;
  description?: string;
  category: string;
  featured: boolean;
  youtube_url?: string;
  thumbnail?: string;
  duration?: string;
  views: number;
  publish_date?: string;
  tags?: string;
  host?: string;
  guest_name?: string;
}

class PublicAPI {
  // Articles
  async getArticles(params?: {
    category?: string;
    featured?: boolean;
    trending?: boolean;
    limit?: number;
    page?: number;
  }): Promise<PublicApiResponse<{ articles: PublicArticle[]; pagination: PaginationInfo }>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.trending) queryParams.append('trending', 'true');
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());

      const response = await fetch(`${API_BASE_URL}/public/articles?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      return {
        success: false,
        message: 'Failed to fetch articles'
      };
    }
  }

  async getArticle(id: string): Promise<PublicApiResponse<PublicArticle>> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/articles/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching article:', error);
      return {
        success: false,
        message: 'Failed to fetch article'
      };
    }
  }

  // Videos
  async getVideos(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  }): Promise<PublicApiResponse<{ videos: PublicVideo[]; pagination: PaginationInfo }>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());

      const response = await fetch(`${API_BASE_URL}/public/videos?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching videos:', error);
      return {
        success: false,
        message: 'Failed to fetch videos'
      };
    }
  }

  async getVideo(id: string): Promise<PublicApiResponse<PublicVideo>> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/videos/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching video:', error);
      return {
        success: false,
        message: 'Failed to fetch video'
      };
    }
  }

  // TV Shows
  async getTVShows(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  }): Promise<PublicApiResponse<{ tvShows: PublicTVShow[]; pagination: PaginationInfo }>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());

      const response = await fetch(`${API_BASE_URL}/public/tvshows?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      return {
        success: false,
        message: 'Failed to fetch TV shows'
      };
    }
  }

  async getTVShow(id: string): Promise<PublicApiResponse<PublicTVShow>> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/tvshows/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching TV show:', error);
      return {
        success: false,
        message: 'Failed to fetch TV show'
      };
    }
  }

  // Podcasts
  async getPodcasts(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  }): Promise<PublicApiResponse<{ podcasts: PublicPodcast[]; pagination: PaginationInfo }>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());

      const response = await fetch(`${API_BASE_URL}/public/podcasts?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      return {
        success: false,
        message: 'Failed to fetch podcasts'
      };
    }
  }

  // Health check
  async healthCheck(): Promise<PublicApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return {
        success: false,
        message: 'Health check failed'
      };
    }
  }
}

export const publicApi = new PublicAPI();