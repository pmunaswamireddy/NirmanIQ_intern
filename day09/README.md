# Day 9: Tailwind CSS & shadcn/ui

## Overview
This folder contains the practical exercises, independent Next.js project, and study materials for Day 9 of the NirmanIQ Full-Stack Web Development Internship.

Author: Penumuru Madhu Sudhan Reddy

---

## Architecture & Exercises Implemented

1. **Exercise 1: UI Primitives & shadcn Components** (`components/ui/` & `exercises/exercise-1-components.tsx`)
   - `Button`: Clean button with `default`, `outline`, `secondary`, and `destructive` variants.
   - `Badge`: Status badges with `default`, `success`, `warning`, and `destructive` color schemes.
   - `Card`: Composable `Card`, `CardHeader`, `CardTitle`, and `CardContent` wrappers.
   - `Input`: Accessible input with real-time inline validation error display.
   - `Table`: Responsive table primitives (`Table`, `TableHeader`, `TableRow`, `TableHead`, `TableBody`, `TableCell`).
   - `Dialog`: Accessible modal popup with backdrop blur, title, and dismiss button.

2. **Exercise 2: Project List Table with Sorting** (`exercises/exercise-2-project-table.tsx`)
   - Columns: Name, Status (badge), Progress (bar + percentage), Risk Level (colored badge), Last Updated.
   - Clickable column headers to sort ascending / descending by Name, Progress, or Last Updated.
   - Responsive design: Horizontally scrollable wrapper preventing overflow on mobile (360px).

3. **Exercise 3: Create Project Dialog & Validation** (`exercises/exercise-3-create-dialog.tsx`)
   - Modal form triggering on "+ Create Project".
   - Form fields: Name, Description, Start Date, Tower Count.
   - Validation rules:
     - Name: 3–100 characters.
     - Description: Required.
     - Start Date: Required.
     - Tower Count: 1–50.
   - Shows inline error messages on invalid fields.

4. **Exercise 4: Toast Notification System with Sonner** (`exercises/exercise-4-toast-system.tsx` & `app/layout.tsx`)
   - Configured global `<Toaster position="top-right" richColors />` provider.
   - Triggers `toast.success('Project created successfully!')` on valid form submission.
   - Triggers `toast.error('Failed to save project. Please check form inputs.')` on validation failure.

---

## How to Run

### 1. Run the Independent Next.js Dev Server (Port 3009)
Navigate into the `day9` folder:

```bash
cd day9

# Start local dev server (Port 3009):
npm run dev

# Build the production bundle:
npm run build

# Start production server:
npm run start
```

*Or directly from the workspace root:*
```bash
npm run day9:dev     # Starts Day 9 dev server on http://localhost:3009
npm run day9:build   # Compiles Day 9 production build
npm run day9:test    # Runs automated verification tests
```

### 2. Run Automated Verification Tests
From the workspace root:
```bash
npm run day9:test
```
Verifies project data integrity, table sorting by name and progress, and dialog form validation boundaries.

---

## Study Materials
- Text summary: [`study_material.txt`](study_material.txt)
- Formatted PDF handbook: [`study_material.pdf`](study_material.pdf)
