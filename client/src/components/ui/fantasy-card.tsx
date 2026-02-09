/**
 * Fantasy Card Component
 * MuOnline-themed card with fantasy borders and glow effects
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const fantasyCardVariants = cva(
  'rounded-xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'border-cyan-500/30 bg-bg-dark/80 shadow-lg shadow-cyan-500/10 hover:border-cyan-500/60 hover:shadow-cyan-500/20',
        accent: 'border-yellow-500/30 bg-bg-dark/80 shadow-lg shadow-yellow-500/10 hover:border-yellow-500/60 hover:shadow-yellow-500/20',
        secondary: 'border-purple-500/30 bg-bg-dark/80 shadow-lg shadow-purple-500/10 hover:border-purple-500/60 hover:shadow-purple-500/20',
        danger: 'border-red-500/30 bg-bg-dark/80 shadow-lg shadow-red-500/10 hover:border-red-500/60 hover:shadow-red-500/20',
        success: 'border-green-500/30 bg-bg-dark/80 shadow-lg shadow-green-500/10 hover:border-green-500/60 hover:shadow-green-500/20',
        glass: 'border-white/10 bg-white/5 shadow-xl',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
        none: '',
      },
      glow: {
        none: '',
        soft: 'shadow-lg',
        medium: 'shadow-xl',
        strong: 'shadow-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: 'medium',
    },
  }
);

export interface FantasyCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fantasyCardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  description?: string;
}

const FantasyCard = React.forwardRef<HTMLDivElement, FantasyCardProps>(
  ({ className, variant, size, glow, header, footer, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(fantasyCardVariants({ variant, size, glow }), 'hover:-translate-y-1', className)}
        {...props}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />

        {/* Header */}
        {(header || title || description) && (
          <div className="mb-4 pb-4 border-b border-white/10">
            {header || (
              <>
                {title && (
                  <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-sm text-text-muted mt-1">{description}</p>
                )}
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-4 pt-4 border-t border-white/10">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

FantasyCard.displayName = 'FantasyCard';

export { FantasyCard, fantasyCardVariants };
export default FantasyCard;
