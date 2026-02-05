/**
 * Loading Spinner Component
 * Displays a spinning loading indicator
 */

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
