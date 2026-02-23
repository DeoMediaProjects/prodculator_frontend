/**
 * Backend Authentication Service
 * Frontend auth flows routed through FastAPI backend.
 */

import {
  apiClient,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  subscribeAuthState,
} from './api';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  company?: string;
  role?: string;
  user_type: 'free' | 'paid' | 'b2b' | 'admin';
  credits_remaining?: number;
  plan?: 'free' | 'single' | 'studio';
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser;
}

export class AuthService {
  async signUp(
    email: string,
    password: string,
    metadata?: {
      name?: string;
      company?: string;
      role?: string;
    }
  ): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const data = await apiClient.post<TokenResponse>('/api/auth/signup', {
        email,
        password,
        name: metadata?.name,
        company: metadata?.company,
        role: metadata?.role,
      });
      setTokens(data.access_token, data.refresh_token);
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Sign up failed' };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const data = await apiClient.post<TokenResponse>('/api/auth/signin', { email, password });
      setTokens(data.access_token, data.refresh_token);
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Sign in failed' };
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    try {
      await apiClient.post('/api/auth/signout', undefined, { auth: true });
      clearTokens();
      return { error: null };
    } catch (error) {
      clearTokens();
      return { error: error instanceof Error ? error.message : 'Sign out failed' };
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const token = getAccessToken();
      if (!token) {
        return null;
      }
      return await apiClient.get<AuthUser>('/api/auth/me', { auth: true });
    } catch (_error) {
      return null;
    }
  }

  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      await apiClient.post('/api/auth/reset-password', { email });
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Reset password failed' };
    }
  }

  async resendVerification(email: string): Promise<{ error: string | null }> {
    try {
      await apiClient.post('/api/auth/resend-verification', { email });
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Resend verification failed' };
    }
  }

  async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      await apiClient.post('/api/auth/update-password', { new_password: newPassword }, { auth: true });
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Update password failed' };
    }
  }

  async refreshSession(): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return { user: null, error: 'No refresh token available' };
      }

      const data = await apiClient.post<TokenResponse>('/api/auth/refresh', {
        refresh_token: refreshToken,
      });
      setTokens(data.access_token, data.refresh_token);
      return { user: data.user, error: null };
    } catch (error) {
      clearTokens();
      return { user: null, error: error instanceof Error ? error.message : 'Token refresh failed' };
    }
  }

  async adminSignIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const data = await apiClient.post<TokenResponse>('/api/auth/admin/signin', { email, password });
      if (data.user.user_type !== 'admin') {
        return { user: null, error: 'Access denied - admin privileges required' };
      }
      setTokens(data.access_token, data.refresh_token);
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Admin sign in failed' };
    }
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    const unsubscribe = subscribeAuthState(async (authenticated) => {
      if (!authenticated) {
        callback(null);
        return;
      }
      const user = await this.getCurrentUser();
      callback(user);
    });

    return {
      data: {
        subscription: {
          unsubscribe,
        },
      },
    };
  }
}

export const authService = new AuthService();
