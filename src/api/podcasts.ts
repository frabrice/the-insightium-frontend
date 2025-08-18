import { getAuthHeaders } from '../utils/auth';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface Podcast {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  duration: string;
  guest_id?: string;
  guest_name?: string;
  series_id?: string;
  episode_number?: number;
  image: string;
  youtube_url?: string;
  spotify_url?: string;
  apple_url?: string;
  google_url?: string;
  transcript?: string;
  tags?: string;
  meta_description?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'scheduled';
  publish_date: string;
  plays?: string;
  downloads?: string;
  rating?: number;
  likes?: number;
  comments_count?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PodcastFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  featured?: boolean;
  guest_id?: string;
  series_id?: string;
}

export interface PodcastResponse {
  success: boolean;
  data: Podcast[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message?: string;
  error?: string;
}

export interface SinglePodcastResponse {
  success: boolean;
  data: Podcast;
  message?: string;
  error?: string;
}

export interface PodcastStatsResponse {
  success: boolean;
  data: {
    total: number;
    published: number;
    draft: number;
    featured: number;
    avgRating: number;
    totalPlays: number;
    totalDownloads: number;
    topGuests: Array<{ _id: string; count: number }>;
    seriesBreakdown: Record<string, number>;
  };
  message?: string;
  error?: string;
}

export const podcastsApi = {
  // Get all podcasts with optional filters
  getPodcasts: async (filters: PodcastFilters = {}): Promise<PodcastResponse> => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${API_BASE_URL}/podcasts?${queryParams}`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to fetch podcasts'
      };
    }
  },

  // Get a single podcast by ID
  getPodcastById: async (id: string): Promise<SinglePodcastResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts/${id}`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching podcast:', error);
      return {
        success: false,
        data: {} as Podcast,
        error: 'Failed to fetch podcast'
      };
    }
  },

  // Create a new podcast
  createPodcast: async (podcastData: Omit<Podcast, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<SinglePodcastResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(podcastData)
      });
      const result = await response.json();
      
      // If the response indicates failure, throw an error with the response data
      if (!result.success) {
        const error = new Error(JSON.stringify(result));
        throw error;
      }
      
      return result;
    } catch (error) {
      console.error('Error creating podcast:', error);
      // Re-throw if it's already our formatted error
      if (error instanceof Error && error.message.startsWith('{')) {
        throw error;
      }
      // Otherwise, return a generic error response
      return {
        success: false,
        data: {} as Podcast,
        error: 'Failed to create podcast'
      };
    }
  },

  // Update an existing podcast
  updatePodcast: async (id: string, podcastData: Partial<Podcast>): Promise<SinglePodcastResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(podcastData)
      });
      const result = await response.json();
      
      // If the response indicates failure, throw an error with the response data
      if (!result.success) {
        const error = new Error(JSON.stringify(result));
        throw error;
      }
      
      return result;
    } catch (error) {
      console.error('Error updating podcast:', error);
      // Re-throw if it's already our formatted error
      if (error instanceof Error && error.message.startsWith('{')) {
        throw error;
      }
      // Otherwise, return a generic error response
      return {
        success: false,
        data: {} as Podcast,
        error: 'Failed to update podcast'
      };
    }
  },

  // Delete a podcast
  deletePodcast: async (id: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting podcast:', error);
      return {
        success: false,
        error: 'Failed to delete podcast'
      };
    }
  },

  // Get podcast statistics
  getPodcastStats: async (): Promise<PodcastStatsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts/stats`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching podcast stats:', error);
      return {
        success: false,
        data: {
          total: 0,
          published: 0,
          draft: 0,
          featured: 0,
          avgRating: 0,
          totalPlays: 0,
          totalDownloads: 0,
          topGuests: [],
          seriesBreakdown: {}
        },
        error: 'Failed to fetch podcast statistics'
      };
    }
  }
};