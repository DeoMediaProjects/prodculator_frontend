import { useState } from 'react';
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
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  Description,
  AttachMoney,
  People,
  Search,
  Visibility,
  Block,
  CheckCircle,
  Star,
  CreditCard,
  Download,
} from '@mui/icons-material';
import { useGeoCurrency } from '@/app/hooks/useGeoCurrency';

interface PaidUser {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'Pro Monthly' | 'Producer Annual' | 'Studio';
  status: 'Active' | 'Canceled' | 'Past Due';
  reportsThisMonth: number;
  reportLimit: number;
  monthlySpend: number;
  paymentCurrency: 'USD' | 'GBP'; // Track what currency they actually pay in
  joinDate: string;
  lastActive: string;
  totalReportsGenerated: number;
  paymentMethod: string;
  // Geographic Data
  country: string;
  state: string;
  city?: string;
  // Professional Profile
  role: string;
  companySize: string;
  industrySegment: string;
  yearsInIndustry: string;
  // Engagement Metrics
  daysSinceSignup: number;
  conversionTime?: number; // days from signup to paid
  avgReportsPerWeek: number;
  sessionCount: number;
  // Business Metrics
  referralSource: string;
  lifetimeValue: number;
  churnRisk: 'Low' | 'Medium' | 'High';
  npsScore?: number;
}

