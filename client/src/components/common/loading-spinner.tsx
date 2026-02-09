/**
 * Loading Spinner Component
 * MuOnline-themed loading indicator with glow effects
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin rounded-full border-2', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      default: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    },
    variant: {
      primary: 'border-cyan-500 border-t-transparent shadow-[0_0_15px_rgba(0,212,255,0.5)]',
      accent: 'border-yellow-500 border-t-transparent shadow-[0_0_15px_rgba(255,215,0,0.5)]',
      secondary: 'border-purple-500 border-t-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'primary',
  },
});

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  className,
  size,
  variant,
  text = 'Loading...',
  fullScreen = false,
  ...props
}: LoadingSpinnerProps) {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center gap-4',
        fullScreen && 'fixed inset-0 bg-bg-dark/90 backdrop-blur-sm z-50',
        className
      )}
      {...props}
    >
      <div className={cn(spinnerVariants({ size, variant }))} />
      {text && <p className="text-sm text-text-muted animate-pulse">{text}</p>}
    </div>
  );

  return fullScreen ? content : <div className="flex items-center justify-center">{content}</div>;
}

// Skeleton loader for cards
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('border border-cyan-500/30 rounded-xl p-6 bg-bg-dark/80', className)}>
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-cyan-500/20 rounded w-3/4" />
        <div className="h-3 bg-cyan-500/10 rounded w-1/2" />
        <div className="space-y-2 pt-4">
          <div className="h-2 bg-cyan-500/10 rounded" />
          <div className="h-2 bg-cyan-500/10 rounded w-5/6" />
          <div className="h-2 bg-cyan-500/10 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for tables
export function SkeletonRow({ cells = 4 }: { cells?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cells }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-cyan-500/10 rounded" style={{ width: `${50 + Math.random() * 50}%` }} />
        </td>
      ))}
    </tr>
  );
}

export default LoadingSpinner;
