import { getAuthHeaders } from '../utils/auth';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface ArticleData {
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category_name: string;
  author: string;
  author_bio?: string;
  publish_date?: string;
  read_time?: string;
  tags?: string;
  featured_image: string;
  featured_image_alt?: string;
  additional_images?: any[];
  meta_description?: string;
  status?: string;
  allow_comments?: boolean;
  featured?: boolean;
  trending?: boolean;
  editors_pick?: boolean;
}

export const articlesApi = {
  async createArticle(articleData: ArticleData) {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const error = await response.json();
      // Pass the full error response for validation handling
      const errorMessage = error.message === 'Validation error' 
        ? JSON.stringify(error) 
        : error.message || 'Failed to create article';
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async getArticles(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    featured?: boolean;
    trending?: boolean;
    editors_pick?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);
      if (params.category) queryParams.append('category', params.category);
      if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
      if (params.trending !== undefined) queryParams.append('trending', params.trending.toString());
      if (params.editors_pick !== undefined) queryParams.append('editors_pick', params.editors_pick.toString());
    }

    const response = await fetch(`${API_BASE_URL}/articles?${queryParams}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    return response.json();
  },

  async getTrendingArticles(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);
    }

    const response = await fetch(`${API_BASE_URL}/articles/trending?${queryParams}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trending articles');
    }

    return response.json();
  },

  async getFeaturedArticles(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);
    }

    const response = await fetch(`${API_BASE_URL}/articles/featured?${queryParams}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured articles');
    }

    return response.json();
  },

  async getArticleById(id: string) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    return response.json();
  },

  async updateArticle(id: string, articleData: ArticleData) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const error = await response.json();
      // Pass the full error response for validation handling
      const errorMessage = error.message === 'Validation error' 
        ? JSON.stringify(error) 
        : error.message || 'Failed to update article';
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async deleteArticle(id: string) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete article');
    }

    return response.json();
  },

  async setMainArticle(id: string, position: 'main' | 'second') {
    const response = await fetch(`${API_BASE_URL}/articles/${id}/set-main`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ position }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to set main article');
    }

    return response.json();
  },

  async removeMainArticle(id: string) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}/remove-main`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove main article');
    }

    return response.json();
  },

  async getMainArticles() {
    const response = await fetch(`${API_BASE_URL}/articles/main-articles`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch main articles');
    }

    return response.json();
  },

  async getLatestArticlesExcludingMain(limit: number = 3) {
    const response = await fetch(`${API_BASE_URL}/articles/latest-excluding-main?limit=${limit}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch latest articles');
    }

    return response.json();
  },
};