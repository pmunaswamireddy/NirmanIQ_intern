'use client';

import React from 'react';
import { Exercise1ReactQueryDemo } from '../exercises/exercise-1-react-query';
import { Exercise2MutationDemo } from '../exercises/exercise-2-optimistic-mutation';
import { Exercise3ZustandDemo } from '../exercises/exercise-3-zustand-stores';
import { Exercise4CombinedProjectList } from '../exercises/exercise-4-combined-dashboard';

export default function Day10Page() {
  return (
    <div>
      <h1>Day 10: State Management & Data Fetching</h1>
      <p className="desc">
        TanStack React Query for Server State & Caching + Zustand for Client UI State.
      </p>

      {/* Exercise 4: Main combined dashboard */}
      <Exercise4CombinedProjectList />

      {/* Exercise 2: Optimistic Mutation */}
      <Exercise2MutationDemo />

      {/* Exercise 3: Zustand Stores */}
      <Exercise3ZustandDemo />

      {/* Exercise 1: React Query Hooks Demo */}
      <Exercise1ReactQueryDemo />
    </div>
  );
}
