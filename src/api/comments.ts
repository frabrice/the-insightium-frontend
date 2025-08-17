import { getAuthHeaders } from '../utils/auth';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface Comment {
  _id: string;
  articleId: string;
  name: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  name: string;
  email: string;
  content: string;
}

export interface CommentResponse {
  success: boolean;
  message?: string;
  data?: Comment;
  error?: string;
  errors?: Record<string, string>;
}

export interface CommentsListResponse {
  success: boolean;
  data?: {
    comments: Comment[];
    totalComments: number;
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalComments: number;
      hasMore: boolean;
    };
  };
  message?: string;
  error?: string;
}

export interface CommentCountResponse {
  success: boolean;
  data?: {
    commentCount: number;
    articleId: string;
  };
  message?: string;
  error?: string;
}

export const commentsApi = {
  // Create a new comment
  createComment: async (articleId: string, commentData: CreateCommentData): Promise<CommentResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${articleId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(commentData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating comment:', error);
      return {
        success: false,
        error: 'Failed to create comment'
      };
    }
  },

  // Get comments for an article
  getComments: async (
    articleId: string, 
    options: { limit?: number; page?: number; all?: boolean } = {}
  ): Promise<CommentsListResponse> => {
    try {
      const { limit = 3, page = 1, all = false } = options;
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        all: all.toString()
      });

      const response = await fetch(`${API_BASE_URL}/comments/${articleId}?${queryParams}`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting comments:', error);
      return {
        success: false,
        error: 'Failed to get comments'
      };
    }
  },

  // Get comment count for an article
  getCommentCount: async (articleId: string): Promise<CommentCountResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${articleId}/count`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting comment count:', error);
      return {
        success: false,
        error: 'Failed to get comment count'
      };
    }
  },

  // Delete a comment (admin only)
  deleteComment: async (commentId: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/comment/${commentId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting comment:', error);
      return {
        success: false,
        error: 'Failed to delete comment'
      };
    }
  },

  // Get recent comments across all articles
  getRecentComments: async (limit: number = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/recent/all?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error getting recent comments:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to get recent comments'
      };
    }
  }
};