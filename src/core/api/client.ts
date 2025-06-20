import { config } from '@/config/environments';
import type { ApiResponse, ApiError } from '@/shared/types';

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = config.RAILWAY_API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
    };

    // Merge custom headers
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Upload file
  async upload<T>(endpoint: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      // Remove Content-Type to let browser set it with boundary for multipart/form-data
    };
    delete headers['Content-Type'];

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export individual methods for convenience
export const { get, post, put, patch, delete: del, upload } = apiClient; 