/**
 * Player Search Component
 * Search input with debounce for finding players
 */

import React, { useState, useEffect, useRef } from 'react';

interface PlayerSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  placeholder?: string;
}

export function PlayerSearch({ onSearch, isSearching, placeholder = 'Search by username, email, or character name...' }: PlayerSearchProps) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  return React.createElement(
    'div',
    { className: 'relative' },
    React.createElement('input', {
      type: 'text',
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: placeholder,
      className: `
        w-full px-4 py-3 pl-10 bg-slate-800/50 border border-slate-700
        rounded-lg text-white placeholder-slate-500
        focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
        transition-colors
      `,
    }),
    React.createElement(
      'span',
      { className: 'absolute left-3 top-1/2 -translate-y-1/2 text-slate-500' },
      '🔍'
    ),
    isSearching &&
      React.createElement(
        'span',
        { className: 'absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 text-sm' },
        'Searching...'
      ),
    query &&
      React.createElement(
        'button',
        {
          onClick: () => setQuery(''),
          className: 'absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors',
        },
        '✕'
      )
  );
}
