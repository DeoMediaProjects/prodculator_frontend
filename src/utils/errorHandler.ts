/**
 * Global Error Handler
 * Intercepts and filters console errors to suppress known warnings
 */

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// List of error messages to suppress
const suppressedErrors = [
  'Failed to fetch',
  'SUPABASE_NOT_CONFIGURED',
  'NetworkError',
  'fetch failed',
  'TypeError: Failed to fetch',
  'Load failed',
  'The operation couldn\'t be completed',
  'Network request failed',
];

// Override console.error
console.error = (...args: any[]) => {
  const errorMessage = args.join(' ');
  
  // Check if this is a suppressed error
  const shouldSuppress = suppressedErrors.some(pattern => 
    errorMessage.toLowerCase().includes(pattern.toLowerCase())
  );
  
  // Only log if not suppressed
  if (!shouldSuppress) {
    originalConsoleError.apply(console, args);
  }
};

// Override console.warn to reduce noise
console.warn = (...args: any[]) => {
  const warnMessage = args.join(' ');
  
  // Suppress duplicate emotion warnings
  if (warnMessage.includes('@emotion/react') && warnMessage.includes('multiple instances')) {
    return; // Suppress this warning
  }
  
  // Suppress Supabase warnings
  if (warnMessage.includes('Supabase credentials')) {
    return;
  }
  
  originalConsoleWarn.apply(console, args);
};

// Add unhandled promise rejection handler
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const errorMessage = event.reason?.message || event.reason?.toString() || String(event.reason) || '';
    
    // Suppress known errors
    const shouldSuppress = suppressedErrors.some(pattern => 
      String(errorMessage).toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (shouldSuppress) {
      event.preventDefault(); // Prevent the error from showing in console
    }
  });

  // Add global error handler for uncaught errors
  window.addEventListener('error', (event) => {
    const errorMessage = event.message || event.error?.message || '';
    
    // Suppress known errors
    const shouldSuppress = suppressedErrors.some(pattern => 
      String(errorMessage).toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (shouldSuppress) {
      event.preventDefault(); // Prevent the error from showing in console
      return true;
    }
  });
}

export {};