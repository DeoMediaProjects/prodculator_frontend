import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  Chip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  Download,
  ArrowBack,
  Public,
  AttachMoney,
  People,
  Movie,
  WbSunny,
  TrendingUp,
  Info,
  Lock,
  Share,
} from '@mui/icons-material';
import { useScript } from '@/app/contexts/ScriptContext';
import { generateReportPDF } from '@/services/report-pdf.service';
import exampleLogo from '@/assets/2ac5b205356b38916f5ff32008dfa103d8ffc2cb.png';

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div hidden={value !== index} style={{ height: '100%' }}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>;
}

export function ReportViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { analysis } = useScript();
  const [tabValue, setTabValue] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const isPreview = location.pathname.includes('preview');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleExportPDF = async () => {
    if (!analysis) return;
    
    setIsGeneratingPDF(true);
    try {
      await generateReportPDF(analysis);
      // Success - PDF downloaded automatically
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!analysis) {
    return (
      <Box sx={{ bgcolor: '#000000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#ffffff' }}>No report data found</Typography>
          <Button variant="contained" onClick={() => navigate('/upload')}>Go to Upload</Button>
        </Container>
      </Box>
    );
  }

  const tabs = [
    { label: 'Script Summary', icon: <Info /> },
    { label: 'Location Rankings', icon: <Public /> },
    { label: 'Tax Incentives', icon: <AttachMoney /> },
    { label: 'Crew & Cost', icon: <People />, locked: isPreview },
    { label: 'Comparables', icon: <Movie />, locked: isPreview },
    { label: 'Weather & Logistics', icon: <WbSunny />, locked: isPreview },
    { label: 'Funding & Festivals', icon: <TrendingUp />, locked: isPreview },
  ];

  const BlurredContent = ({ title }: { title: string }) => (
    <Box sx={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
      <Box sx={{ filter: 'blur(8px)', opacity: 0.3, pointerEvents: 'none', userSelect: 'none' }}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map(i => (
            <Grid size={{ xs: 12 }} key={i}>
              <Paper sx={{ p: 3, bgcolor: '#1a1a1a' }}>
                <Box sx={{ height: 20, width: '40%', bgcolor: '#333', mb: 2 }} />
                <Box sx={{ height: 100, width: '100%', bgcolor: '#222' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', p: 4,
          zIndex: 10
        }}
      >
        <Lock sx={{ fontSize: 64, color: '#D4AF37', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 1, fontWeight: 700 }}>
          {title} Locked
        </Typography>
        <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4, maxWidth: '400px' }}>
          Detailed {title.toLowerCase()} analysis is exclusive to Pro and Studio members. Upgrade to unlock investor-ready intelligence.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/pricing')}
          sx={{ px: 6 }}
        >
          Unlock Full Report
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.98)', borderBottom: '1px solid rgba(0,0,0,0.1)', py: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src={exampleLogo} alt="Prodculator" style={{ height: '32px', cursor: 'pointer' }} onClick={() => navigate('/')} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#000000' }}>{analysis.scriptTitle}</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                  {isPreview ? 'Free Intelligence Preview' : 'Professional Intelligence Report'} • {new Date(analysis.generatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {isPreview && (
                <Button variant="contained" onClick={() => navigate('/pricing')} sx={{ bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#222' } }}>
                  Upgrade to Full
                </Button>
              )}
              {!isPreview && (
                <Button 
                  variant="outlined" 
                  startIcon={isGeneratingPDF ? <CircularProgress size={16} /> : <Download />} 
                  sx={{ color: '#000', borderColor: '#000' }} 
                  onClick={handleExportPDF}
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? 'Preparing...' : 'Print/Save PDF'}
                </Button>
              )}
              <Button startIcon={<ArrowBack />} onClick={() => navigate(isPreview ? '/upload' : '/dashboard')} sx={{ color: '#000' }}>
                Back
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {isPreview && (
          <Alert severity="warning" sx={{ mb: 4, bgcolor: '#D4AF37', color: '#000', '& .MuiAlert-icon': { color: '#000' } }}>
            This is a <strong>Free Preview</strong>. Access to technical crew costs, comparable production data, and weather logistics is restricted.
          </Alert>
        )}

        <Paper sx={{ bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(212, 175, 55, 0.2)' }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, v) => setTabValue(v)} 
              variant="scrollable" 
              sx={{
                '& .MuiTab-root': { color: '#a0a0a0', py: 2 },
                '& .Mui-selected': { color: '#D4AF37 !important' },
                '& .MuiTabs-indicator': { backgroundColor: '#D4AF37' }
              }}
            >
              {tabs.map((tab, i) => (
                <Tab 
                  key={i} 
                  label={tab.label} 
                  icon={tab.locked ? <Lock sx={{ fontSize: '0.9rem' }} /> : tab.icon} 
                  iconPosition="start" 
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Tab 1: Script Summary */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Script Intelligence Summary</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}><Card sx={{ bgcolor: '#111' }}><CardContent><Typography variant="overline" color="primary">Genre</Typography><Typography variant="h6">{analysis.genre}</Typography></CardContent></Card></Grid>
                <Grid size={{ xs: 12, md: 6 }}><Card sx={{ bgcolor: '#111' }}><CardContent><Typography variant="overline" color="primary">Complexity</Typography><Typography variant="h6">{analysis.complexity}</Typography></CardContent></Card></Grid>
                <Grid size={{ xs: 12 }}><Card sx={{ bgcolor: '#111' }}><CardContent><Typography variant="overline" color="primary">Tone & Scale</Typography><Typography variant="body1">{analysis.tone}</Typography></CardContent></Card></Grid>
              </Grid>
            </TabPanel>

            {/* Tab 2: Location Rankings */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Global Territory Rankings</Typography>
              {analysis.locationRankings.map((loc, i) => (
                <Paper key={i} sx={{ p: 3, mb: 2, bgcolor: '#111', border: '1px solid #222' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box><Typography variant="h6" sx={{ color: '#D4AF37' }}>{loc.name}, {loc.country}</Typography></Box>
                    <Chip label={`Score: ${loc.score}/100`} sx={{ bgcolor: '#D4AF37', color: '#000', fontWeight: 700 }} />
                  </Box>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {['Cost', 'Crew', 'Incentives'].map((label, idx) => (
                      <Grid size={{ xs: 4 }} key={idx}>
                        <Typography variant="caption" sx={{ color: '#666' }}>{label}</Typography>
                        <LinearProgress variant="determinate" value={idx === 0 ? loc.costEfficiency : idx === 1 ? loc.crewDepth : loc.incentiveStrength} sx={{ mt: 1, height: 6, borderRadius: 3, bgcolor: '#222', '& .MuiLinearProgress-bar': { bgcolor: '#D4AF37' } }} />
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ my: 2, borderColor: '#333' }} />
                  <Typography variant="subtitle2" sx={{ mb: 1, color: '#D4AF37' }}>Key Intelligence:</Typography>
                  <List dense>{loc.reasoning.map((r, ri) => <ListItem key={ri} sx={{ color: '#a0a0a0' }}>• {r}</ListItem>)}</List>
                </Paper>
              ))}
            </TabPanel>

            {/* Tab 3: Tax Incentives */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Tax Incentive Estimates</Typography>
              <Grid container spacing={3}>
                {analysis.incentiveEstimates.map((inc, i) => (
                  <Grid size={{ xs: 12, md: 6 }} key={i}>
                    <Paper sx={{ p: 3, bgcolor: '#111', border: '1px solid #222', height: '100%' }}>
                      <Typography variant="h6" sx={{ color: '#D4AF37', mb: 1 }}>{inc.territory}</Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>{inc.program}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Estimated Rebate:</Typography>
                        <Typography variant="h6" sx={{ color: '#4caf50' }}>{inc.estimatedRebate}</Typography>
                      </Box>
                      <Divider sx={{ my: 2, borderColor: '#333' }} />
                      <Typography variant="caption" sx={{ color: '#666' }}>{inc.requirements[0]}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Locked Tabs */}
            <TabPanel value={tabValue} index={3}>{isPreview ? <BlurredContent title="Crew & Cost" /> : <Typography>Crew Data Here</Typography>}</TabPanel>
            <TabPanel value={tabValue} index={4}>{isPreview ? <BlurredContent title="Comparables" /> : <Typography>Comparables Data Here</Typography>}</TabPanel>
            <TabPanel value={tabValue} index={5}>{isPreview ? <BlurredContent title="Weather & Logistics" /> : <Typography>Weather Data Here</Typography>}</TabPanel>
            <TabPanel value={tabValue} index={6}>{isPreview ? <BlurredContent title="Funding & Festivals" /> : <Typography>Funding Data Here</Typography>}</TabPanel>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}