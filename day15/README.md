# Day 15: Checkpoint Assessment #1 — Tower Progress Tracker

## Overview
This folder contains the complete, production-grade full-stack deliverable for **Checkpoint Assessment #1: "Tower Progress Tracker"**, concluding Phase 1 (Days 1–15) of the NirmanIQ Full-Stack Web Development Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Architecture & System Stack

* **Frontend**: Next.js 14 App Router, Tailwind CSS, Lucide icons, Zustand, TanStack React Query (`http://localhost:3050`)
* **Backend**: NestJS 11, TypeORM, Passport JWT, bcrypt (`http://localhost:3015`)
* **Database**: PostgreSQL 16 on port 5432 (`nirmaniq_training` shared database)

```
[Next.js Client (:3050)]
       │
       ├──> POST /auth/login ─────────────> [NestJS Backend (:3015)]
       │    (1-Click PM / SE Auth)                 │
       │                                     TypeORM Entity Models
       ├──> GET /projects                          │
       ├──> POST /projects (PM only)        [PostgreSQL 16 (:5432)]
       ├──> POST /projects/:id/towers (PM)         ├── users
       └──> PATCH /floors/:id/progress (SE) ───────┼── projects
                                                   ├── towers
                                                   └── floors
```

---

## Role-Based Permissions Matrix

| Resource / Endpoint | Method | Site Engineer (SE) | Project Manager (PM) | Super Admin (SA) |
|---|---|---|---|---|
| `/auth/login` | POST | Allowed | Allowed | Allowed |
| `/projects` | GET | Allowed (Read-only) | Allowed | Allowed |
| `/projects` | POST | **403 Forbidden** | Allowed (Create) | Allowed |
| `/projects/:id` | PUT / DELETE | **403 Forbidden** | Allowed | Allowed |
| `/projects/:id/towers` | POST | **403 Forbidden** | Allowed (Create) | Allowed |
| `/floors/:id/progress` | PATCH | **Allowed (Site Action)** | Allowed | Allowed |

---

## How to Run & Verify

### 1. Run Automated Full-Stack Test Suite
From workspace root:
```bash
npm run day15:test
```
Verifies 5/5 core assessment criteria:
1. Dual JWT token generation for PM and SE.
2. `JwtAuthGuard` protection on unauthenticated requests (`401 Unauthorized`).
3. PM project creation and tower addition (`201 Created`).
4. `RolesGuard` strict blocking of SE on project creation (`403 Forbidden`).
5. SE authorized floor progress update (`PATCH /floors/:id/progress`), floor status transition, and tower risk recalibration.

### 2. Start the Backend API (Port 3015)
```bash
npm run day15:backend
```

### 3. Start the Next.js Frontend (Port 3050)
```bash
npm run day15:frontend
```
Open **`http://localhost:3050`** in your browser.

---

## Frontend Pages & Features

1. **Login Page (`/login`)**:
   - 1-Click quick login buttons for **Site Engineer** (`se@nirmaniq.com`) and **Project Manager** (`pm@nirmaniq.com`).
2. **Projects Dashboard (`/projects`)**:
   - Real-time search filter and status tabs (`ALL`, `ACTIVE`, `PLANNING`, `COMPLETED`).
   - Project cards displaying total tower count and average completion percentage.
   - "New Project" modal (enabled for PM role).
3. **Project Detail & Tower Grid (`/projects/[id]`)**:
   - Displays `<TowerGrid>` with color-coded risk status badges:
     - 🟢 **On Track** (`#10b981`)
     - 🟡 **At Risk** (`#f59e0b`)
     - 🔴 **High Risk** (`#ef4444`)
     - 🚨 **Critical** (`#dc2626`)
   - "Add Tower" modal (enabled for PM role).
4. **Tower Detail & Floor-by-Floor View (`/projects/[id]/towers/[towerId]`)**:
   - Interactive list of all floors with progress bars.
   - **"Update Progress"** modal with range slider (0% to 100%) authorized for Site Engineers.

---

## Testing Day 15 APIs with Hoppscotch

* **Base URL**: `http://localhost:3015`

### 1. Authenticate (POST /auth/login)
* Body: `{"email": "pm@nirmaniq.com", "password": "Password123!"}`
* Copy `accessToken` &rarr; set in Hoppscotch **Authorization** tab as **Bearer** token.

### 2. Create Project (PM Role)
* `POST http://localhost:3015/projects`
* Body: `{"name": "Marina Heights Block A", "status": "ACTIVE"}`

### 3. Update Floor Progress (SE Role)
* Login as `se@nirmaniq.com` &rarr; set new Bearer token.
* `PATCH http://localhost:3015/floors/<floor_id>/progress`
* Body: `{"completionPercentage": 100}`
* Returns updated floor with status `'COMPLETED'` and automatically recalibrates tower risk.

---

## Study Materials
- Text handbook: [`study_material.txt`](study_material.txt)
- Formatted PDF guide: [`study_material.pdf`](study_material.pdf)
