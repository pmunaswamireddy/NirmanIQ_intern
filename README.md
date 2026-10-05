# NirmanIQ Intern Training Plan — 90 Days

**Welcome to NirmanIQ!** India's first AI-powered construction progress intelligence platform. Over the next 90 days, you'll learn full-stack development (Next.js + NestJS + PostgreSQL) and work on real product features used by construction companies across India.

- **Intern:** Penumuru Madhu Sudhan Reddy  
- **Format:** Remote, 45 hrs/week. Daily standup (15 min). Weekly 1:1 with tech lead.  
- **AI tools:** AI coding assistants (ChatGPT, Copilot, Claude) during Days 1–45. You must build foundational understanding by reading docs, writing code, and debugging yourself. Claude Code will be introduced from Day 46 onwards as a productivity tool.  
- **Start date:** 28-09-2026  

---

## How This Works

- Each day has **Concepts** (theory/reading, ~2-3 hrs) and **Practical** (hands-on exercises, ~4-5 hrs).
- Submit daily work via GitHub directly to `main` under each day's directory (e.g. `day1/`, `day2/`).
- Every Friday: **Demo Day** — you demo what you built that week (15 min).
- Mentor reviews your code with feedback by next morning. Code quality bar rises each week.
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
| 6:00 – 7:00 | PR cleanup + review responses | Address mentor feedback on previous code |

---

## Running Exercises

```bash
# Day 1: Foundations
node day1/exercises/exercise-1-python-to-js.js
node day1/exercises/exercise-2-destructuring.js
node day1/exercises/exercise-3-array-methods.js

# Day 2: Async JavaScript & Event Loop
node day2/exercises/exercise-1-parallel-fetch.js
node day2/exercises/exercise-2-retry-fetch.js
node day2/exercises/exercise-3-task-queue.js

# Day 3: TypeScript Essentials (Part 1)
npm run day3:ex1
npm run day3:ex2
npm run day3:ex3
npm run day3:ex4
npm run typecheck

# Day 4: TypeScript Essentials (Part 2) + Tooling
npm run day4:ex1
npm run day4:ex2
npm run day4:ex3
npm run day4:ex4
npm run lint
npm run build

# Day 5: Git Workflow & HTML/CSS Foundations
npm run day5:ex1
# View UI deliverables: day5/index.html (or day5/exercises/exercise-2-tower-card.html)
```

---

## Daily Progress & Detailed Syllabus

### Phase 0: Environment Setup (Day 0 — before Day 1)

