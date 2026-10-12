# Day 11: NestJS Architecture & First API

## Overview
This folder contains the practical exercises, independent NestJS REST API project, Postman collection, and study materials for Day 11 of the NirmanIQ Full-Stack Web Development Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Architecture & Exercises Implemented

1. **Exercise 1: NestJS Scaffolding & Domain Modules** (`src/app.module.ts`, `src/projects/`, `src/towers/`)
   - Structured according to NestJS three-tier architecture: Modules, Controllers, and Providers (Services).
   - Inversion of Control (IoC) with Constructor Dependency Injection.

2. **Exercise 2: CRUD Endpoints with In-Memory Store** (`src/projects/projects.controller.ts` & `src/projects/projects.service.ts`)
   - `GET /projects`: Retrieves list of construction projects.
   - `GET /projects/:id`: Retrieves single project by ID (throws `NotFoundException` if invalid).
   - `POST /projects`: Creates a new project with generated ID.
   - `PUT /projects/:id`: Updates existing project attributes.
   - `DELETE /projects/:id`: Deletes project from in-memory collection.

3. **Exercise 3: Postman Collection** (`postman_collection.json`)
   - Complete Postman collection covering all 5 CRUD endpoints and nested tower routes with sample payloads and expected responses.

4. **Exercise 4: Nested Resource Module** (`src/towers/towers.controller.ts` & `src/towers/towers.service.ts`)
   - `GET /projects/:id/towers`: Retrieves all towers belonging to a specific project.
   - `POST /projects/:id/towers`: Adds a new tower to the specified project.

---

## How to Run

### 1. Run the NestJS Server (Port 3011)
```bash
cd day11

# Compile TypeScript:
npm run build

# Start the NestJS server:
npm run start
```
API endpoints will be live at `http://localhost:3011`.

*Or directly from the workspace root:*
```bash
npm run day11:build   # Compiles Day 11 NestJS API
npm run day11:start   # Starts server on http://localhost:3011
npm run day11:test    # Runs automated verification tests
```

### 2. Run Automated Verification Tests
From the workspace root:
```bash
npm run day11:test
```
Verifies all 7 CRUD and nested tower endpoints, verifying status responses and 404 error handling.

---

## Study Materials
- Text summary: [`study_material.txt`](study_material.txt)
- Formatted PDF handbook: [`study_material.pdf`](study_material.pdf)
- Postman API collection: [`postman_collection.json`](postman_collection.json)
