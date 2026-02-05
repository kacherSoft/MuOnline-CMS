/**
 * Header Component
 * Top header bar with server status and user actions
 */

import { Server, Moon, Sun, Menu } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useUIStore } from '@/stores/ui-store';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/logout-button-component';

export function Header() {
  const { user, clearAuth } = useAuthStore();
  const { theme, setTheme, toggleSidebar } = useUIStore();

  return (
    <header className="h-16 bg-bg-secondary border-b border-white/10 px-6 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Server status */}
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-success" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text-primary">MuOnline S19.2</p>
            <p className="text-xs text-text-muted">Season 19.2 • DV Team</p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-text-muted hover:text-text-primary"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* User info and logout */}
        {user && (
          <>
            <span className="hidden sm:block text-sm text-text-primary">
              {user.username}
            </span>
            <LogoutButton />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