const mockPaidUsers: PaidUser[] = [
  {
    id: 'USR-001',
    name: 'Sarah Mitchell',
    email: 'sarah@bigstudio.com',
    company: 'Big Studio Productions',
    plan: 'Studio',
    status: 'Active',
    reportsThisMonth: 47,
    reportLimit: -1, // unlimited
    monthlySpend: 249,
    paymentCurrency: 'USD',
    joinDate: '2025-11-15',
    lastActive: '2026-01-23',
    totalReportsGenerated: 142,
    paymentMethod: 'Corporate Card ****4532',
    // Geographic Data
    country: 'USA',
    state: 'California',
    city: 'Los Angeles',
    // Professional Profile
    role: 'Producer',
    companySize: 'Large',
    industrySegment: 'Film Production',
    yearsInIndustry: '10+ years',
    // Engagement Metrics
    daysSinceSignup: 60,
    conversionTime: 30,
    avgReportsPerWeek: 6.7,
    sessionCount: 15,
    // Business Metrics
    referralSource: 'Trade Show',
    lifetimeValue: 12000,
    churnRisk: 'Low',
    npsScore: 9,
  },
  {
    id: 'USR-002',
    name: 'Michael Chen',
    email: 'mchen@indiefilms.com',
    company: 'Indie Films LLC',
    plan: 'Producer Annual',
    status: 'Active',
    reportsThisMonth: 8,
    reportLimit: 25,
    monthlySpend: 99,
    paymentCurrency: 'USD',
    joinDate: '2025-09-20',
    lastActive: '2026-01-22',
    totalReportsGenerated: 67,
    paymentMethod: 'Visa ****3421',
    // Geographic Data
    country: 'USA',
    state: 'New York',
    city: 'New York City',
    // Professional Profile
    role: 'Producer',
    companySize: 'Medium',
    industrySegment: 'Film Production',
    yearsInIndustry: '5-10 years',
    // Engagement Metrics
    daysSinceSignup: 90,
    conversionTime: 45,
    avgReportsPerWeek: 1.2,
    sessionCount: 5,
    // Business Metrics
    referralSource: 'Online Ad',
    lifetimeValue: 5000,
    churnRisk: 'Medium',
    npsScore: 7,
  },
  {
    id: 'USR-003',
    name: 'Emma Rodriguez',
    email: 'emma.r@filmmakers.co',
    company: 'Rodriguez Productions',
    plan: 'Pro Monthly',
    status: 'Active',
    reportsThisMonth: 4,
    reportLimit: 10,
    monthlySpend: 49,
    paymentCurrency: 'USD',
    joinDate: '2026-01-05',
    lastActive: '2026-01-21',
    totalReportsGenerated: 12,
    paymentMethod: 'Mastercard ****8765',
    // Geographic Data
    country: 'USA',
    state: 'Texas',
    city: 'Austin',
    // Professional Profile
    role: 'Producer',
    companySize: 'Small',
    industrySegment: 'Film Production',
    yearsInIndustry: '1-5 years',
    // Engagement Metrics
    daysSinceSignup: 30,
    conversionTime: 15,
    avgReportsPerWeek: 0.6,
    sessionCount: 3,
    // Business Metrics
    referralSource: 'Social Media',
    lifetimeValue: 2500,
    churnRisk: 'High',
    npsScore: 5,
  },
  {
    id: 'USR-004',
    name: 'David Thompson',
    email: 'dthompson@creativemedia.com',
    company: 'Creative Media Group',
    plan: 'Producer Annual',
    status: 'Active',
    reportsThisMonth: 15,
    reportLimit: 25,
    monthlySpend: 99,
    paymentCurrency: 'USD',
    joinDate: '2025-10-12',
    lastActive: '2026-01-20',
    totalReportsGenerated: 89,
    paymentMethod: 'Amex ****1009',
    // Geographic Data
    country: 'USA',
    state: 'Florida',
    city: 'Miami',
    // Professional Profile
    role: 'Producer',
    companySize: 'Large',
    industrySegment: 'Film Production',
    yearsInIndustry: '10+ years',
    // Engagement Metrics
    daysSinceSignup: 75,
    conversionTime: 35,
    avgReportsPerWeek: 2.2,
    sessionCount: 10,
    // Business Metrics
    referralSource: 'Trade Show',
    lifetimeValue: 10000,
    churnRisk: 'Low',
    npsScore: 8,
  },
  {
    id: 'USR-005',
    name: 'Jessica Martinez',
    email: 'j.martinez@globalfilms.net',
    company: 'Global Films International',
    plan: 'Pro Monthly',
    status: 'Past Due',
    reportsThisMonth: 9,
    reportLimit: 10,
    monthlySpend: 49,
    paymentCurrency: 'USD',
    joinDate: '2025-08-03',
    lastActive: '2026-01-18',
    totalReportsGenerated: 54,
    paymentMethod: 'Visa ****2234',
    // Geographic Data
    country: 'USA',
    state: 'California',
    city: 'San Francisco',
    // Professional Profile
    role: 'Producer',
    companySize: 'Medium',
    industrySegment: 'Film Production',
    yearsInIndustry: '5-10 years',
    // Engagement Metrics
    daysSinceSignup: 100,
    conversionTime: 50,
    avgReportsPerWeek: 1.5,
    sessionCount: 6,
    // Business Metrics
    referralSource: 'Online Ad',
    lifetimeValue: 6000,
    churnRisk: 'Medium',
    npsScore: 6,
  },
  {
    id: 'USR-006',
    name: 'Robert Kim',
    email: 'rkim@visionproductions.com',
    company: 'Vision Productions',
    plan: 'Producer Annual',
    status: 'Canceled',
    reportsThisMonth: 0,
    reportLimit: 25,
    monthlySpend: 0,
    paymentCurrency: 'USD',
    joinDate: '2025-06-18',
    lastActive: '2025-12-31',
    totalReportsGenerated: 43,
    paymentMethod: 'Visa ****5678',
    // Geographic Data
    country: 'USA',
    state: 'New York',
    city: 'New York City',
    // Professional Profile
    role: 'Producer',
    companySize: 'Large',
    industrySegment: 'Film Production',
    yearsInIndustry: '10+ years',
    // Engagement Metrics
    daysSinceSignup: 120,
    conversionTime: 60,
    avgReportsPerWeek: 0.5,
    sessionCount: 2,
    // Business Metrics
    referralSource: 'Trade Show',
    lifetimeValue: 8000,
    churnRisk: 'Low',
    npsScore: 9,
  },
  {
    id: 'USR-007',
    name: 'Oliver Bennett',
    email: 'oliver@ukfilms.co.uk',
    company: 'UK Films Ltd',
    plan: 'Studio',
    status: 'Active',
    reportsThisMonth: 32,
    reportLimit: -1, // unlimited
    monthlySpend: 199,
    paymentCurrency: 'GBP',
    joinDate: '2025-10-08',
    lastActive: '2026-01-23',
    totalReportsGenerated: 98,
    paymentMethod: 'Mastercard ****9012',
    // Geographic Data
    country: 'United Kingdom',
    state: 'England',
    city: 'London',
    // Professional Profile
    role: 'Producer',
    companySize: 'Large',
    industrySegment: 'Film Production',
    yearsInIndustry: '10+ years',
    // Engagement Metrics
    daysSinceSignup: 107,
    conversionTime: 20,
    avgReportsPerWeek: 4.5,
    sessionCount: 18,
    // Business Metrics
    referralSource: 'Trade Show',
    lifetimeValue: 9500,
    churnRisk: 'Low',
    npsScore: 9,
  },
  {
    id: 'USR-008',
    name: 'Sophie Clarke',
    email: 'sophie@britishcinema.com',
    company: 'British Cinema Productions',
    plan: 'Producer Annual',
    status: 'Active',
    reportsThisMonth: 6,
    reportLimit: 25,
    monthlySpend: 79,
    paymentCurrency: 'GBP',
    joinDate: '2025-11-22',
    lastActive: '2026-01-22',
    totalReportsGenerated: 45,
    paymentMethod: 'Visa ****3456',
    // Geographic Data
    country: 'United Kingdom',
    state: 'England',
    city: 'Manchester',
    // Professional Profile
    role: 'Producer',
    companySize: 'Medium',
    industrySegment: 'Film Production',
    yearsInIndustry: '5-10 years',
    // Engagement Metrics
    daysSinceSignup: 62,
    conversionTime: 25,
    avgReportsPerWeek: 1.8,
    sessionCount: 8,
    // Business Metrics
    referralSource: 'Online Ad',
    lifetimeValue: 4800,
    churnRisk: 'Low',
    npsScore: 8,
  },
  {
    id: 'USR-009',
    name: 'James Wilson',
    email: 'james@scottishfilms.co.uk',
    company: 'Scottish Films Agency',
    plan: 'Pro Monthly',
    status: 'Active',
    reportsThisMonth: 3,
    reportLimit: 10,
    monthlySpend: 39,
    paymentCurrency: 'GBP',
    joinDate: '2025-12-10',
    lastActive: '2026-01-20',
    totalReportsGenerated: 18,
    paymentMethod: 'Amex ****7890',
    // Geographic Data
    country: 'United Kingdom',
    state: 'Scotland',
    city: 'Edinburgh',
    // Professional Profile
    role: 'Producer',
    companySize: 'Small',
    industrySegment: 'Film Production',
    yearsInIndustry: '1-5 years',
    // Engagement Metrics
    daysSinceSignup: 44,
    conversionTime: 18,
    avgReportsPerWeek: 1.1,
    sessionCount: 6,
    // Business Metrics
    referralSource: 'Social Media',
    lifetimeValue: 3200,
    churnRisk: 'Medium',
    npsScore: 7,
  },
];

