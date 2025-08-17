import { getAuthHeaders } from '../utils/auth';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface TVShow {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  section: string;
  season_id?: string;
  episode_number?: number;
  thumbnail: string;
  youtube_url: string;
  tags?: string;
  meta_description?: string;
  featured: boolean;
  is_new: boolean;
  rating: number;
  status: 'draft' | 'published' | 'scheduled';
  upload_date: string;
  views?: string;
  likes?: number;
  comments_count?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TVShowFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  is_new?: boolean;
}

export interface TVShowResponse {
  success: boolean;
  data: TVShow[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message?: string;
  error?: string;
}

export interface SingleTVShowResponse {
  success: boolean;
  data: TVShow;
  message?: string;
  error?: string;
}

export interface TVShowStatsResponse {
  success: boolean;
  data: {
    total: number;
    published: number;
    draft: number;
    featured: number;
    new: number;
    avgRating: number;
    categoryBreakdown: Record<string, number>;
  };
  message?: string;
  error?: string;
}

export const tvShowsApi = {
  // Get all TV shows with optional filters
  getTVShows: async (filters: TVShowFilters = {}): Promise<TVShowResponse> => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${API_BASE_URL}/tvshows?${queryParams}`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch TV shows'
      };
    }
  },

  // Get a single TV show by ID
  getTVShowById: async (id: string): Promise<SingleTVShowResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tvshows/${id}`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching TV show:', error);
      return {
        success: false,
        data: {} as TVShow,
        error: 'Failed to fetch TV show'
      };
    }
  },

  // Create a new TV show
  createTVShow: async (tvShowData: Omit<TVShow, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<SingleTVShowResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tvshows`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(tvShowData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating TV show:', error);
      return {
        success: false,
        data: {} as TVShow,
        error: 'Failed to create TV show'
      };
    }
  },

  // Update an existing TV show
  updateTVShow: async (id: string, tvShowData: Partial<TVShow>): Promise<SingleTVShowResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tvshows/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(tvShowData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating TV show:', error);
      return {
        success: false,
        data: {} as TVShow,
        error: 'Failed to update TV show'
      };
    }
  },

  // Delete a TV show
  deleteTVShow: async (id: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tvshows/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting TV show:', error);
      return {
        success: false,
        error: 'Failed to delete TV show'
      };
    }
  },

  // Get TV show statistics
  getTVShowStats: async (): Promise<TVShowStatsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tvshows/stats`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching TV show stats:', error);
      return {
        success: false,
        data: {
          total: 0,
          published: 0,
          draft: 0,
          featured: 0,
          new: 0,
          avgRating: 0,
          categoryBreakdown: {}
        },
        error: 'Failed to fetch TV show statistics'
      };
    }
  }
};