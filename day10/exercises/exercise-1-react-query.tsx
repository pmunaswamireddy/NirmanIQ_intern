'use client';

import React from 'react';
import { useProjects } from '../lib/useProjects';

// Exercise 1: React Query data fetching demo
export function Exercise1ReactQueryDemo() {
  const { data: projects, isLoading, isError, error, refetch } = useProjects();

  if (isLoading) {
    return <div className="loading-box">Fetching projects from server (loading state)...</div>;
  }

  if (isError) {
    return (
      <div className="error-box">
        <p>Error loading projects: {error.message}</p>
        <button onClick={() => refetch()} className="btn btn-outline">Retry</button>
      </div>
    );
  }

  return (
    <div className="exercise-card">
      <h3>Exercise 1: React Query useProjects Hook</h3>
      <p className="subtext">Auto-cached, background refetching enabled.</p>
      <ul className="project-list">
        {projects?.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.status} ({p.progress}%)
          </li>
        ))}
      </ul>
      <button onClick={() => refetch()} className="btn btn-sm btn-outline mt-2">
        Force Refetch
      </button>
    </div>
  );
}
