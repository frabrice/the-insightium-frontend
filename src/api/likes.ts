import { getAuthHeaders } from '../utils/auth';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface LikeResponse {
  success: boolean;
  message?: string;
  likeCount?: number;
  error?: string;
}

export interface LikeCountResponse {
  success: boolean;
  data?: {
    likeCount: number;
    articleId: string;
  };
  message?: string;
  error?: string;
}

export const likesApi = {
  // Increment like count for an article
  incrementLike: async (articleId: string): Promise<LikeResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/likes/${articleId}/increment`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error incrementing like:', error);
      return {
        success: false,
        error: 'Failed to increment like'
      };
    }
  },

  // Decrement like count for an article
  decrementLike: async (articleId: string): Promise<LikeResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/likes/${articleId}/decrement`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error decrementing like:', error);
      return {
        success: false,
        error: 'Failed to decrement like'
      };
    }
  },

  // Get like count for an article
  getLikeCount: async (articleId: string): Promise<LikeCountResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/likes/${articleId}`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting like count:', error);
      return {
        success: false,
        error: 'Failed to get like count'
      };
    }
  },

  // Get most liked articles
  getMostLikedArticles: async (limit: number = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/likes/most-liked/articles?limit=${limit}`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting most liked articles:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to get most liked articles'
      };
    }
  }
};