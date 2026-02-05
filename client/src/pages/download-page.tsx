/**
 * Download Page Component
 * Game client download link (Google Drive only)
 * Admin can configure link in Settings
 */

import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface DownloadSettings {
  download_title: string;
  download_description: string;
  download_drive_link: string;
  download_file_size: string;
  download_version: string;
}

export function DownloadPage() {
  const [settings, setSettings] = useState<DownloadSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDownloadSettings();
  }, []);

  const fetchDownloadSettings = async () => {
    try {
      const response = await fetch('/api/server-settings/download');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return React.createElement(
      'div',
      { className: 'flex items-center justify-center min-h-screen' },
      React.createElement(LoadingSpinner)
    );
  }

  // Empty state - no data configured
  if (!settings || !settings.download_drive_link || settings.download_drive_link === '#') {
    return React.createElement(
      'div',
      { className: 'container mx-auto py-12 px-4' },
      React.createElement(
        'div',
        { className: 'max-w-2xl mx-auto text-center' },
        React.createElement('div', { className: 'w-20 h-20 mx-auto rounded-full bg-bg-tertiary flex items-center justify-center mb-6' },
          React.createElement('svg', { className: 'w-10 h-10 text-text-muted', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
            React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' })
          )
        ),
        React.createElement('h1', { className: 'text-3xl font-bold text-text-primary mb-4' }, 'Download Not Available'),
        React.createElement('p', { className: 'text-text-muted' }, 'The game client download link has not been configured yet. Please check back later.')
      )
    );
  }

  // Display download content with actual data
  const { download_title: title, download_description: description, download_drive_link: driveLink, download_file_size: fileSize, download_version: version } = settings;

  return React.createElement(
    'div',
    { className: 'container mx-auto py-12 px-4' },
    React.createElement(
      'div',
      { className: 'max-w-4xl mx-auto' },
      // Header
      React.createElement(
        'div',
        { className: 'text-center mb-12' },
        React.createElement('h1', { className: 'text-4xl font-bold text-text-primary mb-4' }, title),
        React.createElement('p', { className: 'text-lg text-text-muted' }, description)
      ),

      // Download Section
      React.createElement(
        'section',
        { className: 'bg-bg-secondary border border-white/10 rounded-lg p-8' },
        React.createElement(
          'div',
          { className: 'flex items-center gap-6 mb-6' },
          React.createElement('div', { className: 'w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0' },
            React.createElement('svg', { className: 'w-8 h-8 text-primary', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
              React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l4 4m4-4l-4 4' })
            )
          ),
          React.createElement('div', null,
            React.createElement('h2', { className: 'text-2xl font-bold text-text-primary mb-2' }, 'Full Client v' + version),
            React.createElement('p', { className: 'text-text-muted' }, 'Complete game client with all Season 19.2 features')
          )
        ),
        React.createElement('p', { className: 'text-text-muted mb-6' },
          'Download the full MuOnline Season 19.2 client. Includes all game files, textures, and resources needed to play.'
        ),
        React.createElement(
          'a',
          {
            href: driveLink,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-medium transition-colors'
          },
          React.createElement('svg', { className: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
            React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l4 4m4-4l-4 4' })
          ),
          'Download from Google Drive'
        )
      ),

      // Info Section
      React.createElement(
        'section',
        { className: 'mt-12 p-6 bg-primary/10 border border-primary/20 rounded-lg' },
        React.createElement('h3', { className: 'text-lg font-bold text-text-primary mb-4' }, 'Download Information'),
        React.createElement(
          'ul',
          { className: 'space-y-2 text-text-muted' },
          React.createElement('li', { className: 'flex items-start gap-2' },
            React.createElement('span', { className: 'text-primary mt-1' }, '•'),
            'Client size: ~' + fileSize + ' compressed'
          ),
          React.createElement('li', { className: 'flex items-start gap-2' },
            React.createElement('span', { className: 'text-primary mt-1' }, '•'),
            'Required disk space: ~5 GB after extraction'
          ),
          React.createElement('li', { className: 'flex items-start gap-2' },
            React.createElement('span', { className: 'text-primary mt-1' }, '•'),
            'Compatible with Windows 7/8/10/11'
          ),
          React.createElement('li', { className: 'flex items-start gap-2' },
            React.createElement('span', { className: 'text-primary mt-1' }, '•'),
            'Includes anti-cheat system'
          )
        )
      ),

      // Support Section
      React.createElement(
        'div',
        { className: 'mt-8 text-center' },
        React.createElement('p', { className: 'text-text-muted' },
          'Having trouble downloading? Check our ',
          React.createElement('a', { href: '/news', className: 'text-primary hover:underline' }, 'news'),
          ' for updates.'
        )
      )
    )
  );
}

export default DownloadPage;
