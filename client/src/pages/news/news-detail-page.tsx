/**
 * News Detail Page Component
 * Displays full news article
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiClient } from '@/lib/api-client';
import type { News } from '@/types/news-types';

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;

      try {
        const response = await apiClient.get(`/news/${id}`);
        setNews(response.data.data.news);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError('News not found');
        } else {
          setError(err.response?.data?.message || 'Failed to load news');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (isLoading) {
    return React.createElement(
      'div',
      { className: 'container mx-auto py-12 px-4' },
      React.createElement('div', { className: 'text-center text-text-muted' }, 'Loading news...')
    );
  }

  if (error || !news) {
    return React.createElement(
      'div',
      { className: 'container mx-auto py-12 px-4' },
      React.createElement(
        'div',
        { className: 'max-w-4xl mx-auto text-center' },
        React.createElement('p', { className: 'text-error mb-4' }, error || 'News not found'),
        React.createElement(
          Link,
          { to: '/news', className: 'text-primary hover:underline' },
          '← Back to News'
        )
      )
    );
  }

  return React.createElement(
    'article',
    { className: 'container mx-auto py-12 px-4' },
    React.createElement(
      'div',
      { className: 'max-w-4xl mx-auto' },
      // Back link
      React.createElement(
        Link,
        { to: '/news', className: 'inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8' },
        React.createElement('svg', { className: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
          React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M15 19l-7-7 7-7' })
        ),
        'Back to News'
      ),

      // Article header
      React.createElement(
        'header',
        { className: 'mb-8' },
        React.createElement('h1', { className: 'text-4xl font-bold text-text-primary mb-4' }, news.title),
        React.createElement(
          'div',
          { className: 'flex items-center gap-4 text-text-muted' },
          React.createElement('span', null, 'By ' + news.authorName),
          React.createElement('span', null, '•'),
          React.createElement('span', null, new Date(news.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }))
        )
      ),

      // Article content
      React.createElement(
        'div',
        { className: 'prose prose-invert max-w-none' },
        React.createElement('div', {
          className: 'text-text-primary whitespace-pre-wrap',
          dangerouslySetInnerHTML: { __html: news.content }
        })
      )
    )
  );
}

export default NewsDetailPage;
