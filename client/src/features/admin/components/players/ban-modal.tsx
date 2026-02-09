/**
 * Ban Modal Component
 * Form for banning/unbanning accounts with reason
 */

import React, { useState } from 'react';
import type { BanAccountRequest } from '../../types/admin-types';

interface BanModalProps {
  accountId: number;
  accountName: string;
  onClose: () => void;
  onConfirm: (request: BanAccountRequest) => Promise<void>;
}

export function BanModal({ accountId, accountName, onClose, onConfirm }: BanModalProps) {
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState(1);
  const [durationUnit, setDurationUnit] = useState<'hours' | 'days' | 'permanent'>('days');
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      return;
    }

    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm({
        accountId,
        reason: reason.trim(),
        duration: durationUnit === 'permanent' ? undefined : duration,
        durationUnit,
      });
      onClose();
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return React.createElement(
    'div',
    {
      className: 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4',
      onClick: onClose,
    },
    React.createElement(
      'div',
      {
        className: `
          bg-slate-800 border border-slate-700 rounded-lg
          max-w-md w-full
        `,
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
      },
      React.createElement(
        'div',
        { className: 'p-6 border-b border-slate-700' },
        React.createElement(
          'h2',
          { className: 'text-xl font-bold text-white' },
          'Ban Account'
        ),
        React.createElement(
          'p',
          { className: 'text-slate-400 mt-1' },
          `Banning account: ${accountName}`
        )
      ),

      React.createElement(
        'form',
        { onSubmit: handleSubmit, className: 'p-6' },
        React.createElement(
          'div',
          { className: 'mb-4' },
          React.createElement(
            'label',
            { className: 'block text-sm font-medium text-slate-300 mb-2' },
            'Reason (required)'
          ),
          React.createElement('textarea', {
            value: reason,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value),
            placeholder: 'Enter ban reason...',
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
          { className: 'mb-4' },
          React.createElement(
            'label',
            { className: 'block text-sm font-medium text-slate-300 mb-2' },
            'Duration'
          ),
          React.createElement(
            'div',
            { className: 'flex gap-2' },
            React.createElement(
              'select',
              {
                value: durationUnit,
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setDurationUnit(e.target.value as 'hours' | 'days' | 'permanent'),
                className: `
                  flex-1 px-3 py-2 bg-slate-700 border border-slate-600
                  rounded text-white focus:outline-none focus:border-amber-500
                `,
              },
              React.createElement('option', { value: 'hours' }, 'Hours'),
              React.createElement('option', { value: 'days' }, 'Days'),
              React.createElement('option', { value: 'permanent' }, 'Permanent')
            ),
            durationUnit !== 'permanent' &&
              React.createElement('input', {
                type: 'number',
                min: 1,
                max: durationUnit === 'hours' ? 720 : 30,
                value: duration,
                onChange: (e) => setDuration(parseInt(e.target.value) || 1),
                className: `
                  w-24 px-3 py-2 bg-slate-700 border border-slate-600
                  rounded text-white focus:outline-none focus:border-amber-500
                `,
              })
          )
        ),

        confirmed &&
          React.createElement(
            'div',
            { className: 'mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded' },
            React.createElement(
              'p',
              { className: 'text-red-400 text-sm font-medium' },
              '⚠️ Confirm Ban'
            ),
            React.createElement(
              'p',
              { className: 'text-slate-300 text-sm mt-1' },
              `You are about to ban ${accountName}. This action will be logged.`
            ),
            React.createElement(
              'label',
              { className: 'flex items-center gap-2 mt-2 cursor-pointer' },
              React.createElement('input', {
                type: 'checkbox',
                checked: confirmed,
                onChange: (e) => setConfirmed(e.target.checked),
                className: 'w-4 h-4 accent-amber-500',
              }),
              React.createElement('span', { className: 'text-sm text-slate-300' }, 'I confirm this action')
            )
          ),

        React.createElement(
          'div',
          { className: 'flex gap-3 mt-6' },
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: onClose,
              disabled: isSubmitting,
              className: `
                flex-1 px-4 py-2 bg-slate-700 text-white rounded
                hover:bg-slate-600 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              `,
            },
            'Cancel'
          ),
          React.createElement(
            'button',
            {
              type: 'submit',
              disabled: !reason.trim() || isSubmitting,
              className: `
                flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded
                hover:bg-red-500/30 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              `,
            },
            isSubmitting ? 'Banning...' : confirmed ? 'Confirm Ban' : 'Ban Account'
          )
        )
      )
    )
  );
}
