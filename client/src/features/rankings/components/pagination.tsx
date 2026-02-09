/**
 * pagination Component
 * Pagination controls for rankings table
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      className,
      maxVisiblePages = 5
    },
    ref
  ) => {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      const halfVisible = Math.floor(maxVisiblePages / 2);

      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);

      if (currentPage <= halfVisible) {
        endPage = Math.min(totalPages, maxVisiblePages);
      }

      if (currentPage >= totalPages - halfVisible) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
      >
        <div className="text-sm text-text-muted">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {pageNumbers.map((page, index) => {
            const isEllipsis = page === '...';
            const isActive = page === currentPage;

            return (
              <Button
                key={index}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => !isEllipsis && onPageChange(page as number)}
                disabled={isEllipsis}
                className={cn(
                  'h-8 w-8 p-0',
                  isActive && 'bg-primary text-primary-foreground'
                )}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
