/**
 * Base API service template for LingarIAn Citizen Apps
 *
 * This service provides:
 * - Consistent error handling
 * - Proper API endpoint structure (/api/ prefix)
 * - Environment-based configuration
 * - Network error handling
 *
 * AI agents should extend this for domain-specific services
 */

// Construct API base URL from environment variables
const getApiBaseUrl = (): string => {
  const shellAppApiUrl = import.meta.env.VITE_SHELL_APP_API_URL;
  const appName = import.meta.env.VITE_APP_NAME;
  
  if (shellAppApiUrl && appName) {
    // Remove trailing slash from shellAppApiUrl if present
    const baseUrl = shellAppApiUrl.endsWith('/') 
      ? shellAppApiUrl.slice(0, -1) 
      : shellAppApiUrl;
    return `${baseUrl}/${appName}`;
  }
  
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Base API service class
 * Provides standard HTTP methods with consistent error handling
 */
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage: string;

        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.detail || 'Request failed';
        } catch {
          errorMessage = errorText || `HTTP ${response.status}`;
        }

        throw new ApiError(
          errorMessage,
          response.status,
          response.statusText
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return response.text() as T;
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or other errors
      throw new ApiError(
        'Network error or service unavailable',
        0,
        'Network Error'
      );
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export class HealthService {
  private apiService: ApiService;

  constructor(apiService: ApiService = new ApiService()) {
    this.apiService = apiService;
  }

  async checkHealth(): Promise<{ status: string; service: string; message: string }> {
    return this.apiService.get<{ status: string; service: string; message: string }>('/health');
  }
}

// Default instance for use throughout the application
export const apiService = new ApiService();
export const healthService = new HealthService(apiService);
export default apiService;