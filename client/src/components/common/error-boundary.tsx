/**
 * Error Boundary Component
 * Catches JavaScript errors in component tree
 */

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-bg-primary">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Oops!</h1>
            <p className="text-text-muted mb-4">Something went wrong.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-bg-primary rounded-lg hover:bg-primary-400 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
