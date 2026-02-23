import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Edit, Add, Sync, Warning, CheckCircle, Schedule, Info } from '@mui/icons-material';

interface CrewRate {
  id: string;
  territory: string;
  role: string;
  category: string;
  dayRate: number;
  weekRate: number;
  union: string;
  lastUpdated: string;
  source: string;
}

const mockCrewRates: CrewRate[] = [
  {
    id: '1',
    territory: 'United Kingdom',
    role: 'Director of Photography',
    category: 'Camera',
    dayRate: 650,
    weekRate: 3250,
    union: 'BECTU',
    lastUpdated: '2026-01-15',
    source: 'BECTU Rate Card 2026',
  },
  {
    id: '2',
    territory: 'British Columbia',
    role: 'Gaffer',
    category: 'Lighting',
    dayRate: 550,
    weekRate: 2750,
    union: 'IATSE 891',
    lastUpdated: '2026-01-10',
    source: 'IATSE 891 Agreement',
  },
  {
    id: '3',
    territory: 'Georgia (USA)',
    role: 'Production Designer',
    category: 'Art Department',
    dayRate: 700,
    weekRate: 3500,
    union: 'IATSE Local 479',
    lastUpdated: '2026-01-08',
    source: 'IATSE 479 Minimums',
  },
  {
    id: '4',
    territory: 'Malta',
    role: 'Assistant Director',
    category: 'Production',
    dayRate: 400,
    weekRate: 2000,
    union: 'Non-Union',
    lastUpdated: '2025-12-20',
    source: 'Malta Film Commission Survey',
  },
];

const territories = ['United Kingdom', 'British Columbia', 'Georgia (USA)', 'Malta', 'South Africa'];
const categories = ['Camera', 'Lighting', 'Sound', 'Art Department', 'Production', 'Post-Production'];

export function CrewCostsManager() {
  const [crewRates, setCrewRates] = useState<CrewRate[]>(mockCrewRates);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<CrewRate | null>(null);

  const handleEdit = (rate: CrewRate) => {
    setEditingRate(rate);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingRate(null);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingRate(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 1 }}>
            Crew Costs & Union Rates
          </Typography>
          <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
            Manage crew rates with AI-powered quarterly auto-sync from union agreements and industry surveys
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Sync />}
            sx={{
              borderColor: '#D4AF37',
              color: '#D4AF37',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#E5C158',
                bgcolor: 'rgba(212, 175, 55, 0.08)',
              },
            }}
          >
            Auto-Sync Settings
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#E5C158',
              },
            }}
          >
            Add Crew Rate
          </Button>
        </Box>
      </Box>

      {/* Legal Disclaimer */}
      <Alert
        severity="info"
        icon={<Info sx={{ color: '#42a5f5' }} />}
        sx={{
          mb: 4,
          bgcolor: 'rgba(66, 165, 245, 0.1)',
          border: '1px solid rgba(66, 165, 245, 0.3)',
          color: '#ffffff',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Informational Data Only - Not Salary Advice
        </Typography>
        <Typography variant="body2" sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
          All crew rate data shown here is sourced from publicly available union agreements, guild rate cards, and industry surveys. 
          This information is provided for reference purposes only and does not constitute salary advice or negotiation guidance. 
          Actual rates may vary based on experience, project budget, location, and individual negotiations. 
          Always verify current rates with relevant unions, guilds, or industry sources before making hiring decisions.
        </Typography>
      </Alert>

      {/* AI Auto-Sync Status */}
      <Card sx={{ mb: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Sync sx={{ color: '#D4AF37', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  AI-Powered Auto-Sync Status
                </Typography>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  Next scheduled check: <strong>April 1, 2026</strong> (Quarterly)
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<Sync />}
              sx={{
                bgcolor: '#D4AF37',
                color: '#000000',
                fontWeight: 600,
                '&:hover': { bgcolor: '#E5C158' },
              }}
            >
              Run Sync Now
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'rgba(102, 187, 106, 0.1)',
                  borderRadius: 2,
                  border: '1px solid rgba(102, 187, 106, 0.3)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CheckCircle sx={{ color: '#66bb6a', fontSize: 20 }} />
                  <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    6
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  Territories Auto-Syncing
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'rgba(255, 167, 38, 0.1)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 167, 38, 0.3)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Warning sx={{ color: '#ffa726', fontSize: 20 }} />
                  <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    2
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  Pending Updates
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'rgba(66, 165, 245, 0.1)',
                  borderRadius: 2,
                  border: '1px solid rgba(66, 165, 245, 0.3)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Schedule sx={{ color: '#42a5f5', fontSize: 20 }} />
                  <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    18
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  Days Since Last Check
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Pending Updates Alert */}
      <Alert
        severity="warning"
        icon={<Warning />}
        sx={{
          mb: 4,
          bgcolor: 'rgba(255, 167, 38, 0.1)',
          border: '1px solid rgba(255, 167, 38, 0.3)',
          color: '#ffffff',
        }}
      >
        <Typography variant="body2">
          <strong>2 update(s) detected</strong> by AI auto-sync and awaiting your review
        </Typography>
      </Alert>

      <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Territory</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Day Rate</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Week Rate</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Union</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Source</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Last Updated</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crewRates.map((rate) => (
                <TableRow key={rate.id} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                  <TableCell sx={{ color: '#ffffff' }}>{rate.territory}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{rate.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={rate.category}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(212, 175, 55, 0.2)',
                        color: '#D4AF37',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>${rate.dayRate}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>${rate.weekRate}</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontSize: '0.875rem' }}>{rate.union}</TableCell>
                  <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>{rate.source}</TableCell>
                  <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>{rate.lastUpdated}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(rate)}>
                      <Edit sx={{ color: '#D4AF37', fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit/Add Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#D4AF37', fontWeight: 600 }}>
          {editingRate ? 'Edit Crew Rate' : 'Add Crew Rate'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
            <TextField
              select
              label="Territory"
              defaultValue={editingRate?.territory || ''}
              fullWidth
            >
              {territories.map((territory) => (
                <MenuItem key={territory} value={territory}>
                  {territory}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Role"
              defaultValue={editingRate?.role || ''}
              fullWidth
            />
            <TextField
              select
              label="Category"
              defaultValue={editingRate?.category || ''}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Union/Guild"
              defaultValue={editingRate?.union || ''}
              fullWidth
            />
            <TextField
              label="Day Rate ($)"
              type="number"
              defaultValue={editingRate?.dayRate || ''}
              fullWidth
            />
            <TextField
              label="Week Rate ($)"
              type="number"
              defaultValue={editingRate?.weekRate || ''}
              fullWidth
            />
            <TextField
              label="Source"
              defaultValue={editingRate?.source || ''}
              fullWidth
              sx={{ gridColumn: '1 / -1' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} sx={{ color: '#a0a0a0' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              '&:hover': { bgcolor: '#E5C158' },
            }}
          >
            {editingRate ? 'Update' : 'Add'} Rate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}