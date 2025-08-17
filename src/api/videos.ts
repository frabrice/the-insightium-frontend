import { getAuthHeaders } from '../utils/auth';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface VideoData {
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  duration?: string;
  category_name: string;
  author: string;
  publish_date?: string;
  tags?: string;
  status?: string;
  featured?: boolean;
  trending?: boolean;
}

export const videosApi = {
  async createVideo(videoData: VideoData) {
    const response = await fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(videoData),
    });

    if (!response.ok) {
      const error = await response.json();
      // Pass the full error response for validation handling
      const errorMessage = error.message === 'Validation error' 
        ? JSON.stringify(error) 
        : error.message || 'Failed to create video';
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async getVideos(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    featured?: boolean;
    trending?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);
      if (params.category) queryParams.append('category', params.category);
      if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
      if (params.trending !== undefined) queryParams.append('trending', params.trending.toString());
    }

    const response = await fetch(`${API_BASE_URL}/videos?${queryParams}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    return response.json();
  },

  async getVideoById(id: string) {
    const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }

    return response.json();
  },

  async updateVideo(id: string, videoData: VideoData) {
    const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(videoData),
    });

    if (!response.ok) {
      const error = await response.json();
      // Pass the full error response for validation handling
      const errorMessage = error.message === 'Validation error' 
        ? JSON.stringify(error) 
        : error.message || 'Failed to update video';
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async deleteVideo(id: string) {
    const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete video');
    }

    return response.json();
  },
};