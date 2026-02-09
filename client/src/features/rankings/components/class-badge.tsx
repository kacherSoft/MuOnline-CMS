/**
 * class-badge Component
 * Character class badge with icon and color coding
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CharacterClass, CHARACTER_CLASS_INFO } from '../types/rankings-types';

export interface ClassBadgeProps {
  class: CharacterClass;
  showName?: boolean;
  showShortName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-5 w-5 text-xs',
  md: 'h-6 w-6 text-sm',
  lg: 'h-8 w-8 text-base',
};

const textStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const ClassBadge = React.forwardRef<HTMLDivElement, ClassBadgeProps>(
  ({ class: characterClass, showName = false, showShortName = false, size = 'md', className }, ref) => {
    const classInfo = CHARACTER_CLASS_INFO[characterClass];

    if (!classInfo) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full bg-bg-tertiary px-2 py-1 font-medium ring-1 ring-white/10',
          className
        )}
        title={classInfo.name}
      >
        <span
          className={cn(
            'flex items-center justify-center rounded-full',
            sizeStyles[size]
          )}
          style={{ backgroundColor: `${classInfo.color}20` }}
        >
          <span style={{ color: classInfo.color }}>{classInfo.icon}</span>
        </span>
        {(showName || showShortName) && (
          <span
            className={cn('font-semibold', textStyles[size])}
            style={{ color: classInfo.color }}
          >
            {showName ? classInfo.name : classInfo.shortName}
          </span>
        )}
      </div>
    );
  }
);

ClassBadge.displayName = 'ClassBadge';

export default ClassBadge;
