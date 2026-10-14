# Day 7: React Hooks & Side Effects

## Overview
This folder contains the practical exercises, interactive browser demo, and study materials for Day 7 of the NirmanIQ Full-Stack Web Development Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Exercises Implemented

1. **Exercise 1: `useFetch<T>(url)` Custom Hook** (`exercises/exercise-1-use-fetch.ts`)
   - Simple generic hook returning `{ data, loading, error }`.
   - Automatically executes on URL change and catches errors cleanly.

2. **Exercise 2: `<ProjectDashboard />`** (`exercises/exercise-2-project-dashboard.tsx`)
   - Fetches site data using `useFetch`.
   - Displays loading state, error alert, and clean project metrics card.

3. **Exercise 3: `useDebounce<T>(value, delay)` & Activity Search** (`exercises/exercise-3-activity-search.tsx`)
   - Debounces search query with 300ms delay to keep UI responsive.
   - Filters 100 site activities dynamically without input stutter.

4. **Exercise 4: `useLocalStorage<T>(key, initialValue)` & View Switcher** (`exercises/exercise-4-local-storage-view.tsx`)
   - Reads and writes to browser `localStorage` with JSON parsing and fallback.
   - Persists user preference ('grid' vs 'list' view).

5. **Composite App** (`exercises/App.tsx`)
   - Single dashboard combining all 3 exercises with tab switching.

---

## How to Run & Test

### 1. Run the Independent React Vite Project (Recommended)
Navigate into the `day7` folder and run standard React project commands:

```bash
cd day7

# Start local development server with Hot Module Replacement (Port 3007):
npm run dev

# Build the production bundle:
npm run build

# Preview the production build:
npm run preview
```

*Or directly from the workspace root:*
```bash
npm run day7:dev     # Starts Day 7 Vite dev server
npm run day7:build   # Builds Day 7 production bundle
```

### 2. Run Headless Unit Tests & Type Check
From the project root:
```bash
npm run day7:test   # Runs logic tests (100 activities, debounce, storage)
npm run typecheck   # Runs strict TypeScript checks
```

---

## Study Materials
- [`study_material.txt`](study_material.txt): Complete 11-chapter study guide with beginner explanations, compact intern code, and explicit output (`o/p:`) blocks.
- [`study_material.pdf`](study_material.pdf): High-quality A4 PDF format.
