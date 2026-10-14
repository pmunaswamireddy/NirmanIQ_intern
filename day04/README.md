# Day 4 - TypeScript Essentials (Part 2) + Tooling

**Intern:** Penumuru Madhu Sudhan Reddy  
**Date:** 03-10-2026  
**Branch:** `main`

---

## Notes & Concepts

### 1. TypeScript Utility Types
- `Partial<T>`: Makes all properties optional. Perfect for PATCH/update endpoints.
- `Required<T>`: Makes all properties required. Useful for creation payloads where no fields can be omitted.
- `Pick<T, K>`: Extracts a subset of properties from an interface.
- `Omit<T, K>`: Constructs a type by picking all properties from `T` and removing `K`.
- `Record<K, V>`: Maps a set of keys to values of type `V`. Safer alternative to loose objects.

### 2. Type Narrowing & Custom Type Guards
- Built-in type guards: `typeof x === 'string'`, `'prop' in obj`, `instanceof Class`.
- Custom type guards use predicate return type `param is Type` (e.g. `res is SuccessResponse<T>`).
- Inside the `if` block, TypeScript automatically narrows the type so you can safely access type-specific fields without casting.

### 3. Enums vs Union Literal Types
- Enums in TypeScript generate runtime JavaScript code (lookup objects), which adds unnecessary bundle size.
- Union literal types (`'pending' | 'in_progress' | 'completed'`) have zero runtime overhead (completely erased during compilation) and are strongly preferred at NirmanIQ.

### 4. `tsconfig.json` & Strict Mode
- `"strict": true`: Enables all strict type-checking options (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, etc.).
- `"noEmit": true`: Type check only without generating `.js` files when bundling or running via Node.

---

## Exercises Done

- `exercise-1-crud-dtos.ts`: CRUD type system using `Required<T>`, `Partial<T>`, and extended `ProjectResponse`.
- `exercise-2-type-guards.ts`: Custom type guards (`res is SuccessResponse<T>`, `res is ErrorResponse`, `res is ValidationError`) and safe handler function.
- `exercise-3-project-setup.ts`: Strict tooling demonstration with `Record<string, number>` and project summaries.
- `exercise-4-eslint-demo.ts`: Code quality audit demonstrating clean fixes for common lint issues (no `var`, no `any`, strict `===`, handled errors).

---

## How to Run

From project root:
```bash
# run individual exercises:
npm run day4:ex1
npm run day4:ex2
npm run day4:ex3
npm run day4:ex4

# or directly with node (Node 22+ type stripping):
node --experimental-strip-types day4/exercises/exercise-1-crud-dtos.ts
node --experimental-strip-types day4/exercises/exercise-2-type-guards.ts
node --experimental-strip-types day4/exercises/exercise-3-project-setup.ts
node --experimental-strip-types day4/exercises/exercise-4-eslint-demo.ts

# strict typecheck & lint checks:
npm run typecheck
npm run lint
npm run build
```

---

## Study Material

- Complete syllabus study material for Day 4 is available in [`study_material.pdf`](study_material.pdf) (and [`study_material.txt`](study_material.txt)).
