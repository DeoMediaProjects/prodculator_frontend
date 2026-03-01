const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

const ACCESS_TOKEN_KEY = 'prodculator_access_token';
const REFRESH_TOKEN_KEY = 'prodculator_refresh_token';
const ADMIN_SESSION_KEY = 'prodculator_admin_session';

type AuthListener = (authenticated: boolean) => void;
const authListeners = new Set<AuthListener>();

function emitAuthChange(authenticated: boolean) {
  authListeners.forEach((listener) => listener(authenticated));
}

export function subscribeAuthState(listener: AuthListener) {
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  emitAuthChange(true);
}

// Like setTokens but does NOT emit an auth-state change event.
// Use for admin sign-in so the regular-user onAuthStateChange listener
// does not fire and call /api/auth/me with an admin token.
export function setTokensSilent(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(ADMIN_SESSION_KEY, 'true');
}

export function isAdminSession(): boolean {
  return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ADMIN_SESSION_KEY);
  emitAuthChange(false);
}

// ---------------------------------------------------------------------------
// Token refresh interceptor
// A singleton promise ensures that if multiple requests fail with 401
// simultaneously, only one refresh call is made; the rest wait for it.
// ---------------------------------------------------------------------------
let refreshPromise: Promise<boolean> | null = null;

async function attemptTokenRefresh(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return false;

      const endpoint = isAdminSession() ? '/api/admin/auth/refresh' : '/api/auth/refresh';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      if (isAdminSession()) {
        setTokensSilent(data.access_token, data.refresh_token);
      } else {
        setTokens(data.access_token, data.refresh_token);
      }
      return true;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ---------------------------------------------------------------------------
// Core request function
// ---------------------------------------------------------------------------
type RequestOptions = RequestInit & {
  auth?: boolean;
  _isRetry?: boolean; // internal — prevents infinite refresh loops
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth = false, _isRetry = false, headers, ...init } = options;
  const requestHeaders = new Headers(headers || {});
  if (auth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: requestHeaders,
  });

  // On 401, attempt a silent token refresh and retry the request once.
  // The _isRetry guard prevents an infinite loop if the refresh itself fails.
  if (response.status === 401 && auth && !_isRetry) {
    const refreshed = await attemptTokenRefresh();
    if (refreshed) {
      return request<T>(path, { ...options, _isRetry: true });
    }
    // Refresh failed — the session is unrecoverable; force a logout.
    clearTokens();
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const detail =
      typeof payload === 'object' && payload !== null
        ? (payload as { detail?: string }).detail || JSON.stringify(payload)
        : String(payload);
    throw new Error(detail || `Request failed (${response.status})`);
  }

  return payload as T;
}

export const apiClient = {
  baseUrl: API_BASE_URL,
  get: <T>(path: string, options: RequestOptions = {}) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options: RequestOptions = {}) =>
    request<T>(path, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown, options: RequestOptions = {}) =>
    request<T>(path, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string, options: RequestOptions = {}) =>
    request<T>(path, { ...options, method: 'DELETE' }),
  upload: <T>(path: string, formData: FormData, options: RequestOptions = {}) =>
    request<T>(path, {
      ...options,
      method: 'POST',
      body: formData,
    }),
};
