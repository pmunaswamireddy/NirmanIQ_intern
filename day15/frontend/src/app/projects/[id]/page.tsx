'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../store/useAuthStore';
import { apiGetProject, apiAddTower } from '../../../lib/api';
import { getRiskColor } from '../../../lib/utils';
import {
  Building2,
  ArrowLeft,
  Plus,
  Layers,
  ArrowRight,
  AlertTriangle,
  X,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();

  const [showAddTowerModal, setShowAddTowerModal] = useState(false);
  const [towerName, setTowerName] = useState('');
  const [riskLevel, setRiskLevel] = useState(0);
  const [floorCount, setFloorCount] = useState(4);

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => apiGetProject(projectId),
    enabled: !!projectId && isAuthenticated,
  });

  const addTowerMutation = useMutation({
    mutationFn: (data: { name: string; riskLevel?: number; floorCount?: number }) =>
      apiAddTower(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Tower added successfully');
      setShowAddTowerModal(false);
      setTowerName('');
      setRiskLevel(0);
      setFloorCount(4);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to add tower');
    },
  });

  const handleAddTowerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!towerName.trim()) return;
    addTowerMutation.mutate({
      name: towerName.trim(),
      riskLevel: Number(riskLevel),
      floorCount: Number(floorCount),
    });
  };

  const isPM = user?.role === 'PROJECT_MANAGER' || user?.role === 'SUPER_ADMIN';

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 bg-slate-900/60 rounded-lg animate-pulse" />
        <div className="h-32 bg-slate-900/60 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="h-56 bg-slate-900/60 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/30 text-center">
        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-sm text-red-400">
          {(error as any)?.message || 'Project not found.'}
        </p>
        <Link
          href="/projects"
          className="inline-block mt-4 text-xs font-semibold text-sky-400 hover:underline"
        >
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  const towers = project.towers || [];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Projects</span>
      </Link>

      {/* Project Banner Header */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              {project.name}
            </h1>
            <span
              className={`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border ${
                project.status === 'ACTIVE'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            {project.description || 'No detailed description provided.'}
          </p>
        </div>

        {isPM && (
          <button
            onClick={() => setShowAddTowerModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition shadow-lg shadow-sky-600/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Tower</span>
          </button>
        )}
      </div>

      {/* Towers Section Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-100">
            Towers Grid
          </h2>
          <p className="text-xs text-slate-400">
            Select a tower to inspect and update floor-by-floor construction progress
          </p>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {towers.length} {towers.length === 1 ? 'Tower' : 'Towers'} Total
        </span>
      </div>

      {/* Tower Grid */}
      {towers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {towers.map((tower: any) => {
            const risk = getRiskColor(tower.riskLevel);
            const floors = tower.floors || [];
            const avgProgress =
              floors.length > 0
                ? Math.round(
                    (floors.reduce(
                      (acc: number, f: any) => acc + Number(f.completionPercentage),
                      0,
                    ) /
                      floors.length) *
                      100,
                  ) / 100
                : 0;

            return (
              <div
                key={tower.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300">
                      <Building2 className="w-5 h-5" />
                    </div>
                    {/* Risk Badge */}
                    <span
                      className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md border flex items-center gap-1.5 ${risk.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                      <span>{risk.label}</span>
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-100 text-base tracking-tight">
                    {tower.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {floors.length} Floors configured
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">Avg Progress</span>
                    <span className="font-semibold text-slate-200">
                      {avgProgress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${risk.bar}`}
                      style={{ width: `${Math.max(5, avgProgress)}%` }}
                    />
                  </div>

                  <Link
                    href={`/projects/${projectId}/towers/${tower.id}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition group"
                  >
                    <span>Inspect Floor Progress</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/60">
          <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No Towers Configured</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {isPM
              ? 'Click the "Add Tower" button above to add towers to this project.'
              : 'No towers have been created for this project yet.'}
          </p>
        </div>
      )}

      {/* Add Tower Modal */}
      {showAddTowerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddTowerModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-100 mb-1">Add Tower to Project</h3>
            <p className="text-xs text-slate-400 mb-4">
              Authorized role: Project Manager (PM)
            </p>

            <form onSubmit={handleAddTowerSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tower Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tower C (West Wing)"
                  value={towerName}
                  onChange={(e) => setTowerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Initial Floor Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={floorCount}
                  onChange={(e) => setFloorCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Risk Level
                </label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition"
                >
                  <option value={0}>🟢 On Track (Normal)</option>
                  <option value={1}>🟡 At Risk (Minor delay)</option>
                  <option value={2}>🔴 High Risk (Critical delay)</option>
                  <option value={3}>🚨 Critical (Structural blocker)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTowerModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addTowerMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition disabled:opacity-50"
                >
                  {addTowerMutation.isPending ? 'Adding...' : 'Add Tower'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
