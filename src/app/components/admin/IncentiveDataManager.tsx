import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  IconButton,
  Collapse,
  Link,
  CircularProgress,
} from '@mui/material';
import {
  Edit,
  Add,
  Sync,
  Schedule,
  CheckCircle,
  Warning,
  ExpandMore,
  ExpandLess,
  OpenInNew,
  Refresh,
} from '@mui/icons-material';
import { adminApi } from '@/services/admin.api';
import type { IncentiveData, PendingChange } from '@/services/admin.types';

export function IncentiveDataManager(_props?: any) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showPendingChanges, setShowPendingChanges] = useState(false);

  const [incentives, setIncentives] = useState<IncentiveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [editingIncentive, setEditingIncentive] = useState<IncentiveData | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<IncentiveData>>({});

  useEffect(() => {
    (async () => {
      const { data, error } = await adminApi.getIncentives();
      if (error) {
        setFetchError(error);
      } else {
        setIncentives(data?.items ?? []);
      }
      setLoading(false);
    })();
  }, []);

  // Mock pending changes detected by AI
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([
    {
      territory: 'Georgia (USA)',
      field: 'Rate',
      currentValue: '30%',
      detectedValue: '30% + 10% bonus for Georgia promotional logo',
      confidence: 'high',
      source: 'georgia.org - Detected Jan 20, 2026',
    },
  ]);

  const handleAutoSync = async () => {
    setSyncing(true);
    // Simulate AI-powered web scraping
    setTimeout(() => {
      setSyncing(false);
      setSyncDialogOpen(false);
      // Show success message or detected changes
    }, 3000);
  };

  const handleApproveChange = (change: PendingChange) => {
    // Update incentive with detected value
    setPendingChanges(pendingChanges.filter(c => c !== change));
  };

  const handleRejectChange = (change: PendingChange) => {
    setPendingChanges(pendingChanges.filter(c => c !== change));
  };

  const handleSaveIncentive = async () => {
    if (editingIncentive?.id) {
      const { data, error } = await adminApi.updateIncentive(
        editingIncentive.id,
        { ...editingIncentive, ...editFormData } as IncentiveData,
      );
      if (!error && data) {
        setIncentives(incentives.map(i => i.id === editingIncentive.id ? data : i));
      }
    } else {
      const { data, error } = await adminApi.createIncentive(editFormData as IncentiveData);
      if (!error && data) {
        setIncentives([...incentives, data]);
      }
    }
    setEditDialogOpen(false);
    setEditingIncentive(null);
    setEditFormData({});
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 1 }}>
            Incentive Data Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
            Manage tax incentive data with AI-powered quarterly auto-sync from official sources
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Schedule />}
            onClick={() => setSyncDialogOpen(true)}
            sx={{
              borderColor: '#D4AF37',
              color: '#D4AF37',
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
            onClick={() => setEditDialogOpen(true)}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#E5C158',
              },
            }}
          >
            Add Territory
          </Button>
        </Box>
      </Box>

      {fetchError && (
        <Alert severity="error" sx={{ mb: 3 }}>{fetchError}</Alert>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#D4AF37' }} />
        </Box>
      )}

      {/* Auto-Sync Status Card */}
      <Card sx={{ mb: 3, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Sync sx={{ color: '#D4AF37', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  AI-Powered Auto-Sync Status
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  Next scheduled check: <strong>April 1, 2026</strong> (Quarterly)
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={syncing ? <Refresh className="spin" /> : <Refresh />}
              onClick={handleAutoSync}
              disabled={syncing}
              sx={{
                bgcolor: '#D4AF37',
                color: '#000000',
                '&:hover': { bgcolor: '#E5C158' },
              }}
            >
              {syncing ? 'Syncing...' : 'Run Sync Now'}
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(46, 125, 50, 0.1)', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: '#66bb6a', fontWeight: 700 }}>
                  30
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  Territories Auto-Syncing
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255, 152, 0, 0.1)', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: '#ffa726', fontWeight: 700 }}>
                  {pendingChanges.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  Pending Changes
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(212, 175, 55, 0.1)', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 700 }}>
                  23
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  Days Since Last Check
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* South Africa Payment Issues Warning */}
      <Alert
        severity="error"
        icon={<Warning />}
        sx={{
          mb: 3,
          bgcolor: 'rgba(244, 67, 54, 0.1)',
          border: '2px solid rgba(244, 67, 54, 0.4)',
          color: '#ffffff',
          '& .MuiAlert-icon': {
            color: '#f44336',
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          South Africa Incentive - Active with Payment Issues
        </Typography>
        <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
          The South African Foreign Film & TV Production Incentive (20-35%) is <strong>legally active and available</strong>, however, 
          there are <strong>documented delays and issues with rebate payments</strong> to international productions. 
        </Typography>
        <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
          <strong>Recommendation:</strong> While South Africa remains excellent for assessment purposes (low crew costs, strong infrastructure, favorable currency), 
          producers should exercise extreme caution regarding rebate reliance. Consider structuring deals with contingency plans 
          or verifying current payout status with recent productions before committing to South African incentive programs.
        </Typography>
      </Alert>

      {/* Pending Changes Alert */}
      {pendingChanges.length > 0 && (
        <Alert
          severity="warning"
          sx={{
            mb: 3,
            bgcolor: 'rgba(255, 152, 0, 0.1)',
            color: '#ffa726',
            border: '1px solid rgba(255, 152, 0, 0.3)',
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setShowPendingChanges(!showPendingChanges)}
              endIcon={showPendingChanges ? <ExpandLess /> : <ExpandMore />}
            >
              {showPendingChanges ? 'Hide' : 'Review'}
            </Button>
          }
        >
          <strong>{pendingChanges.length} change(s) detected</strong> by AI auto-sync and awaiting your review
        </Alert>
      )}

      {/* Pending Changes Section */}
      <Collapse in={showPendingChanges}>
        <Paper sx={{ mb: 3, bgcolor: '#0a0a0a', border: '1px solid rgba(255, 152, 0, 0.3)' }}>
          <Box sx={{ p: 2, bgcolor: 'rgba(255, 152, 0, 0.05)' }}>
            <Typography variant="h6" sx={{ color: '#ffa726', fontWeight: 600 }}>
              Pending Changes for Review
            </Typography>
          </Box>
          {pendingChanges.map((change, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                borderBottom: index < pendingChanges.length - 1 ? '1px solid rgba(255, 152, 0, 0.1)' : 'none',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
                    {change.territory} - {change.field}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Typography variant="caption" sx={{ color: '#a0a0a0', display: 'block', mb: 0.5 }}>
                        Current Value:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 600 }}>
                        {change.currentValue}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ color: '#666' }}>→</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Typography variant="caption" sx={{ color: '#a0a0a0', display: 'block', mb: 0.5 }}>
                        Detected Value:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#66bb6a', fontWeight: 600 }}>
                        {change.detectedValue}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Chip
                      label={`${change.confidence.toUpperCase()} CONFIDENCE`}
                      size="small"
                      sx={{
                        bgcolor: change.confidence === 'high' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                        color: change.confidence === 'high' ? '#66bb6a' : '#ffa726',
                        fontWeight: 600,
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                      {change.source}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CheckCircle />}
                    onClick={() => handleApproveChange(change)}
                    sx={{
                      bgcolor: '#66bb6a',
                      color: '#000000',
                      '&:hover': { bgcolor: '#4caf50' },
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRejectChange(change)}
                    sx={{
                      borderColor: '#666',
                      color: '#a0a0a0',
                      '&:hover': {
                        borderColor: '#999',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Paper>
      </Collapse>

      {/* Incentives Table */}
      <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Territory</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Program</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Rate</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Cap</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Last Updated</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Auto-Sync</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Source</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incentives.flatMap((incentive, index) => {
                // Check if we need a country divider
                const showDivider = index > 0 && (() => {
                  const currentCountry = 
                    incentive.territory.includes('(UK)') || incentive.territory === 'United Kingdom (National)' || 
                    incentive.territory === 'England' || incentive.territory === 'Scotland' || 
                    incentive.territory === 'Wales' || incentive.territory === 'Northern Ireland' ? 'UK' :
                    incentive.territory.includes('(USA)') ? 'USA' :
                    incentive.territory.includes('(SA)') || incentive.territory === 'South Africa (National)' ? 'South Africa' :
                    incentive.territory === 'Malta' ? 'Malta' :
                    ['British Columbia', 'Ontario', 'Quebec', 'Alberta', 'Manitoba', 'Nova Scotia'].includes(incentive.territory) ? 'Canada' : '';
                  
                  const previousIncentive = incentives[index - 1];
                  const previousCountry = 
                    previousIncentive.territory.includes('(UK)') || previousIncentive.territory === 'United Kingdom (National)' || 
                    previousIncentive.territory === 'England' || previousIncentive.territory === 'Scotland' || 
                    previousIncentive.territory === 'Wales' || previousIncentive.territory === 'Northern Ireland' ? 'UK' :
                    previousIncentive.territory.includes('(USA)') ? 'USA' :
                    previousIncentive.territory.includes('(SA)') || previousIncentive.territory === 'South Africa (National)' ? 'South Africa' :
                    previousIncentive.territory === 'Malta' ? 'Malta' :
                    ['British Columbia', 'Ontario', 'Quebec', 'Alberta', 'Manitoba', 'Nova Scotia'].includes(previousIncentive.territory) ? 'Canada' : '';
                  
                  return currentCountry !== previousCountry;
                })();

                const country = 
                  incentive.territory.includes('(UK)') || incentive.territory === 'United Kingdom (National)' || 
                  incentive.territory === 'England' || incentive.territory === 'Scotland' || 
                  incentive.territory === 'Wales' || incentive.territory === 'Northern Ireland' ? '🇬🇧 United Kingdom' :
                  incentive.territory.includes('(USA)') ? '🇺🇸 United States' :
                  incentive.territory.includes('(SA)') || incentive.territory === 'South Africa (National)' ? '🇿🇦 South Africa' :
                  incentive.territory === 'Malta' ? '🇲🇹 Malta' :
                  ['British Columbia', 'Ontario', 'Quebec', 'Alberta', 'Manitoba', 'Nova Scotia'].includes(incentive.territory) ? '🇨🇦 Canada' : '';

                const rows = [];
                
                if (showDivider) {
                  rows.push(
                    <TableRow key={`divider-${incentive.territory}-${index}`}>
                      <TableCell
                        colSpan={9}
                        sx={{
                          bgcolor: 'rgba(212, 175, 55, 0.15)',
                          borderTop: '2px solid rgba(212, 175, 55, 0.4)',
                          borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
                          py: 1.5,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: '#D4AF37',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                          }}
                        >
                          {country}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
                
                rows.push(
                  <TableRow key={`${incentive.territory}-${incentive.program}-${index}`} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                    <TableCell sx={{ color: '#ffffff' }}>{incentive.territory}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{incentive.program}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{incentive.rate}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{incentive.cap}</TableCell>
                    <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>{incentive.lastUpdated}</TableCell>
                    <TableCell>
                      {incentive.autoSyncEnabled ? (
                        <Box>
                          <Chip
                            icon={<CheckCircle sx={{ fontSize: 14 }} />}
                            label="Enabled"
                            size="small"
                            sx={{
                              bgcolor: 'rgba(46, 125, 50, 0.2)',
                              color: '#66bb6a',
                              fontWeight: 600,
                            }}
                          />
                          {incentive.lastAutoCheck && (
                            <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                              Last: {incentive.lastAutoCheck}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Chip
                          label="Disabled"
                          size="small"
                          sx={{
                            bgcolor: 'rgba(117, 117, 117, 0.2)',
                            color: '#9e9e9e',
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={incentive.sourceUrl}
                        target="_blank"
                        rel="noopener"
                        sx={{
                          color: '#D4AF37',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          fontSize: '0.875rem',
                          '&:hover': { color: '#E5C158' },
                        }}
                      >
                        Official Source
                        <OpenInNew sx={{ fontSize: 14 }} />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={incentive.status}
                        size="small"
                        sx={{
                          bgcolor: incentive.status === 'Active' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                          color: incentive.status === 'Active' ? '#66bb6a' : '#ffa726',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingIncentive(incentive);
                          setEditFormData(incentive);
                          setEditDialogOpen(true);
                        }}
                      >
                        <Edit sx={{ color: '#D4AF37', fontSize: 18 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
                
                return rows;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Auto-Sync Settings Dialog */}
      <Dialog
        open={syncDialogOpen}
        onClose={() => setSyncDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#D4AF37', fontWeight: 600 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule />
            Auto-Sync Configuration
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3, bgcolor: 'rgba(33, 150, 243, 0.1)', color: '#42a5f5' }}>
            <strong>How it works:</strong> Our AI agent reads official government websites and PDFs quarterly,
            extracts tax incentive data, and flags changes for your review before auto-applying.
          </Alert>

          <Typography variant="subtitle1" sx={{ color: '#D4AF37', fontWeight: 600, mb: 2 }}>
            Monitored Official Sources:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {incentives.filter(i => i.autoSyncEnabled).map((incentive, index) => (
              <Card key={index} sx={{ bgcolor: '#1a1a1a', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
                    {incentive.territory}
                  </Typography>
                  <Link
                    href={incentive.sourceUrl}
                    target="_blank"
                    sx={{
                      color: '#D4AF37',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      textDecoration: 'none',
                      '&:hover': { color: '#E5C158' },
                    }}
                  >
                    {incentive.sourceUrl}
                    <OpenInNew sx={{ fontSize: 12 }} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#a0a0a0', mb: 1 }}>
              Sync Schedule:
            </Typography>
            <TextField
              select
              fullWidth
              defaultValue="quarterly"
              SelectProps={{ native: true }}
            >
              <option value="monthly">Monthly (1st of each month)</option>
              <option value="quarterly">Quarterly (Jan, Apr, Jul, Oct)</option>
              <option value="semiannual">Semi-Annual (Jan, Jul)</option>
              <option value="annual">Annual (January)</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setSyncDialogOpen(false)} sx={{ color: '#a0a0a0' }}>
            Close
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              '&:hover': { bgcolor: '#E5C158' },
            }}
          >
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setEditingIncentive(null);
          setEditFormData({});
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0a0a0a',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#D4AF37', fontWeight: 600 }}>
          {editingIncentive ? 'Edit Incentive Data' : 'Add Territory'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Territory"
              fullWidth
              value={editFormData.territory || ''}
              onChange={(e) => setEditFormData({ ...editFormData, territory: e.target.value })}
            />
            <TextField
              label="Program Name"
              fullWidth
              value={editFormData.program || ''}
              onChange={(e) => setEditFormData({ ...editFormData, program: e.target.value })}
            />
            <TextField
              label="Rate"
              fullWidth
              value={editFormData.rate || ''}
              onChange={(e) => setEditFormData({ ...editFormData, rate: e.target.value })}
            />
            <TextField
              label="Cap"
              fullWidth
              value={editFormData.cap || ''}
              onChange={(e) => setEditFormData({ ...editFormData, cap: e.target.value })}
            />
            <TextField
              label="Source URL"
              fullWidth
              value={editFormData.sourceUrl || ''}
              onChange={(e) => setEditFormData({ ...editFormData, sourceUrl: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => {
              setEditDialogOpen(false);
              setEditingIncentive(null);
              setEditFormData({});
            }}
            sx={{ color: '#a0a0a0' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveIncentive}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000000',
              '&:hover': { bgcolor: '#E5C158' },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {syncing && (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
          <LinearProgress
            sx={{
              bgcolor: 'rgba(212, 175, 55, 0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#D4AF37',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}