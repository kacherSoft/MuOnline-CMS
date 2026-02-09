/**
 * class-banner Component
 * Large banner showing character class with icon and name
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CharacterClass, CHARACTER_CLASS_INFO } from '@/features/rankings/types/rankings-types';

export interface ClassBannerProps {
  class: CharacterClass;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: { container: 'h-16', icon: 'text-3xl', text: 'text-lg' },
  md: { container: 'h-24', icon: 'text-5xl', text: 'text-xl' },
  lg: { container: 'h-32', icon: 'text-7xl', text: 'text-2xl' },
  xl: { container: 'h-40', icon: 'text-8xl', text: 'text-3xl' },
};

export const ClassBanner = React.forwardRef<HTMLDivElement, ClassBannerProps>(
  ({ class: characterClass, size = 'lg', showGlow = true, className }, ref) => {
    const classInfo = CHARACTER_CLASS_INFO[characterClass];

    if (!classInfo) {
      return null;
    }

    const styles = sizeStyles[size];

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-xl overflow-hidden',
          'bg-gradient-to-br from-bg-dark to-bg-medium',
          'border-2',
          styles.container,
          showGlow && 'shadow-[0_0_30px_rgba(0,212,255,0.3)]',
          className
        )}
        style={{
          borderColor: `${classInfo.color}40`,
          backgroundColor: `${classInfo.color}08`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
        <span className={cn('relative z-10', styles.icon)}>{classInfo.icon}</span>
        <span
          className={cn(
            'relative z-10 font-bold uppercase tracking-wider',
            styles.text
          )}
          style={{ color: classInfo.color }}
        >
          {classInfo.name}
        </span>
      </div>
    );
  }
);

ClassBanner.displayName = 'ClassBanner';

export default ClassBanner;
