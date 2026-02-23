import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  TrendingUp,
  Videocam,
  People,
  TheaterComedy,
  GroupWork,
} from '@mui/icons-material';
import { productionIntelligenceManager } from '@/app/data/ProductionIntelligenceManager';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export function ProductionIntelligence() {
  const [activeTab, setActiveTab] = useState(0);
  const [territory, setTerritory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('90days');

  // Calculate date range
  const getDateRange = () => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date();
    
    switch (dateRange) {
      case '30days':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case '180days':
        startDate.setDate(startDate.getDate() - 180);
        break;
      default:
        return { startDate: undefined, endDate: undefined };
    }
    
    return { startDate: startDate.toISOString().split('T')[0], endDate };
  };

  const { startDate, endDate } = getDateRange();
  const territoryFilter = territory === 'all' ? undefined : territory;

  // Get data
  const summaryStats = productionIntelligenceManager.getSummaryStats();
  const cameraEquipmentTrends = productionIntelligenceManager.getCameraEquipmentTrends(territoryFilter, startDate, endDate);
  const crewSizeTrends = productionIntelligenceManager.getCrewSizeTrends(territoryFilter, startDate, endDate);
  const castDemandTrends = productionIntelligenceManager.getCastDemandTrends(territoryFilter, startDate, endDate);
  const scaleDistribution = productionIntelligenceManager.getProductionScaleDistribution(territoryFilter);
  const territoryForecasts = productionIntelligenceManager.getTerritoryDemandForecasts('Q2 2026');

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>
            Production Intelligence Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: '#a0a0a0' }}>
            Camera equipment, crew size, cast demand, and extras trend analytics
          </Typography>
          <Chip
            label={`Data from ${summaryStats.totalSignals} script submissions`}
            size="small"
            sx={{
              mt: 1,
              bgcolor: 'rgba(212, 175, 55, 0.2)',
              color: '#D4AF37',
            }}
          />
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#a0a0a0' }}>Territory</InputLabel>
                <Select
                  value={territory}
                  label="Territory"
                  onChange={(e) => setTerritory(e.target.value)}
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(212, 175, 55, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37',
                    },
                  }}
                >
                  <MenuItem value="all">All Territories</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Malta">Malta</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#a0a0a0' }}>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(212, 175, 55, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D4AF37',
                    },
                  }}
                >
                  <MenuItem value="30days">Last 30 Days</MenuItem>
                  <MenuItem value="90days">Last 90 Days</MenuItem>
                  <MenuItem value="180days">Last 180 Days</MenuItem>
                  <MenuItem value="all">All Time</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Summary Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Videocam sx={{ color: '#D4AF37', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                    Camera Data
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>
                  {summaryStats.cameraDataCompleteness.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={summaryStats.cameraDataCompleteness}
                  sx={{
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#D4AF37',
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <People sx={{ color: '#D4AF37', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                    Crew Data
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>
                  {summaryStats.crewDataCompleteness.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={summaryStats.crewDataCompleteness}
                  sx={{
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#D4AF37',
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TheaterComedy sx={{ color: '#D4AF37', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                    Cast Data
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>
                  {summaryStats.castDataCompleteness.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={summaryStats.castDataCompleteness}
                  sx={{
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#D4AF37',
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <GroupWork sx={{ color: '#D4AF37', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                    Extras Data
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>
                  {summaryStats.extrasDataCompleteness.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={summaryStats.extrasDataCompleteness}
                  sx={{
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#D4AF37',
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabbed Content */}
        <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
              '& .MuiTab-root': {
                color: '#a0a0a0',
                '&.Mui-selected': {
                  color: '#D4AF37',
                },
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#D4AF37',
              },
            }}
          >
            <Tab label="Camera Equipment" />
            <Tab label="Crew Size" />
            <Tab label="Cast Demand" />
            <Tab label="Production Scale" />
            <Tab label="Territory Forecasts" />
          </Tabs>

          {/* Camera Equipment Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Camera Equipment Demand Trends
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Equipment</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Demand Count</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>% of Total</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>QoQ Growth</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Top Territories</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cameraEquipmentTrends.map((trend) => (
                      <TableRow key={trend.equipment}>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.displayName}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.demandCount}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.percentageOfTotal.toFixed(1)}%
                        </TableCell>
                        <TableCell sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          <Chip
                            label={`${trend.quarterOverQuarterGrowth >= 0 ? '+' : ''}${trend.quarterOverQuarterGrowth.toFixed(1)}%`}
                            size="small"
                            icon={<TrendingUp />}
                            sx={{
                              bgcolor: trend.quarterOverQuarterGrowth >= 0
                                ? 'rgba(76, 175, 80, 0.2)'
                                : 'rgba(244, 67, 54, 0.2)',
                              color: trend.quarterOverQuarterGrowth >= 0 ? '#4caf50' : '#f44336',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.topTerritories.map(t => t.territory).join(', ')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* Crew Size Tab */}
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Crew Size Distribution Trends
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Crew Size</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Production Count</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>% of Total</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Visual</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {crewSizeTrends.map((trend) => (
                      <TableRow key={trend.sizeRange}>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.displayName}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.count}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.percentageOfTotal.toFixed(1)}%
                        </TableCell>
                        <TableCell sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          <LinearProgress
                            variant="determinate"
                            value={trend.percentageOfTotal}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(212, 175, 55, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#D4AF37',
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* Cast Demand Tab */}
          <TabPanel value={activeTab} index={2}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Cast Demand Analytics
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Category</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Production Count</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>% of Total</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Top Territories</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {castDemandTrends.map((trend, index) => (
                      <TableRow key={`${trend.category}-${index}`}>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {trend.displayName}
                            <Chip
                              label={trend.category}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(212, 175, 55, 0.2)',
                                color: '#D4AF37',
                                textTransform: 'capitalize',
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.count}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.percentageOfTotal.toFixed(1)}%
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {trend.territories.map(t => t.territory).join(', ')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* Production Scale Tab */}
          <TabPanel value={activeTab} index={3}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Production Scale Distribution
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Budget Range</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Count</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Avg Crew</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Avg Cast</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Avg Extras</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Territories</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scaleDistribution.map((dist) => (
                      <TableRow key={dist.budgetRange}>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          <Chip
                            label={dist.budgetRange}
                            sx={{
                              bgcolor: 'rgba(212, 175, 55, 0.2)',
                              color: '#D4AF37',
                              textTransform: 'capitalize',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {dist.count}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {dist.avgCrewSize}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {dist.avgCastSize}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {dist.avgExtras}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {dist.territories.join(', ')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          {/* Territory Forecasts Tab */}
          <TabPanel value={activeTab} index={4}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Territory Demand Forecasts (Q2 2026)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Territory</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Projected Productions</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Avg Crew Size</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Avg Cast Size</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Avg Extras</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Total Headcount</TableCell>
                      <TableCell sx={{ color: '#a0a0a0', borderColor: 'rgba(212, 175, 55, 0.1)' }}>Top Cameras</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {territoryForecasts.map((forecast) => (
                      <TableRow key={forecast.territory}>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          <Chip
                            label={forecast.territory}
                            sx={{
                              bgcolor: 'rgba(212, 175, 55, 0.2)',
                              color: '#D4AF37',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {forecast.totalProductions}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {forecast.avgCrewSize}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {forecast.avgCastSize}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {forecast.avgExtras}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                          {forecast.totalHeadcount}
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderColor: 'rgba(212, 175, 55, 0.1)', fontSize: '0.875rem' }}>
                          {forecast.topCameras.slice(0, 2).join(', ')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
        </Paper>

        {/* Data Source Footer */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(212, 175, 55, 0.05)', borderRadius: 1, border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
            <strong>Data Source:</strong> Aggregated from anonymized script upload metadata. 
            All data is indicative and based on historical industry patterns. 
            Last updated: {summaryStats.lastUpdated}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}