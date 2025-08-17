import { getAuthHeaders } from '../utils/auth';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export const dashboardApi = {
  async getDashboardStats() {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return response.json();
  },

  async getRecentArticles(limit = 3) {
    const response = await fetch(`${API_BASE_URL}/dashboard/recent-articles?limit=${limit}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recent articles');
    }

    return response.json();
  },

  async getDashboardAnalytics() {
    const response = await fetch(`${API_BASE_URL}/dashboard/analytics`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard analytics');
    }

    return response.json();
  },
};