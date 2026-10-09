'use client';

import React from 'react';
import { useProjects } from '../lib/useProjects';
import { useUIStore } from '../lib/stores';

// Exercise 4: React Query + Zustand Combined Project List
export function Exercise4CombinedProjectList() {
  const { data: projects, isLoading, isError } = useProjects();
  const { statusFilter, setStatusFilter, viewMode, setViewMode } = useUIStore();

  if (isLoading) return <div className="loading-box">Loading projects...</div>;
  if (isError) return <div className="error-box">Failed to load projects.</div>;

  const filtered = projects?.filter((p) => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  return (
    <div className="exercise-card">
      <div className="flex-header">
        <div>
          <h3>Exercise 4: Coordinated State Architecture</h3>
          <p className="subtext">
            React Query handles server fetching & caching; Zustand handles client filters & view mode.
          </p>
        </div>

        {/* View mode toggle via Zustand */}
        <div className="btn-group">
          <button
            onClick={() => setViewMode('grid')}
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Filter pills via Zustand */}
      <div className="filter-pills mt-2">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`pill ${statusFilter === f ? 'pill-active' : ''}`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Render projects according to Zustand viewMode */}
      {viewMode === 'grid' ? (
        <div className="grid-container mt-3">
          {filtered?.map((p) => (
            <div key={p.id} className="project-grid-card">
              <h4>{p.name}</h4>
              <p>Status: <span className="status-text">{p.status}</span></p>
              <p>Towers: {p.towerCount}</p>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${p.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-responsive mt-3">
          <table className="simple-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Status</th>
                <th>Towers</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.status}</td>
                  <td>{p.towerCount}</td>
                  <td>{p.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
