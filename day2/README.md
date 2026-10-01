# Day 2 - Async JavaScript & the Event Loop

**Intern:** Penumuru Madhu Sudhan Reddy  
**Date:** 29-09-2026  
**Branch:** `main`

---

## Notes & Concepts

### 1. The Event Loop & Non-Blocking I/O
- Python code is synchronous and blocking by default (e.g. `time.sleep()`, `requests.get()`). It relies on multiple threads or `asyncio`.
- JavaScript runs on a single main thread (the Call Stack) but never blocks because heavy tasks (timers, network requests, disk reads) are offloaded to background C++ threads in libuv.
- Microtasks (Promise callbacks, `.then()`, `await` resumes) have higher priority and drain completely before any Macrotask (`setTimeout`, I/O callbacks).

### 2. Evolution of Asynchronous JavaScript
- **Callbacks:** The older pattern of passing functions into functions. Led to nested "callback hell".
- **Promises:** Objects representing future values with states: `pending`, `fulfilled`, `rejected`.
- **async / await:** Syntactic sugar over Promises. Allows writing non-blocking asynchronous code that reads sequentially like Python.

### 3. Promise Combinators
- `Promise.all([p1, p2, p3])`: Runs in parallel. Fails fast if any single promise rejects.
- `Promise.allSettled([p1, p2, p3])`: Runs all to completion regardless of failures. Returns an array of `{ status, value/reason }`.
- `Promise.race([p1, p2, p3])`: Resolves or rejects as soon as the first promise settles.

### 4. HTTP Requests: `fetch()` vs Python `requests`
- In Python, `res = requests.get(url)` is synchronous and returns both headers and body.
- In JS, `fetch()` requires two `await`s:
  1. `const res = await fetch(url);` (waits for HTTP response headers)
  2. `const data = await res.json();` (waits to stream and parse body)

---

## Event Loop Breakdown Diagram (Deliverable)

The syllabus asks for a diagram showing the event loop for one of our exercises. Below is the event loop lifecycle showing how **Exercise 2 (`fetchWithRetry`)** and **Exercise 3 (`processQueue`)** move through the runtime:

```
===================================================================
               JAVASCRIPT EVENT LOOP ARCHITECTURE
===================================================================

       +----------------+
       |   CALL STACK   |   <-- 1. Executes JS functions (One by one, LIFO)
       +----------------+
               |
               | When calling async functions (fetch, setTimeout):
               v
       +--------------------+
       |  Node.js (libuv)   |   <-- 2. Background C++ worker threads handle
       |  Worker Pool       |       network I/O, timers, and file system.
       +--------------------+
               |
               | When network response or timer finishes, callback is queued:
               v
       +------------------------------------+
       |   Microtask Queue (High Priority)  |  <-- Drained FIRST completely
       |   - Promise .then() / await resume |
       +------------------------------------+
               |
               v
       +------------------------------------+
       |   Macrotask Queue (Callback Queue) |  <-- Drained AFTER microtasks
       |   - setTimeout / setInterval       |
       |   - I/O events                     |
       +------------------------------------+
               |
               v
       +------------------------------------+
       |        EVENT LOOP MONITOR          |
       |  Is Call Stack empty?              |
       |  - YES: Push next queued callback! |
       |  - NO:  Wait for stack to clear.   |
       +------------------------------------+
```

### Event Loop Execution Trace for Exercise 2 (`fetchWithRetry`):
1. `fetchWithRetry()` is pushed onto the **Call Stack**.
2. `fetch(url)` is invoked. Node delegates the network request to the **libuv background worker pool** and pops `fetch` off the Call Stack. The main thread remains unblocked.
3. When the network response returns with an HTTP error, the rejection callback is queued in the **Microtask Queue**.
4. The Event Loop detects the Call Stack is empty, pushes the microtask callback, and the `catch` block triggers.
5. In the `catch` block, `sleep(delay)` calls `setTimeout(resolve, delay)`. Node registers a timer in libuv and puts the callback in the **Macrotask Queue** once the countdown finishes (e.g. 500ms).
6. After all microtasks are done, the Event Loop pulls the timer callback from the Macrotask Queue, resolving `sleep()`, and the `for` loop begins the next retry attempt with doubled delay.

---

## Exercises Done

- `exercise-1-parallel-fetch.js`: CLI script fetching 3 public APIs in parallel using `Promise.all()`, merging fields into a single object, and writing to `merged-api-data.json`.
- `exercise-2-retry-fetch.js`: Retry function `fetchWithRetry(url, maxRetries)` with exponential backoff (doubling delays: 500ms -> 1000ms -> 2000ms).
- `exercise-3-task-queue.js`: Async task queue processing 9 NirmanIQ construction video tasks with a strict concurrency limit of 3 workers.

---

## How to Run

From project root:
```bash
# using npm scripts:
npm run day2:ex1
npm run day2:ex2
npm run day2:ex3

# or directly with node:
node day2/exercises/exercise-1-parallel-fetch.js
node day2/exercises/exercise-2-retry-fetch.js
node day2/exercises/exercise-3-task-queue.js
```

---

## Study Material

- Complete syllabus study material for this day is available in [`study_material.pdf`](study_material.pdf) (and [`study_material.txt`](study_material.txt)).
