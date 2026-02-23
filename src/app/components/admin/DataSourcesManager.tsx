import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import { Save, CheckCircle, Warning, Refresh } from '@mui/icons-material';

interface DataSourceConfig {
  name: string;
  description: string;
  credentialMode: string;
  enabled: boolean;
  status: 'active' | 'inactive' | 'error';
  lastSync?: string;
  endpoint?: string;
}

const initialDataSources: DataSourceConfig[] = [
  {
    name: 'Backend AI Analysis (OpenAI)',
    description: 'Script analysis is executed server-side only',
    credentialMode: 'Managed in backend env',
    enabled: true,
    status: 'active',
    lastSync: '2026-02-23',
    endpoint: '/api/scripts/analyze',
  },
  {
    name: 'Backend Data Store (Supabase)',
    description: 'Database and storage access are handled by backend services',
    credentialMode: 'Managed in backend env',
    enabled: true,
    status: 'active',
    lastSync: '2026-02-23',
    endpoint: '/api/* (backend module routers)',
  },
  {
    name: 'Google Maps Platform',
    description: 'Geocoding and location data',
    credentialMode: 'Frontend-safe key only',
    enabled: true,
    status: 'active',
    lastSync: '2026-02-23',
    endpoint: 'https://maps.googleapis.com/maps/api',
  },
  {
    name: 'TMDB API',
    description: 'Film metadata and comparable productions',
    credentialMode: 'Optional frontend key',
    enabled: false,
    status: 'inactive',
    endpoint: 'https://api.themoviedb.org/3',
  },
  {
    name: 'ExchangeRate API',
    description: 'Currency conversion rates',
    credentialMode: 'Optional frontend key',
    enabled: false,
    status: 'inactive',
    endpoint: 'https://api.exchangerate-api.com/v4',
  },
  {
    name: 'U.S. Bureau of Labor Statistics',
    description: 'Crew wage data (public API)',
    credentialMode: 'No key required',
    enabled: true,
    status: 'active',
    lastSync: '2026-02-20',
    endpoint: 'https://api.bls.gov/publicAPI/v2',
  },
];

export function DataSourcesManager() {
  const [sources, setSources] = useState<DataSourceConfig[]>(initialDataSources);
  const [saved, setSaved] = useState(false);

  const handleToggle = (index: number) => {
    const updated = [...sources];
    updated[index].enabled = !updated[index].enabled;
    setSources(updated);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTestConnection = (name: string) => {
    console.log(`Testing connection to ${name}...`);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 1 }}>
          Data Source Connectivity
        </Typography>
        <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 3 }}>
          Visibility into active integrations. Secret keys are no longer entered or stored in frontend UI.
        </Typography>

        {saved && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              bgcolor: 'rgba(46, 125, 50, 0.1)',
              color: '#66bb6a',
              border: '1px solid rgba(46, 125, 50, 0.3)',
            }}
          >
            Configuration saved successfully!
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {sources.map((source, index) => (
          <Grid size={{ xs: 12 }} key={source.name}>
            <Card
              sx={{
                bgcolor: '#0a0a0a',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                '&:hover': {
                  borderColor: 'rgba(212, 175, 55, 0.4)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                        {source.name}
                      </Typography>
                      {source.status === 'active' && (
                        <Chip
                          icon={<CheckCircle sx={{ fontSize: 16 }} />}
                          label="Active"
                          size="small"
                          sx={{
                            bgcolor: 'rgba(46, 125, 50, 0.2)',
                            color: '#66bb6a',
                            fontWeight: 600,
                          }}
                        />
                      )}
                      {source.status === 'inactive' && (
                        <Chip
                          label="Inactive"
                          size="small"
                          sx={{
                            bgcolor: 'rgba(117, 117, 117, 0.2)',
                            color: '#9e9e9e',
                            fontWeight: 600,
                          }}
                        />
                      )}
                      {source.status === 'error' && (
                        <Chip
                          icon={<Warning sx={{ fontSize: 16 }} />}
                          label="Error"
                          size="small"
                          sx={{
                            bgcolor: 'rgba(211, 47, 47, 0.2)',
                            color: '#f44336',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 2 }}>
                      {source.description}
                    </Typography>
                    {source.lastSync && (
                      <Typography variant="caption" sx={{ color: '#666', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Refresh sx={{ fontSize: 14 }} />
                        Last synced: {source.lastSync}
                      </Typography>
                    )}
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={source.enabled}
                        onChange={() => handleToggle(index)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#D4AF37',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#D4AF37',
                          },
                        }}
                      />
                    }
                    label={source.enabled ? 'Enabled' : 'Disabled'}
                    sx={{ color: '#a0a0a0' }}
                  />
                </Box>

                <Divider sx={{ my: 2, borderColor: 'rgba(212, 175, 55, 0.1)' }} />

                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      label="Endpoint"
                      value={source.endpoint}
                      fullWidth
                      size="small"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.875rem',
                          color: '#a0a0a0',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <TextField
                      label="Credential Handling"
                      value={source.credentialMode}
                      fullWidth
                      size="small"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="small"
                      onClick={() => handleTestConnection(source.name)}
                      disabled={!source.enabled}
                      sx={{
                        borderColor: '#D4AF37',
                        color: '#D4AF37',
                        '&:hover': {
                          borderColor: '#E5C158',
                          bgcolor: 'rgba(212, 175, 55, 0.08)',
                        },
                        '&.Mui-disabled': {
                          borderColor: '#333',
                          color: '#666',
                        },
                      }}
                    >
                      Test Connection
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
          <strong>Security:</strong> Secret keys are stored server-side only. Frontend never stores OpenAI or Supabase service credentials.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          sx={{
            bgcolor: '#D4AF37',
            color: '#000000',
            fontWeight: 600,
            px: 4,
            '&:hover': {
              bgcolor: '#E5C158',
            },
          }}
        >
          Save Configuration
        </Button>
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(212, 175, 55, 0.05)', borderRadius: 2, border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 2 }}>
          Curated Data Update Schedule
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ color: '#ffffff', mb: 0.5 }}>
              <strong>Tax Incentives:</strong> Quarterly updates
            </Typography>
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
              Next update: April 1, 2026
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ color: '#ffffff', mb: 0.5 }}>
              <strong>Crew Rates:</strong> Semi-annual updates
            </Typography>
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
              Next update: July 1, 2026
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ color: '#ffffff', mb: 0.5 }}>
              <strong>Comparable Productions:</strong> Monthly TMDB sync
            </Typography>
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
              Next sync: March 1, 2026
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ color: '#ffffff', mb: 0.5 }}>
              <strong>Production Facilities:</strong> Annual verification
            </Typography>
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
              Next verification: January 2027
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
