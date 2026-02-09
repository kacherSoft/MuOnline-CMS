/**
 * Fantasy Input Component
 * MuOnline-themed input with focus effects and fantasy borders
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const fantasyInputVariants = cva(
  'flex w-full rounded-lg border bg-bg-dark/80 text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-cyan-500/30 focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1),0_0_20px_rgba(0,212,255,0.3)]',
        accent: 'border-yellow-500/30 focus:border-yellow-500 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1),0_0_20px_rgba(255,215,0,0.3)]',
        secondary: 'border-purple-500/30 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1),0_0_20px_rgba(168,85,247,0.3)]',
        danger: 'border-red-500/30 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1),0_0_20px_rgba(239,68,68,0.3)]',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-12 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface FantasyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof fantasyInputVariants> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const FantasyInput = React.forwardRef<HTMLInputElement, FantasyInputProps>(
  ({ className, variant, size, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              fantasyInputVariants({ variant, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1),0_0_20px_rgba(239,68,68,0.3)]',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FantasyInput.displayName = 'FantasyInput';

export { FantasyInput, fantasyInputVariants };
export default FantasyInput;
