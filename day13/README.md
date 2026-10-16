# Day 13: PostgreSQL & TypeORM

## Overview
This folder contains the practical exercises, TypeORM entity models, migrations, NestJS modules, and study materials for Day 13 of the NirmanIQ Full-Stack Web Development Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Technical Highlights & Exercises Implemented

1. **Exercise 1: PostgreSQL Setup with Docker Compose** (`docker-compose.yml` & `exercises/exercise-1-docker-postgres.js`)
   - Configured PostgreSQL 16 Alpine container with persistent volume mounting.
   - Credentials configured for `nirmaniq_user` on port 5432 with database `nirmaniq_training`.

2. **Exercise 2: TypeORM Relational Entities & NirmanIQ Conventions** (`src/*/entities/` & `exercises/exercise-2-typeorm-entities.js`)
   - **UUID Primary Keys**: `@PrimaryGeneratedColumn('uuid')` eliminates IDOR vulnerabilities and supports distributed creation.
   - **snake_case Column Mapping**: `@Column({ name: 'created_at' })`, `@Column({ name: 'is_archived' })` preserves SQL standards.
   - **Hierarchical Relational Mapping**:
     - `ProjectEntity` 1 &rarr; Many `TowerEntity` with `cascade: true`
     - `TowerEntity` 1 &rarr; Many `FloorEntity` with `@JoinColumn({ name: 'project_id' })` and `onDelete: 'CASCADE'`

3. **Exercise 3: Safe Migration Lifecycle & Rollbacks** (`src/migrations/` & `exercises/exercise-3-migrations.js`)
   - `synchronize: false` enforced across application to protect production schema integrity.
   - Initial schema migration (`1728980000000-InitialDatabaseSchema.ts`) defines DDL, foreign keys, and indexes.
   - Secondary migration (`1728980001000-AddIsArchivedToProjects.ts`) verifies non-destructive schema evolution and down rollback.

4. **Exercise 4: TypeORM Repositories replacing In-Memory Arrays (CRUD)** (`src/projects/projects.service.ts` & `exercises/exercise-4-services-crud.js`)
   - Replaced in-memory array storage with TypeORM `Repository<ProjectEntity>`.
   - Never `SELECT *`: Enforced selective projection (`select: ['id', 'name', 'status', 'createdAt']`).
   - Eager loading relations: `relations: ['towers']`.
   - Implements full CRUD: `create`, `findAll`, `findOne`, `update`, `delete`.

5. **Exercise 5: Raw SQL vs TypeORM QueryBuilder** (`exercises/exercise-5-raw-sql-vs-querybuilder.js`)
   - Pure raw SQL query with multi-table `LEFT JOIN` and `GROUP BY`.
   - TypeORM `QueryBuilder` implementation computing:
     - `COUNT(DISTINCT t.id)` (towerCount)
     - `ROUND(AVG(f.completion_percentage), 2)` (avgCompletion)
     - `MAX(t.risk_level)` (maxRiskLevel)
   - Uses `getRawMany()` to execute the query in a single database round-trip.

---

## How to Run & Test

### 1. Run Automated Verification Tests
From the workspace root:
```bash
npm run day13:test
```
*Or inside `day13`:*
```bash
cd day13
npm test
```

### 2. Run Individual Exercises
```bash
npm run day13:ex1
npm run day13:ex2
npm run day13:ex3
npm run day13:ex4
npm run day13:ex5
```

### 3. Spin Up Local PostgreSQL Container
```bash
cd day13
docker compose up -d
```

### 4. Run Migrations via TypeORM CLI
```bash
cd day13
npm run migration:run
npm run migration:revert
```

---

## Study Materials
- Text summary: [`study_material.txt`](study_material.txt)
- Formatted PDF handbook: [`study_material.pdf`](study_material.pdf)
