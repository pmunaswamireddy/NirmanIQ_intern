import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskColor(riskLevel: number) {
  switch (riskLevel) {
    case 0:
      return {
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        label: 'On Track',
        bar: 'bg-emerald-500',
        dot: 'bg-emerald-400',
      };
    case 1:
      return {
        bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        label: 'At Risk',
        bar: 'bg-amber-500',
        dot: 'bg-amber-400',
      };
    case 2:
      return {
        bg: 'bg-red-500/10 text-red-400 border-red-500/30',
        label: 'High Risk',
        bar: 'bg-red-500',
        dot: 'bg-red-400',
      };
    case 3:
      return {
        bg: 'bg-rose-600/10 text-rose-400 border-rose-600/30',
        label: 'Critical',
        bar: 'bg-rose-600',
        dot: 'bg-rose-500',
      };
    default:
      return {
        bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
        label: 'Unknown',
        bar: 'bg-slate-500',
        dot: 'bg-slate-400',
      };
  }
}

export function getFloorStatusColor(status: string) {
  switch (status) {
    case 'COMPLETED':
      return {
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        bar: 'bg-emerald-500',
      };
    case 'IN_PROGRESS':
      return {
        badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        bar: 'bg-amber-500',
      };
    default:
      return {
        badge: 'bg-slate-800 text-slate-400 border-slate-700',
        bar: 'bg-slate-700',
      };
  }
}
