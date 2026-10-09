'use client';

import React from 'react';
import { useAuthStore, useUIStore } from '../lib/stores';

// Exercise 3: Zustand Store Demo
export function Exercise3ZustandDemo() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar, viewMode, setViewMode } = useUIStore();

  return (
    <div className="exercise-card">
      <h3>Exercise 3: Zustand Client State Stores</h3>
      <div className="store-section">
        <p>
          <strong>Auth Store:</strong>{' '}
          {isAuthenticated ? `Logged in as ${user}` : 'Guest / Logged out'}
        </p>
        <div className="btn-group">
          {isAuthenticated ? (
            <button onClick={logout} className="btn btn-sm btn-outline">Log Out</button>
          ) : (
            <button onClick={() => login('Site Engineer', 'token-123')} className="btn btn-sm btn-primary">
              Log In as Engineer
            </button>
          )}
        </div>
      </div>

      <div className="store-section mt-3">
        <p>
          <strong>UI Store:</strong> Sidebar is{' '}
          <span className="badge">{sidebarOpen ? 'Open' : 'Collapsed'}</span> | View:{' '}
          <span className="badge">{viewMode}</span>
        </p>
        <div className="btn-group">
          <button onClick={toggleSidebar} className="btn btn-sm btn-outline">
            Toggle Sidebar
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
            className="btn btn-sm btn-outline"
          >
            Switch to {viewMode === 'grid' ? 'Table' : 'Grid'} View
          </button>
        </div>
      </div>
    </div>
  );
}
