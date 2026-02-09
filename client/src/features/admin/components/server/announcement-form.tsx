/**
 * Announcement Form Component
 * Form for sending server announcements
 */

import React, { useState } from 'react';
import type { CreateAnnouncementRequest, ServerAnnouncement } from '../../types/admin-types';

interface AnnouncementFormProps {
  recentAnnouncements: ServerAnnouncement[];
  isLoading: boolean;
  onSend: (request: CreateAnnouncementRequest) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function AnnouncementForm({ recentAnnouncements, isLoading, onSend, onDelete }: AnnouncementFormProps) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'critical'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSend({ message: message.trim(), type });
      setMessage('');
      setCharCount(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageChange = (value: string) => {
    if (value.length <= maxChars) {
      setMessage(value);
      setCharCount(value.length);
    }
  };

  const typeColors: Record<string, string> = {
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    critical: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  return React.createElement(
    'div',
    { className: 'space-y-6' },
    React.createElement(
      'div',
      {
        className: 'bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6',
      },
      React.createElement(
        'h2',
        { className: 'text-lg font-semibold text-white mb-4' },
        'Send Announcement'
      ),
      React.createElement(
        'form',
        { onSubmit: handleSubmit },
        React.createElement(
          'div',
          { className: 'mb-4' },
          React.createElement(
            'label',
            { className: 'block text-sm font-medium text-slate-300 mb-2' },
            'Announcement Type'
          ),
          React.createElement(
            'div',
            { className: 'flex gap-2' },
            (['info', 'warning', 'critical'] as const).map((t) =>
              React.createElement(
                'button',
                {
                  key: t,
                  type: 'button',
                  onClick: () => setType(t),
                  className: `
                    px-4 py-2 rounded capitalize border transition-colors
                    ${type === t
                      ? typeColors[t]
                      : 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600'
                    }
                  `,
                },
                t
              )
            )
          )
        ),

        React.createElement(
          'div',
          { className: 'mb-4' },
          React.createElement(
            'label',
            { className: 'block text-sm font-medium text-slate-300 mb-2' },
            'Message'
          ),
          React.createElement('textarea', {
            value: message,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleMessageChange(e.target.value),
            placeholder: 'Enter announcement message...',
            rows: 4,
            maxLength: maxChars,
            required: true,
            className: `
              w-full px-3 py-2 bg-slate-700 border border-slate-600
              rounded text-white placeholder-slate-500
              focus:outline-none focus:border-amber-500 resize-none
            `,
          }),
          React.createElement(
            'div',
            { className: 'flex justify-between mt-1' },
            React.createElement(
              'span',
              { className: 'text-slate-500 text-xs' },
              'Will be displayed to all online players'
            ),
            React.createElement(
              'span',
              { className: `text-xs ${charCount > maxChars * 0.9 ? 'text-amber-400' : 'text-slate-500'}` },
              `${charCount}/${maxChars}`
            )
          )
        ),

        React.createElement(
          'button',
          {
            type: 'submit',
            disabled: !message.trim() || isSubmitting,
            className: `
              w-full px-4 py-2 bg-amber-500 text-black font-medium rounded
              hover:bg-amber-400 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `,
          },
          isSubmitting ? 'Sending...' : '📢 Send Announcement'
        )
      )
    ),

    React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        { className: 'text-sm font-semibold text-slate-400 mb-3' },
        'Recent Announcements'
      ),
      recentAnnouncements.length === 0
        ? React.createElement(
            'div',
            { className: 'text-center text-slate-500 py-8' },
            'No recent announcements'
          )
        : React.createElement(
            'div',
            { className: 'space-y-2' },
            ...recentAnnouncements.map((announcement) =>
              React.createElement(
                'div',
                {
                  key: announcement.id,
                  className: `
                    bg-slate-800/30 border border-slate-700 rounded-lg p-4
                    ${typeColors[announcement.type]}
                  `,
                },
                React.createElement(
                  'div',
                  { className: 'flex items-start justify-between' },
                  React.createElement(
                    'div',
                    { className: 'flex-1' },
                    React.createElement(
                      'p',
                      { className: 'text-white mb-2' },
                      announcement.message
                    ),
                    React.createElement(
                      'div',
                      { className: 'flex items-center gap-3 text-xs text-slate-400' },
                      React.createElement('span', null, `By ${announcement.createdBy}`),
                      React.createElement('span', null, '•'),
                      React.createElement('span', null, new Date(announcement.createdAt * 1000).toLocaleString())
                    )
                  ),
                  React.createElement(
                    'button',
                    {
                      onClick: () => onDelete(announcement.id),
                      className: 'ml-4 text-slate-500 hover:text-red-400 transition-colors text-sm',
                    },
                    'Delete'
                  )
                )
              )
            )
          )
    )
  );
}
