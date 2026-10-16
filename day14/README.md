# Day 14: Authentication & Guards (JWT, bcrypt, RBAC & Token Rotation)

## Overview
This folder contains the practical exercises, authentication module, JWT strategies, Guards, RBAC decorators, TypeORM user entity, migrations, and study materials for Day 14 of the NirmanIQ Full-Stack Web Development Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Technical Highlights & Exercises Implemented

1. **Exercise 1: Auth Module, bcrypt Hashing & Dual JWT Issuance** (`exercises/exercise-1-auth-module-bcrypt.js`)
   - Implements `register` and `login` endpoints.
   - Salted password hashing using `bcrypt` (10 rounds). Plaintext passwords are never stored.
   - Issues short-lived Access Tokens (1h) and long-lived Refresh Tokens (30d).

2. **Exercise 2: JwtAuthGuard Protection & 401 Unauthorized** (`exercises/exercise-2-jwt-auth-guard.js`)
   - Passport-JWT strategy extracting `Authorization: Bearer <token>`.
   - Rejects unauthenticated requests with HTTP 401 Unauthorized.
   - Attaches authenticated user payload to `req.user`.

3. **Exercise 3: RolesGuard & Role-Based Access Control (RBAC)** (`exercises/exercise-3-roles-guard-rbac.js`)
   - Implements NirmanIQ role hierarchy: `SA > TA > PD > CXO > PM > PE > SE`.
   - `POST /projects` restricted to `Role.PM`, `Role.PD`, `Role.TA`, `Role.SA` (SE blocked with HTTP 403 Forbidden).
   - `DELETE /projects/:id` restricted to `Role.SA` (PM blocked with HTTP 403 Forbidden).

4. **Exercise 4: Refresh Token Rotation & Invalidation** (`exercises/exercise-4-refresh-token-rotation.js`)
   - `POST /auth/refresh` exchanges expired access tokens for a new pair.
   - Overwrites stored refresh token hash in database.
   - Replaying an expired or stolen refresh token immediately revokes all active sessions.

5. **Exercise 5: Custom @CurrentUser() Parameter Decorator** (`exercises/exercise-5-current-user-decorator.js`)
   - Eliminates manual `req.user` lookups in controller methods.
   - Supports `@CurrentUser()` for full context or `@CurrentUser('userId')` for specific fields.

---

## How to Run & Test

### 1. Run Automated Verification Tests
From workspace root:
```bash
npm run day14:test
```

### 2. Run Individual Exercises
```bash
npm run day14:ex1
npm run day14:ex2
npm run day14:ex3
npm run day14:ex4
npm run day14:ex5
```

### 3. Build & Compile TypeScript
```bash
npm run day14:build
```

### 4. Start Live NestJS API Server (Port 3014)
```bash
npm run day14:start
```
