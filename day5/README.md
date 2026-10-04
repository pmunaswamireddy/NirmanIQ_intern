# Day 5 - Git Workflow & HTML/CSS Foundations

**Track:** Full-Stack Web Development  
**Date:** 04-10-2026  
**Branch:** `main`

---

## Notes & Concepts

### 1. Enterprise Git Branching & Merge vs Rebase
- **Branch Naming:** Standardized prefixes (`feat/`, `fix/`, `chore/`, `docs/`, `refactor/`) keep feature isolation clear and streamline team review cycles.
- **Git Merge (3-Way):** Combines branches and creates a merge commit, preserving complete historical branching context.
- **Git Rebase:** Replays commits linearly on top of the target base branch, maintaining a clean, linear project history.
- **Golden Rule:** Never rebase public or shared team branches.

### 2. Resolving Merge Conflicts & Squashing Commits
- Conflicts occur when simultaneous commits modify the same file lines.
- Resolved by manually reviewing conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), combining changes, staging with `git add`, and committing.
- Commit squashing (`git reset --soft` or `git rebase -i`) collapses local work-in-progress micro-commits into a single cohesive commit before opening a Pull Request.

### 3. Conventional Commits & PR Etiquette
- Commit subjects must be written in the **imperative mood** (e.g. `feat: add tower progress card component`, not `added` or `adds`).
- Pull Requests should be kept concise (< 400 lines), opened early as Draft PRs for mentor guidance, and accompanied by testing notes.

### 4. Semantic HTML5 & WCAG Accessibility
- Replace "div soup" with meaningful semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<button>`, `<dl>`).
- Semantic buttons provide automatic keyboard focus (<kbd>Tab</kbd>) and activate on <kbd>Enter</kbd> and <kbd>Space</kbd> natively.
- High-contrast color palettes ensure status badges pass strict WCAG AAA contrast ratios (minimum 7:1 for text).

### 5. The CSS Layout Trinity (Box Model, Flexbox & Grid)
- **Box Model:** Global `box-sizing: border-box;` ensures padding and borders never cause element overflows.
- **Flexbox (1D):** Ideal for single-axis alignment such as navigation bars, headers, and button groups.
- **CSS Grid (2D):** Ideal for two-dimensional multi-column dashboard cards and metric layouts.

### 6. Mobile-First Responsive Design
- Base styles target mobile screens (360px) in a single column.
- `@media (min-width: 768px)` enhances layout to 2 columns for tablets.
- `@media (min-width: 1024px)` expands to 3 columns with maximum container constraints.

---

## Exercises Done

- `exercise-1-git-workflow.js`: Automated Git kata script demonstrating branch creation, concurrent team edits, conflict triggering, resolution, and commit squashing.
- `exercise-2-tower-card.html`: Accessible Tower Progress Card featuring semantic tags, accessible progress bars (`role="progressbar"`), and WCAG AAA status badges.
- `exercise-3-responsive-nav.html`: Pure CSS responsive navigation bar with an accessible hamburger drawer menu operating without JavaScript.
- `index.html`: Friday Demo dashboard combining the responsive navigation bar and live multi-tower progress cards.

---

## How to Run

From the project root:

```bash
# Run Git Kata simulation script:
npm run day5:ex1
# or:
node day5/exercises/exercise-1-git-workflow.js

# Preview the HTML/CSS deliverables:
# Open any of the following directly in your browser:
day5/exercises/exercise-2-tower-card.html
day5/exercises/exercise-3-responsive-nav.html
day5/index.html
```

---

## Study Material

- Complete syllabus study material for Day 5 is available in [`study_material.pdf`](study_material.pdf) and [`study_material.txt`](study_material.txt).
