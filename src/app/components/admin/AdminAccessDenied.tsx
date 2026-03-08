import { Box, Typography, Card, CardContent } from '@mui/material';
import { Lock } from '@mui/icons-material';

interface AdminAccessDeniedProps {
  requiredPermission: string;
  requiredRole?: string;
}

export function AdminAccessDenied({ requiredPermission, requiredRole }: AdminAccessDeniedProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Card
        sx={{
          bgcolor: '#0a0a0a',
          border: '1px solid rgba(244, 67, 54, 0.3)',
          maxWidth: 480,
          width: '100%',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 6, px: 4 }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: 'rgba(244, 67, 54, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <Lock sx={{ fontSize: 36, color: '#f44336' }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, color: '#f44336', mb: 1 }}>
            Access Denied
          </Typography>

          <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 2 }}>
            You don't have permission to access this section.
          </Typography>

          <Box
            sx={{
              bgcolor: 'rgba(244, 67, 54, 0.08)',
              borderRadius: 1,
              p: 2,
              mt: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              Required permission: <strong style={{ color: '#ffffff' }}>{requiredPermission}</strong>
            </Typography>
            {requiredRole && (
              <Typography variant="body2" sx={{ color: '#a0a0a0', mt: 0.5 }}>
                Available to: <strong style={{ color: '#D4AF37' }}>{requiredRole}</strong>
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