- [x] **Day 0 — Pre-joining Checklist & Setup**
  <details>
  <summary>View Syllabus</summary>

  **Pre-joining checklist:**
  - [x] Install: Node.js 20 LTS, VS Code, Git, Docker Desktop, PostgreSQL 16, Redis, Postman
  - [x] VS Code extensions: ESLint, Prettier, Tailwind CSS IntelliSense, Thunder Client, GitLens
  - [x] Create GitHub account (if none), share username for repo access
  - [x] Clone training repo, run `npm install`, verify `npm run dev` starts
  - [x] Read: [NirmanIQ website](http://nirmaniq.com) — understand what we build and for whom
  - [x] Bookmark: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/), [React docs](https://react.dev), [NestJS docs](https://docs.nestjs.com), [Next.js docs](https://nextjs.org/docs), [MDN Web Docs](https://developer.mozilla.org)
  </details>

---

### Phase 1: Foundations (Days 1–15) — "Think in TypeScript & Web"

#### Week 1 (Days 1–5): JavaScript, TypeScript & Web Fundamentals

- [x] **Day 1 — JavaScript for Python Developers**
  <details open>
  <summary>View Syllabus</summary>

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
  **Completed Folder:** [`day1/`](day1/)
  </details>

- [x] **Day 2 — Async JavaScript & the Event Loop**
  <details open>
  <summary>View Syllabus</summary>

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
  **Completed Folder:** [`day2/`](day2/)
  </details>

- [x] **Day 3 — TypeScript Essentials (Part 1)**
  <details open>
  <summary>View Syllabus</summary>

  **Concepts (3 hrs):**
  - Why TypeScript: catch bugs at compile time, self-documenting code, IDE superpowers
  - Type annotations: primitives, arrays, objects, function signatures
  - `interface` vs `type` — when to use which (our convention: `interface` for shapes, `type` for unions)
  - Union types (`string | number`), literal types (`'active' | 'inactive'`), optional properties (`?`)
  - Generics basics: `Array<T>`, writing generic functions
  - `unknown` vs `any` — why we ban `any`

  **Practical (5 hrs):**
  - Exercise 1: Type a construction project data model — `Project`, `Tower`, `Floor`, `Room`, `ProgressEntry` interfaces
  - Exercise 2: Rewrite Day 1 JS exercises in TypeScript with strict mode. Fix all type errors.
  - Exercise 3: Build a type-safe `Map`-like data structure with generics: `get<T>(key): T | undefined`, `set<T>(key, value: T): void`
  - Exercise 4: Use discriminated unions to model NirmanIQ task states: `{ status: 'pending' }`, `{ status: 'in_progress', assignee: string }`, `{ status: 'completed', completedAt: Date, reviewer: string }`

  **Deliverable:** PR with exercises. All must compile with `tsc --strict` and zero errors.  
  **Completed Folder:** [`day3/`](day3/)
  </details>

- [x] **Day 4 — TypeScript Essentials (Part 2) + Tooling**
  <details open>
  <summary>View Syllabus</summary>

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
  **Completed Folder:** [`day4/`](day4/)
  </details>

- [x] **Day 5 — Git Workflow & HTML/CSS Foundations**
  <details open>
  <summary>View Syllabus</summary>

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
  **Completed Folder:** [`day5/`](day5/)
  </details>

---

#### Week 2 (Days 6–10): React & Next.js Foundations

- [x] **Day 6 — React Core Concepts**
  <details open>
  <summary>View Syllabus</summary>

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
  **Completed Folder:** [`day6/`](day6/)  
  **Run React Project:** `cd day6 && npm run dev` (Port 3006)
  </details>

- [ ] **Day 7 — React Hooks & Side Effects**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

- [ ] **Day 8 — Next.js App Router & Routing**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

- [ ] **Day 9 — Tailwind CSS & shadcn/ui**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

- [ ] **Day 10 — State Management & Data Fetching (TanStack React Query + Zustand)**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

---

#### Week 3 (Days 11–15): Backend Foundations (NestJS + PostgreSQL)

- [ ] **Day 11 — NestJS Architecture & First API**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

- [ ] **Day 12 — DTOs, Validation & Error Handling**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

- [ ] **Day 13 — PostgreSQL & TypeORM**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

- [ ] **Day 14 — Authentication & Guards**
  <details>
  <summary>View Syllabus</summary>

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
  </details>

- [ ] **Day 15 — Checkpoint Assessment #1 ("Tower Progress Tracker")**
  <details>
  <summary>View Assessment Details</summary>

  **Build a Mini Full-Stack App (8 hrs) — "Tower Progress Tracker"**

  **Backend (NestJS):** Auth (JWT), CRUD for Projects + Towers (PostgreSQL + TypeORM), DTOs with validation, role-based access (PM can create/edit, SE can only view and update progress).

  **Frontend (Next.js):** Login page, project list with search/filter, project detail showing towers in a grid, tower detail with floor-by-floor progress, "Update Progress" form (SE role), responsive, uses shadcn/ui.

  **Pass threshold:** 60/100. Below 50 = remediation week before proceeding.
  </details>

---

### Phase 2: Intermediate Skills (Days 16–30) — "Build Like Production"

#### Week 4 (Days 16–20): Advanced Frontend

- [ ] **Day 16 — Forms, Validation & Complex UI Patterns**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** React Hook Form, Zod schema validation (`z.object()`, `.refine()`, `.transform()`), `@hookform/resolvers`, multi-step forms, dynamic field arrays, dependent dropdowns.

  **Practical (5 hrs):**
  - Exercise 1: Multi-step "Create Project" form with Zod validation.
  - Exercise 2: "Floor Inspection" form with dependent dropdowns and photo evidence upload.
  - Exercise 3: Inline-editable bulk progress update table.

  **Deliverable:** PR with form components.
  </details>

- [ ] **Day 17 — Data Tables, Pagination & Search**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** Building data tables with shadcn/ui `<Table>` + React Query (hand-built tables using shadcn primitives, not TanStack Table library), cursor vs offset pagination, `keepPreviousData`, debounced search with URL-synced search params.

  **Practical (5 hrs):**
  - Exercise 1: Activity log data table using shadcn `<Table>` with server-side pagination (10/25/50 rows) via React Query.
  - Exercise 2: Column filters (status dropdown, date range, user multi-select).
  - Exercise 3: Sync all filter/sort/page state to URL search params.
  - Exercise 4: Row selection (checkbox column) with bulk actions.

  **Deliverable:** PR with data table.
  </details>

- [ ] **Day 18 — Charts, Dashboards & Data Visualization**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** Recharts library, dashboard layout patterns (KPI cards, trend charts, comparison charts), responsive container queries, chart accessibility.

  **Practical (5 hrs):**
  - Exercise 1: KPI stat cards (Total Projects, Active Towers, Floors Completed with % change).
  - Exercise 2: "Project Progress" planned vs actual line chart.
  - Exercise 3: "Tower Comparison" horizontal bar chart with NirmanIQ risk colors.
  - Exercise 4: Compose full responsive Dashboard page.

  **Deliverable:** PR with dashboard.
  </details>

- [ ] **Day 19 — Error Handling, Loading States & UX Polish**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** Error boundaries with recovery strategies, skeleton loaders vs spinners, empty state illustrations with CTA, Sonner toast notifications, keyboard shortcuts (`Ctrl+K`, `N`, `Escape`), axe-core accessibility audit.

  **Practical (5 hrs):**
  - Exercise 1: Page-level and component-level error boundaries with retry.
  - Exercise 2: Skeleton components matching loaded layout.
  - Exercise 3: Empty states for project list, tower grid, and activity log.
  - Exercise 4: Keyboard shortcuts (`Ctrl+K`, `N`, `Escape`).
  - Exercise 5: Axe-core audit with zero accessibility violations.

  **Deliverable:** PR with polished UX.
  </details>

- [ ] **Day 20 — Frontend Testing with Vitest & React Testing Library**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** Testing behavior over implementation, Vitest native ESM test runner (`vi.fn()`, `vi.mock()`), React Testing Library, wrapping in `QueryClientProvider`, MSW for API mocking.

  **Practical (5 hrs):**
  - Exercise 1: Tests for `<ProgressBar>` risk levels and edge cases.
  - Exercise 2: Tests for `<TaskList>` operations and empty state.
  - Exercise 3: Tests for Zustand `useAuthStore` actions and persistence.
  - Exercise 4: Tests for "Create Project" form validation and submission.
  - **Friday Demo:** Present complete frontend with Vitest test suite.

  **Deliverable:** PR with minimum 80% coverage on components and hooks.
  </details>

---

#### Week 5 (Days 21–25): Advanced Backend

- [ ] **Day 21 — Advanced NestJS Patterns (NirmanIQ-Specific)**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (3 hrs):** Interceptors (`CorrelationIdInterceptor`, `ResponseEnvelopeInterceptor`, `TenantContextInterceptor`), **PiiSafeLogger (ADR-051)** masking emails/phones/names, custom decorators (`@CurrentUser()`, `@CurrentTenant()`, `@Roles()`, `@Public()`), `@nestjs/event-emitter`, `@nestjs/config` with Joi validation.

  **Practical (5 hrs):**
  - Exercise 1: `PiiSafeLogger` wrapper auto-masking PII, injected via NestJS DI.
  - Exercise 2: `CorrelationIdInterceptor` and `ResponseEnvelopeInterceptor`.
  - Exercise 3: `@Roles()` decorator + `RolesGuard` with hierarchical role checking (SA > TA > PD > CXO > PM > PE > SE).
  - Exercise 4: Event-driven `'progress.created'` listener.
  - Exercise 5: `@nestjs/config` environment validation.

  **Deliverable:** PR with all patterns and `.env.example`.
  </details>

- [ ] **Day 22 — Database Advanced: Relations, Queries, Caching & Performance**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (3 hrs):** TypeORM relations deep dive (`@OneToMany`, `@ManyToOne`, `@ManyToMany`), eager vs lazy loading, query optimization, transactions (`queryRunner`), Redis caching with `@nestjs/cache-manager` and `cache-manager-redis-yet`.

  **Practical (5 hrs):**
  - Exercise 1: Entities: `User`, `Project`, `Tower`, `Floor`, `ProgressEntry`, `Comment`.
  - Exercise 2: QueryBuilder complex multi-join query without N+1.
  - Exercise 3: Redis caching for dashboard stats with 5-minute TTL and invalidation on write.
  - Exercise 4: Database indexes analyzed with `EXPLAIN ANALYZE`.
  - Exercise 5: Transactional `POST /projects/:id/transfer` reassigning tower data atomically.

  **Deliverable:** PR with entities, queries, Redis caching, and transaction.
  </details>

- [ ] **Day 23 — File Uploads (tus.io), Job Queues (BullMQ) & Pagination**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (3 hrs):** Resumable uploads with tus.io (`@tus/server`, `tus-js-client`) for flaky site connectivity, MinIO local S3-compatible storage, BullMQ background queues with Redis (`@nestjs/bullmq`), offset vs cursor pagination.

  **Practical (5 hrs):**
  - Exercise 1: tus.io resumable upload endpoint `POST /projects/:id/evidence/upload` storing in MinIO.
  - Exercise 2: BullMQ `file-processing` queue worker generating thumbnails/processing jobs.
  - Exercise 3: Offset pagination on `GET /projects` returning `{ data, pagination }`.
  - Exercise 4: Search + filters combined with pagination.

  **Deliverable:** PR with tus.io uploads, MinIO, BullMQ queue, and pagination.
  </details>

- [ ] **Day 24 — Testing Backend with Jest**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** NestJS `@nestjs/testing`, `Test.createTestingModule()`, unit testing services with mocked repositories, Supertest integration testing for full HTTP lifecycle, test databases.

  **Practical (5 hrs):**
  - Exercise 1: Unit test `ProjectService` CRUD operations with mocked repository.
  - Exercise 2: Unit test `AuthService` registration, login, and refresh tokens.
  - Exercise 3: Integration test `ProjectController` with Supertest and auth headers.
  - Exercise 4: Test helper `createTestUser(role)` returning JWT.

  **Deliverable:** PR with 80%+ test coverage.
  </details>

- [ ] **Day 25 — Docker, Docker Compose & Local Dev Environment**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** Multi-stage Dockerfiles (< 200 MB), Docker Compose multi-service orchestration, networking, volumes, dev hot-reloading vs optimized production images.

  **Practical (5 hrs):**
  - Exercise 1: Multi-stage Dockerfile for NestJS API.
  - Exercise 2: `docker-compose.yml` orchestrating API, PostgreSQL, Redis, and MinIO.
  - Exercise 3: `docker compose up` one-command startup with automatic migrations and seed data.
  - Exercise 4: Health check endpoint `GET /health` reporting DB, Redis, and MinIO status.
  - **Friday Demo:** Demo clean `docker compose up` startup and full working API.

  **Deliverable:** PR with Docker setup and README instructions.
  </details>

---

#### Week 6 (Days 26–30): Full-Stack Integration & Professional Practices

- [ ] **Day 26 — Connecting Frontend to Backend**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** NirmanIQ fetch-based API client (`@repo/api-client`), typed React Query hooks in `@repo/api-client/src/hooks/`, CORS configuration, `NEXT_PUBLIC_` environment variables.

  **Practical (5 hrs):**
  - Exercise 1: Fetch-based API client class with JWT attachment and 401 handling.
  - Exercise 2: Typed React Query hooks (`useProjects`, `useCreateProject`).
  - Exercise 3: Wire frontend pages to API endpoints with caching and invalidation.
  - Exercise 4: End-to-end authentication flow with token refresh.

  **Deliverable:** PR with full-stack integration.
  </details>

- [ ] **Day 27 — E2E Testing with Playwright**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (2 hrs):** Playwright browser automation, accessibility-first selectors (`getByRole`, `getByText`), page object pattern, `@P0` test tags.

  **Practical (5 hrs):**
  - Exercise 1: Playwright setup for Chromium and CI.
  - Exercise 2: Login flow E2E test.
  - Exercise 3: Project CRUD E2E test.
  - Exercise 4: Tower progress update E2E test.
  - Exercise 5: Page Object Model for Dashboard page.

  **Deliverable:** PR with Playwright test suite and video recordings.
  </details>

- [ ] **Day 28 — Monorepo, API Documentation & Code Quality**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (3 hrs):** Turborepo monorepo pipelines (`turbo.json`), workspace packages (`@repo/types`, `@repo/shared-logic`, `@repo/ui`), Swagger OpenAPI docs with `@nestjs/swagger`, Husky + lint-staged git hooks.

  **Practical (5 hrs):**
  - Exercise 1: Monorepo restructure (`apps/api/`, `apps/web/`, `packages/types/`).
  - Exercise 2: Swagger UI documentation at `/api/docs` with `@ApiProperty()`.
  - Exercise 3: Husky pre-commit (lint/type-check) and pre-push (tests).
  - Exercise 4: Codebase audit against NirmanIQ coding standards (CLAUDE.md).
  - **Friday Demo:** Monorepo cross-package type synchronization demo.

  **Deliverable:** PR with monorepo, Swagger, and git hooks.
  </details>

- [ ] **Day 29 — Security Fundamentals**
  <details>
  <summary>View Syllabus</summary>

  **Concepts (3 hrs):** OWASP Top 10 vulnerabilities, Helmet middleware, CORS, rate limiting (`ThrottlerGuard`), SQL injection defense via TypeORM parameterized queries, XSS sanitization, CSP headers.

  **Practical (5 hrs):**
  - Exercise 1: Security self-audit for hardcoded secrets and missing auth guards.
  - Exercise 2: Rate limiting with different throttler tiers per route group.
  - Exercise 3: Helmet and CSP header configuration.
  - Exercise 4: Security PR checklist document.

  **Deliverable:** PR with security hardening.
  </details>

- [ ] **Day 30 — Checkpoint Assessment #2 ("Construction Progress Tracker")**
  <details>
  <summary>View Assessment Details</summary>

  **Build a Production-Grade Full-Stack App (8 hrs):**

  - **Backend:** NestJS + PostgreSQL + Redis + MinIO (Docker Compose), JWT auth with role-based access, CRUD with tus.io uploads, BullMQ job queue, PiiSafeLogger, event emitter, pagination, Swagger docs, unit + integration tests (80%+ coverage).
  - **Frontend:** Next.js App Router, auth flow, dashboard with Recharts, shadcn Table with React Query, forms with React Hook Form + Zod, Zustand for UI state, responsive, Sonner toasts, Vitest tests.

  **Pass threshold:** 65/100. Key gate for proceeding to product work.
  </details>

---

### Phase 3: Product Immersion (Days 31–45) — "Learn NirmanIQ Inside Out"

#### Week 7 (Days 31–35): NirmanIQ Codebase Onboarding

- [ ] **Day 31 — Product Deep Dive & Architecture**
  <details>
  <summary>View Syllabus</summary>

  - Read: PRD (`_bmad-output/planning-artifacts/prd.md`), Architecture (`architecture.md`), Epics (`epics.md`)
  - Walkthrough monorepo apps and packages.
  - Understand SE/PE/PM/PD/CXO domain roles, HITL validation workflow, tenant isolation.
  - **Deliverable:** 1-page summary of NirmanIQ's product, architecture, and user roles.
  </details>

- [ ] **Day 32 — Backend Codebase Tour**
  <details>
  <summary>View Syllabus</summary>

  - Local dev environment setup (Postgres, Redis, MinIO via Docker Compose).
  - Study NestJS modules: auth, project, evidence, peb, progress, reports, analytics.
  - Study guards, PiiSafeLogger, interceptors.
  - Study 3 recent merged PRs.
  - **Deliverable:** Annotated architecture diagram + list of 10 codebase questions.
  </details>

- [ ] **Day 33 — Frontend Codebase Tour**
  <details>
  <summary>View Syllabus</summary>

  - Next.js app routing, layouts, server vs client components, `@repo/ui`.
  - Zustand stores, `@repo/api-client` hooks, React Query caching.
  - Study shadcn/ui components, Sonner toasts, Recharts dashboards.
  - Study 3 recent frontend PRs.
  - **Deliverable:** Component tree diagram for 2 major pages + 10 questions.
  </details>

- [ ] **Day 34 — Shared Packages & Testing Infrastructure**
  <details>
  <summary>View Syllabus</summary>

  - Study `@repo/types`, `@repo/shared-logic`, `@repo/ui`.
  - Study Vitest (frontend), Jest (backend), and Playwright testing setups.
  - **Deliverable:** Document the end-to-end data flow: "Update Progress" button click → React Query mutation → API client → NestJS controller → service → TypeORM → PostgreSQL → response → cache update → re-render.
  </details>

- [ ] **Day 35 — First Bug Fixes (Guided)**
  <details>
  <summary>View Syllabus</summary>

  - Pick 2-3 `good-first-issue` bugs from issue tracker.
  - Debug, fix, write tests, and submit PRs with mentor review.
  - **Friday Demo:** Present bug fixes, root cause analysis, and learnings.
  - **Deliverable:** 2-3 merged PRs with tests.
  </details>

---

#### Week 8 (Days 36–40): Hands-On Product Features (Guided)

- [ ] **Days 36–37 — First Feature: Small UI Enhancement**
  <details>
  <summary>View Syllabus</summary>

  - Pick small UI feature from sprint board.
  - Implement end-to-end with tests and mentor PR review.
  - **Deliverable:** Feature PR passing lint and type checks.
  </details>

- [ ] **Days 38–39 — Second Feature: API + Frontend**
  <details>
  <summary>View Syllabus</summary>

  - Pick full-stack feature (DTO, validation, service, controller, React Query hook, UI component, tests).
  - **Deliverable:** Full-stack feature PR.
  </details>

- [ ] **Day 40 — Code Review Practice**
  <details>
  <summary>View Syllabus</summary>

  - Peer review 3 other interns' PRs with constructive feedback.
  - Mentor reviews the reviews.
  - Fix issues raised in own reviews.
  - **Friday Demo:** Present both features and architecture tradeoffs.
  - **Deliverable:** 3 written PR reviews + updated PRs.
  </details>

---

#### Week 9 (Days 41–45): Independence & Assessment

- [ ] **Days 41–42 — Solo Feature**
  <details>
  <summary>View Syllabus</summary>

  - Drive solution independently for an approved backlog feature.
  - Must include: API design, frontend, tests, Swagger docs, PR description.
  </details>

- [ ] **Day 43 — Final Polish & Testing**
  <details>
  <summary>View Syllabus</summary>

  - Complete feature and write Playwright E2E test.
  - Self-review against NirmanIQ coding standards checklist (CLAUDE.md).
  - Fix all lint, type, and test failures.
  </details>

- [ ] **Day 44 — Peer Code Review**
  <details>
  <summary>View Syllabus</summary>

  - Review 2 peers' solo features and discuss design tradeoffs.
  - Final PR revisions.
  </details>

- [ ] **Day 45 — Checkpoint Assessment #3 (Final Training Assessment)**
  <details>
  <summary>View Assessment Details</summary>

  | Component | Duration | Points |
  |-----------|----------|--------|
  | Solo feature demo | 20 min | 25 |
  | Code walkthrough (mentor asks "why did you...") | 20 min | 25 |
  | Live debugging exercise (find and fix bug) | 30 min | 25 |
  | Architecture & domain Q&A | 15 min | 25 |

  - **80+:** Strong performer. Ready for full product stories.
  - **60-79:** Solid foundation. Needs continued mentorship on complex features.
  - **Below 60:** Needs more ramp-up time.
  </details>

---

### Phase 4: Mentored Product Work (Days 46–90)

- [ ] **Weeks 10–11 (Days 46–55): Guided Story Work**
  <details>
  <summary>View Syllabus</summary>

  - Own 1-2 small product stories per week.
  - Claude Code introduced (Day 46 workshop) as productivity accelerator.
  - Daily PR reviews with feedback.
  - **Expectations:** Complete stories independently; ask for help within 2 hours of being stuck.
  </details>

- [ ] **Weeks 12–13 (Days 56–65): Increasing Ownership**
  <details>
  <summary>View Syllabus</summary>

  - Pick own approved stories.
  - Write detailed PR descriptions with context and test plans.
  - Peer reviews.
  - **Expectations:** Independently deliver 2-3 stories per week.
  </details>

- [ ] **Weeks 14–15 (Days 66–75): Sprint Contributor**
  <details>
  <summary>View Syllabus</summary>

  - Full sprint participant: standups, planning, retrospectives.
  - Own features end-to-end: requirement → design → implement → test → ship.
  - **Expectations:** Deliver demo-ready features without mentor intervention.
  </details>

- [ ] **Weeks 16–18 (Days 76–90): Pre-FTE Evaluation**
  <details>
  <summary>View Syllabus</summary>

  - Work on medium-complexity feature solo.
  - Subtask breakdown, effort estimation, stakeholder communication.
  - **90-day review meeting on Day 89.**
  </details>

---

## Learning Resources

### Official Documentation (Primary — always use these first)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Recharts](https://recharts.org/en-US/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/docs/intro)
- [TypeORM](https://typeorm.io)
- [BullMQ](https://docs.bullmq.io/)
- [tus.io](https://tus.io/)
- [PostgreSQL](https://www.postgresql.org/docs/)

### Supplementary Platforms & Courses
- Fireship: Short, fast-paced technology intros (YouTube)
- Jack Herrington: React and Next.js design patterns (YouTube)
- [TypeScript Exercises](https://typescript-exercises.github.io/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [SQL Exercises (pgexercises.com)](https://pgexercises.com/)

---

## NirmanIQ Domain Terms & Roles

| Role | Full Name | Domain Responsibility |
|------|-----------|-----------------------|
| **SE** | Site Engineer | Uploads floor videos and photos directly from construction sites |
| **PE** | Planning Engineer | 1st-tier Human-in-the-Loop reviewer validating AI predictions |
| **PM** | Planning Manager | 2nd-tier Human-in-the-Loop validator approving schedules & budgets |
| **PD** | Project Director | High-level multi-project governance and oversight |
| **CXO** | C-suite Executive | Executive portfolio dashboard view and milestone projections |
| **TA** | Tenant Admin | Company/organization setup and access management |
| **SA** | Super Admin | NirmanIQ infrastructure and internal operations |

### NirmanIQ Risk Color Palette
- 🟢 **On Track** (`#10b981`) — Progress aligned with baseline milestone
- 🟡 **At Risk** (`#f59e0b`) — Minor delay (1–3 days) or material blocker
- 🔴 **High Risk** (`#ef4444`) — Critical delay (4–7 days) or inspection failure
- 🚨 **Critical** (`#dc2626`) — Structural delay (>7 days) requiring PM intervention
