/**
 * Application Entry Point
 * Mounts React app to DOM
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure dark mode is applied on mount
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!localStorage.getItem('muonline-cms-ui')) {
  document.documentElement.classList.toggle('dark', prefersDark);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
