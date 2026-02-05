/**
 * Sidebar Component
 * Main navigation sidebar with MuOnline CMS menu items
 * Organized by access level: Public, Protected (auth required), Admin (GM only)
 */

import { NavLink } from 'react-router-dom';
import { MessageSquare, Newspaper, Users, Trophy, Settings, Home, Download } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  icon: any;
  label: string;
  authRequired?: boolean;
  adminRequired?: boolean;
}

const navItems: NavItem[] = [
  // Public routes
  { path: '/', icon: Home, label: 'Home' },
  { path: '/news', icon: Newspaper, label: 'News' },
  { path: '/download', icon: Download, label: 'Download' },
  { path: '/ranking', icon: Trophy, label: 'Ranking' },
  // Protected routes (auth required)
  { path: '/character', icon: Users, label: 'Character', authRequired: true },
  { path: '/chat', icon: MessageSquare, label: 'Chat', authRequired: true },
  // Admin routes (GM only)
  { path: '/settings', icon: Settings, label: 'Settings', authRequired: true, adminRequired: true },
];

export function Sidebar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isGameMaster = useAuthStore((state) => state.isGameMaster);

  // Filter nav items based on auth status
  const visibleNavItems = navItems.filter((item) => {
    // Public items - always show
    if (!item.authRequired) return true;
    // Protected items - require auth
    if (item.authRequired && !isAuthenticated) return false;
    // Admin items - require GM
    if (item.adminRequired && !isGameMaster) return false;
    return true;
  });

  return (
    <aside className="w-64 bg-bg-secondary border-r border-white/10 h-screen flex flex-col sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-display font-bold text-primary">
          Mu Kacher
        </h1>
        <p className="text-xs text-text-muted mt-1">Season 19.2</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-white/5',
                isActive
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-text-secondary hover:text-text-primary'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {item.adminRequired && (
              <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                GM
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>Server Online</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
