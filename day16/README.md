# Day 16: Forms, Validation & Complex UI Patterns

## Overview
This folder contains the complete Phase 2 (Week 4) Day 16 deliverables for the NirmanIQ Web Development Internship, authored by **Penumuru Madhu Sudhan Reddy**.

Day 16 introduces enterprise-grade frontend forms and complex UI patterns using **React Hook Form** and **Zod** schema validation, establishing performant, accessible, and type-safe data entry interfaces for construction workflows.

---

## Exercises Implemented

### 1. Multi-Step "Create Project" Wizard (`src/exercises/exercise-1-multi-step-project.tsx`)
* **Step 1 (Basic Info)**: Validates project name, regex project code (`PRJ-XXX`), location, developer name, and ensures the target completion date is in the future.
* **Step 2 (Tower Configuration)**: Uses React Hook Form's `useFieldArray` to dynamically add, configure, and remove construction towers (name, 1–120 floor bounds, and budget).
* **Step 3 (Review & Submit)**: Summarizes KPI metrics (total towers, aggregate floors, total budget in crores), allows adding project remarks, and commits the full payload.
* **Atomic Step Validation**: Moving between steps triggers step-specific Zod schema validation, preventing progression with invalid fields.

### 2. "Floor Inspection" Form with Cascading Dropdowns (`src/exercises/exercise-2-floor-inspection.tsx`)
* **Dependent Dropdowns**: Cascading hierarchy where selecting a **Tower** dynamically filters and unlocks **Floors**, and selecting a **Floor** filters and unlocks **Rooms/Units**. Changing a parent selection automatically resets child selections.
* **10 MB Evidence Photo Uploader**: Custom file input supporting drag-and-drop, restricted to images (`.jpg`, `.png`, `.webp`), with a strict 10 MB limit verified via Zod `.refine()`, instant image preview thumbnail, and removal capability.
* **Quality Status Radio Badges**: Color-coded badges for `PASS` (Emerald), `FLAGGED` (Amber), and `FAILED` (Rose).

### 3. Inline-Editable Bulk Progress Table (`src/exercises/exercise-3-inline-editable-table.tsx`)
* **Click-to-Edit Cells**: Click on contractor, progress percentage, status, or remarks to instantly switch from display mode to active input mode with auto-focus.
* **Keyboard Navigation**:
  - `Enter`: Commits the current cell's value (validated via Zod `bulkRowSchema`).
  - `Escape`: Discards unsaved changes and cancels editing.
  - `Tab` / `Shift+Tab`: Commits the current cell and immediately advances cursor to the next/previous editable cell across columns and rows.
* **Automatic Status Synchronization**: Updating progress to `100%` automatically flips status to `COMPLETED`; setting `0%` flips status to `NOT_STARTED`.
* **Batch Actions**: Tracks dirty rows with a changed-rows badge, offers "Save Bulk Progress" and "Reset to Original" actions.

---

## How to Run & Verify

### 1. Start the React Development Server (Port 3016)
From workspace root:
```bash
npm run day16:dev
```
Or from inside `day16/`:
```bash
cd day16
npm run dev
```
Open **`http://localhost:3016`** in your browser to interact with all three exercises via the tabbed interface.

### 2. Run the Production Build
```bash
npm run day16:build
```

### 3. Run the Automated 10-Step Test Suite
```bash
npm run day16:test
```
Verifies:
1. `step1BasicSchema` length, regex, and future date validation.
2. `towerConfigSchema` floor bounds (1–120) and positive budget requirements.
3. `step2TowersSchema` array limits (min 1, max 10).
4. `fullProjectSchema` composite validation.
5. `floorInspectionSchema` required fields and enum validity.
6. `photoEvidenceSchema` file size limit (&le; 10 MB) and image format restrictions.
7. Cascading hierarchy integrity (Tower &rarr; Floor &rarr; Room).
8. `bulkRowSchema` cell constraints (0–100% progress range).
9. `bulkTableSchema` batch array verification.
10. Keyboard navigation wrapping math for `Tab` and `Shift+Tab`.

---

## Study Materials & Handbooks
* **Text Handbook**: [`study_material.txt`](study_material.txt)
* **Formatted PDF Guide**: [`study_material.pdf`](study_material.pdf)
