import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
      outline: 'border border-gray-700 text-gray-200 hover:bg-gray-800',
      secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      ghost: 'text-gray-300 hover:bg-gray-800/60',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-2.5 text-base',
    };
    return (
      <button
        ref={ref}
        className={twMerge(clsx(base, variants[variant], sizes[size], className))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
