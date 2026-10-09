import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Exercise 3: useAuthStore with localStorage persistence
interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}

const safeStorage = createJSONStorage(() => {
  if (typeof window !== 'undefined') return window.localStorage;
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: 'Alex Dev',
      token: 'jwt-mock-token-xyz',
      isAuthenticated: true,
      login: (username, token) =>
        set({ user: username, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'nirmaniq-auth-storage',
      storage: safeStorage,
    }
  )
);

// Exercise 3: useUIStore for client-only UI state
interface UIState {
  sidebarOpen: boolean;
  viewMode: 'grid' | 'table';
  statusFilter: string; // 'all' | 'active' | 'completed'
  toggleSidebar: () => void;
  setViewMode: (mode: 'grid' | 'table') => void;
  setStatusFilter: (filter: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  viewMode: 'grid',
  statusFilter: 'all',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
}));
