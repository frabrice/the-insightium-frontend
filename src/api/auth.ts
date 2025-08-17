import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      lastLogin?: string;
    };
    resetToken?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile?: {
    bio?: string;
    phone?: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  bio?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class AuthAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success && data.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('user_data', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const data = await response.json();

      // Clear local storage regardless of response
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');

      return data;
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage on error
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      return {
        success: true,
        message: 'Logged out successfully'
      };
    }
  }

  async getMe(): Promise<{ success: boolean; data?: User; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        // Clear invalid token
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }

      return data;
    } catch (error) {
      console.error('Get me error:', error);
      return {
        success: false,
        message: 'Failed to fetch user data'
      };
    }
  }

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      return await response.json();
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  async resetPassword(resetToken: string, password: string, confirmPassword: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resetpassword/${resetToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, confirmPassword })
      });

      const data = await response.json();

      if (data.success && data.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('user_data', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  async changePassword(passwordData: ChangePasswordData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/changepassword`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(passwordData)
      });

      return await response.json();
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  async updateProfile(profileData: ProfileUpdateData): Promise<{ success: boolean; data?: User; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/updateprofile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (data.success && data.data) {
        localStorage.setItem('user_data', JSON.stringify(data.data));
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}

export const authApi = new AuthAPI();