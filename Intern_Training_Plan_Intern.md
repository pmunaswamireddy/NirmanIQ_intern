# NirmanIQ Intern Training Plan — 90 Days

**Welcome to NirmanIQ!** You're joining India's first AI-powered construction progress intelligence platform. Over the next 90 days, you'll learn full-stack development (Next.js + NestJS + PostgreSQL) and work on real product features used by construction companies across India.

**Format:** Remote, 45 hrs/week. Daily standup (15 min). Weekly 1:1 with tech lead.
**AI tools:** No AI coding assistants (ChatGPT, Copilot, Claude) during Days 1–45. You must build foundational understanding by reading docs, writing code, and debugging yourself. Claude Code will be introduced from Day 46 onwards as a productivity tool.
**Start date:** ___________

---

## How This Works

- Each day has **Concepts** (theory/reading, ~2-3 hrs) and **Practical** (hands-on exercises, ~4-5 hrs).
- Submit daily work via GitHub PRs to your personal `training/<your-name>` branch.
- Every Friday: **Demo Day** — you demo what you built that week (15 min).
- Mentor reviews your PRs with feedback by next morning. Code quality bar rises each week.
- **Checkpoint assessments** at Day 15, Day 30, and Day 45 — practical mini-projects graded on correctness, code quality, and completeness.

---

## Daily Schedule

| Time | Activity | Notes |
|------|----------|-------|
| 8:00 PM | Daily standup (15 min) | What I did, what I'll do, blockers |
| 10:15 – 12:30 | Concept study / Reading | Use official docs, not random tutorials |
| 12:30 – 1:30 | Lunch break | |
| 1:30 – 5:30 | Practical exercises | Code, build, commit, push |
| 5:30 – 6:00 | Daily summary (Slack message) | What I learned, what I built, questions |
| 6:00 – 7:00 | PR cleanup + review responses | Address mentor feedback on previous PRs |

---

## Phase 0: Environment Setup (Day 0 — before Day 1)

