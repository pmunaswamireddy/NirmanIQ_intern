'use client';

import React, { useState } from 'react';
import { initialProjects, ProjectItem } from '../lib/data';
import { Button } from '../components/ui/button';
import { ProjectTable } from '../exercises/exercise-2-project-table';
import { CreateProjectDialog } from '../exercises/exercise-3-create-dialog';
import { ToastDemoSection } from '../exercises/exercise-4-toast-system';

export default function Day9Page() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleAddProject = (newProject: ProjectItem) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Construction Project Intelligence
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Day 9: Tailwind CSS, shadcn/ui components & Sonner toast notifications
          </p>
        </div>

        {/* Exercise 3 Trigger */}
        <Button onClick={() => setIsDialogOpen(true)} variant="default" size="md">
          + Create Project
        </Button>
      </div>

      {/* Exercise 2: Sortable Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Active Sites Registry ({projects.length})
          </h2>
          <span className="text-xs text-slate-400">Click table headers to sort</span>
        </div>
        <ProjectTable projects={projects} />
      </div>

      {/* Exercise 3 Dialog */}
      <CreateProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddProject={handleAddProject}
      />

      {/* Exercise 4: Toast Trigger Demonstrator */}
      <ToastDemoSection />
    </div>
  );
}
