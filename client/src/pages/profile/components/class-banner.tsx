/**
 * Class Banner Component
 * Displays character class with large icon and themed styling
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { getClassInfo, getClassColor, getClassBgColor } from '@/utils/class-utils';

export interface ClassBannerProps {
  className: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  showIcon?: boolean;
}

export function ClassBanner({
  className: characterClass,
  size = 'md',
  showName = true,
  showIcon = true,
}: ClassBannerProps) {
  const classInfo = getClassInfo(characterClass);
  const color = getClassColor(characterClass);
  const bgColor = getClassBgColor(characterClass);

  const sizeStyles = {
    sm: 'h-16 text-lg',
    md: 'h-24 text-2xl',
    lg: 'h-32 text-4xl',
  };

  if (!classInfo) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border-2 transition-all duration-300',
        sizeStyles[size],
        'flex items-center justify-center gap-3 px-6'
      )}
      style={{
        borderColor: color,
        backgroundColor: bgColor,
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Icon */}
      {showIcon && (
        <span className="relative z-10 animate-pulse-slow" style={{ fontSize: size === 'lg' ? '3rem' : '2rem' }}>
          {classInfo.icon}
        </span>
      )}

      {/* Name */}
      {showName && (
        <span className="relative z-10 font-bold" style={{ color }}>
          {classInfo.name}
        </span>
      )}

      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 30px ${color}20`,
        }}
      />
    </div>
  );
}

export default ClassBanner;
