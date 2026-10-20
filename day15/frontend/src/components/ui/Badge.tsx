import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const variants = {
    default: 'bg-blue-900/60 text-blue-300 border border-blue-700/50',
    success: 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50',
    warning: 'bg-amber-950/80 text-amber-400 border border-amber-600/50',
    danger: 'bg-rose-950/80 text-rose-400 border border-rose-600/50',
    outline: 'text-gray-300 border border-gray-700',
  };

  return <div className={twMerge(clsx(base, variants[variant], className))} {...props} />;
}
