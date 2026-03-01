import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  /** Spinner diameter in px. Defaults to 40 for overlay, 20 for inline. */
  size?: number;
  /** Optional label rendered beneath the spinner. */
  message?: string;
  /**
   * When true, renders as a fixed full-viewport overlay that blocks the entire
   * page — use this during login / logout navigation transitions.
   * When false (default), renders inline so it can be placed inside buttons or
   * icon slots.
   */
  overlay?: boolean;
}

export function LoadingSpinner({ size, message, overlay = false }: LoadingSpinnerProps) {
  if (overlay) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          gap: 2,
        }}
      >
        <CircularProgress size={size ?? 48} sx={{ color: '#D4AF37' }} />
        {message && (
          <Typography variant="body2" sx={{ color: '#a0a0a0', letterSpacing: '0.05em' }}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CircularProgress size={size ?? 20} sx={{ color: '#D4AF37' }} />
      {message && (
        <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
