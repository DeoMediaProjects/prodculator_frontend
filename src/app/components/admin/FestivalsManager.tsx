import { useState, useEffect, useRef } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  Alert,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Warning,
  Schedule,
  Event,
  Movie,
  EmojiEvents,
} from '@mui/icons-material';
import { Festival, FestivalDeadline } from '@/app/types/festival';
import { adminApi } from '@/services/admin.api';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export function FestivalsManager() {
  const [currentTab, setCurrentTab] = useState(0);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    (async () => {
      const { data, error } = await adminApi.getFestivals();
      if (error) {
        setFetchError(error);
      } else {
        setFestivals(data?.items ?? []);
      }
      setLoading(false);
    })();
  }, []);
  const [editingFestival, setEditingFestival] = useState<Festival | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [festivalToDelete, setFestivalToDelete] = useState<Festival | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Festival>>({
    name: '',
    year: new Date().getFullYear() + 1,
    genres: [],
    budgetTiers: [],
    location: '',
    festivalDates: '',
    premiereRequirement: 'none',
    deadlines: [
      { tier: 'early-bird', date: '', fee: 0, currency: 'USD' },
    ],
    tier: 'regional',
    acceptanceRate: 0.1,
    websiteUrl: '',
    filmfreewayUrl: '',
    dataSource: 'manual',
    verified: true,
    isNew: true,
    notes: '',
  });

  const stats = {
    total: festivals.length,
    verified: festivals.filter(f => f.verified).length,
    upcoming: festivals.filter(f => f.currentStatus !== 'closed').length,
    aList: festivals.filter(f => f.tier === 'a-list').length,
  };

  const genreOptions = [
    'Drama', 'Comedy', 'Thriller', 'Horror', 'Sci-Fi', 'Fantasy',
    'Documentary', 'Animation', 'Action', 'Romance', 'Mystery',
    'Art House', 'International', 'Experimental', 'Short Films',
    'Music', 'Political', 'European Cinema', 'British Cinema',
    'All Genres',
  ];

  const handleOpenDialog = (festival?: Festival) => {
    if (festival) {
      setEditingFestival(festival);
      setFormData(festival);
    } else {
      setEditingFestival(null);
      setFormData({
        name: '',
        year: new Date().getFullYear() + 1,
        genres: [],
        budgetTiers: [],
        location: '',
        festivalDates: '',
        premiereRequirement: 'none',
        deadlines: [
          { tier: 'early-bird', date: '', fee: 0, currency: 'USD' },
        ],
        tier: 'regional',
        acceptanceRate: 0.1,
        websiteUrl: '',
        filmfreewayUrl: '',
        dataSource: 'manual',
        verified: true,
        isNew: true,
        notes: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingFestival(null);
  };

  const handleSave = async () => {
    if (editingFestival) {
      const payload: Festival = { ...formData as Festival, id: editingFestival.id, updatedAt: new Date().toISOString() };
      const { data, error } = await adminApi.updateFestival(editingFestival.id, payload);
      if (!error && data) {
        setFestivals(festivals.map(f => f.id === editingFestival.id ? data : f));
      }
    } else {
      const payload: Festival = {
        ...formData as Festival,
        id: '',
        currentStatus: 'upcoming',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastVerifiedAt: new Date().toISOString(),
      };
      const { data, error } = await adminApi.createFestival(payload);
      if (!error && data) {
        setFestivals([...festivals, data]);
      }
    }
    handleCloseDialog();
  };

  const handleDeleteClick = (festival: Festival) => {
    setFestivalToDelete(festival);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (festivalToDelete) {
      const { error } = await adminApi.deleteFestival(festivalToDelete.id);
      if (!error) {
        setFestivals(festivals.filter(f => f.id !== festivalToDelete.id));
      }
    }
    setDeleteConfirmOpen(false);
    setFestivalToDelete(null);
  };

  const handleToggleVerified = async (festivalId: string) => {
    const target = festivals.find(f => f.id === festivalId);
    if (!target) return;
    const payload: Festival = {
      ...target,
      verified: !target.verified,
      lastVerifiedAt: !target.verified ? new Date().toISOString() : target.lastVerifiedAt,
    };
    const { data, error } = await adminApi.updateFestival(festivalId, payload);
    if (!error && data) {
      setFestivals(festivals.map(f => f.id === festivalId ? data : f));
    }
  };

  const addDeadline = () => {
    setFormData({
      ...formData,
      deadlines: [
        ...(formData.deadlines || []),
        { tier: 'regular', date: '', fee: 0, currency: 'USD' },
      ],
    });
  };

  const updateDeadline = (index: number, field: keyof FestivalDeadline, value: any) => {
    const newDeadlines = [...(formData.deadlines || [])];
    newDeadlines[index] = { ...newDeadlines[index], [field]: value };
    setFormData({ ...formData, deadlines: newDeadlines });
  };

  const removeDeadline = (index: number) => {
    setFormData({
      ...formData,
      deadlines: (formData.deadlines || []).filter((_, i) => i !== index),
    });
  };

  const getTierBadgeColor = (tier: Festival['tier']) => {
    const colors = {
      'a-list': '#D4AF37',
      'tier-2': '#2196F3',
      'regional': '#9c27b0',
      'specialized': '#ff9800',
    };
    return colors[tier];
  };

  const getStatusBadgeColor = (status: Festival['currentStatus']) => {
    const colors = {
      'early-bird-open': '#4caf50',
      'regular-open': '#2196F3',
      'late-open': '#ff9800',
      'upcoming': '#9c27b0',
      'closed': '#666666',
    };
    return colors[status];
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#000000', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
            Film Festival Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
            Manage festival deadlines and submission information
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            bgcolor: '#D4AF37',
            color: '#000000',
            fontWeight: 600,
            '&:hover': { bgcolor: '#E5C158' },
          }}
        >
          Add Festival
        </Button>
      </Box>

      {fetchError && (
        <Alert severity="error" sx={{ mb: 3 }}>{fetchError}</Alert>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#D4AF37' }} />
        </Box>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 700 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                Total Festivals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(76, 175, 80, 0.2)' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 700 }}>
                {stats.verified}
              </Typography>
              <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                Verified Festivals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(33, 150, 243, 0.2)' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#2196F3', fontWeight: 700 }}>
                {stats.upcoming}
              </Typography>
              <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                Upcoming/Open
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 700 }}>
                {stats.aList}
              </Typography>
              <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                A-List Festivals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          sx={{
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            '& .MuiTab-root': { color: '#a0a0a0' },
            '& .Mui-selected': { color: '#D4AF37' },
            '& .MuiTabs-indicator': { bgcolor: '#D4AF37' },
          }}
        >
          <Tab label={`All Festivals (${festivals.length})`} />
          <Tab label={`A-List (${festivals.filter(f => f.tier === 'a-list').length})`} />
          <Tab label={`Tier 2 (${festivals.filter(f => f.tier === 'tier-2').length})`} />
          <Tab label={`Specialized (${festivals.filter(f => f.tier === 'specialized').length})`} />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <FestivalTable
            festivals={festivals}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteClick}
            onToggleVerified={handleToggleVerified}
            getTierBadgeColor={getTierBadgeColor}
            getStatusBadgeColor={getStatusBadgeColor}
          />
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <FestivalTable
            festivals={festivals.filter(f => f.tier === 'a-list')}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteClick}
            onToggleVerified={handleToggleVerified}
            getTierBadgeColor={getTierBadgeColor}
            getStatusBadgeColor={getStatusBadgeColor}
          />
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <FestivalTable
            festivals={festivals.filter(f => f.tier === 'tier-2')}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteClick}
            onToggleVerified={handleToggleVerified}
            getTierBadgeColor={getTierBadgeColor}
            getStatusBadgeColor={getStatusBadgeColor}
          />
        </TabPanel>

        <TabPanel value={currentTab} index={3}>
          <FestivalTable
            festivals={festivals.filter(f => f.tier === 'specialized' || f.tier === 'regional')}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteClick}
            onToggleVerified={handleToggleVerified}
            getTierBadgeColor={getTierBadgeColor}
            getStatusBadgeColor={getStatusBadgeColor}
          />
        </TabPanel>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Movie sx={{ color: '#D4AF37' }} />
            {editingFestival ? 'Edit Festival' : 'Add New Festival'}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            {/* Basic Info */}
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField
                fullWidth
                label="Festival Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Year"
                type="number"
                value={formData.year || new Date().getFullYear() + 1}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Park City, Utah, USA"
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Festival Dates"
                value={formData.festivalDates || ''}
                onChange={(e) => setFormData({ ...formData, festivalDates: e.target.value })}
                placeholder="e.g., Jan 21-31, 2027"
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>

            {/* Genres */}
            <Grid size={{ xs: 12 }}>
              <Autocomplete
                multiple
                options={genreOptions}
                value={formData.genres || []}
                onChange={(_, newValue) => setFormData({ ...formData, genres: newValue })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Genres Accepted"
                    placeholder="Select genres"
                    sx={{
                      '& .MuiInputLabel-root': { color: '#a0a0a0' },
                      '& .MuiOutlinedInput-root': {
                        color: '#ffffff',
                        '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                        '&:hover fieldset': { borderColor: '#D4AF37' },
                        '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                      },
                    }}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      sx={{ bgcolor: '#D4AF37', color: '#000000' }}
                    />
                  ))
                }
              />
            </Grid>

            {/* Festival Tier & Premiere Req */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#a0a0a0' }}>Festival Tier</InputLabel>
                <Select
                  value={formData.tier || 'regional'}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value as Festival['tier'] })}
                  label="Festival Tier"
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                  }}
                >
                  <MenuItem value="a-list">A-List</MenuItem>
                  <MenuItem value="tier-2">Tier 2</MenuItem>
                  <MenuItem value="regional">Regional</MenuItem>
                  <MenuItem value="specialized">Specialized</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#a0a0a0' }}>Premiere Requirement</InputLabel>
                <Select
                  value={formData.premiereRequirement || 'none'}
                  onChange={(e) => setFormData({ ...formData, premiereRequirement: e.target.value as Festival['premiereRequirement'] })}
                  label="Premiere Requirement"
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                  }}
                >
                  <MenuItem value="world">World Premiere</MenuItem>
                  <MenuItem value="international">International Premiere</MenuItem>
                  <MenuItem value="us">US Premiere</MenuItem>
                  <MenuItem value="regional">Regional Premiere</MenuItem>
                  <MenuItem value="none">No Requirement</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Acceptance Rate (%)"
                type="number"
                value={(formData.acceptanceRate || 0.1) * 100}
                onChange={(e) => setFormData({ ...formData, acceptanceRate: parseFloat(e.target.value) / 100 })}
                inputProps={{ min: 0, max: 100, step: 0.5 }}
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>

            {/* Deadlines */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Submission Deadlines
                </Typography>
                <Button
                  size="small"
                  onClick={addDeadline}
                  sx={{ color: '#D4AF37' }}
                >
                  + Add Deadline
                </Button>
              </Box>
              {(formData.deadlines || []).map((deadline, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: '#a0a0a0' }}>Tier</InputLabel>
                      <Select
                        value={deadline.tier}
                        onChange={(e) => updateDeadline(index, 'tier', e.target.value)}
                        label="Tier"
                        sx={{
                          color: '#ffffff',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                        }}
                      >
                        <MenuItem value="early-bird">Early Bird</MenuItem>
                        <MenuItem value="regular">Regular</MenuItem>
                        <MenuItem value="late">Late</MenuItem>
                        <MenuItem value="extended">Extended</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      label="Deadline Date"
                      value={deadline.date}
                      onChange={(e) => updateDeadline(index, 'date', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        '& .MuiInputLabel-root': { color: '#a0a0a0' },
                        '& .MuiOutlinedInput-root': {
                          color: '#ffffff',
                          '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="Fee"
                      value={deadline.fee}
                      onChange={(e) => updateDeadline(index, 'fee', parseFloat(e.target.value))}
                      sx={{
                        '& .MuiInputLabel-root': { color: '#a0a0a0' },
                        '& .MuiOutlinedInput-root': {
                          color: '#ffffff',
                          '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ color: '#a0a0a0' }}>Currency</InputLabel>
                      <Select
                        value={deadline.currency}
                        onChange={(e) => updateDeadline(index, 'currency', e.target.value)}
                        label="Currency"
                        sx={{
                          color: '#ffffff',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                        }}
                      >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                        <MenuItem value="CAD">CAD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 1 }}>
                    <IconButton
                      onClick={() => removeDeadline(index)}
                      sx={{ color: '#ff6b6b' }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* URLs */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Official Website URL"
                value={formData.websiteUrl || ''}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://www.festival.com"
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="FilmFreeway URL (Optional)"
                value={formData.filmfreewayUrl || ''}
                onChange={(e) => setFormData({ ...formData, filmfreewayUrl: e.target.value })}
                placeholder="https://filmfreeway.com/festival"
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>

            {/* Notes */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes (Optional)"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional information about the festival..."
                sx={{
                  '& .MuiInputLabel-root': { color: '#a0a0a0' },
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: 'rgba(212, 175, 55, 0.2)' },
                    '&:hover fieldset': { borderColor: '#D4AF37' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.verified || false}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#D4AF37' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#D4AF37' },
                    }}
                  />
                }
                label={<Typography sx={{ color: '#ffffff' }}>Mark as Verified</Typography>}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#a0a0a0' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              fontWeight: 600,
              '&:hover': { bgcolor: '#E5C158' },
            }}
          >
            {editingFestival ? 'Save Changes' : 'Add Festival'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>
          Delete Festival
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#ffffff' }}>
            Are you sure you want to delete "{festivalToDelete?.name}"?
          </Typography>
          <Typography variant="body2" sx={{ color: '#a0a0a0', mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: '#a0a0a0' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              bgcolor: '#ff6b6b',
              color: '#ffffff',
              '&:hover': { bgcolor: '#ff5252' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Festival Table Component
function FestivalTable({
  festivals,
  onEdit,
  onDelete,
  onToggleVerified,
  getTierBadgeColor,
  getStatusBadgeColor,
}: {
  festivals: Festival[];
  onEdit: (festival: Festival) => void;
  onDelete: (festival: Festival) => void;
  onToggleVerified: (festivalId: string) => void;
  getTierBadgeColor: (tier: Festival['tier']) => string;
  getStatusBadgeColor: (status: Festival['currentStatus']) => string;
}) {
  if (festivals.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#a0a0a0' }}>
          No festivals found in this category
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Festival</TableCell>
            <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Location</TableCell>
            <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Next Deadline</TableCell>
            <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Tier</TableCell>
            <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Verified</TableCell>
            <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {festivals.map((festival) => (
            <TableRow key={festival.id}>
              <TableCell sx={{ color: '#ffffff' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {festival.name} {festival.year}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                    {festival.festivalDates}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                {festival.location}
              </TableCell>
              <TableCell sx={{ color: '#ffffff' }}>
                {festival.nextDeadline ? (
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {new Date(festival.nextDeadline.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#D4AF37' }}>
                      {festival.daysUntilNextDeadline && `${festival.daysUntilNextDeadline} days`}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="caption" sx={{ color: '#666666' }}>N/A</Typography>
                )}
              </TableCell>
              <TableCell>
                <Chip
                  label={festival.currentStatus.replace('-', ' ')}
                  size="small"
                  sx={{
                    bgcolor: `${getStatusBadgeColor(festival.currentStatus)}20`,
                    color: getStatusBadgeColor(festival.currentStatus),
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={festival.tier}
                  size="small"
                  sx={{
                    bgcolor: `${getTierBadgeColor(festival.tier)}20`,
                    color: getTierBadgeColor(festival.tier),
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={festival.verified}
                  onChange={() => onToggleVerified(festival.id)}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#4caf50' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#4caf50' },
                  }}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(festival)}
                    sx={{ color: '#2196F3' }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(festival)}
                    sx={{ color: '#ff6b6b' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}