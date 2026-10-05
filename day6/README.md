# Day 6 - React Core Concepts

**Track:** Full-Stack Web Development  
**Date:** 05-10-2026  
**Branch:** `main`

---

## Notes & Concepts

### 1. React Mental Model: UI = f(state)
- React inverts traditional DOM manipulation. Instead of finding nodes and mutating them, components are pure declarative functions that transform application state into Virtual DOM representations.
- When state updates via setter functions, React re-renders the component, calculates the minimal diff against the previous Virtual DOM (reconciliation), and applies only targeted patches to the real DOM.

### 2. JSX (JavaScript XML) & TypeScript Props
- JSX is an XML-like syntax extension for JavaScript that transpiles into function calls (`React.createElement` or `_jsx`).
- Expressions are embedded inside curly braces `{ }`.
- In TypeScript, component inputs are strictly typed with interfaces for props, ensuring compile-time validation for required attributes, callbacks, and optional children.

### 3. State Management with useState & Immutability
- State in React must be treated as strictly immutable. Never mutate arrays or objects directly (`push`, direct property assignment).
- Always return new references using the spread operator (`[...prev, item]`, `{ ...prev, key: val }`).
- When next state depends on current state, always use updater functions (`setCount(prev => prev + 1)`).

### 4. Conditional & List Rendering
- Dynamic elements render using ternary operators (`condition ? <A /> : <B />`) or logical AND (`count > 0 && <Badge />`).
- Collections are rendered with `.map()` and require a unique, stable `key` prop on the top-level element to support reconciliation and prevent state carry-over bugs.

### 5. Synthetic Events
- React normalizes native browser events with a cross-browser `SyntheticEvent` wrapper.
- Event handlers are passed as function references (`onClick={handleClick}` or `onClick={() => handleAction(id)}`), never invoked directly during render.

---

## Exercises Done

- `exercises/exercise-1-task-list.tsx`: Fully typed TaskList component supporting task creation, priority tags, completion toggles, deletion, and active/completed filtering.
- `exercises/exercise-2-progress-bar.tsx`: Type-safe ProgressBar component accepting percentage (0–100) and risk levels (`on-track`, `at-risk`, `high-risk`, `critical`) mapped to exact status color palettes.
- `exercises/exercise-3-floor-grid.tsx`: 5x4 grid (20 floors) modeling tower construction with interactive status cycling (Pending → Active → Done → Pending) and live metrics.
- `exercises/App.tsx`: Composite dashboard component hosting all three components with an interactive progress slider.
- `exercises/test-day6.ts`: Headless test suite verifying component logic, state transitions, and filtering rules.
- `index.html`: Interactive in-browser demo rendering all components with live state updates.

---

## How to Run

### 1. Run the Independent React Vite Project (Recommended)
Navigate into the `day6` folder and run standard React project commands:

```bash
cd day6

# Start local development server with Hot Module Replacement (Port 3006):
npm run dev

# Build the production bundle:
npm run build

# Preview the production build:
npm run preview
```

*Or directly from the workspace root:*
```bash
npm run day6:dev     # Starts Day 6 Vite dev server
npm run day6:build   # Builds Day 6 production bundle
```

### 2. Run Headless Unit Tests & Type Check
From the project root:
```bash
npm run day6:test   # Runs component logic tests
npm run typecheck   # Runs strict TypeScript checks
```

---

## Study Material

- Complete Day 6 study material is available in [`study_material.pdf`](study_material.pdf) and [`study_material.txt`](study_material.txt).
