'use client';

import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthStore {
  token: string | null;
  role: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setToken: (token: string, role?: string) => void;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  role: null,
  user: null,
  isAuthenticated: false,

  setToken: (token: string, role?: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirmaniq_token', token);
      if (role) localStorage.setItem('nirmaniq_role', role);
    }
    set((state) => ({
      token,
      role: role || state.role,
      isAuthenticated: true,
    }));
  },

  login: (token: string, user: AuthUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirmaniq_token', token);
      localStorage.setItem('nirmaniq_role', user.role);
      localStorage.setItem('nirmaniq_user', JSON.stringify(user));
    }
    set({ token, role: user.role, user, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nirmaniq_token');
      localStorage.removeItem('nirmaniq_role');
      localStorage.removeItem('nirmaniq_user');
    }
    set({ token: null, role: null, user: null, isAuthenticated: false });
  },

  initialize: () => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('nirmaniq_token');
      const savedUser = localStorage.getItem('nirmaniq_user');
      const savedRole = localStorage.getItem('nirmaniq_role');
      if (savedToken && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          set({
            token: savedToken,
            role: user.role || savedRole,
            user,
            isAuthenticated: true,
          });
        } catch {
          localStorage.removeItem('nirmaniq_token');
          localStorage.removeItem('nirmaniq_role');
          localStorage.removeItem('nirmaniq_user');
        }
      }
    }
  },
}));
