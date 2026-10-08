import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          'w-full px-3 py-2 text-sm bg-white border rounded-md outline-none transition-colors',
          error ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-sky-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  );
}
