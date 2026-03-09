import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Public,
  Speed,
  MonetizationOn,
  Person,
  Assignment,
  Business,
  Assessment,
  CloudDownload,
  Api,
} from '@mui/icons-material';
import { useAuth } from '@/app/contexts/AuthContext';
import { AdminAccessDenied } from './AdminAccessDenied';

export function BusinessMetrics() {
  const { hasAdminPermission } = useAuth();

  if (!hasAdminPermission('canViewBusinessMetrics')) {
    return <AdminAccessDenied requiredPermission="View Business Metrics" requiredRole="Master Admin or Senior Admin" />;
  }

  // Key Business Metrics
  const keyMetrics = [
    {
      label: 'LTV:CAC Ratio',
      value: '4.2:1',
      target: 'Target: 3:1+',
      status: 'excellent',
      icon: <MonetizationOn />,
      color: '#66bb6a',
    },
    {
      label: 'Average LTV',
      value: '$7,840',
      change: '+12% MoM',
      status: 'good',
      icon: <TrendingUp />,
      color: '#D4AF37',
    },
    {
      label: 'CAC',
      value: '$1,867',
      change: '-5% MoM',
      status: 'excellent',
      icon: <Person />,
      color: '#66bb6a',
    },
    {
      label: 'Net Revenue Retention',
      value: '112%',
      change: '+3% MoM',
      status: 'excellent',
      icon: <Speed />,
      color: '#66bb6a',
    },
    {
      label: 'Monthly Churn',
      value: '2.3%',
      change: '-0.5% MoM',
      status: 'good',
      icon: <TrendingUp />,
      color: '#D4AF37',
    },
    {
      label: 'ARR',
      value: '$178,704',
      change: '+8.4% MoM',
      status: 'excellent',
      icon: <MonetizationOn />,
      color: '#66bb6a',
    },
  ];

  // B2B & Enterprise Revenue Streams
  const b2bRevenue = [
    {
      client: 'Screen Scotland',
      clientType: 'Film Commission',
      product: 'Territory Intelligence Report (Annual)',
      mrr: 2500,
      currency: 'GBP',
      contract: 'Annual',
      renewalDate: 'Aug 2026',
      status: 'active',
      includesApiAccess: false,
    },
    {
      client: 'Netflix (UK Productions)',
      clientType: 'Streamer',
      product: 'Production Location API + Quarterly Reports',
      mrr: 8900,
      currency: 'USD',
      contract: '2-Year',
      renewalDate: 'Dec 2027',
      status: 'active',
      includesApiAccess: true,
    },
    {
      client: 'Panavision UK',
      clientType: 'Equipment Rental',
      product: 'Production Activity Insights (Quarterly)',
      mrr: 1200,
      currency: 'GBP',
      contract: 'Quarterly',
      renewalDate: 'Mar 2026',
      status: 'active',
      includesApiAccess: false,
    },
    {
      client: 'Creative BC',
      clientType: 'Film Commission',
      product: 'Competitive Intelligence Dashboard',
      mrr: 3200,
      currency: 'CAD',
      contract: 'Annual',
      renewalDate: 'Jun 2026',
      status: 'active',
      includesApiAccess: true,
    },
    {
      client: 'Warner Bros. Discovery',
      clientType: 'Streamer',
      product: 'Global Incentive Tracking + API',
      mrr: 12500,
      currency: 'USD',
      contract: '3-Year',
      renewalDate: 'Oct 2028',
      status: 'active',
      includesApiAccess: true,
    },
    {
      client: 'Film London',
      clientType: 'Film Commission',
      product: 'London Production Pipeline Report (Monthly)',
      mrr: 1800,
      currency: 'GBP',
      contract: 'Annual',
      renewalDate: 'Feb 2027',
      status: 'active',
      includesApiAccess: false,
    },
    {
      client: 'ARRI Rental',
      clientType: 'Equipment Rental',
      product: 'Market Demand Forecasting',
      mrr: 950,
      currency: 'EUR',
      contract: 'Annual',
      renewalDate: 'May 2026',
      status: 'active',
      includesApiAccess: false,
    },
    {
      client: 'Georgia Film Office',
      clientType: 'Film Commission',
      product: 'Territory Intelligence + Competitor Analysis',
      mrr: 2100,
      currency: 'USD',
      contract: 'Annual',
      renewalDate: 'Nov 2026',
      status: 'active',
      includesApiAccess: false,
    },
    {
      client: 'Amazon Studios (EU)',
      clientType: 'Streamer',
      product: 'Custom Report Builder (Trial)',
      mrr: 0,
      currency: 'USD',
      contract: 'Trial',
      renewalDate: 'Feb 2026',
      status: 'trial',
      includesApiAccess: false,
    },
  ];

  // Calculate B2B MRR totals by currency
  const b2bMrrUsd = b2bRevenue
    .filter(r => r.currency === 'USD' && r.status === 'active')
    .reduce((sum, r) => sum + r.mrr, 0);
  const b2bMrrGbp = b2bRevenue
    .filter(r => r.currency === 'GBP' && r.status === 'active')
    .reduce((sum, r) => sum + r.mrr, 0);
  const b2bMrrCad = b2bRevenue
    .filter(r => r.currency === 'CAD' && r.status === 'active')
    .reduce((sum, r) => sum + r.mrr, 0);
  const b2bMrrEur = b2bRevenue
    .filter(r => r.currency === 'EUR' && r.status === 'active')
    .reduce((sum, r) => sum + r.mrr, 0);

  // B2B Product Analytics
  const b2bProducts = [
    {
      product: 'Territory Intelligence Report',
      clients: 4,
      avgPrice: '$2,400/mo',
      mrr: 9600,
      description: 'Annual market analysis for film commissions',
    },
    {
      product: 'Production API Access',
      clients: 3,
      avgPrice: '$8,200/mo',
      mrr: 24600,
      description: 'Real-time production data API for streamers',
    },
    {
      product: 'Quarterly Market Reports',
      clients: 2,
      avgPrice: '$1,075/mo',
      mrr: 2150,
      description: 'Production activity insights for rental companies',
    },
    {
      product: 'Custom Report Builder',
      clients: 1,
      avgPrice: '$0/mo (Trial)',
      mrr: 0,
      description: 'White-label report generation (in trial)',
    },
  ];

  // API Usage & Data Licensing
  const apiMetrics = [
    { metric: 'Active API Keys', value: '3', clients: 'Netflix, WBD, Creative BC' },
    { metric: 'API Calls (Last 30d)', value: '847,592', trend: '+12% MoM' },
    { metric: 'API Uptime', value: '99.97%', sla: 'SLA: 99.5%' },
    { metric: 'Avg Response Time', value: '142ms', benchmark: 'Target: <200ms' },
  ];

  // Geographic Distribution
  const geographicData = [
    { location: 'United States', users: 89, percentage: 57, revenue: 8543, topStates: ['CA', 'NY', 'FL', 'TX'] },
    { location: 'United Kingdom', users: 28, percentage: 18, revenue: 2678, topStates: ['London', 'Manchester'] },
    { location: 'Canada', users: 24, percentage: 15, revenue: 2289, topStates: ['BC', 'ON', 'QC'] },
    { location: 'Australia', users: 10, percentage: 6, revenue: 956, topStates: ['NSW', 'VIC'] },
    { location: 'Other', users: 5, percentage: 4, revenue: 426, topStates: ['Various'] },
  ];

  // US State Breakdown
  const usStateData = [
    { state: 'California', users: 28, revenue: 2876, cities: ['Los Angeles', 'San Francisco', 'San Diego'] },
    { state: 'New York', users: 19, revenue: 1834, cities: ['New York City', 'Buffalo'] },
    { state: 'Florida', users: 12, revenue: 1156, cities: ['Miami', 'Orlando', 'Tampa'] },
    { state: 'Texas', users: 11, revenue: 1045, cities: ['Austin', 'Dallas', 'Houston'] },
    { state: 'Georgia', users: 8, revenue: 768, cities: ['Atlanta'] },
    { state: 'Other States', users: 11, revenue: 864, cities: ['Various'] },
  ];

  // Customer Acquisition Channels
  const acquisitionChannels = [
    { channel: 'Film Festival Booths', users: 42, cac: 1245, ltv: 9200, roi: '7.4x' },
    { channel: 'Online Ads (Google/Meta)', users: 38, cac: 2134, ltv: 7800, roi: '3.7x' },
    { channel: 'Word of Mouth / Referral', users: 34, cac: 450, ltv: 8900, roi: '19.8x' },
    { channel: 'Industry Publications', users: 22, cac: 3100, ltv: 6500, roi: '2.1x' },
    { channel: 'LinkedIn/Social Media', users: 14, cac: 1890, ltv: 5800, roi: '3.1x' },
    { channel: 'Direct/Organic', users: 6, cac: 120, ltv: 7200, roi: '60.0x' },
  ];

  // Professional Profile Breakdown
  const professionalProfiles = [
    { role: 'Independent Producer', count: 64, avgLTV: 6200, preferredPlan: 'Pro Monthly' },
    { role: 'Studio Executive', count: 28, avgLTV: 11400, preferredPlan: 'Studio' },
    { role: 'Line Producer', count: 22, avgLTV: 7800, preferredPlan: 'Producer Annual' },
    { role: 'Production Manager', count: 18, avgLTV: 5900, preferredPlan: 'Pro Monthly' },
    { role: 'Director', count: 14, avgLTV: 4800, preferredPlan: 'Pro Monthly' },
    { role: 'Other', count: 10, avgLTV: 5200, preferredPlan: 'Pro Monthly' },
  ];

  // Engagement & Conversion Metrics
  const engagementMetrics = [
    { metric: 'Free-to-Paid Conversion', value: '16.8%', benchmark: 'Industry avg: 10-15%', status: 'excellent' },
    { metric: 'Avg. Time to Convert', value: '38 days', benchmark: 'Industry avg: 45-60 days', status: 'excellent' },
    { metric: 'Activation Rate', value: '84%', benchmark: '% who generate 1st report', status: 'excellent' },
    { metric: 'Avg. Session Duration', value: '12.4 min', benchmark: 'Time per visit', status: 'good' },
    { metric: 'Net Promoter Score', value: '67', benchmark: 'Industry avg: 30-50', status: 'excellent' },
    { metric: 'Product-Led Growth Score', value: '8.2/10', benchmark: 'PLG efficiency', status: 'excellent' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 1 }}>
          Business Metrics Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
          Key business health indicators, geographic distribution, and growth metrics
        </Typography>
      </Box>

      {/* B2B MRR Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(66, 165, 245, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ color: '#42a5f5' }}><Business /></Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  ${b2bMrrUsd.toLocaleString()} USD
                </Typography>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  B2B MRR (USD)
                </Typography>
                <Typography variant="caption" sx={{ color: '#42a5f5', fontWeight: 600 }}>
                  3 active clients
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(66, 165, 245, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ color: '#42a5f5' }}><Business /></Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  £{b2bMrrGbp.toLocaleString()} GBP
                </Typography>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  B2B MRR (GBP)
                </Typography>
                <Typography variant="caption" sx={{ color: '#42a5f5', fontWeight: 600 }}>
                  3 active clients
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(66, 165, 245, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ color: '#42a5f5' }}><Business /></Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  ${b2bMrrCad.toLocaleString()} CAD
                </Typography>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  B2B MRR (CAD)
                </Typography>
                <Typography variant="caption" sx={{ color: '#42a5f5', fontWeight: 600 }}>
                  1 active client
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(66, 165, 245, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ color: '#42a5f5' }}><Business /></Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  €{b2bMrrEur.toLocaleString()} EUR
                </Typography>
                <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                  B2B MRR (EUR)
                </Typography>
                <Typography variant="caption" sx={{ color: '#42a5f5', fontWeight: 600 }}>
                  1 active client
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* B2B & Enterprise Revenue Streams */}
      <Card sx={{ mb: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Business sx={{ color: '#D4AF37', fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
              B2B & Enterprise Revenue Streams
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Client Type</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Product</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>MRR</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Currency</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Contract</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Renewal Date</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>API Access</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {b2bRevenue.map((row, index) => (
                  <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>{row.client}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.clientType}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.product}</TableCell>
                    <TableCell sx={{ color: '#66bb6a', fontWeight: 600 }}>
                      ${row.mrr.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.currency}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.contract}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.renewalDate}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.status}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.includesApiAccess ? 'Yes' : 'No'}
                        size="small"
                        sx={{
                          bgcolor: row.includesApiAccess ? 'rgba(102, 187, 106, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                          color: row.includesApiAccess ? '#66bb6a' : '#D4AF37',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* B2B Product Analytics */}
      <Card sx={{ mb: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Assessment sx={{ color: '#D4AF37', fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
              B2B Product Analytics
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Product</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Clients</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Avg Price</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>MRR</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {b2bProducts.map((row, index) => (
                  <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>{row.product}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.clients}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.avgPrice}</TableCell>
                    <TableCell sx={{ color: '#66bb6a', fontWeight: 600 }}>
                      ${row.mrr.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                      {row.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* API Usage & Data Licensing */}
      <Card sx={{ mb: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Api sx={{ color: '#D4AF37', fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
              API Usage & Data Licensing
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Metric</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Value</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Trend/SLA/Benchmark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiMetrics.map((row, index) => (
                  <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>{row.metric}</TableCell>
                    <TableCell sx={{ color: '#66bb6a', fontWeight: 600 }}>
                      {row.value}
                    </TableCell>
                    <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                      {row.trend || row.sla || row.benchmark}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Key Business Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {keyMetrics.map((metric, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
            <Card
              sx={{
                bgcolor: '#0a0a0a',
                border: `1px solid ${metric.color}40`,
                '&:hover': {
                  borderColor: metric.color,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ color: metric.color }}>{metric.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                    {metric.label}
                  </Typography>
                  {metric.change && (
                    <Typography variant="caption" sx={{ color: metric.color, fontWeight: 600 }}>
                      {metric.change}
                    </Typography>
                  )}
                  {metric.target && (
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {metric.target}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Geographic Distribution */}
      <Card sx={{ mb: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Public sx={{ color: '#D4AF37', fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
              Geographic Distribution (Paid Users)
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Country</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Paid Users</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>% of Total</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Monthly Revenue</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Top Regions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {geographicData.map((row, index) => (
                  <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>{row.location}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.users}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flex: 1, maxWidth: 100 }}>
                          <Box
                            sx={{
                              height: 8,
                              bgcolor: '#D4AF37',
                              borderRadius: 1,
                              width: `${row.percentage}%`,
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                          {row.percentage}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#66bb6a', fontWeight: 600 }}>
                      ${row.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {row.topStates.map((state, idx) => (
                          <Chip
                            key={idx}
                            label={state}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(212, 175, 55, 0.1)',
                              color: '#D4AF37',
                              fontSize: '0.75rem',
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* US State Breakdown */}
      <Card sx={{ mb: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 3 }}>
            United States - State Breakdown
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>State</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Paid Users</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Monthly Revenue</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>ARPU</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Top Cities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usStateData.map((row, index) => (
                  <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>{row.state}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{row.users}</TableCell>
                    <TableCell sx={{ color: '#66bb6a', fontWeight: 600 }}>
                      ${row.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: '#42a5f5' }}>
                      ${Math.round(row.revenue / row.users)}
                    </TableCell>
                    <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                      {row.cities.join(', ')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Customer Acquisition Channels */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Assignment sx={{ color: '#D4AF37', fontSize: 28 }} />
              <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                Customer Acquisition Channels
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>Channel</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>Users</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>CAC</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>LTV</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>ROI</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {acquisitionChannels.map((row, index) => (
                    <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                      <TableCell sx={{ color: '#ffffff', fontSize: '0.875rem' }}>{row.channel}</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontSize: '0.875rem' }}>{row.users}</TableCell>
                      <TableCell sx={{ color: '#ffa726', fontSize: '0.875rem' }}>${row.cac}</TableCell>
                      <TableCell sx={{ color: '#66bb6a', fontSize: '0.875rem' }}>${row.ltv.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.roi}
                          size="small"
                          sx={{
                            bgcolor: parseFloat(row.roi) > 5 ? 'rgba(102, 187, 106, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                            color: parseFloat(row.roi) > 5 ? '#66bb6a' : '#D4AF37',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Professional Profile Breakdown */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Person sx={{ color: '#D4AF37', fontSize: 28 }} />
              <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                Professional Profile Breakdown
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>Role</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>Count</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>Avg LTV</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.75rem' }}>Preferred Plan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {professionalProfiles.map((row, index) => (
                    <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                      <TableCell sx={{ color: '#ffffff', fontSize: '0.875rem' }}>{row.role}</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontSize: '0.875rem' }}>{row.count}</TableCell>
                      <TableCell sx={{ color: '#66bb6a', fontSize: '0.875rem', fontWeight: 600 }}>
                        ${row.avgLTV.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.preferredPlan}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(66, 165, 245, 0.2)',
                            color: '#42a5f5',
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Engagement & Conversion Metrics */}
      <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Speed sx={{ color: '#D4AF37', fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
              Engagement & Conversion Metrics
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {engagementMetrics.map((metric, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: metric.status === 'excellent' ? 'rgba(102, 187, 106, 0.05)' : 'rgba(212, 175, 55, 0.05)',
                    borderRadius: 2,
                    border: `1px solid ${metric.status === 'excellent' ? '#66bb6a' : '#D4AF37'}40`,
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
                    {metric.metric}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                    {metric.benchmark}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}