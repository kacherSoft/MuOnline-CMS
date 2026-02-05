/**
 * Protected Root Route Component
 * Wraps routes that require authentication with AppShell layout
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/common/protected-route';
import { AppShell as AppShellComponent } from '@/components/layout/app-shell';

export function ProtectedRootRoute() {
  return React.createElement(
    ProtectedRoute,
    null,
    React.createElement(
      AppShellComponent,
      null,
      React.createElement(Outlet)
    )
  );
}

export default ProtectedRootRoute;
