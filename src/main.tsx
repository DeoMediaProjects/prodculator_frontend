import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/App';

import '@/styles/theme.css';
import '@/styles/fonts.css';

// Import global error handler to suppress known warnings
import '@/utils/errorHandler';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);