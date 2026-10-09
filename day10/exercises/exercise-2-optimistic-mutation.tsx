'use client';

import React, { useState } from 'react';
import { useCreateProject } from '../lib/useCreateProject';

// Exercise 2: Optimistic Mutation Demo
export function Exercise2MutationDemo() {
  const [name, setName] = useState('');
  const createMutation = useCreateProject();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createMutation.mutate({
      name: name.trim(),
      status: 'active',
      progress: 0,
      towerCount: 2,
    });

    setName('');
  };

  return (
    <div className="exercise-card">
      <h3>Exercise 2: useCreateProject with Optimistic Updates</h3>
      <p className="subtext">
        Adds item immediately to UI before server confirms, rolls back if error occurs.
      </p>

      <form onSubmit={handleCreate} className="inline-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Project Name..."
          className="input-field"
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="btn btn-primary"
        >
          {createMutation.isPending ? 'Saving...' : 'Add Project (Optimistic)'}
        </button>
      </form>
    </div>
  );
}
