/**
 * Maintenance Toggle Component
 * Toggle switch for enabling/disabling maintenance mode
 */

import React, { useState } from 'react';
import type { MaintenanceMode } from '../../types/admin-types';

interface MaintenanceToggleProps {
  maintenanceMode: MaintenanceMode | null;
  isLoading: boolean;
  onToggle: (enabled: boolean, message?: string) => Promise<void>;
}

export function MaintenanceToggle({ maintenanceMode, isLoading, onToggle }: MaintenanceToggleProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEnabled = maintenanceMode?.enabled ?? false;

  const handleToggle = () => {
    if (isEnabled) {
      handleDisable();
    } else {
      setShowConfirm(true);
    }
  };

  const handleDisable = async () => {
    setIsSubmitting(true);
    try {
      await onToggle(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnable = async () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
    try {
      await onToggle(true, message.trim());
      setShowConfirm(false);
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirm) {
    return React.createElement(
      'div',
      {
        className: 'bg-slate-800/50 backdrop-blur border border-amber-500/50 rounded-lg p-6',
      },
      React.createElement(
        'h2',
        { className: 'text-lg font-semibold text-amber-400 mb-4' },
        '⚠️ Enable Maintenance Mode'
      ),
      React.createElement(
        'p',
        { className: 'text-slate-300 mb-4' },
        'This will prevent non-admin users from accessing the game server.'
      ),
      React.createElement(
        'div',
        { className: 'mb-4' },
        React.createElement(
          'label',
          { className: 'block text-sm font-medium text-slate-300 mb-2' },
          'Maintenance Message (shown to players)'
        ),
        React.createElement('textarea', {
          value: message,
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value),
          placeholder: 'Server is under maintenance. We will be back soon.',
          rows: 3,
          required: true,
          className: `
            w-full px-3 py-2 bg-slate-700 border border-slate-600
            rounded text-white placeholder-slate-500
            focus:outline-none focus:border-amber-500
          `,
        })
      ),
      React.createElement(
        'div',
        { className: 'flex gap-3' },
        React.createElement(
          'button',
          {
            onClick: () => {
              setShowConfirm(false);
              setMessage('');
            },
            disabled: isSubmitting,
            className: `
              flex-1 px-4 py-2 bg-slate-700 text-white rounded
              hover:bg-slate-600 transition-colors
              disabled:opacity-50
            `,
          },
          'Cancel'
        ),
        React.createElement(
          'button',
          {
            onClick: handleEnable,
            disabled: !message.trim() || isSubmitting,
            className: `
              flex-1 px-4 py-2 bg-amber-500 text-black font-medium rounded
              hover:bg-amber-400 transition-colors
              disabled:opacity-50
            `,
          },
          isSubmitting ? 'Enabling...' : 'Enable Maintenance'
        )
      )
    );
  }

  return React.createElement(
    'div',
    {
      className: 'bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6',
    },
    React.createElement(
      'div',
      { className: 'flex items-center justify-between' },
      React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          { className: 'text-lg font-semibold text-white mb-1' },
          'Maintenance Mode'
        ),
        React.createElement(
          'p',
          { className: 'text-slate-400 text-sm' },
          isEnabled
            ? `Enabled: ${maintenanceMode?.message || 'No message'}`
            : 'Server is open to all players'
        )
      ),
      React.createElement(
        'button',
        {
          onClick: handleToggle,
          disabled: isLoading || isSubmitting,
          className: `
            relative w-16 h-8 rounded-full transition-colors duration-200
            ${isEnabled
              ? 'bg-amber-500'
              : 'bg-slate-600'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
        },
        React.createElement('span', {
          className: `
            absolute top-1 w-6 h-6 bg-white rounded-full shadow-md
            transition-transform duration-200
            ${isEnabled ? 'left-9' : 'left-1'}
          `,
        })
      )
    ),
    maintenanceMode?.enabled &&
      React.createElement(
        'div',
        { className: 'mt-3 pt-3 border-t border-slate-700 text-xs text-slate-500' },
        React.createElement('p', null, `Enabled by ${maintenanceMode.updatedBy}`),
        React.createElement('p', null, `Updated ${new Date(maintenanceMode.updatedAt * 1000).toLocaleString()}`)
      )
  );
}
