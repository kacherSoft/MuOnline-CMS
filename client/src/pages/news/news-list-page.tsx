/**
 * News List Page Component
 * Displays published news/announcements
 */

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import type { News } from '@/types/news-types';

export function NewsListPage() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiClient.get('/news');
        setNews(response.data.data.news);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return React.createElement(
      'div',
      { className: 'container mx-auto py-12 px-4' },
      React.createElement('div', { className: 'text-center text-text-muted' }, 'Loading news...')
    );
  }

  if (error) {
    return React.createElement(
      'div',
      { className: 'container mx-auto py-12 px-4' },
      React.createElement(
        'div',
        { className: 'max-w-4xl mx-auto bg-error/10 border border-error/20 rounded-lg p-6' },
        React.createElement('p', { className: 'text-error' }, error)
      )
    );
  }

  return React.createElement(
    'div',
    { className: 'container mx-auto py-12 px-4' },
    React.createElement(
      'div',
      { className: 'max-w-4xl mx-auto' },
      // Header
      React.createElement(
        'div',
        { className: 'mb-12' },
        React.createElement('h1', { className: 'text-4xl font-bold text-text-primary mb-4' }, 'News & Announcements'),
        React.createElement('p', { className: 'text-lg text-text-muted' }, 'Stay updated with the latest server news, events, and updates.')
      ),

      // News List
      news.length === 0
        ? React.createElement(
            'div',
            { className: 'text-center py-12' },
            React.createElement('p', { className: 'text-text-muted' }, 'No news available yet.')
          )
        : React.createElement(
            'div',
            { className: 'space-y-6' },
            news.map((item) =>
              React.createElement(
                'a',
                {
                  key: item.id,
                  href: `/news/${item.id}`,
                  className: 'block bg-bg-secondary border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors'
                },
                React.createElement(
                  'div',
                  { className: 'flex items-start justify-between gap-4' },
                  React.createElement(
                    'div',
                    { className: 'flex-1' },
                    React.createElement('h2', { className: 'text-xl font-bold text-text-primary mb-2 hover:text-primary transition-colors' }, item.title),
                    React.createElement('p', { className: 'text-text-muted line-clamp-2' }, item.content.substring(0, 200) + '...')
                  ),
                  React.createElement(
                    'div',
                    { className: 'text-right text-sm text-text-muted shrink-0' },
                    React.createElement('div', null, new Date(item.createdAt).toLocaleDateString()),
                    React.createElement('div', null, 'by ' + item.authorName)
                  )
                )
              )
            )
          )
    )
  );
}

export default NewsListPage;
