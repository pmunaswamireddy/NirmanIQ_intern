# Day 8: Next.js App Router & Routing

## Overview
This folder contains the simple, beginner-level Next.js App Router project and exercises for Day 8 of the NirmanIQ Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Exercises Implemented

### Exercise 1: App Router Scaffolding & Dynamic Routing
- `/` (`app/page.tsx` or `exercises/exercise-1-routes.tsx`): Simple Dashboard showing total and active projects.
- `/projects` (`app/projects/page.tsx`): Projects list displaying name, status, and tower count.
- `/projects/[id]` (`app/projects/[id]/page.tsx`): Dynamic project detail route.
- `/projects/[id]/towers/[towerId]` (`app/projects/[id]/towers/[towerId]/page.tsx`): Nested dynamic tower route showing floors.

### Exercise 2: Shared Layout & Responsive Navigation
- `app/layout.tsx` & `components/Navbar.tsx` (and `exercises/exercise-2-shared-layout.tsx`):
  - Desktop: Sidebar navigation with active link highlighting via `usePathname()`.
  - Mobile (screens $\le$ 768px): Automatically collapses into a bottom navigation bar.

### Exercise 3: Loading Skeletons & Error Boundary with Retry
- `app/loading.tsx` & `app/projects/loading.tsx`: Clean loading indicator while server data loads.
- `app/error.tsx`: Client error boundary (`'use client'`) with a **Retry** button.

### Exercise 4: Search Param Status Filter
- `app/projects/page.tsx` & `exercises/exercise-4-search-params.tsx`:
  - Reads `?status=active`, `?status=completed`, or `all` from query parameters and filters projects accordingly.

---

## How to Run

### 1. Run the Next.js Dev Server (Port 3008)
```bash
cd day8
npm run dev
```
Open [http://localhost:3008](http://localhost:3008) in your browser.

### 2. Build for Production
```bash
cd day8
npm run build
```

### 3. Run Unit Tests
From the project root:
```bash
npm run day8:test
```

---

## Study Materials
- [`study_material.txt`](study_material.txt)
- [`study_material.pdf`](study_material.pdf)
