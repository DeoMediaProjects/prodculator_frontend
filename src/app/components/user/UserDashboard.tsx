import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Alert,
  LinearProgress,
  Divider,
  Grid,
} from '@mui/material';

import {
  Download,
  Settings,
  Help,
  FileDownload,
  Visibility,
  Delete,
  Lock,
  Notifications,
  Movie,
  Home,
  Compare,
  Calculate,
  Timeline,
  Visibility as VisibilityIcon,
  BarChart,
  CreditCard,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { useAuth } from '@/app/contexts/AuthContext';
import { apiClient } from '@/services/api';
import { WhatIfCalculator } from '@/app/components/user/WhatIfCalculator';

interface ReportSummary {
  id: string;
  title: string;
  createdAt: string;
  topTerritory: string;
}

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div role="tabpanel" hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>;
}

export function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await apiClient.get<any[]>('/api/reports', { auth: true });
        const mapped: ReportSummary[] = data.map((report) => ({
          id: report.id,
          title: report.script_title || 'Untitled',
          createdAt: report.created_at,
          topTerritory:
            report.report_data?.executiveSummary?.recommendedTerritories?.[0] ||
            report.report_data?.topRecommendation ||
            'N/A',
        }));
        setReports(mapped);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#000000' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#0a0a0a', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', py: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#D4AF37', color: '#000', fontWeight: 700 }}>
                {user?.email?.substring(0, 2).toUpperCase() || 'U'}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 0.5 }}>Producer Dashboard</Typography>
                <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 1 }}>{user?.email}</Typography>
                <Chip label={user?.plan?.toUpperCase() || 'FREE'} size="small" sx={{ bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37', fontWeight: 600 }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button startIcon={<Home />} onClick={() => navigate('/')} sx={{ color: '#a0a0a0' }}>Back to Home</Button>
              <Button variant="contained" startIcon={<Movie />} onClick={() => navigate('/upload')} sx={{ bgcolor: '#D4AF37', color: '#000', fontWeight: 600 }}>New Analysis</Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, mt: 4 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}><BarChart sx={{ color: '#D4AF37' }} /><Typography variant="h6">Reports Generated</Typography></Box>
                <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 700 }}>{reports.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}><CreditCard sx={{ color: '#D4AF37' }} /><Typography variant="h6">Credits Remaining</Typography></Box>
                <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 700 }}>{user?.reportsLimit || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}><VisibilityIcon sx={{ color: '#D4AF37' }} /><Typography variant="h6">Active Projects</Typography></Box>
                <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 700 }}>{reports.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: 'rgba(212, 175, 55, 0.2)' }}>
          <Tabs value={currentTab} onChange={handleTabChange} sx={{ '& .MuiTab-root': { color: '#a0a0a0' }, '& .Mui-selected': { color: '#D4AF37 !important' }, '& .MuiTabs-indicator': { bgcolor: '#D4AF37' } }}>
            <Tab icon={<Download />} iconPosition="start" label="My Analysis Reports" />
            <Tab icon={<Compare />} iconPosition="start" label="Territory Comparison" />
            <Tab icon={<Calculate />} iconPosition="start" label="What-If Calculator" />
            <Tab icon={<Timeline />} iconPosition="start" label="Timeline" />
            <Tab icon={<Settings />} iconPosition="start" label="Account" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          {loading ? <LinearProgress sx={{ mt: 2, bgcolor: 'rgba(212, 175, 55, 0.2)', '& .MuiLinearProgress-bar': { bgcolor: '#D4AF37' } }} /> : (
            <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)', mt: 2 }}>
              {reports.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 2 }}>No reports found. Start by uploading a script.</Typography>
                  <Button variant="outlined" onClick={() => navigate('/upload')}>Upload First Script</Button>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#D4AF37' }}>Project Title</TableCell>
                        <TableCell sx={{ color: '#D4AF37' }}>Generated On</TableCell>
                        <TableCell sx={{ color: '#D4AF37' }}>Top Recommendation</TableCell>
                        <TableCell sx={{ color: '#D4AF37' }}>Status</TableCell>
                        <TableCell sx={{ color: '#D4AF37' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reports.map((report) => (
                        <TableRow key={report.id} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                          <TableCell sx={{ color: '#fff', fontWeight: 600 }}>{report.title}</TableCell>
                          <TableCell sx={{ color: '#a0a0a0' }}>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell><Chip label={report.topTerritory} size="small" sx={{ bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }} /></TableCell>
                          <TableCell><Chip label="Active" size="small" color="success" variant="outlined" /></TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton size="small" sx={{ color: '#D4AF37' }} onClick={() => navigate(`/report/${report.id}`)}><Visibility fontSize="small" /></IconButton>
                              <IconButton size="small" sx={{ color: '#D4AF37' }}><FileDownload fontSize="small" /></IconButton>
                              <IconButton size="small" sx={{ color: '#666' }}><Delete fontSize="small" /></IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          )}
        </TabPanel>

        <TabPanel value={currentTab} index={1}><Typography sx={{ color: '#a0a0a0', p: 4 }}>Compare different territories side-by-side. (Coming Soon)</Typography></TabPanel>
        <TabPanel value={currentTab} index={2}><WhatIfCalculator /></TabPanel>
        <TabPanel value={currentTab} index={3}><Typography sx={{ color: '#a0a0a0', p: 4 }}>Track your production timeline and milestones. (Coming Soon)</Typography></TabPanel>
        <TabPanel value={currentTab} index={4}>
          <Paper sx={{ p: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)', mt: 2 }}>
            <Typography variant="h6" sx={{ color: '#D4AF37', mb: 3 }}>Account Settings</Typography>
            <Divider sx={{ mb: 3, borderColor: '#222' }} />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>Email Address</Typography>
                <Typography variant="body1" sx={{ color: '#fff' }}>{user?.email}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>Active Subscription</Typography>
                <Typography variant="body1" sx={{ color: '#fff' }}>{user?.plan?.toUpperCase() || 'FREE'}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </Box>
    </Box>
  );
}
