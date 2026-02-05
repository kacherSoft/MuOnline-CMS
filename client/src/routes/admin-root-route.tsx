/**
 * Admin Root Route Component
 * Wraps routes that require Game Master (admin) access with AppShell layout
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminRoute } from '@/components/common/admin-route-component';
import { AppShell as AppShellComponent } from '@/components/layout/app-shell';

export function AdminRootRoute() {
  return React.createElement(
    AdminRoute,
    null,
    React.createElement(
      AppShellComponent,
      null,
      React.createElement(Outlet)
    )
  );
}

export default AdminRootRoute;
