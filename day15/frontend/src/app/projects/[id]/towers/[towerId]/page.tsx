'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../../../store/useAuthStore';
import { apiGetTower, apiUpdateFloorProgress } from '../../../../../lib/api';
import { getRiskColor, getFloorStatusColor } from '../../../../../lib/utils';
import {
  Building2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Circle,
  Sliders,
  X,
  HardHat,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function TowerDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const towerId = params.towerId as string;
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();

  const [selectedFloor, setSelectedFloor] = useState<any | null>(null);
  const [progressInput, setProgressInput] = useState<number>(0);

  const {
    data: tower,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tower', towerId],
    queryFn: () => apiGetTower(towerId),
    enabled: !!towerId && isAuthenticated,
  });

  const updateProgressMutation = useMutation({
    mutationFn: ({ floorId, percentage }: { floorId: string; percentage: number }) =>
      apiUpdateFloorProgress(floorId, percentage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tower', towerId] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Floor ${selectedFloor?.floorNumber} progress updated to ${progressInput}%`);
      setSelectedFloor(null);
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update progress');
    },
  });

  const handleOpenModal = (floor: any) => {
    setSelectedFloor(floor);
    setProgressInput(Number(floor.completionPercentage));
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFloor) return;
    updateProgressMutation.mutate({
      floorId: selectedFloor.id,
      percentage: Number(progressInput),
    });
  };

  const isSEorPM =
    user?.role === 'SITE_ENGINEER' ||
    user?.role === 'PROJECT_MANAGER' ||
    user?.role === 'SUPER_ADMIN';

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 bg-slate-900/60 rounded-lg animate-pulse" />
        <div className="h-32 bg-slate-900/60 rounded-2xl animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-slate-900/60 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !tower) {
    return (
      <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/30 text-center">
        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-sm text-red-400">
          {(error as any)?.message || 'Tower not found.'}
        </p>
        <Link
          href={`/projects/${projectId}`}
          className="inline-block mt-4 text-xs font-semibold text-sky-400 hover:underline"
        >
          &larr; Back to Project
        </Link>
      </div>
    );
  }

  const floors = tower.floors || [];
  const risk = getRiskColor(tower.riskLevel);
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
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href={`/projects/${projectId}`}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Project Towers</span>
      </Link>

      {/* Tower Summary Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-100">
                  {tower.name}
                </h1>
                <span
                  className={`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${risk.bg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                  <span>{risk.label}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {floors.length} Total Floors &bull; Overall Progress: {avgProgress}%
              </p>
            </div>
          </div>

          {user?.role === 'SITE_ENGINEER' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <HardHat className="w-4 h-4 shrink-0" />
              <span>SE Mode: Click any floor to update site progress</span>
            </div>
          )}
        </div>

        {/* Global Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${risk.bar}`}
            style={{ width: `${Math.max(5, avgProgress)}%` }}
          />
        </div>
      </div>

      {/* Floors List Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-100">
            Floor-by-Floor Breakdown
          </h2>
          <p className="text-xs text-slate-400">
            Current completion metrics and status for each level
          </p>
        </div>
      </div>

      {/* Floors Cards */}
      <div className="space-y-3">
        {floors.map((floor: any) => {
          const colors = getFloorStatusColor(floor.status);
          const pct = Number(floor.completionPercentage);

          return (
            <div
              key={floor.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-sm">
                  F{floor.floorNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-100">
                      Floor {floor.floorNumber}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${colors.badge}`}
                    >
                      {floor.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Updated:{' '}
                    {floor.updatedAt
                      ? new Date(floor.updatedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Initial baseline'}
                  </p>
                </div>
              </div>

              {/* Progress Bar & Actions */}
              <div className="flex items-center gap-5 sm:min-w-[280px]">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium">Completion</span>
                    <span className="font-bold text-slate-200">{pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${colors.bar}`}
                      style={{ width: `${Math.max(5, pct)}%` }}
                    />
                  </div>
                </div>

                {isSEorPM && (
                  <button
                    onClick={() => handleOpenModal(floor)}
                    className="px-3 py-1.5 rounded-lg bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 text-sky-400 hover:text-sky-300 text-xs font-medium flex items-center gap-1.5 transition shrink-0"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Update</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Update Progress Modal */}
      {selectedFloor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedFloor(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Update Floor {selectedFloor.floorNumber} Progress
                </h3>
                <p className="text-xs text-slate-400">
                  Tower: {tower.name} &bull; Site Engineer Action
                </p>
              </div>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <label className="font-medium text-slate-300">
                    Completion Percentage
                  </label>
                  <span className="font-bold text-lg text-emerald-400">
                    {progressInput}%
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={progressInput}
                  onChange={(e) => setProgressInput(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />

                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0% (Not Started)</span>
                  <span>50% (Framing/Slab)</span>
                  <span>100% (Completed)</span>
                </div>
              </div>

              {/* Status Preview */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                <span className="text-slate-400">Resulting Status:</span>
                <span
                  className={`font-semibold uppercase text-[10px] px-2 py-0.5 rounded ${
                    progressInput >= 100
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : progressInput > 0
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {progressInput >= 100
                    ? 'COMPLETED'
                    : progressInput > 0
                    ? 'IN PROGRESS'
                    : 'NOT STARTED'}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedFloor(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProgressMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition disabled:opacity-50"
                >
                  {updateProgressMutation.isPending ? 'Saving...' : 'Confirm Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
