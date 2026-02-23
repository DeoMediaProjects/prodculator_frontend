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
} from '@mui/material';
import { Edit, Add, Refresh } from '@mui/icons-material';

interface ComparableProduction {
  id: string;
  title: string;
  year: number;
  genre: string;
  budget: number;
  territory: string;
  incentiveUsed: string;
  tmdbId?: string;
  source: string;
  lastUpdated: string;
}

const mockProductions: ComparableProduction[] = [
  {
    id: '1',
    title: 'The Crown (Season 6)',
    year: 2023,
    genre: 'Drama',
    budget: 13000000,
    territory: 'United Kingdom',
    incentiveUsed: 'UK Film Tax Relief',
    tmdbId: '1399',
    source: 'TMDB API + BFI Records',
    lastUpdated: '2026-01-15',
  },
  {
    id: '2',
    title: 'Deadpool 3',
    year: 2024,
    genre: 'Action/Comedy',
    budget: 200000000,
    territory: 'British Columbia',
    incentiveUsed: 'BC Film Incentive',
    tmdbId: '533535',
    source: 'TMDB API',
    lastUpdated: '2026-01-12',
  },
  {
    id: '3',
    title: 'Stranger Things (Season 4)',
    year: 2022,
    genre: 'Sci-Fi',
    budget: 30000000,
    territory: 'Georgia (USA)',
    incentiveUsed: 'Georgia Film Tax Credit',
    tmdbId: '66732',
    source: 'TMDB API + Public Records',
    lastUpdated: '2026-01-10',
  },
  {
    id: '4',
    title: 'Jurassic World Dominion',
    year: 2022,
    genre: 'Adventure',
    budget: 165000000,
    territory: 'Malta',
    incentiveUsed: 'Malta Cash Rebate',
    tmdbId: '507086',
    source: 'Malta Film Commission',
    lastUpdated: '2025-12-28',
  },
];

const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller', 'Horror', 'Adventure', 'Romance'];
const territories = ['United Kingdom', 'British Columbia', 'Georgia (USA)', 'Malta', 'South Africa'];

export function ComparableProductionsManager() {
  const [productions, setProductions] = useState<ComparableProduction[]>(mockProductions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduction, setEditingProduction] = useState<ComparableProduction | null>(null);
  const [syncing, setSyncing] = useState(false);

  const handleEdit = (production: ComparableProduction) => {
    setEditingProduction(production);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingProduction(null);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditingProduction(null);
  };

  const handleSyncTMDB = async () => {
    setSyncing(true);
    // Simulate API sync
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 1 }}>
            Comparable Productions Database
          </Typography>
          <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
            Curated database of film/TV productions with budgets, locations, and incentives used
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleSyncTMDB}
            disabled={syncing}
            sx={{
              borderColor: '#D4AF37',
              color: '#D4AF37',
              '&:hover': {
                borderColor: '#E5C158',
                bgcolor: 'rgba(212, 175, 55, 0.08)',
              },
            }}
          >
            {syncing ? 'Syncing...' : 'Sync from TMDB'}
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
            Add Production
          </Button>
        </Box>
      </Box>

      <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Year</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Genre</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Budget</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Territory</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Incentive Used</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Source</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Last Updated</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productions.map((production) => (
                <TableRow key={production.id} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                  <TableCell sx={{ color: '#ffffff' }}>
                    {production.title}
                    {production.tmdbId && (
                      <Chip
                        label="TMDB"
                        size="small"
                        sx={{
                          ml: 1,
                          bgcolor: 'rgba(3, 169, 244, 0.2)',
                          color: '#03a9f4',
                          fontSize: '0.65rem',
                          height: 18,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{production.year}</TableCell>
                  <TableCell>
                    <Chip
                      label={production.genre}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(212, 175, 55, 0.2)',
                        color: '#D4AF37',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    ${(production.budget / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff', fontSize: '0.875rem' }}>{production.territory}</TableCell>
                  <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>{production.incentiveUsed}</TableCell>
                  <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>{production.source}</TableCell>
                  <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>{production.lastUpdated}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(production)}>
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
          {editingProduction ? 'Edit Production' : 'Add Production'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
            <TextField
              label="Title"
              defaultValue={editingProduction?.title || ''}
              fullWidth
            />
            <TextField
              label="Year"
              type="number"
              defaultValue={editingProduction?.year || ''}
              fullWidth
            />
            <TextField
              select
              label="Genre"
              defaultValue={editingProduction?.genre || ''}
              fullWidth
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Budget ($)"
              type="number"
              defaultValue={editingProduction?.budget || ''}
              fullWidth
            />
            <TextField
              select
              label="Territory"
              defaultValue={editingProduction?.territory || ''}
              fullWidth
            >
              {territories.map((territory) => (
                <MenuItem key={territory} value={territory}>
                  {territory}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Incentive Used"
              defaultValue={editingProduction?.incentiveUsed || ''}
              fullWidth
            />
            <TextField
              label="TMDB ID (optional)"
              defaultValue={editingProduction?.tmdbId || ''}
              fullWidth
            />
            <TextField
              label="Source"
              defaultValue={editingProduction?.source || ''}
              fullWidth
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
            {editingProduction ? 'Update' : 'Add'} Production
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
