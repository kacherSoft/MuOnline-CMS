/**
 * Root Route Component
 * Wraps all routes with AppShell layout
 * Public routes don't require authentication
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell as AppShellComponent } from '@/components/layout/app-shell';

export function RootRoute() {
  return React.createElement(
    AppShellComponent,
    null,
    React.createElement(Outlet)
  );
}

export default RootRoute;
