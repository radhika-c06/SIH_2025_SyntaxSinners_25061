/**
 * API Utilities
 * Helper functions for making authenticated requests to the backend API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Make an authenticated API call
 * Automatically includes credentials (HttpOnly cookies) and JSON headers
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include', // Send cookies with requests
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}`,
      };
    }

    return data as ApiResponse<T>;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Authentication API calls
 */
export const authAPI = {
  register: async (name: string, email: string, password: string, inviteCode?: string) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
        inviteCode,
      }),
    });
  },

  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
};

/**
 * Submission API calls
 */
export const submissionAPI = {
  create: async (data: {
    monasteryName: string;
    location: string;
    contributorName: string;
    contributorEmail: string;
    rawContent?: Record<string, any>;
  }) => {
    return apiCall('/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  list: async (status?: string, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    return apiCall(`/submissions?${params.toString()}`);
  },

  getById: async (id: string) => {
    return apiCall(`/submissions/${id}`);
  },

  review: async (id: string, status: 'approved' | 'rejected', reviewNotes?: string, createMonastery?: boolean) => {
    return apiCall(`/submissions/${id}/review`, {
      method: 'PATCH',
      body: JSON.stringify({
        status,
        reviewNotes,
        createMonastery,
      }),
    });
  },
};

/**
 * Monastery API calls
 */
export const monasteryAPI = {
  list: async (page: number = 1, limit: number = 10, adminMode: boolean = false) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (adminMode) params.append('admin', 'true');

    return apiCall(`/monasteries?${params.toString()}`);
  },

  create: async (data: {
    name: string;
    location: string;
    district?: string;
    altitude?: number;
    founded?: string;
    shortDescription?: string;
    heroImageUrl?: string;
    gallery?: string[];
    sections?: Array<{ key: string; title: string; content: string }>;
  }) => {
    return apiCall('/monasteries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getByIdOrSlug: async (idOrSlug: string, adminMode: boolean = false) => {
    const params = new URLSearchParams();
    if (adminMode) params.append('admin', 'true');

    const url = `/monasteries/${idOrSlug}${params.toString() ? '?' + params.toString() : ''}`;
    return apiCall(url);
  },

  update: async (id: string, data: Partial<any>) => {
    return apiCall(`/monasteries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/monasteries/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Hook for handling API errors
 * Usage: const error = useApiError(response);
 */
export function getApiError(response: ApiResponse): string | null {
  return response.error || null;
}

/**
 * Hook for checking if API call is loading
 * Usage: const [loading, setLoading] = useState(false);
 */
export async function withLoadingState<T>(
  apiPromise: Promise<ApiResponse<T>>,
  onSuccess?: (data: T) => void,
  onError?: (error: string) => void
): Promise<ApiResponse<T>> {
  try {
    const response = await apiPromise;
    if (response.success && response.data) {
      onSuccess?.(response.data);
    } else if (response.error) {
      onError?.(response.error);
    }
    return response;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    onError?.(errorMsg);
    return { success: false, error: errorMsg };
  }
}
