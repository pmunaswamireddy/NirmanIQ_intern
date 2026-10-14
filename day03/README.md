# Day 3 - TypeScript Essentials (Part 1)

**Intern:** Penumuru Madhu Sudhan Reddy  
**Date:** 30-09-2026  
**Branch:** `main`

---

## Notes & Concepts

### 1. Why TypeScript? (Static Typing & Compile-Time Safety)
- JavaScript is dynamically typed, so typos, missing properties, and incorrect parameter types are only discovered when code crashes in production.
- TypeScript introduces a compile-time static type system that verifies every variable, function parameter, and object shape before execution.
- During compilation, TypeScript strips away all types (type erasure), producing clean standard JavaScript with zero runtime performance penalty.

### 2. `interface` vs `type` (NirmanIQ Convention)
- **`interface`:** Used for modeling object shapes, domain entities (`Project`, `Tower`, `Floor`, `Room`), and structures that can be extended.
- **`type`:** Used for union types (`'planned' | 'in_progress' | 'completed'`), primitive aliases, tuples, and function signatures.

### 3. Discriminated Unions & Exhaustive Checking
- By sharing a common literal property (e.g. `status: 'pending' | 'in_progress' | 'completed'`), TypeScript narrows the type inside `switch` cases.
- Using `const _exhaustiveCheck: never = task;` in the `default` case guarantees compile-time errors if a new state is added without being handled.

### 4. `unknown` vs `any` (Why `any` is Banned)
- `any` completely disables the type checker. It is dangerous and banned in production at NirmanIQ.
- `unknown` represents a value whose type is not yet known. It forces the developer to perform type narrowing (using `typeof`, `instanceof`, or custom type guards) before accessing properties safely.

---

## Exercises Done

- `exercise-1-project-models.ts`: Complete construction domain interfaces for `Project`, `Tower`, `Floor`, `Room`, and `ProgressEntry` with typed progress calculation.
- `exercise-2-day1-in-ts.ts`: Rewrote Day 1 algorithms (Fibonacci, Palindrome, Array Rotation, Group By, Flatten) in strict TypeScript with generic return types.
- `exercise-3-generic-map.ts`: Built a generic `TypedCache` class with type-safe `.get<T>()`, `.set<T>()`, `.has()`, and `.delete()`.
- `exercise-4-discriminated-unions.ts`: Modeled NirmanIQ construction task lifecycle (`PendingTask`, `InProgressTask`, `CompletedTask`) with exhaustive pattern matching and `never` check.

---

## How to Run

From project root:
```bash
# run individual exercises:
npm run day3:ex1
npm run day3:ex2
npm run day3:ex3
npm run day3:ex4

# or directly with node (Node 22+ type stripping):
node --experimental-strip-types day3/exercises/exercise-1-project-models.ts
node --experimental-strip-types day3/exercises/exercise-2-day1-in-ts.ts
node --experimental-strip-types day3/exercises/exercise-3-generic-map.ts
node --experimental-strip-types day3/exercises/exercise-4-discriminated-unions.ts

# strict typecheck with zero errors:
npm run typecheck
```

---

## Study Material

- Complete syllabus study material for Day 3 is available in [`study_material.pdf`](study_material.pdf) (and [`study_material.txt`](study_material.txt)).
