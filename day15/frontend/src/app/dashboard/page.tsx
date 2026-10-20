'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetProjects, apiUpdateProjectProgress, apiCreateProject } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Input } from '@/components/ui/Input';
import { Dialog } from '@/components/ui/Dialog';
import { toast } from 'sonner';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(0);
  const [note, setNote] = useState('');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('Hyderabad');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiGetProjects(),
  });

  const progressMutation = useMutation({
    mutationFn: ({ id, progress, note }: { id: string; progress: number; note: string }) =>
      apiUpdateProjectProgress(id, progress, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project progress updated successfully!');
      setUpdateModalOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update progress');
    },
  });

  const createMutation = useMutation({
    mutationFn: ({ name, location }: { name: string; location: string }) =>
      apiCreateProject({ name, description: location }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('New project created!');
      setCreateModalOpen(false);
      setProjectName('');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to create project');
    },
  });

  const isPM = user?.role === 'PM' || user?.role === 'PROJECT_MANAGER' || user?.role === 'SUPER_ADMIN';

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p: any) => (p.progress || p.avgCompletion || 0) >= 100).length;
  const inProgressProjects = totalProjects - completedProjects;

  const handleOpenUpdate = (project: any) => {
    setSelectedProject(project);
    setNewProgress(project.progress || project.avgCompletion || 0);
    setNote('');
    setUpdateModalOpen(true);
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    progressMutation.mutate({
      id: selectedProject.id,
      progress: Number(newProgress),
      note,
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      toast.error('Project name is required');
      return;
    }
    createMutation.mutate({ name: projectName, location: projectLocation });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            {isPM ? 'Project Manager Dashboard' : 'Site Engineer Workspace'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {isPM
              ? 'Real-time portfolio overview, milestone metrics, and risk monitoring.'
              : 'Assigned construction high-rises and on-site progress logging.'}
          </p>
        </div>
        {isPM && (
          <Button onClick={() => setCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            + New Project
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-500">Loading dashboard metrics...</div>
      ) : isPM ? (
        /* ======================== PM DASHBOARD ======================== */
        <div className="space-y-8">
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-blue-900/40 bg-gradient-to-br from-blue-950/20 to-gray-900/60">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white">{totalProjects}</div>
                <p className="text-xs text-gray-400 mt-1">Active site portfolios</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-900/40 bg-gradient-to-br from-emerald-950/20 to-gray-900/60">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-emerald-400 uppercase tracking-wider">
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-emerald-400">{completedProjects}</div>
                <p className="text-xs text-gray-400 mt-1">100% milestone achieved</p>
              </CardContent>
            </Card>

            <Card className="border-amber-900/40 bg-gradient-to-br from-amber-950/20 to-gray-900/60">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-amber-400 uppercase tracking-wider">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-amber-400">{inProgressProjects}</div>
                <p className="text-xs text-gray-400 mt-1">Ongoing tower construction</p>
              </CardContent>
            </Card>
          </div>

          {/* Project Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Table</CardTitle>
                <p className="text-xs text-gray-400 mt-1">Progress distribution across all sites</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Project Name</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 w-1/3">Progress</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {projects.map((proj: any) => {
                      const pct = Math.round(proj.progress || proj.avgCompletion || 0);
                      return (
                        <tr key={proj.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-white">{proj.name}</td>
                          <td className="py-3.5 px-4 text-gray-400">{proj.location || 'Hyderabad'}</td>
                          <td className="py-3.5 px-4">
                            <Badge
                              variant={
                                proj.status === 'COMPLETED'
                                  ? 'success'
                                  : proj.status === 'ACTIVE'
                                  ? 'default'
                                  : 'warning'
                              }
                            >
                              {proj.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <Progress value={pct} className="flex-1" />
                              <span className="font-semibold text-white w-10 text-right">{pct}%</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Link href={`/projects/${proj.id}`}>
                              <Button variant="outline" size="sm">
                                View Towers
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* ======================== SE DASHBOARD ======================== */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Assigned Projects</h2>
            <span className="text-xs text-gray-400">Select any project to update construction status</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj: any) => {
              const pct = Math.round(proj.progress || proj.avgCompletion || 0);
              return (
                <Card key={proj.id} className="border-gray-800 hover:border-gray-700 transition-all">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg font-bold">{proj.name}</CardTitle>
                      <p className="text-xs text-gray-400 mt-0.5">{proj.location || 'Hyderabad'}</p>
                    </div>
                    <Badge variant={pct >= 100 ? 'success' : pct >= 50 ? 'warning' : 'danger'}>
                      {pct}% Complete
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    <Progress value={pct} />
                    <div className="flex items-center justify-between pt-2">
                      <Link href={`/projects/${proj.id}`} className="text-xs text-blue-400 hover:underline">
                        View Tower Grid &rarr;
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => handleOpenUpdate(proj)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                      >
                        Update Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* SE Update Progress Modal */}
      <Dialog
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        title={`Update Progress — ${selectedProject?.name || ''}`}
        description="Enter the updated completion percentage and status notes for site progress records."
      >
        <form onSubmit={handleSaveProgress} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
              Progress Percentage (0 - 100%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(Number(e.target.value))}
                className="flex-1 accent-emerald-500 cursor-pointer"
              />
              <span className="text-lg font-bold text-emerald-400 w-12 text-right">{newProgress}%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Status Note</label>
            <Input
              placeholder="e.g. Floor 12 completed, MEP piping inspected"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <Button type="button" variant="outline" onClick={() => setUpdateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={progressMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {progressMutation.isPending ? 'Saving...' : 'Save Progress'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* PM Create Project Modal */}
      <Dialog
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Project"
        description="Add a new high-rise construction development to the NirmanIQ portfolio."
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Project Name</label>
            <Input
              placeholder="e.g. Skyline Tower"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Location</label>
            <Input
              placeholder="e.g. Hyderabad"
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending} className="bg-blue-600 hover:bg-blue-700">
              {createMutation.isPending ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
