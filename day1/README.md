# Day 1: JavaScript for Python Developers

**Intern:** Penumuru Madhu Sudhan Reddy  
**Date:** 28-09-2026  
**Branch:** `main`

---

## Notes & Concepts

### 1. Variables
- In Python, we just assign `x = 5`.
- In JS, we use `const` by default. If we need to change the value later (like in a loop), we use `let`.
- Don't use `var` because of scope issues.

### 2. Types & Truthy/Falsy
- Primitives: string, number, boolean, null, undefined.
- `undefined` means a variable was declared without a value. `null` is set manually to show empty.
- In Python, `[]` and `{}` are false. But in JS, `[]` and `{}` are **true**.
- To check if a list is empty in JS, use `arr.length === 0`.

### 3. Strings
- Python uses f-strings: `f"Tower {name}"`.
- JS uses template strings with backticks: `` `Tower ${name}` ``.

### 4. Destructuring
- Extracting values from objects or arrays easily.
- Example: `const { name, floors } = tower;`
- Very useful for React props later on.

---

## 3 Things That Surprised Me (JS vs Python)

1. **Empty list `[]` evaluates to true in JS**
   In Python, `if not my_list:` is standard. In JS, `if ([])` is actually true! I had to learn to check `arr.length === 0` instead.

2. **Negative modulo behavior**
   In Python, `-1 % 5` gives `4`. But in JS, `-1 % 5` gives `-1`. This broke my array rotation at first until I added the array length to wrap it around.

3. **Object Destructuring**
   In Python, pulling values from a dictionary takes multiple `.get()` lines. In JS, I can pull multiple fields and set default values in a single line.

---

## Exercises Done

- `exercise-1-python-to-js.js`: 5 functions rewritten from Python to JS.
- `exercise-2-destructuring.js`: Practicing destructuring on sample construction data.
- `exercise-3-array-methods.js`: 50 construction tasks solved using array methods (no loops).

---

## How to Run

From project root:
```bash
# using npm scripts:
npm run day1:ex1
npm run day1:ex2
npm run day1:ex3

# or directly with node:
node day1/exercises/exercise-1-python-to-js.js
node day1/exercises/exercise-2-destructuring.js
node day1/exercises/exercise-3-array-methods.js
```

---

## Study Material

- Complete syllabus study material for this day is available in [study_material.pdf](study_material.pdf) (and [study_material.txt](study_material.txt)).
