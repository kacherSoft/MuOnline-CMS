/**
 * Alert Component
 * Display alert messages for errors, warnings, and info
 */

import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export function Alert({ className = '', variant = 'default', children, ...props }: AlertProps) {
  const baseClasses = 'relative w-full rounded-lg border p-4';
  const variantClasses = variant === 'destructive'
    ? 'border-red-500/50 bg-red-500/10 text-red-200'
    : 'border-white/10 bg-bg-secondary text-text-primary';

  return React.createElement(
    'div',
    {
      role: 'alert',
      className: `${baseClasses} ${variantClasses} ${className}`.trim(),
      ...props
    },
    children
  );
}

export function AlertTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return React.createElement(
    'h5',
    {
      className: `mb-1 font-medium leading-none tracking-tight ${className}`.trim(),
      ...props
    },
    children
  );
}

export function AlertDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return React.createElement(
    'div',
    {
      className: `text-sm ${className}`.trim(),
      ...props
    },
    children
  );
}

export default Alert;
