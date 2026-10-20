import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export function Progress({ className, value = 0, ...props }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, value));

  const getColor = (pct: number) => {
    if (pct >= 75) return 'bg-emerald-500';
    if (pct >= 50) return 'bg-amber-500';
    if (pct >= 25) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  return (
    <div
      className={twMerge(
        clsx('relative h-2.5 w-full overflow-hidden rounded-full bg-gray-800', className),
      )}
      {...props}
    >
      <div
        className={twMerge(clsx('h-full transition-all duration-500', getColor(percentage)))}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
