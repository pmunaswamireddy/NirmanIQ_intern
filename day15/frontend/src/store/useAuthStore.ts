'use client';

import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  role: 'SITE_ENGINEER' | 'PROJECT_MANAGER' | 'SUPER_ADMIN' | string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (token: string, user: AuthUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirmaniq_token', token);
      localStorage.setItem('nirmaniq_user', JSON.stringify(user));
    }
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nirmaniq_token');
      localStorage.removeItem('nirmaniq_user');
    }
    set({ token: null, user: null, isAuthenticated: false });
  },

  initialize: () => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('nirmaniq_token');
      const savedUser = localStorage.getItem('nirmaniq_user');
      if (savedToken && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          set({ token: savedToken, user, isAuthenticated: true });
        } catch {
          localStorage.removeItem('nirmaniq_token');
          localStorage.removeItem('nirmaniq_user');
        }
      }
    }
  },
}));
