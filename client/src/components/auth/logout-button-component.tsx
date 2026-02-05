/**
 * Logout Button Component
 * Button component for user logout with confirmation dialog
 */

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth.hook';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { ConfirmDialog } from '@/components/common/confirm-dialog-component';

export function LogoutButton() {
  const { logout, isLoading } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowConfirm(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        title="Logout"
        className="text-text-muted hover:text-error"
      >
        <LogOut className="w-5 h-5" />
      </Button>
      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleLogout}
      />
    </>
  );
}

export default LogoutButton;
