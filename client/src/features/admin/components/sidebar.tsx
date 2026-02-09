/**
 * Sidebar Component
 * Navigation for admin dashboard sections
 */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ADMIN_TABS } from '../types/admin-types';
import { useAuthStore } from '@/stores/auth-store';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/admin/statistics')) return 'statistics';
    if (path.includes('/admin/players')) return 'players';
    if (path.includes('/admin/server')) return 'server';
    if (path.includes('/admin/audit')) return 'audit';
    return 'statistics';
  };

  const activeTab = getActiveTab();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-[#0a1628] border-r border-slate-800
        transition-all duration-300 z-40
        ${isCollapsed ? 'w-16' : 'w-56'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <h1
            className={`
              text-xl font-bold text-amber-400 truncate
              ${isCollapsed ? 'text-center text-2xl' : ''}
            `}
          >
            {isCollapsed ? 'MU' : 'MuCMS Admin'}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto scrollbar-dark">
          {ADMIN_TABS.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg mb-1
                transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }
              `}
            >
              <span className="text-lg">{getTabIcon(tab.id)}</span>
              {!isCollapsed && (
                <span className="font-medium truncate">{tab.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2
              text-slate-400 hover:text-slate-200 hover:bg-slate-800
              rounded-lg transition-colors"
          >
            <span className="text-lg">{isCollapsed ? '»' : '«'}</span>
            {!isCollapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-3 border-t border-slate-800 text-xs text-slate-500">
            <p>Logged in as:</p>
            <p className="text-slate-400 font-medium truncate">
              {user?.username || 'Admin'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

function getTabIcon(tabId: string): string {
  const icons: Record<string, string> = {
    statistics: '📊',
    players: '👥',
    server: '⚙️',
    audit: '📋',
  };
  return icons[tabId] || '📄';
}
