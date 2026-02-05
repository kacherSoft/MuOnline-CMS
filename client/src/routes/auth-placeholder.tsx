/**
 * Auth Placeholder Component
 * Temporary placeholder for login page
 * Will be replaced by actual auth component in Phase 05
 */

export function AuthPlaceholder() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Mu Kacher
          </h1>
          <p className="text-text-muted">Season 19.2 - Login</p>
        </div>

        <div className="bg-bg-secondary border border-white/10 rounded-xl p-8">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-3xl">🔐</span>
            </div>
            <p className="text-text-muted">
              Authentication module coming in Phase 05
            </p>
            <p className="text-xs text-text-muted mt-2">
              For now, please check the foundation setup is complete.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center text-sm text-text-muted">
              Server Status: <span className="text-success">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPlaceholder;
