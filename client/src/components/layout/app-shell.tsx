/**
 * App Shell Component
 * Main layout wrapper with sidebar, header, and content area
 */

import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useUIStore } from '@/stores/ui-store';

export function AppShell() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50 lg:static lg:z-auto
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Sidebar />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => useUIStore.getState().setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppShell;
