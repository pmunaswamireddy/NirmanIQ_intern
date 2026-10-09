# Day 10: State Management & Data Fetching (TanStack React Query + Zustand)

## Overview
This folder contains the practical exercises, independent Next.js project, and study materials for Day 10 of the NirmanIQ Full-Stack Web Development Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Architecture & Exercises Implemented

1. **Exercise 1: TanStack React Query Setup & `useProjects` Hook** (`lib/useProjects.ts` & `exercises/exercise-1-react-query.tsx`)
   - Configured `QueryClientProvider` in `app/providers.tsx` with automatic caching and stale-while-revalidate.
   - Built `useProjects()` hook with `useQuery` fetching from simulated asynchronous API (`lib/api.ts`).
   - Clean UI handling for `isLoading`, `isError`, and data rendering.

2. **Exercise 2: Optimistic Mutation & Cache Rollback** (`lib/useCreateProject.ts` & `exercises/exercise-2-optimistic-mutation.tsx`)
   - Built `useCreateProject()` with `useMutation`.
   - `onMutate`: Optimistically updates the projects cache (`queryClient.setQueryData`) with temporary ID so user sees the new item immediately.
   - `onError`: Automatically rolls back to the previous snapshot if server rejects the mutation.
   - `onSettled`: Invalidates and refetches `['projects']` to synchronize with server.

3. **Exercise 3: Zustand Client State Stores** (`lib/stores.ts` & `exercises/exercise-3-zustand-stores.tsx`)
   - `useAuthStore`: Manages `user`, `token`, and `isAuthenticated`. Actions for `login` and `logout`, persisting token to `localStorage`.
   - `useUIStore`: Manages client-only UI state: `sidebarOpen`, `viewMode` ('grid' vs 'table'), and `statusFilter`.

4. **Exercise 4: Coordinated State Architecture** (`exercises/exercise-4-combined-dashboard.tsx` & `app/page.tsx`)
   - Integrates React Query for server data fetching and Zustand for UI state.
   - Interactive status filtering ('all', 'active', 'completed') and view mode toggle ('grid' vs 'table') seamlessly wired together.

---

## How to Run

### 1. Run the Independent Next.js Dev Server (Port 3010)
Navigate into the `day10` folder:

```bash
cd day10

# Start local dev server (Port 3010):
npm run dev

# Build the production bundle:
npm run build

# Start production server:
npm run start
```

*Or directly from the workspace root:*
```bash
npm run day10:dev     # Starts Day 10 dev server on http://localhost:3010
npm run day10:build   # Compiles Day 10 production build
npm run day10:test    # Runs automated verification tests
```

### 2. Run Automated Verification Tests
From the workspace root:
```bash
npm run day10:test
```
Verifies mock API responses, project creation mutation, and Zustand auth/UI store actions.

---

## Study Materials
- Text summary: [`study_material.txt`](study_material.txt)
- Formatted PDF handbook: [`study_material.pdf`](study_material.pdf)
