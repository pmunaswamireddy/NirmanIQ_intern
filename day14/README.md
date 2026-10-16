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

---

## Testing Day 14 APIs with Hoppscotch

You can interactively test the complete authentication and authorization lifecycle using **Hoppscotch** (or Postman).

* **API Base URL**: `http://localhost:3014`
* **Shared PostgreSQL Database**: `nirmaniq_training` on port `5432` (Docker container `nirmaniq_postgres`)
  * *Note: Day 14 shares the same database with Day 13. The `users` table persists credentials, roles, salted bcrypt password hashes, and hashed refresh tokens alongside your `projects`, `towers`, and `floors`.*

### Step-by-Step Hoppscotch Workflow

```
[Register User] ──> [Login & Get Tokens] ──> [Set Bearer Token] ──> [Access Guarded Routes]
                                                    │
                                           (After Access Expires)
                                                    │
                                            [Refresh Tokens] ──> [New Bearer Token]
```

#### 1. Register a User (Public)
* **Method**: `POST`
* **URL**: `http://localhost:3014/auth/register`
* **Headers**: `Content-Type: application/json`
* **Body**:
```json
{
  "email": "pm.lead@example.com",
  "password": "StrongPassword123!",
  "role": "PROJECT_MANAGER"
}
```
* **Status**: `201 Created`
* **Response**: Returns created user profile and initial access/refresh tokens. Password is saved as a 10-round salted bcrypt hash in PostgreSQL.

#### 2. Log In & Receive Dual JWT Tokens (Public)
* **Method**: `POST`
* **URL**: `http://localhost:3014/auth/login`
* **Headers**: `Content-Type: application/json`
* **Body**:
```json
{
  "email": "pm.lead@example.com",
  "password": "StrongPassword123!"
}
```
* **Status**: `200 OK`
* **Response**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
* **Action**: Copy the `accessToken`.

#### 3. Configure Hoppscotch Authorization
1. Switch to the **Authorization** tab in Hoppscotch (next to Headers).
2. In the dropdown, select **Bearer**.
3. Paste the copied `accessToken` into the **Token** field.

#### 4. Check Current Authenticated Profile (@CurrentUser)
* **Method**: `GET`
* **URL**: `http://localhost:3014/auth/me`
* **Authorization**: Bearer `<accessToken>`
* **Status**: `200 OK`
* **Response**: Shows current user payload decoded from JWT via custom `@CurrentUser()` decorator:
```json
{
  "id": "c1f7a4e0-...",
  "email": "pm.lead@example.com",
  "role": "PROJECT_MANAGER"
}
```

#### 5. List Projects (Guarded by JwtAuthGuard)
* **Method**: `GET`
* **URL**: `http://localhost:3014/projects`
* **Authorization**: Bearer `<accessToken>`
* **Status**: `200 OK`
* **Test Failure Case**: Clear the Authorization header and send again &rarr; Returns `401 Unauthorized` (`"Authentication required. Missing or invalid Bearer token."`).

#### 6. Create Project (Guarded by RolesGuard - PM+ Required)
* **Method**: `POST`
* **URL**: `http://localhost:3014/projects`
* **Authorization**: Bearer `<accessToken>` (Logged in as `PROJECT_MANAGER`)
* **Headers**: `Content-Type: application/json`
* **Body**:
```json
{
  "name": "Tower Beta Development",
  "description": "Commercial block managed by PM"
}
```
* **Status**: `201 Created`
* **Role Enforcement Demo**: If logged in as `SITE_ENGINEER` (SE), this request is rejected with `403 Forbidden` (`"Insufficient permissions. Role 'SITE_ENGINEER' cannot perform this action."`).

#### 7. Rotate Refresh Token
* **Method**: `POST`
* **URL**: `http://localhost:3014/auth/refresh`
* **Headers**: `Content-Type: application/json`
* **Body**:
```json
{
  "refreshToken": "<paste your refreshToken here>"
}
```
* **Status**: `200 OK`
* **Response**: Issues a brand new access token and new rotated refresh token. The previous refresh token is immediately invalidated in PostgreSQL. Replaying the old token revokes active sessions.

---

## Study Materials
- Text summary: [`study_material.txt`](study_material.txt)
- Formatted PDF handbook: [`study_material.pdf`](study_material.pdf)

