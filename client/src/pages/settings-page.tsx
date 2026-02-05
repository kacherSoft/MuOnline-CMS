/**
 * Settings Page Component
 * Admin-only page for server settings and configuration
 */

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { AdminRoute } from '@/components/common/admin-route-component';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DownloadSettings {
  download_title: string;
  download_description: string;
  download_drive_link: string;
  download_file_size: string;
  download_version: string;
}

export function SettingsPage() {
  const isGameMaster = useAuthStore((state) => state.isGameMaster);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [activeTab, setActiveTab] = useState('server');
  const [downloadSettings, setDownloadSettings] = useState<DownloadSettings>({
    download_title: '',
    download_description: '',
    download_drive_link: '',
    download_file_size: '',
    download_version: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'news', label: 'News Management' },
    { id: 'download', label: 'Download' },
    { id: 'users', label: 'Users' },
    { id: 'server', label: 'Server' },
  ];

  // Fetch download settings on mount
  useEffect(() => {
    if (activeTab === 'download') {
      fetchDownloadSettings();
    }
  }, [activeTab]);

  const fetchDownloadSettings = async () => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

      const response = await fetch('/api/server-settings/download', { headers });
      if (response.ok) {
        const data = await response.json();
        setDownloadSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch download settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

      const response = await fetch('/api/server-settings/download', {
        method: 'PATCH',
        headers,
        body: JSON.stringify(downloadSettings),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Download settings updated successfully!' });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Failed to update settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to server' });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isGameMaster) {
    return null; // AdminRoute will handle redirect
  }

  return React.createElement(
    AdminRoute,
    null,
    React.createElement(
      'div',
      { className: 'container mx-auto py-8 px-4' },
      React.createElement(
        'div',
        { className: 'max-w-6xl mx-auto' },
        // Header
        React.createElement(
          'div',
          { className: 'mb-8' },
          React.createElement('h1', { className: 'text-3xl font-bold text-text-primary mb-2' }, 'Admin Settings'),
          React.createElement('p', { className: 'text-text-muted' }, 'Manage server configuration and content')
        ),

        // Tabs
        React.createElement(
          'div',
          { className: 'flex gap-2 mb-6 border-b border-white/10' },
          tabs.map((tab) =>
            React.createElement(
              'button',
              {
                key: tab.id,
                onClick: () => setActiveTab(tab.id),
                className: `px-4 py-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text-muted hover:text-text-primary'
                }`
              },
              tab.label
            )
          )
        ),

        // Tab Content
        React.createElement(
          'div',
          { className: 'space-y-6' },
          activeTab === 'general' && React.createElement(
            Card,
            { className: 'p-6 border-white/10 bg-bg-secondary' },
            React.createElement('h2', { className: 'text-xl font-bold text-text-primary mb-4' }, 'General Settings'),
            React.createElement('p', { className: 'text-text-muted mb-4' }, 'Server information and basic configuration.'),
            React.createElement(
              'div',
              { className: 'space-y-4' },
              React.createElement(
                'div',
                { className: 'grid grid-cols-2 gap-4' },
                React.createElement(
                  'div',
                  null,
                  React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'Server Name'),
                  React.createElement('input', {
                    type: 'text',
                    defaultValue: 'Mu Kacher',
                    className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                  })
                ),
                React.createElement(
                  'div',
                  null,
                  React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'Season'),
                  React.createElement('input', {
                    type: 'text',
                    defaultValue: 'Season 19.2',
                    className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                  })
                )
              ),
              React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'Server Description'),
                React.createElement('textarea', {
                  rows: 3,
                  defaultValue: 'Welcome to Mu Kacher Season 19.2! The best MuOnline experience.',
                  className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                })
              )
            )
          ),

          activeTab === 'news' && React.createElement(
            Card,
            { className: 'p-6 border-white/10 bg-bg-secondary' },
            React.createElement('h2', { className: 'text-xl font-bold text-text-primary mb-4' }, 'News Management'),
            React.createElement('p', { className: 'text-text-muted mb-4' }, 'Create and manage server news and announcements.'),
            React.createElement(
              'a',
              { href: '/news', className: 'inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors' },
              'Manage News'
            )
          ),

          activeTab === 'download' && React.createElement(
            Card,
            { className: 'p-6 border-white/10 bg-bg-secondary' },
            React.createElement('h2', { className: 'text-xl font-bold text-text-primary mb-4' }, 'Download Settings'),
            React.createElement('p', { className: 'text-text-muted mb-6' }, 'Configure the game client download page.'),

            // Success/Error message
            message && React.createElement(
              'div',
              {
                className: `p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`
              },
              message.text
            ),

            isLoading
              ? React.createElement('p', { className: 'text-text-muted' }, 'Loading settings...')
              : React.createElement(
                  'div',
                  { className: 'space-y-6' },
                  // Title
                  React.createElement(
                    'div',
                    null,
                    React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'Download Page Title'),
                    React.createElement('input', {
                      type: 'text',
                      value: downloadSettings.download_title,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDownloadSettings({ ...downloadSettings, download_title: e.target.value }),
                      className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                    })
                  ),

                  // Description
                  React.createElement(
                    'div',
                    null,
                    React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'Description'),
                    React.createElement('textarea', {
                      rows: 3,
                      value: downloadSettings.download_description,
                      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setDownloadSettings({ ...downloadSettings, download_description: e.target.value }),
                      className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                    })
                  ),

                  // Google Drive Link
                  React.createElement(
                    'div',
                    null,
                    React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'Google Drive Link'),
                    React.createElement('input', {
                      type: 'url',
                      value: downloadSettings.download_drive_link,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDownloadSettings({ ...downloadSettings, download_drive_link: e.target.value }),
                      placeholder: 'https://drive.google.com/...',
                      className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                    })
                  ),

                  // File Size and Version (grid)
                  React.createElement(
                    'div',
                    { className: 'grid grid-cols-2 gap-4' },
                    React.createElement(
                      'div',
                      null,
                      React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'File Size'),
                      React.createElement('input', {
                        type: 'text',
                        value: downloadSettings.download_file_size,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDownloadSettings({ ...downloadSettings, download_file_size: e.target.value }),
                        placeholder: '2.5 GB',
                        className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                      })
                    ),
                    React.createElement(
                      'div',
                      null,
                      React.createElement('label', { className: 'block text-sm font-medium text-text-primary mb-2' }, 'Version'),
                      React.createElement('input', {
                        type: 'text',
                        value: downloadSettings.download_version,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDownloadSettings({ ...downloadSettings, download_version: e.target.value }),
                        placeholder: '1.0.0',
                        className: 'w-full px-3 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-text-primary'
                      })
                    )
                  ),

                  // Save button
                  React.createElement(
                    'div',
                    { className: 'flex justify-end gap-3 pt-4' },
                    React.createElement(
                      Button,
                      {
                        onClick: handleDownloadSave,
                        disabled: isSaving,
                        className: 'bg-primary hover:bg-primary/90'
                      },
                      isSaving ? 'Saving...' : 'Save Changes'
                    )
                  )
                )
          ),

          activeTab === 'users' && React.createElement(
            Card,
            { className: 'p-6 border-white/10 bg-bg-secondary' },
            React.createElement('h2', { className: 'text-xl font-bold text-text-primary mb-4' }, 'User Management'),
            React.createElement('p', { className: 'text-text-muted' }, 'User management features coming soon.')
          ),

          activeTab === 'server' && React.createElement(
            Card,
            { className: 'p-6 border-white/10 bg-bg-secondary' },
            React.createElement('h2', { className: 'text-xl font-bold text-text-primary mb-4' }, 'Server Settings'),
            React.createElement('p', { className: 'text-text-muted' }, 'Server configuration options coming soon.')
          )
        )
      )
    )
  );
}

export default SettingsPage;