export function ScriptAIOverview() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyView, setCurrencyView] = useState<'BOTH' | 'USD' | 'GBP'>('BOTH');

  // Calculate revenue by currency
  const activeSubscribers = mockPaidUsers.filter((u) => u.status === 'Active');
  const usdRevenue = activeSubscribers
    .filter((u) => u.paymentCurrency === 'USD')
    .reduce((sum, u) => sum + u.monthlySpend, 0);
  const gbpRevenue = activeSubscribers
    .filter((u) => u.paymentCurrency === 'GBP')
    .reduce((sum, u) => sum + u.monthlySpend, 0);
  
  // Conversion rate (GBP to USD for total calculation)
  const GBP_TO_USD = 1.27;
  const totalRevenueInUSD = usdRevenue + (gbpRevenue * GBP_TO_USD);
  const totalRevenueInGBP = (usdRevenue / GBP_TO_USD) + gbpRevenue;

  const stats = [
    {
      label: 'Total Paid Users',
      value: activeSubscribers.length.toString(),
      change: '+12 this month',
      icon: <People />,
      color: '#D4AF37',
    },
    {
      label: 'Monthly Recurring Revenue',
      value: currencyView === 'USD' 
        ? `$${totalRevenueInUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
        : currencyView === 'GBP'
        ? `£${totalRevenueInGBP.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`
        : 'Multi-Currency',
      change: currencyView === 'BOTH' 
        ? `$${usdRevenue} USD + £${gbpRevenue} GBP`
        : '+8.4% vs last month',
      icon: <AttachMoney />,
      color: '#66bb6a',
    },
    {
      label: 'Reports Generated (MTD)',
      value: '1,247',
      change: '892 free, 355 paid',
      icon: <Description />,
      color: '#42a5f5',
    },
    {
      label: 'Avg. Reports per User',
      value: '2.3',
      change: 'Per paid user',
      icon: <TrendingUp />,
      color: '#ffa726',
    },
  ];

  const planDistribution = [
    { plan: 'Free (1 report)', users: 892, revenue: 0, color: '#666' },
    { plan: 'Pro Monthly ($49)', users: 68, revenue: 3332, color: '#42a5f5' },
    { plan: 'Producer Annual ($99)', users: 74, revenue: 7326, color: '#D4AF37' },
    { plan: 'Studio ($249)', users: 14, revenue: 3486, color: '#66bb6a' },
  ];

  const filteredUsers = mockPaidUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeUsers = filteredUsers.filter((u) => u.status === 'Active');
  const pastDueUsers = filteredUsers.filter((u) => u.status === 'Past Due');
  const canceledUsers = filteredUsers.filter((u) => u.status === 'Canceled');

  const currentUsers =
    tabValue === 0 ? activeUsers : tabValue === 1 ? pastDueUsers : canceledUsers;

  const { symbol } = useGeoCurrency();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#D4AF37', mb: 1 }}>
              Paid Users & Subscription Overview
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              Monitor subscriber activity, revenue, and usage metrics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant={currencyView === 'BOTH' ? 'contained' : 'outlined'}
              onClick={() => setCurrencyView('BOTH')}
              sx={{
                borderColor: '#D4AF37',
                color: currencyView === 'BOTH' ? '#000000' : '#D4AF37',
                bgcolor: currencyView === 'BOTH' ? '#D4AF37' : 'transparent',
                '&:hover': {
                  borderColor: '#E5C158',
                  bgcolor: currencyView === 'BOTH' ? '#E5C158' : 'rgba(212, 175, 55, 0.08)',
                },
              }}
            >
              Both Currencies
            </Button>
            <Button
              size="small"
              variant={currencyView === 'USD' ? 'contained' : 'outlined'}
              onClick={() => setCurrencyView('USD')}
              sx={{
                borderColor: '#D4AF37',
                color: currencyView === 'USD' ? '#000000' : '#D4AF37',
                bgcolor: currencyView === 'USD' ? '#D4AF37' : 'transparent',
                '&:hover': {
                  borderColor: '#E5C158',
                  bgcolor: currencyView === 'USD' ? '#E5C158' : 'rgba(212, 175, 55, 0.08)',
                },
              }}
            >
              USD Only
            </Button>
            <Button
              size="small"
              variant={currencyView === 'GBP' ? 'contained' : 'outlined'}
              onClick={() => setCurrencyView('GBP')}
              sx={{
                borderColor: '#D4AF37',
                color: currencyView === 'GBP' ? '#000000' : '#D4AF37',
                bgcolor: currencyView === 'GBP' ? '#D4AF37' : 'transparent',
                '&:hover': {
                  borderColor: '#E5C158',
                  bgcolor: currencyView === 'GBP' ? '#E5C158' : 'rgba(212, 175, 55, 0.08)',
                },
              }}
            >
              GBP Only
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: `${stat.color}20`,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#ffffff', mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: stat.color, fontWeight: 600 }}>
                      {stat.change}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Plan Distribution */}
      <Card
        sx={{
          mb: 4,
          bgcolor: '#0a0a0a',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600, mb: 3 }}>
            Plan Distribution & Revenue Breakdown
          </Typography>
          <Grid container spacing={3}>
            {planDistribution.map((plan, index) => (
              <Grid size={{ xs: 12, md: 3 }} key={index}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(212, 175, 55, 0.05)',
                    borderRadius: 2,
                    border: `1px solid ${plan.color}40`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: plan.color,
                      }}
                    />
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                      {plan.plan}
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700, mb: 0.5 }}>
                    {plan.users}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                    Users
                  </Typography>
                  {plan.revenue > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ color: '#66bb6a', fontWeight: 700, mt: 2, mb: 0.5 }}
                      >
                        ${plan.revenue.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                        Monthly Revenue
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Paid Users Table */}
      <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 600 }}>
              Paid Subscribers
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Download />}
              size="small"
              sx={{
                borderColor: '#D4AF37',
                color: '#D4AF37',
                '&:hover': {
                  borderColor: '#E5C158',
                  bgcolor: 'rgba(212, 175, 55, 0.08)',
                },
              }}
            >
              Export CSV
            </Button>
          </Box>

          <TextField
            fullWidth
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              '& .MuiTab-root': {
                color: '#a0a0a0',
                textTransform: 'none',
                fontWeight: 600,
              },
              '& .Mui-selected': {
                color: '#D4AF37 !important',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#D4AF37',
              },
            }}
          >
            <Tab label={`Active (${activeUsers.length})`} />
            <Tab label={`Past Due (${pastDueUsers.length})`} />
            <Tab label={`Canceled (${canceledUsers.length})`} />
          </Tabs>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Company</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Plan</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Usage</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Monthly Spend</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Join Date</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Last Active</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id} sx={{ '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.05)' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: '#D4AF37',
                          color: '#000000',
                          width: 36,
                          height: 36,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff', fontSize: '0.875rem' }}>
                    {user.company}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.plan}
                      size="small"
                      icon={
                        user.plan === 'Studio' ? <Star sx={{ fontSize: 14 }} /> : undefined
                      }
                      sx={{
                        bgcolor:
                          user.plan === 'Studio'
                            ? 'rgba(102, 187, 106, 0.2)'
                            : user.plan === 'Producer Annual'
                            ? 'rgba(212, 175, 55, 0.2)'
                            : 'rgba(66, 165, 245, 0.2)',
                        color:
                          user.plan === 'Studio'
                            ? '#66bb6a'
                            : user.plan === 'Producer Annual'
                            ? '#D4AF37'
                            : '#42a5f5',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ minWidth: 120 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                          {user.reportsThisMonth}/{user.reportLimit === -1 ? '∞' : user.reportLimit}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                          {user.reportLimit === -1
                            ? '100%'
                            : Math.round((user.reportsThisMonth / user.reportLimit) * 100)}
                          %
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={
                          user.reportLimit === -1
                            ? 100
                            : (user.reportsThisMonth / user.reportLimit) * 100
                        }
                        sx={{
                          bgcolor: 'rgba(212, 175, 55, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor:
                              user.reportLimit === -1 ||
                              user.reportsThisMonth / user.reportLimit < 0.8
                                ? '#D4AF37'
                                : '#ffa726',
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#666', mt: 0.5, display: 'block' }}>
                        {user.totalReportsGenerated} total reports
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#66bb6a', fontWeight: 600, fontSize: '0.875rem' }}>
                    {user.paymentCurrency === 'GBP' ? '£' : '$'}{user.monthlySpend}/mo
                  </TableCell>
                  <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                    {user.joinDate}
                  </TableCell>
                  <TableCell sx={{ color: '#a0a0a0', fontSize: '0.875rem' }}>
                    {user.lastActive}
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={
                        user.status === 'Active' ? (
                          <CheckCircle sx={{ fontSize: 14 }} />
                        ) : undefined
                      }
                      label={user.status}
                      size="small"
                      sx={{
                        bgcolor:
                          user.status === 'Active'
                            ? 'rgba(46, 125, 50, 0.2)'
                            : user.status === 'Past Due'
                            ? 'rgba(255, 152, 0, 0.2)'
                            : 'rgba(158, 158, 158, 0.2)',
                        color:
                          user.status === 'Active'
                            ? '#66bb6a'
                            : user.status === 'Past Due'
                            ? '#ffa726'
                            : '#9e9e9e',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small">
                        <Visibility sx={{ color: '#D4AF37', fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small">
                        <CreditCard sx={{ color: '#42a5f5', fontSize: 18 }} />
                      </IconButton>
                      {user.status !== 'Canceled' && (
                        <IconButton size="small">
                          <Block sx={{ color: '#f44336', fontSize: 18 }} />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}