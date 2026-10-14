'use client';

import React, { useState } from 'react';
import { Dialog } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ProjectItem } from '../lib/data';
import { toast } from 'sonner';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProject: (project: ProjectItem) => void;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  onAddProject
}: CreateProjectDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [towerCount, setTowerCount] = useState('1');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name validation: 3-100 chars
    if (!name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      newErrors.name = 'Name must be between 3 and 100 characters';
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Start Date validation
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    // Tower Count validation: 1-50
    const towers = parseInt(towerCount, 10);
    if (!towerCount || isNaN(towers)) {
      newErrors.towerCount = 'Tower count is required';
    } else if (towers < 1 || towers > 50) {
      newErrors.towerCount = 'Tower count must be between 1 and 50';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Exercise 4: Trigger error toast on validation failure
      toast.error('Failed to save project. Please check form inputs.');
      return;
    }

    const newProject: ProjectItem = {
      id: String(Date.now()),
      name: name.trim(),
      description: description.trim(),
      status: 'active',
      progress: 0,
      riskLevel: 'low',
      lastUpdated: new Date().toISOString().split('T')[0],
      towerCount: parseInt(towerCount, 10)
    };

    onAddProject(newProject);

    // Exercise 4: Trigger success toast with Sonner
    toast.success('Project created successfully!');

    // Reset and close
    setName('');
    setDescription('');
    setStartDate('');
    setTowerCount('1');
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Project Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Apex Central Plaza"
            error={errors.name}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief scope of construction..."
            error={errors.description}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            error={errors.startDate}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Tower Count (1 - 50) <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            min="1"
            max="50"
            value={towerCount}
            onChange={(e) => setTowerCount(e.target.value)}
            error={errors.towerCount}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Save Project
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
