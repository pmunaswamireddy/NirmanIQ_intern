# Day 17 — Data Tables, Pagination & Search

This module implements production-grade construction activity data tables using shadcn/ui table primitives, TanStack React Query v5, server-side pagination, URL search params synchronization, debounced filtering, and bulk row actions.

---

## Practical Exercises Overview

### Exercise 1: Activity Log Table with Server-Side Pagination & Sorting
- Hand-built shadcn-style table component with sortable column headers (`Date`, `User`, `Action`, `Tower`, `Floor`, `Status`).
- Server-side pagination with selectable page sizes (10, 25, 50 rows per page).
- TanStack React Query v5 integration with `placeholderData: keepPreviousData` for smooth page transitions without flashing.
- Tested against a simulated server with **520+ mock construction activity records**.

### Exercise 2: Advanced Column Filters & Debounced Search
- Debounced keyword search input with 300ms delay (`useDebounce` hook) preventing request floods.
- Column dropdown filters for `Status` (`APPROVED`, `PENDING`, `IN_REVIEW`, `REJECTED`) and `Assigned User`.
- Date range picker (`From Date` and `To Date`).
- Reset filters action that restores default view.

### Exercise 3: URL Search Params State Synchronization
- Two-way binding between table query state and browser `window.location.search`.
- Browser Back/Forward buttons restore exact table filters and page through `popstate` events.
- Shareable, bookmarkable deep links (e.g. `?page=2&pageSize=25&sort=user&status=APPROVED`).

### Exercise 4: Row Selection & Bulk Actions
- Master checkbox in table header with indeterminate state support.
- Row-level selection checkboxes with active highlight styling.
- Floating Bulk Action Bar showing selection count, `Approve Selected`, `Reject Selected`, and `Deselect All` actions.
- Optimistic/invalidation updates through React Query mutations and console logging.

---

## Commands

```bash
# Run automated test suite (10/10 assertions)
npm run day17:test

# Start Vite dev server on port 3017
npm run day17:dev

# Run TypeScript check and production bundle
npm run day17:build
```
