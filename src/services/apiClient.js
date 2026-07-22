// src/services/apiClient.js

const API_BASE_URL = 'https://chester-recetas-back-sigma.vercel.app/api/v1';
const DEFAULT_TIMEOUT = 30000;

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeToRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = [];
};

const fetchWithTimeout = async (url, options, timeout) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }
        throw error;
    }
};

export class ApiError extends Error {
    constructor(message, status, statusText, endpoint, method, responseBody) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
        this.endpoint = endpoint;
        this.method = method;
        this.responseBody = responseBody;
    }
}

export const apiClient = async (endpoint, options = {}) => {
    const method = options.method || 'GET';
    const { token, skipAuth, timeout = DEFAULT_TIMEOUT, ...customOptions } = options;

    const getToken = () => {
        if (token) return token;
        return localStorage.getItem('accessToken') || undefined;
    };

    const executeRequest = async (customToken) => {
        const finalToken = customToken || getToken();
        const isFormData = customOptions.body instanceof FormData;

        const headers = {
            ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {}),
            ...(isFormData
                ? {}
                : { 'Content-Type': 'application/json', Accept: 'application/json' }),
            ...customOptions.headers,
        };

        const response = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
            ...customOptions,
            headers,
        }, timeout);

        const responseText = await response.text();
        let responseData;

        try {
            responseData = responseText ? JSON.parse(responseText) : null;
        } catch {
            responseData = { raw: responseText };
        }

        if (!response.ok) {
            throw new ApiError(
                responseData?.message || responseData?.error || `Error ${response.status}`,
                response.status,
                response.statusText,
                endpoint,
                method,
                responseData
            );
        }

        return responseData;
    };

    try {
        return await executeRequest();
    } catch (error) {
        if (error instanceof ApiError && error.status === 401 && !skipAuth) {
            const isLoginEndpoint = endpoint === '/auth/login' || endpoint === '/auth/signin';
            
            if (isLoginEndpoint) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                throw error;
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    subscribeToRefresh(async (newToken) => {
                        try {
                            const result = await executeRequest(newToken);
                            resolve(result);
                        } catch (refreshError) {
                            reject(refreshError);
                        }
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken }),
                });

                const refreshData = await refreshResponse.json();

                if (!refreshResponse.ok) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    onRefreshed('');
                    isRefreshing = false;
                    window.location.href = '/login';
                    throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
                }

                const newAccessToken = refreshData.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                if (refreshData.refreshToken) {
                    localStorage.setItem('refreshToken', refreshData.refreshToken);
                }

                onRefreshed(newAccessToken);
                isRefreshing = false;

                const retryResult = await executeRequest(newAccessToken);
                return retryResult;

            } catch (refreshError) {
                isRefreshing = false;
                refreshSubscribers = [];
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                throw refreshError;
            }
        }

        throw error;
    }
};

export const api = {
    get: (endpoint, options = {}) =>
        apiClient(endpoint, { ...options, method: 'GET' }),

    post: (endpoint, data, options = {}) =>
        apiClient(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),

    put: (endpoint, data, options = {}) =>
        apiClient(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),

    delete: (endpoint, options = {}) =>
        apiClient(endpoint, { ...options, method: 'DELETE' }),

    patch: (endpoint, data, options = {}) =>
        apiClient(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) }),

    upload: (endpoint, formData, options = {}) =>
        apiClient(endpoint, { ...options, method: 'PUT', body: formData }),

    uploadPost: (endpoint, formData, options = {}) =>
        apiClient(endpoint, { ...options, method: 'POST', body: formData }),
};