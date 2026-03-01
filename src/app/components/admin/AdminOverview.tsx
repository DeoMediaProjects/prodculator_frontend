import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  People,
  Assessment,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';
import { adminApi } from '@/services/admin.api';
import type { AdminMetrics } from '@/services/admin.types';

export function AdminOverview() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    (async () => {
      const { data, error } = await adminApi.getMetrics();
      if (error) {
        setMetricsError(error);
      } else {
        setMetrics(data);
      }
      setMetricsLoading(false);
    })();
  }, []);

  const recentActivity = [
    { time: '5 mins ago', action: 'New script analysis completed', user: 'user@example.com' },
    { time: '12 mins ago', action: 'Studio Plan subscription activated', user: 'studio@example.com' },
    { time: '1 hour ago', action: 'B2B client inquiry submitted', user: 'filmcommission@example.com' },
    { time: '2 hours ago', action: 'Free report generated', user: 'producer@example.com' },
    { time: '3 hours ago', action: 'Report downloaded (PDF)', user: 'director@example.com' },
  ];

  const systemStatus = [
    { name: 'OpenAI API', status: 'operational', lastCheck: '2 mins ago' },
    { name: 'Primary Database', status: 'operational', lastCheck: '2 mins ago' },
    { name: 'Stripe Payment Processing', status: 'operational', lastCheck: '5 mins ago' },
    { name: 'SendGrid Email Delivery', status: 'operational', lastCheck: '10 mins ago' },
    { name: 'PDF Generation Service', status: 'degraded', lastCheck: '15 mins ago' },
  ];

  const upcomingTasks = [
    { task: 'Update UK tax incentive rates', priority: 'high', due: 'Today' },
    { task: 'Review B2B client proposals', priority: 'high', due: 'Tomorrow' },
    { task: 'Verify Canadian crew costs', priority: 'medium', due: 'This week' },
    { task: 'Sync festival database', priority: 'low', due: 'Next week' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 3 }}>
        Admin Dashboard Overview
      </Typography>

      {/* Key Metrics */}
      {metricsError && (
        <Alert severity="error" sx={{ mb: 3 }}>{metricsError}</Alert>
      )}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Total Users</Typography>
                <People sx={{ color: '#D4AF37' }} />
              </Box>
              {metricsLoading ? (
                <CircularProgress size={28} sx={{ color: '#D4AF37' }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#D4AF37' }}>
                  {metrics ? metrics.total_users.toLocaleString() : '—'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Active Subscriptions</Typography>
                <CheckCircle sx={{ color: '#66bb6a' }} />
              </Box>
              {metricsLoading ? (
                <CircularProgress size={28} sx={{ color: '#D4AF37' }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#D4AF37' }}>
                  {metrics ? metrics.active_subscriptions.toLocaleString() : '—'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Monthly Revenue (USD)</Typography>
                <AttachMoney sx={{ color: '#D4AF37' }} />
              </Box>
              {metricsLoading ? (
                <CircularProgress size={28} sx={{ color: '#D4AF37' }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#D4AF37' }}>
                  {metrics ? `$${metrics.mrr_usd.toLocaleString()}` : '—'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Total Reports</Typography>
                <Assessment sx={{ color: '#D4AF37' }} />
              </Box>
              {metricsLoading ? (
                <CircularProgress size={28} sx={{ color: '#D4AF37' }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#D4AF37' }}>
                  {metrics ? metrics.total_reports.toLocaleString() : '—'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Reports This Month</Typography>
                <TrendingUp sx={{ color: '#D4AF37' }} />
              </Box>
              {metricsLoading ? (
                <CircularProgress size={28} sx={{ color: '#D4AF37' }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#D4AF37' }}>
                  {metrics ? metrics.reports_this_month.toLocaleString() : '—'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Conversion Rate</Typography>
                <CheckCircle sx={{ color: '#66bb6a' }} />
              </Box>
              {metricsLoading ? (
                <CircularProgress size={28} sx={{ color: '#D4AF37' }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#D4AF37' }}>
                  {metrics ? `${metrics.conversion_rate_percent.toFixed(1)}%` : '—'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#D4AF37', mb: 2 }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <Box key={index}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText
                        primary={activity.action}
                        secondary={
                          <>
                            <Typography component="span" variant="caption" sx={{ color: '#a0a0a0' }}>
                              {activity.time} • {activity.user}
                            </Typography>
                          </>
                        }
                        primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }} />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#D4AF37', mb: 2 }}>
                System Status
              </Typography>
              <List>
                {systemStatus.map((service, index) => (
                  <Box key={index}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>
                              {service.name}
                            </Typography>
                            <Chip
                              label={service.status}
                              size="small"
                              icon={
                                service.status === 'operational' ? <CheckCircle /> : 
                                service.status === 'degraded' ? <Warning /> : 
                                <Info />
                              }
                              sx={{
                                bgcolor: 
                                  service.status === 'operational' ? 'rgba(102, 187, 106, 0.2)' :
                                  service.status === 'degraded' ? 'rgba(255, 152, 0, 0.2)' :
                                  'rgba(244, 67, 54, 0.2)',
                                color:
                                  service.status === 'operational' ? '#66bb6a' :
                                  service.status === 'degraded' ? '#ffa726' :
                                  '#f44336',
                                fontSize: '0.75rem',
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                            Last checked: {service.lastCheck}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < systemStatus.length - 1 && <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }} />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#D4AF37', mb: 2 }}>
                Upcoming Data Maintenance Tasks
              </Typography>
              <List>
                {upcomingTasks.map((item, index) => (
                  <Box key={index}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>
                              {item.task}
                            </Typography>
                            <Chip
                              label={item.priority}
                              size="small"
                              sx={{
                                bgcolor:
                                  item.priority === 'high' ? 'rgba(244, 67, 54, 0.2)' :
                                  item.priority === 'medium' ? 'rgba(255, 152, 0, 0.2)' :
                                  'rgba(66, 165, 245, 0.2)',
                                color:
                                  item.priority === 'high' ? '#f44336' :
                                  item.priority === 'medium' ? '#ffa726' :
                                  '#42a5f5',
                                fontSize: '0.75rem',
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                            Due: {item.due}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < upcomingTasks.length - 1 && <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }} />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}