### Pre-joining checklist
- [ ] Install: Node.js 20 LTS, VS Code, Git, Docker Desktop, PostgreSQL 16, Redis, Postman
- [ ] VS Code extensions: ESLint, Prettier, Tailwind CSS IntelliSense, Thunder Client, GitLens
- [ ] Create GitHub account (if none), share username for repo access
- [ ] Clone training repo, run `npm install`, verify `npm run dev` starts
- [ ] Read: [NirmanIQ website](http://nirmaniq.com) — understand what we build and for whom
- [ ] Bookmark: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/), [React docs](https://react.dev), [NestJS docs](https://docs.nestjs.com), [Next.js docs](https://nextjs.org/docs), [MDN Web Docs](https://developer.mozilla.org)

---

## Phase 1: Foundations (Days 1–15) — "Think in TypeScript & Web"

### Week 1 (Days 1–5): JavaScript, TypeScript & Web Fundamentals

#### Day 1 — JavaScript for Python Developers
**Concepts (2 hrs):**
- JS vs Python: dynamic typing similarities, key differences (prototypes, `this`, closures, event loop)
- Variables: `const` vs `let` (never `var`) — compare with Python's rebinding
- Data types: primitives, objects, arrays. Truthy/falsy quirks (`0`, `""`, `null`, `undefined`)
- String templates (backticks) vs Python f-strings
- Destructuring (arrays and objects) — no Python equivalent, critical for React

**Practical (5 hrs):**
- Exercise 1: Rewrite 5 Python functions in JavaScript (fibonacci, palindrome check, array rotation, object grouping, flatten nested arrays)
- Exercise 2: Practice destructuring — extract nested data from a sample JSON (construction project data: towers, floors, rooms)
- Exercise 3: Array methods challenge — use `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()` on a dataset of 50 construction tasks (no for-loops allowed)

**Deliverable:** PR with all exercises. README explaining 3 things that surprised you about JS vs Python.

---

#### Day 2 — Async JavaScript & the Event Loop
**Concepts (2 hrs):**
- The event loop — why JS is single-threaded but non-blocking (vs Python's GIL)
- Callbacks → Promises → async/await evolution
- `Promise.all()`, `Promise.allSettled()`, `Promise.race()` — parallel vs sequential
- Error handling: try/catch with async/await, `.catch()` on promises
- `fetch()` API — making HTTP requests (compare with Python's `requests`)

**Practical (5 hrs):**
- Exercise 1: Build a CLI script that fetches data from 3 public APIs in parallel using `Promise.all()`, merges results, writes to a JSON file
- Exercise 2: Implement a retry function — `fetchWithRetry(url, maxRetries)` with exponential backoff
- Exercise 3: Build an async task queue — process N items with concurrency limit of 3 (simulates NirmanIQ's video processing queue)

**Deliverable:** PR with exercises. Diagram (hand-drawn is fine) showing event loop for one of your exercises.

---

#### Day 3 — TypeScript Essentials (Part 1)
**Concepts (3 hrs):**
- Why TypeScript: catch bugs at compile time, self-documenting code, IDE superpowers
- Type annotations: primitives, arrays, objects, function signatures
- `interface` vs `type` — when to use which (our convention: `interface` for shapes, `type` for unions)
- Union types (`string | number`), literal types (`'active' | 'inactive'`), optional properties (`?`)
- Generics basics: `Array<T>`, writing generic functions
- `unknown` vs `any` — why we ban `any` (compare with Python's type hints)

**Practical (5 hrs):**
- Exercise 1: Type a construction project data model — `Project`, `Tower`, `Floor`, `Room`, `ProgressEntry` interfaces
- Exercise 2: Rewrite Day 1 JS exercises in TypeScript with strict mode. Fix all type errors.
- Exercise 3: Build a type-safe `Map`-like data structure with generics: `get<T>(key): T | undefined`, `set<T>(key, value: T): void`
- Exercise 4: Use discriminated unions to model NirmanIQ task states: `{ status: 'pending' }`, `{ status: 'in_progress', assignee: string }`, `{ status: 'completed', completedAt: Date, reviewer: string }`

**Deliverable:** PR with exercises. All must compile with `tsc --strict` and zero errors.

---

#### Day 4 — TypeScript Essentials (Part 2) + Tooling
**Concepts (2 hrs):**
- Utility types: `Partial<T>`, `Pick<T>`, `Omit<T>`, `Record<K,V>`, `Required<T>`
- Type narrowing: type guards (`typeof`, `in`, custom type guards with `is`)
- Enums vs union literal types (we prefer unions)
- `tsconfig.json` — understanding strict mode options
- ESLint + Prettier setup — automated code quality (our config)

**Practical (5 hrs):**
- Exercise 1: Build a CRUD-style type system — `CreateProjectDto` (all required), `UpdateProjectDto` (all optional via `Partial`), `ProjectResponse` (includes `id`, `createdAt`, `updatedAt`)
- Exercise 2: Write type guards for a union type `APIResponse = SuccessResponse | ErrorResponse | ValidationError` and a function that handles each case
- Exercise 3: Set up a TypeScript project from scratch with `tsconfig.json` (strict), ESLint, Prettier. Make `npm run lint` and `npm run build` pass with zero warnings.
- Exercise 4: Configure and run ESLint — intentionally introduce 5 lint violations, then fix them

**Deliverable:** PR with working TypeScript project. `npm run lint` and `npm run build` must pass.

---

#### Day 5 — Git Workflow & HTML/CSS Foundations
**Concepts (2 hrs):**
- Git beyond basics: branching strategy (`feat/`, `fix/`, `chore/`), rebasing vs merging, resolving conflicts
- Commit message conventions: imperative mood, concise ("Add tower risk endpoint")
- PR workflow: draft PRs, code review etiquette, requesting reviews
- HTML semantics: `<nav>`, `<main>`, `<section>`, `<article>`, `<button>` — why not `<div>` for everything (accessibility)
- CSS Box Model, Flexbox, Grid — the layout trinity

**Practical (5 hrs):**
- Exercise 1: Git kata — create a repo, make branches, create intentional merge conflicts, resolve them. Practice interactive rebase to squash commits.
- Exercise 2: Build a static HTML/CSS page — a "Tower Progress Card" showing: tower name, floor count, progress bar (% complete), risk status badge (green/amber/red). Mobile-first (360px → 768px → 1024px). Use semantic HTML.
- Exercise 3: Build a responsive navigation bar with hamburger menu (CSS only, no JS). Must be keyboard-accessible (Tab, Enter).
- **Friday Demo:** Show the Tower Progress Card on different screen sizes. Explain Git workflow.

**Deliverable:** PR following our branching convention. HTML passes WAVE accessibility checker.

---

### Week 2 (Days 6–10): React & Next.js Foundations

#### Day 6 — React Core Concepts
**Concepts (3 hrs):**
- React mental model: UI = f(state). Components as functions. Declarative vs imperative.
- JSX — HTML-in-JS (compare with Python's template engines like Jinja2)
- Props: passing data down. Children. Typing props with TypeScript interfaces.
- State with `useState`: immutability, updater functions, state batching
- Conditional rendering, list rendering with `.map()` and `key` prop
- Event handling: `onClick`, `onChange`, `onSubmit` — synthetic events

**Practical (5 hrs):**
- Exercise 1: Build a `<TaskList>` component — add tasks, mark complete, delete, filter (all/active/completed). All typed with TypeScript.
- Exercise 2: Build a `<ProgressBar>` component — accepts `percentage` (0-100), `riskLevel` ('on-track' | 'at-risk' | 'high-risk' | 'critical'), displays colored bar with label. Use NirmanIQ risk colors (#10b981, #f59e0b, #ef4444, #dc2626).
- Exercise 3: Build a `<FloorGrid>` — display a 5x4 grid of floors in a tower. Each floor shows status (not-started, in-progress, completed). Click a floor to toggle status.

**Deliverable:** PR with all components. Each must be type-safe and render without console errors.

---

#### Day 7 — React Hooks & Side Effects
**Concepts (2 hrs):**
- `useEffect`: side effects, dependency arrays, cleanup functions. Mental model: synchronization, not lifecycle.
- `useRef`: DOM references and mutable values that don't trigger re-renders
- `useMemo` and `useCallback`: when (and when NOT) to optimize
- Custom hooks: extracting reusable logic (e.g., `useLocalStorage`, `useFetch`)
- Rules of Hooks: why they must be called at the top level

**Practical (5 hrs):**
- Exercise 1: Build `useFetch<T>(url)` custom hook — returns `{ data, loading, error }`. Type-safe with generics. Test with a public API. (This teaches the pattern — NirmanIQ uses TanStack React Query for this in production, which you'll learn on Day 10.)
- Exercise 2: Build a `<ProjectDashboard>` that fetches project data on mount, shows loading spinner, displays data in cards, handles errors gracefully
- Exercise 3: Build `useDebounce(value, delay)` hook. Use it in a search input that filters a list of 100 construction activities as user types.
- Exercise 4: Build `useLocalStorage<T>(key, initialValue)` — persist state to localStorage. Use it to remember the user's preferred dashboard view (grid vs list).

**Deliverable:** PR with all hooks and components. Hooks must be generic and reusable.

---

#### Day 8 — Next.js App Router & Routing
**Concepts (3 hrs):**
- Next.js vs plain React: file-based routing, server-side rendering, API routes
- App Router: `app/` directory, `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- Server Components vs Client Components: `'use client'` directive — when and why (NirmanIQ convention: server components by default, `'use client'` only for interactivity/hooks)
- Dynamic routes: `[id]`, catch-all `[...slug]`, route groups `(group)`
- `Link` component, `useRouter`, `usePathname`, `useSearchParams`
- Metadata API: `generateMetadata()` for SEO

**Practical (5 hrs):**
- Exercise 1: Scaffold a Next.js app with App Router. Create pages: `/` (dashboard), `/projects` (list), `/projects/[id]` (detail), `/projects/[id]/towers/[towerId]` (tower detail)
- Exercise 2: Add a shared layout with sidebar navigation. Active page highlighted. Responsive — sidebar collapses to bottom nav on mobile.
- Exercise 3: Add `loading.tsx` skeletons for each page. Add `error.tsx` with a retry button.
- Exercise 4: Make the projects list page read a `?status=active` search param and filter accordingly.

**Deliverable:** PR with working Next.js app. Navigation works, layouts nest correctly, loading states work.

---

#### Day 9 — Tailwind CSS & shadcn/ui
**Concepts (2 hrs):**
- Tailwind utility-first philosophy — compare with traditional CSS. Why it works for teams.
- Responsive design: `sm:`, `md:`, `lg:` breakpoints. Mobile-first approach.
- Dark mode: `dark:` variant. CSS variables for theming.
- shadcn/ui: not a component library — it's copy-paste components built on Radix UI primitives
- Radix UI: headless, accessible, composable. Why NirmanIQ uses it (WCAG compliance built-in).

**Practical (5 hrs):**
- Exercise 1: Install shadcn/ui in the Next.js app. Add: Button, Card, Dialog, Table, Select, Input, Badge components. Install Sonner for toasts (NirmanIQ's toast library).
- Exercise 2: Build a "Project List" page using shadcn Table — columns: Name, Status (badge), Progress (bar), Risk Level, Last Updated. Sortable by clicking headers. Responsive — table scrolls horizontally on mobile.
- Exercise 3: Build a "Create Project" dialog form using shadcn Dialog + form components — inputs for Name, Description, Start Date, Tower Count. Validation: all fields required, name 3-100 chars, tower count 1-50. Show inline errors.
- Exercise 4: Build a toast notification system with Sonner — show success/error toasts on form submit. `toast.success('Project created')`, `toast.error('Failed to save')`.

**Deliverable:** PR with styled pages. Must look polished. Test on 360px, 768px, and 1024px viewports.

---

#### Day 10 — State Management & Data Fetching (TanStack React Query + Zustand)
**Concepts (3 hrs):**
- **TanStack React Query (critical — NirmanIQ's primary data-fetching pattern):** `useQuery`, `useMutation`, `QueryClient`, `QueryClientProvider`. Automatic caching, refetching, stale-while-revalidate. Compare with manual `useEffect` + `useState` (Day 7's `useFetch` hook) — React Query handles loading/error/caching/deduplication automatically.
- Query keys: cache identity, invalidation with `queryClient.invalidateQueries()`. Dependent queries.
- Mutations: `useMutation` with `onSuccess` → invalidate related queries. Optimistic updates via `onMutate` + `onError` rollback.
- **Zustand** (for client-only UI state): simple, TypeScript-first. Compare with Redux (verbose) and Context API (re-render issues). NirmanIQ convention: React Query for server state, Zustand for UI state (selected filters, sidebar open, auth token).
- Store patterns: slices, selectors, actions. Persist middleware for auth token.

**Practical (5 hrs):**
- Exercise 1: Set up TanStack React Query in the Next.js app. Create `useProjects()` hook with `useQuery` — fetches from a mock API (or JSON file). Display loading/error/data states. Show devtools.
- Exercise 2: Create `useCreateProject()` mutation with `useMutation` — on success, invalidate the projects query so the list auto-refreshes. Add optimistic update: show new project in list immediately, rollback on error.
- Exercise 3: Create a Zustand `useAuthStore` — `user`, `token`, `isAuthenticated`. Actions: `login`, `logout`. Persist token to localStorage. Create `useUIStore` — `sidebarOpen`, `selectedFilters`.
- Exercise 4: Wire up the Project List page: React Query for data fetching (projects, stats), Zustand for UI state (filters, view mode). Show how they work together.
- **Friday Demo:** Walk through the complete Next.js app — dashboard, project list, project detail, create dialog. Show React Query devtools, caching behavior, and Zustand stores.

**Deliverable:** PR with full working frontend prototype. React Query hooks + Zustand stores must be type-safe.

---

### Week 3 (Days 11–15): Backend Foundations (NestJS + PostgreSQL)

#### Day 11 — NestJS Architecture & First API
**Concepts (3 hrs):**
- NestJS: Angular-inspired Node.js framework. Modules, Controllers, Providers (Services). Dependency Injection.
- Compare with Python Flask/Django: decorators, middleware, request lifecycle
- Modules: organizing code by domain (auth, project, user). `@Module()` decorator.
- Controllers: route handlers. `@Controller()`, `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Param()`, `@Body()`, `@Query()`
- Services: business logic. `@Injectable()`. Constructor injection.
- NestJS CLI: `nest generate module/controller/service`

**Practical (5 hrs):**
- Exercise 1: Create a new NestJS project. Generate a `projects` module with controller and service.
- Exercise 2: Implement CRUD endpoints — `GET /projects`, `GET /projects/:id`, `POST /projects`, `PUT /projects/:id`, `DELETE /projects/:id`. Use in-memory array as data store (no DB yet).
- Exercise 3: Test all endpoints with Postman. Create a Postman collection with all 5 endpoints, sample request bodies, and expected responses.
- Exercise 4: Add a `towers` module. `GET /projects/:id/towers`, `POST /projects/:id/towers`. Nested resources.

**Deliverable:** PR with NestJS API. Postman collection exported as JSON in repo. All endpoints working.

---

#### Day 12 — DTOs, Validation & Error Handling
**Concepts (2 hrs):**
- DTOs (Data Transfer Objects): separate input validation from domain models. Compare with Python's Pydantic.
- `class-validator`: decorators (`@IsString()`, `@IsUUID()`, `@IsEnum()`, `@Min()`, `@Max()`, `@IsOptional()`, `@ValidateNested()`)
- `class-transformer`: `@Exclude()`, `@Expose()`, `@Transform()` — control what goes in/out
- Validation Pipe: `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })` — mass assignment protection
- Exception filters: `HttpException`, `NotFoundException`, `BadRequestException`, custom exceptions

**Practical (5 hrs):**
- Exercise 1: Create DTOs for all project endpoints — `CreateProjectDto`, `UpdateProjectDto`, `ProjectResponseDto`. All validated. `whitelist: true`.
- Exercise 2: Add validation: project name (3-100 chars, trimmed), description (max 500), status (enum: PLANNING, ACTIVE, COMPLETED, ON_HOLD), tower count (1-50).
- Exercise 3: Create a custom `AppException` class and a global exception filter that returns consistent error responses: `{ statusCode, message, error, timestamp, path }`.
- Exercise 4: Test validation — send invalid data to all endpoints via Postman. Verify correct 450 responses with descriptive messages.
- Exercise 5: Create a `TowerDto` with nested validation — `@ValidateNested()` with `@Type(() => FloorDto)`.

**Deliverable:** PR with all DTOs. No endpoint accepts unvalidated input. Test results documented.

---

#### Day 13 — PostgreSQL & TypeORM
**Concepts (3 hrs):**
- PostgreSQL fundamentals: schemas, data types (UUID, JSONB, TIMESTAMPTZ, ENUM), indexing
- SQL refresher: JOINs (INNER, LEFT, RIGHT), subqueries, aggregations, window functions
- TypeORM: entities, repositories, relations (OneToMany, ManyToOne, ManyToMany)
- Migrations: why manual migrations > auto-sync. `typeorm migration:create`, `migration:run`, `migration:revert`
- Our conventions: snake_case tables/columns, UUID PKs, `created_at`/`updated_at`, never `SELECT *`

**Practical (5 hrs):**
- Exercise 1: Set up PostgreSQL in Docker. Create a `nirmaniq_training` database.
- Exercise 2: Create TypeORM entities: `ProjectEntity`, `TowerEntity`, `FloorEntity` with proper relations. Follow NirmanIQ naming conventions.
- Exercise 3: Write a migration that creates the tables. Run it. Then write a second migration that adds an `is_archived` column to projects. Run and revert.
- Exercise 4: Update the NestJS services to use TypeORM repositories instead of in-memory arrays. All CRUD operations must work.
- Exercise 5: Write a raw SQL query to get: "For each project, show the tower count, average floor completion %, and the tower with the highest risk." Then implement the same with TypeORM QueryBuilder.

**Deliverable:** PR with entities, migrations, and updated services. Docker Compose file for PostgreSQL.

---

#### Day 14 — Authentication & Guards
**Concepts (2 hrs):**
- JWT authentication: access token (short-lived, 1hr) + refresh token (long-lived, 30 days, httpOnly cookie)
- NestJS Guards: `@UseGuards()`, `CanActivate` interface. Compare with Python decorators/middleware.
- Role-based access: `@Roles('PE', 'PM', 'SA')` custom decorator + `RolesGuard`
- Passport.js integration with NestJS: strategies (local, JWT)
- Our auth model: SE, PE, PM, PD, CXO, TA, SA roles (explain each)

**Practical (5 hrs):**
- Exercise 1: Create an `auth` module with `register` and `login` endpoints. Hash passwords with bcrypt. Issue JWT tokens.
- Exercise 2: Create `JwtAuthGuard` — protect all project endpoints. Unauthenticated requests return 451.
- Exercise 3: Create `RolesGuard` — `POST /projects` only for PM+, `DELETE /projects/:id` only for SA. Other roles get 453.
- Exercise 4: Implement refresh token rotation — `POST /auth/refresh` issues new access + refresh token, invalidates old refresh token.
- Exercise 5: Create `@CurrentUser()` decorator to extract user from JWT. Use it in controllers.

**Deliverable:** PR with auth system. Test all auth flows with Postman (register, login, access protected routes, refresh, role-denied).

---

#### Day 15 — Checkpoint Assessment #1

**Build a Mini Full-Stack App (8 hrs) — "Tower Progress Tracker"**

**Backend (NestJS):** Auth (JWT), CRUD for Projects + Towers (PostgreSQL + TypeORM), DTOs with validation, role-based access (PM can create/edit, SE can only view and update progress).

**Frontend (Next.js):** Login page, project list with search/filter, project detail showing towers in a grid, tower detail with floor-by-floor progress, "Update Progress" form (SE role), responsive, uses shadcn/ui.

**Pass threshold: 60/100. Below 50 = remediation week before proceeding.**

---

## Phase 2: Intermediate Skills (Days 16–30) — "Build Like Production"

### Week 4 (Days 16–20): Advanced Frontend

#### Day 16 — Forms, Validation & Complex UI Patterns
**Concepts (2 hrs):**
- React Hook Form: performant form handling (compare with controlled inputs)
- Zod: schema validation that generates TypeScript types. `z.object()`, `.refine()`, `.transform()`
- React Hook Form + Zod integration via `@hookform/resolvers`
- Multi-step forms, dynamic field arrays, dependent dropdowns

**Practical (5 hrs):**
- Exercise 1: Build a "Create Project" multi-step form: Step 1 (basic info), Step 2 (tower configuration — dynamic array of towers with name + floor count), Step 3 (review & submit). Zod validation at each step.
- Exercise 2: Build a "Floor Inspection" form — dependent dropdowns (select tower → floors load → select floor → rooms load). File upload input for evidence photos (accept jpg/png, max 10 MB, preview before upload).
- Exercise 3: Build an inline-editable table — click a cell to edit, Tab to next cell, Escape to cancel, Enter to save. Used for bulk progress updates.

**Deliverable:** PR with form components. All validation working, accessible (keyboard navigation, error announcements).

---

#### Day 17 — Data Tables, Pagination & Search
**Concepts (2 hrs):**
- Building data tables with shadcn/ui `<Table>` + React Query — NirmanIQ pattern: hand-built tables using shadcn primitives (not TanStack Table library). Column headers, sorting state, pagination controls.
- Server-side vs client-side pagination. Cursor-based vs offset pagination. React Query's `keepPreviousData` for smooth page transitions.
- Debounced search with `useDebounce` hook (Day 7). URL-synced filters (search params as source of truth).

**Practical (5 hrs):**
- Exercise 1: Build a full-featured data table for "Activity Log" using shadcn `<Table>` — columns: date, user, action, tower, floor, status. Server-side pagination (10/25/50 rows) via React Query. Column sorting by clicking headers.
- Exercise 2: Add column filters — status dropdown (shadcn Select), date range picker, user multi-select
- Exercise 3: Sync all filter/sort/page state to URL search params. Navigating back restores filters. Shareable URLs. Use React Query with filter params as query keys for automatic re-fetching.
- Exercise 4: Add row selection (checkbox column) with bulk actions (approve selected, reject selected)

**Deliverable:** PR with data table. Test with 500+ mock records. Must feel snappy.

---

#### Day 18 — Charts, Dashboards & Data Visualization
**Concepts (2 hrs):**
- Recharts: React charting library. Composable, responsive, accessible.
- Dashboard layout patterns: KPI cards, trend charts, comparison charts
- Responsive charts: container queries, aspect ratios, mobile-friendly legends
- Accessibility in charts: labels, ARIA, keyboard navigation, color-blind safe palettes

**Practical (5 hrs):**
- Exercise 1: Build KPI stat cards — Total Projects, Active Towers, Floors Completed (with % change from last week, up/down arrow)
- Exercise 2: Build a "Project Progress" line chart — X: weeks, Y: % complete. Multiple lines for planned vs actual. Tooltip on hover.
- Exercise 3: Build a "Tower Comparison" bar chart — horizontal bars showing each tower's progress. Color-coded by risk level (use NirmanIQ risk colors + labels).
- Exercise 4: Compose a Dashboard page — KPI cards on top, progress chart in middle, tower comparison below. Responsive grid layout.

**Deliverable:** PR with dashboard. Must look professional. Charts responsive on mobile.

---

#### Day 19 — Error Handling, Loading States & UX Polish
**Concepts (2 hrs):**
- Error boundaries: catching render errors. Recovery strategies.
- Loading patterns: skeletons vs spinners, progressive loading, optimistic UI
- Empty states: "No projects yet" with CTA. Zero-data handling.
- Toast notifications: success/error/warning/info. When to use toast vs inline error.
- Accessibility: focus management, screen reader announcements, keyboard shortcuts

**Practical (5 hrs):**
- Exercise 1: Add error boundaries to the app — page-level and component-level. Custom fallback UI with "Try Again" button.
- Exercise 2: Replace all loading spinners with skeleton components that match the layout of the loaded content
- Exercise 3: Add empty states to: project list (no projects), tower grid (no towers), activity log (no entries). Each with illustration and CTA.
- Exercise 4: Implement keyboard shortcuts — `Ctrl+K` for search, `N` for new project (when not in input), `Escape` to close dialogs.
- Exercise 5: Run axe-core accessibility audit on all pages. Fix all violations.

**Deliverable:** PR with polished UX. Zero axe-core violations. Keyboard-only navigation must work end-to-end.

---

#### Day 20 — Frontend Testing with Vitest & React Testing Library
**Concepts (2 hrs):**
- Testing philosophy: test behavior, not implementation. User-centric testing.
- **Vitest** (NirmanIQ's frontend test runner, not Jest): Jest-compatible API (`describe`, `it`, `expect`) but faster (native ESM, Vite-powered). Config in `vitest.config.ts`. `vi.fn()`, `vi.mock()` instead of `jest.fn()`, `jest.mock()`.
- React Testing Library: `render`, `screen`, `fireEvent`, `waitFor`, `userEvent`
- Mocking React Query hooks: wrap test components in `QueryClientProvider` with a test client. MSW for API mocking.
- Our convention: `describe('Feature', () => { it('should X when Y', ...) })`

**Practical (5 hrs):**
- Exercise 1: Write tests for `<ProgressBar>` — renders correct color for each risk level, shows percentage, handles 0% and 100% edge cases
- Exercise 2: Write tests for `<TaskList>` — add/complete/delete/filter tasks, empty state
- Exercise 3: Write tests for `useAuthStore` (Zustand) — login sets token, logout clears state, persistence works
- Exercise 4: Write tests for "Create Project" form — validation errors, successful submit, loading state during submit. Mock the `useMutation` hook.
- **Friday Demo:** Present the complete frontend app with dashboard, data tables, forms, charts. Show Vitest results. Demo accessibility features.

**Deliverable:** PR with tests. Minimum 80% coverage on components and hooks.

---

### Week 5 (Days 21–25): Advanced Backend

#### Day 21 — Advanced NestJS Patterns (NirmanIQ-Specific)
**Concepts (3 hrs):**
- Interceptors: NirmanIQ uses `CorrelationIdInterceptor` (request tracing), `ResponseEnvelopeInterceptor` (standard `{ data, meta }` wrapping), `TenantContextInterceptor` (inject tenant into request). Understand the pattern, then build your own.
- **PiiSafeLogger (ADR-051 — critical):** Never use raw NestJS `Logger` directly — NirmanIQ's `PiiSafeLogger` masks PII in all log output (email: `a****@domain.com`, phone: `****1234`, name: `J**** D****`). All services must inject `PiiSafeLogger`.
- Custom decorators: `@CurrentUser()`, `@CurrentTenant()`, `@Roles()`, `@Public()`, `@ThrottleType()` — NirmanIQ's decorator library
- **Event Emitter pattern:** `@nestjs/event-emitter` for decoupled side effects (e.g., user registers → emit event → send welcome email, create audit log). Loose coupling between modules.
- Configuration: `@nestjs/config`, environment validation with Joi

**Practical (5 hrs):**
- Exercise 1: Create a `PiiSafeLogger` wrapper — accepts log messages, auto-masks email/phone/name patterns before outputting. Inject via NestJS DI. Use it in all services instead of `console.log` or raw `Logger`.
- Exercise 2: Create `CorrelationIdInterceptor` — generate a UUID per request, attach to response headers (`X-Correlation-Id`), include in all logs for that request. Create `ResponseEnvelopeInterceptor` — wrap all responses in `{ data, meta: { timestamp, correlationId } }`.
- Exercise 3: Create `@Roles()` decorator + `RolesGuard` with hierarchical role checking (SA > TA > PD > CXO > PM > PE > SE). Create `@CurrentUser()` and `@CurrentTenant()` decorators.
- Exercise 4: Implement event-driven notification — when a progress entry is created, emit `'progress.created'` event. A separate `NotificationListener` listens and logs "PE notified about new progress on Tower X, Floor Y."
- Exercise 5: Set up `@nestjs/config` — load from `.env`, validate with Joi (DATABASE_URL, JWT_SECRET, PORT required; NODE_ENV must be development/production/test).

**Deliverable:** PR with all patterns. PiiSafeLogger must be used everywhere — no raw Logger. `.env.example` with all required variables.

---

#### Day 22 — Database Advanced: Relations, Queries, Caching & Performance
**Concepts (3 hrs):**
- TypeORM relations deep dive: `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@JoinColumn`, `@JoinTable`
- Eager vs lazy loading. `relations` option vs QueryBuilder joins.
- Query optimization: `SELECT` specific columns, pagination with `skip`/`take`, indexing strategy
- Transactions: `queryRunner.startTransaction()`, commit/rollback
- **Redis caching (NirmanIQ pattern):** `@nestjs/cache-manager` + `cache-manager-redis-yet`. Cache dashboard queries (expensive aggregations). Cache invalidation strategies: TTL, manual invalidation on write. `@CacheKey()`, `@CacheTTL()` decorators.
- Database seeding: creating realistic test data

**Practical (5 hrs):**
- Exercise 1: Add entities: `User`, `Project`, `Tower`, `Floor`, `ProgressEntry`, `Comment`. Full relations graph.
- Exercise 2: Build complex queries with QueryBuilder: "Get all projects for a tenant with tower count, latest progress entry per tower, and the assigned PE name" — single query, no N+1.
- Exercise 3: Add Redis caching — cache the dashboard stats query (total projects, tower count, completion %) with 5-minute TTL. Invalidate cache when a progress entry is created. Measure response time with/without cache.
- Exercise 4: Add database indexes — analyze slow queries with `EXPLAIN ANALYZE`, add indexes, measure improvement.
- Exercise 5: Implement a transactional endpoint — `POST /projects/:id/transfer` — reassign all towers and their data to a different PE. Must be atomic. Invalidate all relevant caches after transfer.

**Deliverable:** PR with entities, queries, Redis caching, and transaction. Query performance with/without cache documented.

---

#### Day 23 — File Uploads (tus.io), Job Queues (BullMQ) & Pagination
**Concepts (3 hrs):**
- **Resumable uploads with tus.io (NirmanIQ pattern):** Why resumable uploads matter on construction sites (flaky 4G, large video files). `@tus/server` + `@tus/file-store` on backend, `tus-js-client` on frontend. Upload lifecycle: create → patch (chunks) → complete. Compare with Multer (simpler but no resume).
- **Object storage:** MinIO locally (S3-compatible), Azure Blob Storage in production. Never store uploads on local filesystem — use object storage from day 1.
- File validation: MIME type + extension + size server-side. Video: 15 MB max, mp4/webm. Evidence: 10 MB, jpeg/png/pdf.
- **BullMQ job queues (heavily used in NirmanIQ):** `@nestjs/bullmq` for background processing — video transcoding, report generation, AI analysis requests. Redis-backed. Producers, consumers, processors, events. Why: keep API responses fast, offload heavy work.
- Pagination patterns: offset-based (admin tables) vs cursor-based (activity feeds)

**Practical (5 hrs):**
- Exercise 1: Set up tus.io upload endpoint — `POST /projects/:id/evidence/upload` accepts resumable uploads. Validate MIME + extension + size. Store to local MinIO (Docker container). Return file metadata with download URL.
- Exercise 2: Set up BullMQ — create a `file-processing` queue. When upload completes, add a job to the queue. A processor picks it up, generates a thumbnail (or just logs processing), and updates the file record status to `processed`.
- Exercise 3: Implement offset pagination on `GET /projects` — `?page=1&limit=10&sort=createdAt&order=desc`. Total count in response. API response convention: `{ data, pagination: { total, page, limit, totalPages } }`.
- Exercise 4: Implement search + filter — `GET /projects?search=tower&status=ACTIVE&startDate=2024-01-01`. Combine with pagination.

**Deliverable:** PR with tus.io uploads, MinIO storage, BullMQ queue, and pagination. Test with Postman — invalid files rejected, job completes in background.

---

#### Day 24 — Testing Backend with Jest
**Concepts (2 hrs):**
- NestJS testing: `@nestjs/testing`, `Test.createTestingModule()`, module overrides
- Unit testing services: mock repositories, test business logic in isolation
- Integration testing controllers: supertest, test full HTTP lifecycle
- Test database: separate test DB, migrations, cleanup between tests
- Our convention: `describe('ProjectService', () => { it('should create project when valid DTO', ...) })`

**Practical (5 hrs):**
- Exercise 1: Unit test `ProjectService` — `create()`, `findAll()`, `findOne()`, `update()`, `delete()`. Mock repository. Test validation, not-found, and success cases.
- Exercise 2: Unit test `AuthService` — `register()` (hash password, return token), `login()` (wrong password, user not found, success), `refreshToken()` (expired, valid, reuse detection)
- Exercise 3: Integration test `ProjectController` — use supertest to test full HTTP flow. Include auth (send JWT). Test 200, 450, 451, 453, 454 responses.
- Exercise 4: Write a test helper — `createTestUser(role)` that creates a user and returns a JWT. Use in all integration tests.

**Deliverable:** PR with tests. 80%+ coverage on services and controllers. All tests pass.

---

#### Day 25 — Docker, Docker Compose & Local Dev Environment
**Concepts (2 hrs):**
- Docker fundamentals: images, containers, Dockerfile, layers, multi-stage builds
- Docker Compose: multi-service development (API + PostgreSQL + Redis)
- Docker networking: service discovery, ports, volumes for persistent data
- Dev vs production Dockerfiles: hot-reload in dev, optimized builds in prod

**Practical (5 hrs):**
- Exercise 1: Write a Dockerfile for the NestJS API — multi-stage build (build + runtime). Target image < 200 MB.
- Exercise 2: Write `docker-compose.yml` — API (hot-reload), PostgreSQL (persistent volume, init scripts), Redis (for BullMQ queues + caching), MinIO (S3-compatible object storage for uploads), pgAdmin (optional). This mirrors NirmanIQ's actual dev environment.
- Exercise 3: `docker compose up` → everything starts, API connects to PostgreSQL, Redis, and MinIO, migrations run automatically, seed data loads. One command to go from zero to running app.
- Exercise 4: Add a health check endpoint (`GET /health`) that returns DB connection status, Redis connection status, MinIO connection status, uptime, and version.
- **Friday Demo:** `docker compose up` from scratch, show everything working. Demo the complete API with auth, CRUD, tus.io upload (stored in MinIO), BullMQ job processing, pagination.

**Deliverable:** PR with Docker setup. `docker compose up` must work on a clean machine. README with setup instructions.

---

### Week 6 (Days 26–30): Full-Stack Integration & Professional Practices

#### Day 26 — Connecting Frontend to Backend
**Concepts (2 hrs):**
- **Fetch-based API client (NirmanIQ pattern):** NirmanIQ uses a custom `fetch`-based API client (`@repo/api-client`) — not Axios. `apiClient.get()`, `apiClient.post()`, etc. with auto-attached JWT, token refresh on 451, and error handling. Understand why `fetch` over Axios: no extra dependency, native browser API, works in server components.
- **React Query hooks on top of API client:** NirmanIQ generates typed hooks in `@repo/api-client/src/hooks/` — `useProjects()`, `useCreateProject()`, etc. — each wrapping `useQuery`/`useMutation` with the fetch-based client.
- CORS: what it is, why it exists, how to configure in NestJS
- Environment variables in Next.js: `NEXT_PUBLIC_` prefix, `.env.local`

**Practical (5 hrs):**
- Exercise 1: Create a `fetch`-based API client class — base URL from env, auto-attach JWT from Zustand auth store, handle 451 (redirect to login), handle 500 (show error toast via Sonner). Typed response with generics: `get<T>(path): Promise<T>`.
- Exercise 2: Create typed React Query hooks on top: `useProjects(filters)` wraps `useQuery`, `useCreateProject()` wraps `useMutation` with cache invalidation. These are the hooks your pages will call.
- Exercise 3: Wire up all frontend pages to real API — project list (React Query with pagination), project detail, create/edit forms (mutations), dashboard stats.
- Exercise 4: Implement auth flow end-to-end — login form → API call → store token in Zustand → redirect to dashboard → protected routes redirect to login if no token → 451 interceptor refreshes token.

**Deliverable:** PR with full-stack integration. Everything works end-to-end. React Query devtools show cache behavior.

---

#### Day 27 — E2E Testing with Playwright
**Concepts (2 hrs):**
- Playwright: browser automation for E2E testing. Compare with Selenium (faster, more reliable).
- Test structure: `test.describe()`, `test()`, `test.beforeEach()`, page objects
- Selectors: `getByRole()`, `getByText()`, `getByTestId()` — accessibility-first selectors
- Assertions: `expect(locator).toBeVisible()`, `.toHaveText()`, `.toHaveURL()`
- Our convention: `@P0` on describe for critical path tests

**Practical (5 hrs):**
- Exercise 1: Set up Playwright in the project. Configure for Chromium (dev) and all browsers (CI).
- Exercise 2: Write E2E test: Login flow — enter credentials, submit, verify redirect to dashboard, verify user name in header.
- Exercise 3: Write E2E test: Project CRUD — create project (fill form, submit, verify in list), edit project, delete project (confirm dialog, verify removed).
- Exercise 4: Write E2E test: Tower progress update — navigate to tower, update floor progress, verify chart updates.
- Exercise 5: Create a Page Object for the Dashboard page — encapsulate selectors and actions. Reuse in multiple tests.

**Deliverable:** PR with Playwright tests. All tests pass. Video recording of test runs.

---

#### Day 28 — Monorepo, API Documentation & Code Quality
**Concepts (3 hrs):**
- **Monorepo with Turborepo (NirmanIQ pattern):** Why monorepo — shared types between frontend and backend, single PR for full-stack features, unified CI. Turborepo: task pipelines (`turbo.json`), caching, dependency graph. `npm run dev` starts all apps, `npm run build` builds in dependency order.
- **Workspace packages:** How `@repo/types` (shared TypeScript interfaces/DTOs/enums), `@repo/shared-logic` (business logic), `@repo/ui` (shared React components), and `@repo/api-client` (typed API hooks) are consumed by apps. `"@repo/types": "workspace:*"` in `package.json`. Import like any npm package: `import { ProjectStatus } from '@repo/types'`.
- **API client generation:** How `@repo/api-client` provides typed fetch-based API functions + React Query hooks that both `apps/web` and `apps/mobile` consume. Change a DTO in `apps/api` → update type in `packages/types` → all consumers get type errors immediately.
- Swagger/OpenAPI: auto-generated API docs with NestJS `@nestjs/swagger`
- Code quality tools: ESLint (linting), Prettier (formatting), Husky (pre-commit hooks), lint-staged

**Practical (5 hrs):**
- Exercise 1: **Monorepo exercise** — restructure the training project into a mini monorepo: `apps/api/` (NestJS), `apps/web/` (Next.js), `packages/types/` (shared interfaces). Move all shared types (Project, Tower, etc.) to `packages/types/`. Both apps import from `@training/types`. Verify `npm run build` resolves dependencies correctly.
- Exercise 2: Add Swagger to the NestJS API. Document ALL endpoints with tags, operations, request bodies, response types, and auth requirements. Swagger UI must be browsable at `/api/docs`. Add `@ApiProperty()` to all DTOs.
- Exercise 3: Set up Husky + lint-staged — pre-commit: lint + type-check changed files. pre-push: run tests.
- Exercise 4: Review own code against NirmanIQ coding standards (CLAUDE.md). Create a checklist of violations found and fix them all.
- **Friday Demo:** Show the monorepo structure, demonstrate how changing a type in `packages/types/` causes compile errors in both apps. Show Swagger docs.

**Deliverable:** PR with monorepo structure, Swagger docs, and git hooks.

---

#### Day 29 — Security Fundamentals
**Concepts (3 hrs):**
- OWASP Top 10: injection, broken auth, XSS, CSRF, broken access control — with real examples
- NestJS security: Helmet, CORS, rate limiting (ThrottlerGuard), input validation
- SQL injection: why parameterized queries (TypeORM) prevent it. Demo of vulnerable vs safe code.
- XSS: React's auto-escaping, `dangerouslySetInnerHTML` danger, CSP headers
- Secrets management: environment variables, `.env` never committed, `.env.example` pattern

**Practical (5 hrs):**
- Exercise 1: Security audit of own code — check for: hardcoded secrets, missing validation, SQL injection risk, missing auth guards, `console.log` in production code. Document findings and fix all.
- Exercise 2: Implement rate limiting — `ThrottlerGuard` with different limits per endpoint group (auth: 5/min, API: 100/min, uploads: 50/min).
- Exercise 3: Add Helmet middleware. Configure CSP headers. Test with browser devtools — verify headers present.
- Exercise 4: Build a "Security Checklist" document for PR self-review — 10 items to check before requesting review.

**Deliverable:** PR with security improvements. Security checklist document. Zero hardcoded secrets.

---

#### Day 30 — Checkpoint Assessment #2

**Build a "Construction Progress Tracker" — Production-Grade Full-Stack App (8 hrs)**

**Backend:** NestJS + PostgreSQL + Redis + MinIO (Docker Compose), JWT auth with role-based access, CRUD with tus.io uploads, BullMQ job queue, PiiSafeLogger, event emitter, pagination, Swagger docs, unit + integration tests (80%+ coverage).

**Frontend:** Next.js App Router, auth flow, dashboard with Recharts, shadcn Table with React Query, forms with React Hook Form + Zod, Zustand for UI state, responsive, Sonner toasts, Vitest tests.

**Pass threshold: 65/100. This is the key gate for proceeding to product work.**

---

## Phase 3: Product Immersion (Days 31–45) — "Learn NirmanIQ Inside Out"

### Week 7 (Days 31–35): NirmanIQ Codebase Onboarding

#### Day 31 — Product Deep Dive & Architecture
- Read: PRD (`_bmad-output/planning-artifacts/prd.md`), Architecture (`architecture.md`), Epics (`epics.md`)
- Walkthrough of the monorepo: apps (api, web, admin, mobile, design, track, landing-page), packages (types, shared-logic, ui, api-client, eslint-config, typescript-config)
- Understand the domain: SE/PE/PM/PD/CXO roles, HITL validation workflow, tenant isolation
- **Deliverable:** Write a 1-page summary of NirmanIQ's product, architecture, and user roles in own words.

#### Day 32 — Backend Codebase Tour
- Set up local development environment (Docker Compose for PostgreSQL, Redis, MinIO)
- Walk through NestJS modules: auth, project, evidence, design-project, peb, progress, reports, analytics, notification, whatsapp
- Understand: Guards (JWT, HMAC, roles, PE/PM-only, tenant-status, storage-quota), PiiSafeLogger, CorrelationIdInterceptor, ResponseEnvelopeInterceptor
- Study 3 recent merged PRs — understand what changed, why, and how it was reviewed
- **Deliverable:** Annotated architecture diagram (draw.io or hand-drawn). List of 10 questions about the codebase.

#### Day 33 — Frontend Codebase Tour
- Walk through Next.js app: routing, layouts, server vs client components, shared UI from `@repo/ui`
- Understand: Zustand stores (6 stores in `lib/stores/`), API client hooks from `@repo/api-client`, React Query patterns
- Study how shadcn/ui components are used, Sonner toasts, Recharts dashboards
- Study 3 recent frontend PRs — understand component patterns and state management
- **Deliverable:** Component tree diagram for 2 major pages. List of 10 questions about frontend patterns.

#### Day 34 — Shared Packages & Testing Infrastructure
- Study `packages/types/`: shared interfaces, DTOs, enums — the contract between frontend and backend
- Study `packages/shared-logic/`: business logic shared between apps
- Study `packages/ui/`: shared UI components, how they're consumed by web app
- Study testing setup: Vitest config (frontend), Jest config (backend), Playwright config, coverage gates, test conventions
- **Deliverable:** Document the data flow for one feature end-to-end: User clicks "Update Progress" → frontend React Query mutation → API client fetch → NestJS controller → service → TypeORM → PostgreSQL → response → React Query cache update → UI re-render.

#### Day 35 — First Bug Fixes (Guided)
- Pick 2-3 small bugs from the issue tracker (labeled `good-first-issue`)
- Pair with mentor to debug, fix, write tests, and create PRs
- Go through a full code review cycle — address feedback, get approval
- **Friday Demo:** Present bug fixes. Explain root cause, fix, and what you learned about the codebase.
- **Deliverable:** 2-3 merged PRs. Each with tests.

---

### Week 8 (Days 36–45): Hands-On Product Features (Guided)

#### Day 36–37 — First Feature: Small UI Enhancement
- Pick a small UI feature from the sprint board (e.g., add a filter to a list, improve a form, add a loading state)
- Implement end-to-end: understand the requirement, check API, build UI, write tests
- PR review with mentor — learn NirmanIQ's code quality bar
- **Deliverable:** Feature PR (draft), passing lint and type checks

#### Day 38–39 — Second Feature: API + Frontend
- Pick a feature that requires both backend and frontend work
- Design the API endpoint (DTO, validation, service, controller)
- Build the frontend (page/component, API client hook, React Query, state management)
- Write unit + integration tests
- **Deliverable:** Full-stack feature PR

#### Day 45 — Code Review Practice
- Each intern reviews the other 3 interns' PRs. Write constructive feedback.
- Mentor reviews the reviews — teach what good feedback looks like
- Fix issues raised in own PR reviews
- **Friday Demo:** Present both features. Explain decisions made and tradeoffs.
- **Deliverable:** 3 PR reviews written. Own PRs updated with feedback addressed.

---

### Week 9 (Days 41–45): Independence & Assessment

#### Day 41–42 — Solo Feature
- Pick a feature from the backlog (approved by mentor)
- Work independently — ask questions when stuck, but drive the solution
- Must include: API design, frontend, tests, Swagger docs, PR description

#### Day 43 — Final Polish & Testing
- Complete the solo feature
- Write Playwright E2E test for the feature
- Self-review against NirmanIQ coding standards checklist
- Fix all lint, type, and test failures

#### Day 44 — Peer Code Review
- Each intern reviews 2 other interns' solo features
- Discuss design decisions as a group
- Final PR revisions

#### Day 45 — Checkpoint Assessment #3 (Final Training Assessment)

| Component | Duration | Points |
|-----------|----------|--------|
| Solo feature demo | 20 min | 25 |
| Code walkthrough (mentor asks "why did you...") | 20 min | 25 |
| Live debugging exercise (given a bug, find and fix it) | 30 min | 25 |
| Architecture & domain Q&A | 15 min | 25 |

**80+:** Strong performer. Ready for full product stories.
**60-79:** Solid foundation. Needs continued mentorship on complex features.
**Below 60:** Needs more ramp-up time.

---

## Phase 4: Mentored Product Work (Days 46–90)

### Weeks 10–11 (Days 46–55): Guided Story Work
- Own 1-2 small product stories per week
- Claude Code introduced (Day 46 workshop) — use as accelerator, not crutch
- Daily PR reviews with feedback
- **Expectations:** Complete stories independently but ask for help within 2 hours of being stuck.

### Weeks 12–13 (Days 56–65): Increasing Ownership
- Start picking your own stories (mentor approves)
- Write your own PR descriptions with context and test plans
- Start reviewing each other's PRs
- **Expectations:** Independently deliver 2-3 stories/week.

### Weeks 14–15 (Days 66–75): Sprint Contributor
- Full sprint participant — standups, planning, retro
- Own features end-to-end: requirement → design → implement → test → ship
- **Expectations:** Deliver demo-able features without mentor intervention.

### Weeks 16–18 (Days 76–90): Pre-FTE Evaluation
- Work on a medium-complexity feature solo
- Break it into subtasks, estimate effort, communicate progress
- 90-day review meeting on Day 89

---

## Learning Resources

### Official Documentation (Primary — always use these first)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack React Query](https://tanstack.com/query/latest/docs/framework/react/overview) — primary data-fetching library
- [Zustand](https://zustand-demo.pmnd.rs/) — client-side state management
- [Recharts](https://recharts.org/en-US/) — charting library
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form handling + validation
- [Vitest](https://vitest.dev/) — frontend test runner
- [Playwright](https://playwright.dev/docs/intro) — E2E testing
- [TypeORM](https://typeorm.io) — database ORM
- [BullMQ](https://docs.bullmq.io/) — Redis-backed job queues
- [tus.io](https://tus.io/) — resumable file uploads
- [PostgreSQL](https://www.postgresql.org/docs/)

### Video Courses (Supplementary)
- Fireship: short, fast-paced intros to any technology (YouTube)
- Jack Herrington: React/Next.js patterns (YouTube)
- NestJS official course (free tier on NestJS website)

### Practice Platforms
- [TypeScript Exercises](https://typescript-exercises.github.io/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [SQL exercises: pgexercises.com](https://pgexercises.com/)

---

## NirmanIQ Domain Terms

| Role | Full Name | What They Do |
|------|-----------|-------------|
| **SE** | Site Engineer | Uploads floor videos from construction site |
| **PE** | Planning Engineer | 1st-tier HITL reviewer (validates AI predictions) |
| **PM** | Planning Manager | 2nd-tier HITL validator (approves PE reviews) |
| **PD** | Project Director | Multi-project oversight |
| **CXO** | C-suite Executive | Portfolio dashboard view |
| **TA** | Tenant Admin | Organization setup and user management |
| **SA** | Super Admin | NirmanIQ ops team |

### NirmanIQ Risk Color Palette (always paired with text labels)
- Green `#10b981` + "On Track"
- Amber `#f59e0b` + "At Risk"
- Red `#ef4444` + "High Risk"
- Critical `#dc2626` + "Critical"
