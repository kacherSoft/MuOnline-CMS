/**
 * Route Definitions
 * React Router configuration with lazy loading
 * Organized by access level: Public, Protected (auth required), Admin (GM only)
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootRoute } from './root-route';
import { ProtectedRootRoute } from './protected-root-route';
import { AdminRootRoute } from './admin-root-route';
import { LoadingSpinner } from '@/components/common/loading-spinner';

// Lazy load route components
const PlaceholderHome = lazy(() => import('./home-placeholder'));
const LandingPage = lazy(() => import('@/pages/landing-page'));
const DownloadPage = lazy(() => import('@/pages/download-page'));
const NewsListPage = lazy(() => import('@/pages/news/news-list-page'));
const NewsDetailPage = lazy(() => import('@/pages/news/news-detail-page'));
const SettingsPage = lazy(() => import('@/pages/settings-page'));

// Lazy load components from other phases
// Phase 05: Auth routes
const AuthRoute = lazy(() => import('./auth-route'));
const RegisterRoute = lazy(() => import('./register-route'));
// Phase 07: Chat components
// Phase 10: CMS components

// Suspense wrapper for lazy loaded components
function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  // =====================================================
  // PUBLIC ROUTES (no authentication required)
  // =====================================================
  {
    path: '/',
    element: <RootRoute />,
    children: [
      { index: true, element: <SuspenseWrapper><LandingPage /></SuspenseWrapper> },
      { path: 'news', element: <SuspenseWrapper><NewsListPage /></SuspenseWrapper> },
      { path: 'news/:id', element: <SuspenseWrapper><NewsDetailPage /></SuspenseWrapper> },
      { path: 'download', element: <SuspenseWrapper><DownloadPage /></SuspenseWrapper> },
      { path: 'ranking', element: <SuspenseWrapper><PlaceholderHome /></SuspenseWrapper> },
    ],
  },

  // =====================================================
  // PROTECTED ROUTES (authentication required)
  // =====================================================
  {
    path: '/',
    element: <ProtectedRootRoute />,
    children: [
      { path: 'character', element: <SuspenseWrapper><PlaceholderHome /></SuspenseWrapper> },
      { path: 'chat', element: <SuspenseWrapper><PlaceholderHome /></SuspenseWrapper> },
    ],
  },

  // =====================================================
  // ADMIN ROUTES (Game Master only)
  // =====================================================
  {
    path: '/',
    element: <AdminRootRoute />,
    children: [
      { path: 'settings', element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
    ],
  },

  // =====================================================
  // AUTH ROUTES (login/register - outside AppShell)
  // =====================================================
  { path: '/login', element: <SuspenseWrapper><AuthRoute /></SuspenseWrapper> },
  { path: '/register', element: <SuspenseWrapper><RegisterRoute /></SuspenseWrapper> },

  // =====================================================
  // FALLBACK
  // =====================================================
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
