import { Box, Typography, Tooltip } from '@mui/material';
import { Info } from '@mui/icons-material';

interface DataAttributionProps {
  source: string;
  lastVerified: string;
  tooltip?: string;
  variant?: 'default' | 'compact';
}

export function DataAttribution({ 
  source, 
  lastVerified, 
  tooltip,
  variant = 'default' 
}: DataAttributionProps) {
  const content = (
    <Box 
      sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: variant === 'compact' ? 1 : 1.5,
        py: variant === 'compact' ? 0.25 : 0.5,
        bgcolor: 'rgba(212, 175, 55, 0.08)',
        borderRadius: '4px',
        border: '1px solid rgba(212, 175, 55, 0.2)',
      }}
    >
      {tooltip && (
        <Info sx={{ fontSize: 14, color: '#D4AF37', opacity: 0.7 }} />
      )}
      <Typography 
        variant="caption" 
        sx={{ 
          color: '#D4AF37',
          fontSize: variant === 'compact' ? '0.7rem' : '0.75rem',
          fontWeight: 500,
          opacity: 0.9,
        }}
      >
        Source: <Box component="span" sx={{ fontWeight: 600 }}>{source}</Box>
        {' • '}
        Last verified: <Box component="span" sx={{ fontWeight: 600 }}>{lastVerified}</Box>
      </Typography>
    </Box>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow placement="top">
        {content}
      </Tooltip>
    );
  }

  return content;
}

interface SectionHeaderWithAttributionProps {
  title: string;
  source: string;
  lastVerified: string;
  tooltip?: string;
}

export function SectionHeaderWithAttribution({
  title,
  source,
  lastVerified,
  tooltip,
}: SectionHeaderWithAttributionProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
          {title}
        </Typography>
        <DataAttribution 
          source={source} 
          lastVerified={lastVerified} 
          tooltip={tooltip}
          variant="compact"
        />
      </Box>
    </Box>
  );
}
