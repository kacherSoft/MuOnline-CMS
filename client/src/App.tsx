/**
 * App Component
 * Root React component with theme and router setup
 */

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route-defs';
import { useUIStore } from './stores/ui-store';
import { useEffect } from 'react';
import { ErrorBoundary } from './components/common/error-boundary';
import { AuthProvider } from './components/auth/auth-provider-component';

function App() {
  const theme = useUIStore((state) => state.theme);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return React.createElement(
    ErrorBoundary,
    null,
    React.createElement(
      AuthProvider,
      null,
      React.createElement(RouterProvider, { router })
    )
  );
}

export default App;
