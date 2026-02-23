import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import {
  Business,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';
import logoBlack from '@/assets/ddbe9f875b0128308d18010a516a1a848d4b7b77.png';

export function B2BSolutions() {
  const navigate = useNavigate();
  const [rfpDialogOpen, setRfpDialogOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [requestContext, setRequestContext] = useState<string>('');
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    territoriesOfInterest: '',
    reportFrequency: '',
    apiAccessRequired: '',
    estimatedBudget: '',
    useCase: '',
    additionalInfo: '',
    context: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleOpenRfpDialog = (context: string) => {
    setRequestContext(context);
    setFormData({ ...formData, context });
    setRfpDialogOpen(true);
  };

  const handleSubmitRfp = () => {
    console.log('RFP Submitted:', { ...formData, context: requestContext });
    setFormSubmitted(true);
    setTimeout(() => {
      setRfpDialogOpen(false);
      setFormSubmitted(false);
      setRequestContext('');
      setFormData({
        organizationType: '',
        organizationName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        territoriesOfInterest: '',
        reportFrequency: '',
        apiAccessRequired: '',
        estimatedBudget: '',
        useCase: '',
        additionalInfo: '',
        context: '',
      });
    }, 3000);
  };

  return (
    <Box sx={{ bgcolor: '#F8F6F0', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Navigation Bar */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <img
                src={logoBlack}
                alt="Prodculator"
                style={{ height: '32px', width: 'auto', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '15px',
                    color: '#111111',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  B2B Solutions
                </Typography>
                <Typography
                  onClick={() => navigate('/pricing')}
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '15px',
                    color: '#555555',
                    cursor: 'pointer',
                    '&:hover': { color: '#111111' },
                  }}
                >
                  Pricing
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '15px',
                    color: '#555555',
                    cursor: 'pointer',
                    '&:hover': { color: '#111111' },
                  }}
                >
                  FAQ
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  border: '1px solid rgba(245,200,0,0.4)',
                  color: '#C9A227',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(245,200,0,0.08)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                sx={{
                  bgcolor: '#F5C800',
                  color: '#000000',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  px: 3,
                  py: 1,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#E5B800',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Page Hero */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '42px',
                color: '#111111',
                mb: 2,
              }}
            >
              Enterprise Solutions
            </Typography>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                color: '#555555',
                mb: 4,
              }}
            >
              Professional-grade production intelligence tailored to your organisation's needs
            </Typography>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#777777',
                fontStyle: 'italic',
                maxWidth: '680px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Our intelligence is derived from real production planning activity on the Prodculator platform — not
              surveys, not estimates. When a producer uploads their script and declares their budget, timeline, and
              territory preferences, that signal is anonymised and aggregated into the market intelligence below.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Tier 1: Operational Intelligence */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          sx={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            color: '#999999',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Operational Intelligence
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {/* Card 1: Camera & Equipment */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: '32px', mb: 2 }}></Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#111111',
                  mb: 1,
                }}
              >
                Camera & Equipment Demand Intelligence
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#1A8C4E',
                  mb: 2,
                }}
              >
                Equipment Rental & Camera Houses
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#555555',
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Production volume trends and territory-specific demand forecasts to optimise inventory planning and
                resource allocation.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#C9A227',
                  mb: 1,
                }}
              >
                Key Features:
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {[
                  'Territory-specific production volume trends',
                  'Casting demand analytics (extras, principals)',
                  'Production type distribution (film, TV, commercial)',
                  'Quarterly demand forecasts',
                  'Genre-based equipment implications',
                  'Seasonal trend analysis',
                ].map((feature, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle sx={{ color: '#1A8C4E', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: '#333333',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  bgcolor: 'rgba(59,130,246,0.06)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '8px',
                  p: 1.5,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#6B86A8',
                    fontStyle: 'italic',
                  }}
                >
                  Based on platform script upload patterns and production metadata
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    mb: 1,
                  }}
                >
                  Delivery Options:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Quarterly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                  <Chip
                    label="Monthly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#111111',
                    textAlign: 'right',
                    mb: 2,
                  }}
                >
                  from £600/month
                </Typography>
                <Button
                  fullWidth
                  onClick={() => handleOpenRfpDialog('Camera & Equipment Demand Intelligence')}
                  sx={{
                    bgcolor: 'transparent',
                    border: '2px solid rgba(245,200,0,0.4)',
                    color: '#C9A227',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    height: '48px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(245,200,0,0.08)',
                      border: '2px solid rgba(245,200,0,0.6)',
                    },
                  }}
                >
                  Join Waitlist
                </Button>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#999999',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                >
                  Launching Q3 2026 — founding partner pricing available
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card 2: Production Services */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: '32px', mb: 2 }}></Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#111111',
                  mb: 1,
                }}
              >
                Production Services Intelligence
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#1A8C4E',
                  mb: 2,
                }}
              >
                Payroll, Accounting, Insurance & Logistics
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#555555',
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Crew size, cast demand, and production scale analytics to forecast service opportunities and optimise
                resource planning.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#C9A227',
                  mb: 1,
                }}
              >
                Key Features:
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {[
                  'Crew size trend analytics by territory',
                  'Cast demand forecasting (principals, supporting, extras)',
                  'Production scale distribution reports',
                  'Total headcount trend analysis',
                  'Budget range breakdowns',
                  'Quarterly demand forecasts',
                ].map((feature, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle sx={{ color: '#1A8C4E', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: '#333333',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  bgcolor: 'rgba(59,130,246,0.06)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '8px',
                  p: 1.5,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#6B86A8',
                    fontStyle: 'italic',
                  }}
                >
                  Aggregated from anonymised script upload metadata on our platform
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    mb: 1,
                  }}
                >
                  Delivery Options:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Quarterly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                  <Chip
                    label="Monthly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#111111',
                    textAlign: 'right',
                    mb: 2,
                  }}
                >
                  from £750/month
                </Typography>
                <Button
                  fullWidth
                  onClick={() => handleOpenRfpDialog('Production Services Intelligence')}
                  sx={{
                    bgcolor: 'transparent',
                    border: '2px solid rgba(245,200,0,0.4)',
                    color: '#C9A227',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    height: '48px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(245,200,0,0.08)',
                      border: '2px solid rgba(245,200,0,0.6)',
                    },
                  }}
                >
                  Join Waitlist
                </Button>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#999999',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                >
                  Launching Q3 2026 — founding partner pricing available
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card 3: Crew & Casting */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: '32px', mb: 2 }}></Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#111111',
                  mb: 1,
                }}
              >
                Crew & Casting Demand Intelligence
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#1A8C4E',
                  mb: 2,
                }}
              >
                Casting Agencies & Crew Agencies
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#555555',
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Genre, scale, and territory demand signals to anticipate casting requirements and crew availability
                needs by market.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#C9A227',
                  mb: 1,
                }}
              >
                Key Features:
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {[
                  'Genre distribution by territory and budget',
                  'Principal and supporting cast volume trends',
                  'Extras demand forecasting by territory',
                  'Production start date clustering (when crew demand peaks)',
                  'Budget tier breakdown by format',
                  'Emerging territory demand signals',
                ].map((feature, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle sx={{ color: '#1A8C4E', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: '#333333',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  bgcolor: 'rgba(59,130,246,0.06)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '8px',
                  p: 1.5,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#6B86A8',
                    fontStyle: 'italic',
                  }}
                >
                  Aggregated from anonymised production metadata across the platform
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    mb: 1,
                  }}
                >
                  Delivery Options:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Quarterly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                  <Chip
                    label="Monthly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#111111',
                    textAlign: 'right',
                    mb: 2,
                  }}
                >
                  from £600/month
                </Typography>
                <Button
                  fullWidth
                  onClick={() => handleOpenRfpDialog('Crew & Casting Demand Intelligence')}
                  sx={{
                    bgcolor: 'transparent',
                    border: '2px solid rgba(245,200,0,0.4)',
                    color: '#C9A227',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    height: '48px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(245,200,0,0.08)',
                      border: '2px solid rgba(245,200,0,0.6)',
                    },
                  }}
                >
                  Join Waitlist
                </Button>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#999999',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                >
                  Launching Q3 2026 — founding partner pricing available
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Tier 2: Strategic Intelligence */}
        <Typography
          sx={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            color: '#999999',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            textAlign: 'center',
            mb: 3,
            mt: 8,
          }}
        >
          Strategic Intelligence
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {/* Card 4: Territory Intelligence */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: '32px', mb: 2 }}>🏛️</Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#111111',
                  mb: 1,
                }}
              >
                Territory Intelligence for Film Commissions
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#1A8C4E',
                  mb: 2,
                }}
              >
                Film Commissions & Tourism Boards
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#555555',
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Understand how producers are evaluating your territory — what they're looking for, what's stopping
                conversion, and how you compare against competing territories.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#C9A227',
                  mb: 1,
                }}
              >
                Key Features:
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {[
                  'Quarterly territory interest reports — how many productions considered your territory',
                  'Budget range of interested productions',
                  'Genre mix considering your territory',
                  'Competing territories most often compared against you',
                  'Programme conversion analysis — ranked highly but not selected',
                  'Seasonal planning patterns',
                ].map((feature, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle sx={{ color: '#1A8C4E', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: '#333333',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  bgcolor: 'rgba(59,130,246,0.06)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '8px',
                  p: 1.5,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#6B86A8',
                    fontStyle: 'italic',
                  }}
                >
                  Based on anonymised production planning decisions on the Prodculator platform
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    mb: 1,
                  }}
                >
                  Delivery Options:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Quarterly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                  <Chip
                    label="Monthly reports"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#111111',
                    textAlign: 'right',
                    mb: 2,
                  }}
                >
                  from £1,500/month
                </Typography>
                <Button
                  fullWidth
                  onClick={() => handleOpenRfpDialog('Territory Intelligence for Film Commissions')}
                  sx={{
                    bgcolor: '#F5C800',
                    color: '#000000',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    height: '48px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    mb: 1,
                    '&:hover': {
                      bgcolor: '#E5B800',
                    },
                  }}
                >
                  Request Proposal
                </Button>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#1A8C4E',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                >
                  Currently onboarding founding commission partners
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card 5: Professional Advisory */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: '32px', mb: 2 }}></Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#111111',
                  mb: 1,
                }}
              >
                Professional Advisory Platform
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#1A8C4E',
                  mb: 2,
                }}
              >
                Entertainment Accountants & Legal
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#555555',
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Always-current territory programme data, multi-client report generation, and programme change alerts —
                so you spend less time researching and more time advising.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#C9A227',
                  mb: 1,
                }}
              >
                Key Features:
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {[
                  'Programme reliability scoring with historic context',
                  'Multi-client report generation — produce reports for multiple productions simultaneously',
                  'Alert system — notified when a programme you are monitoring changes',
                  'White-label PDF output with your firm\'s branding',
                  'Bulk Excel export for your own analysis',
                ].map((feature, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle sx={{ color: '#1A8C4E', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: '#333333',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  bgcolor: 'rgba(59,130,246,0.06)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '8px',
                  p: 1.5,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#6B86A8',
                    fontStyle: 'italic',
                  }}
                >
                  Territory data cross-referenced with published film commission and government sources
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    mb: 1,
                  }}
                >
                  Delivery Options:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Dashboard access"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#111111',
                    textAlign: 'right',
                    mb: 2,
                  }}
                >
                  from £400/month
                </Typography>
                <Button
                  fullWidth
                  onClick={() => handleOpenRfpDialog('Professional Advisory Platform')}
                  sx={{
                    bgcolor: '#F5C800',
                    color: '#000000',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    height: '48px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    mb: 1,
                    '&:hover': {
                      bgcolor: '#E5B800',
                    },
                  }}
                >
                  Start Free Trial
                </Button>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#1A8C4E',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                >
                  14-day free trial — no credit card required
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card 6: White-Label */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: '32px', mb: 2 }}>🏷️</Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#111111',
                  mb: 1,
                }}
              >
                White-Label Intelligence Platform
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#1A8C4E',
                  mb: 2,
                }}
              >
                Production Companies
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#555555',
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Deliver production intelligence reports to your filmmaker clients under your own brand. Your logo, your
                reports, your client relationships.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#C9A227',
                  mb: 1,
                }}
              >
                Key Features:
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {[
                  'Your logo and branding on every report',
                  'Custom company name in all headers',
                  '"Prepared by [Your Company]" — not Prodculator',
                  'Permanent client share links',
                  'Multiple team seats',
                  '10 scripts per month',
                  'What-If scenario saving and comparison',
                  'Excel export for client presentations',
                ].map((feature, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <CheckCircle sx={{ color: '#1A8C4E', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: '#333333',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  bgcolor: 'rgba(59,130,246,0.06)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '8px',
                  p: 1.5,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#6B86A8',
                    fontStyle: 'italic',
                  }}
                >
                  Powered by Prodculator's production intelligence engine
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#999999',
                    mb: 1,
                  }}
                >
                  Delivery Options:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="Dashboard access"
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.06)',
                      color: '#555555',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      height: '24px',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#111111',
                    textAlign: 'right',
                    mb: 2,
                  }}
                >
                  from £500/month
                </Typography>
                <Button
                  fullWidth
                  onClick={() => handleOpenRfpDialog('White-Label Intelligence Platform')}
                  sx={{
                    bgcolor: '#F5C800',
                    color: '#000000',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    height: '48px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    mb: 1,
                    '&:hover': {
                      bgcolor: '#E5B800',
                    },
                  }}
                >
                  Request Proposal
                </Button>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#1A8C4E',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                >
                  Currently onboarding production company partners
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Enterprise Section */}
        <Box
          sx={{
            bgcolor: '#111111',
            borderRadius: '12px',
            p: 5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 6,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                color: '#F5C800',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                mb: 2,
              }}
            >
              ENTERPRISE
            </Typography>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '26px',
                color: '#FFFFFF',
                mb: 1,
              }}
            >
              Slate Intelligence for Streaming Platforms & Studios
            </Typography>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '16px',
                color: '#888888',
                mb: 3,
              }}
            >
              Optimise territory decisions across your entire production slate — not just one film at a time.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {[
                'Full slate analysis',
                'Multi-project optimisation',
                'API integration',
                'Dedicated account management',
                'Custom data outputs',
              ].map((feature, idx) => (
                <Chip
                  key={idx}
                  label={feature}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    height: '28px',
                    borderRadius: '14px',
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right', ml: 4 }}>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '28px',
                color: '#FFFFFF',
                mb: 1,
              }}
            >
              Custom pricing
            </Typography>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#888888',
                mb: 3,
              }}
            >
              Netflix · Apple TV+ · Amazon · BBC · Channel 4
            </Typography>
            <Button
              onClick={() => handleOpenRfpDialog('Enterprise Slate Intelligence')}
              sx={{
                bgcolor: '#F5C800',
                color: '#000000',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '15px',
                height: '52px',
                px: 4,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#E5B800',
                },
              }}
            >
              Contact Enterprise Team →
            </Button>
          </Box>
        </Box>

        {/* Disclaimer */}
        <Box sx={{ textAlign: 'center', maxWidth: '680px', mx: 'auto', py: 4 }}>
          <Typography
            sx={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: '#999999',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}
          >
            All market intelligence data is derived from anonymised, aggregated platform activity. No individual
            production data is ever identified or disclosed. All intelligence products are subject to minimum data
            thresholds — products launch when sufficient anonymised data volume is available to ensure statistical
            relevance.
          </Typography>
        </Box>
      </Container>

      {/* RFP Dialog */}
      <Dialog
        open={rfpDialogOpen}
        onClose={() => setRfpDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#FFFFFF',
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#111111',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Business sx={{ color: '#F5C800' }} />
            Request for Proposal
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {formSubmitted ? (
            <Alert severity="success" sx={{ bgcolor: 'rgba(26,140,78,0.1)', color: '#1A8C4E' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Thank You!
              </Typography>
              <Typography variant="body2">
                Your request has been submitted successfully. Our enterprise sales team will contact you within 24
                hours with a custom proposal.
              </Typography>
            </Alert>
          ) : (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Alert severity="info" sx={{ bgcolor: 'rgba(33,150,243,0.1)', color: '#2196F3' }}>
                  <Typography variant="body2">
                    All information is confidential and will only be used to prepare your custom proposal. No
                    commitment required.
                  </Typography>
                </Alert>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Organization Type"
                  value={formData.organizationType}
                  onChange={(e) => handleInputChange('organizationType', e.target.value)}
                  required
                >
                  <MenuItem value="film-commission">Film Commission / Government Agency</MenuItem>
                  <MenuItem value="streamer">Streamer / Studio</MenuItem>
                  <MenuItem value="equipment-rental">Equipment Rental Company</MenuItem>
                  <MenuItem value="production-services">Production Services Provider</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Organization Name"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Primary Use Case"
                  value={formData.useCase}
                  onChange={(e) => handleInputChange('useCase', e.target.value)}
                  placeholder="What are you trying to solve? What decisions will this data support?"
                  required
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          {!formSubmitted && (
            <>
              <Button
                onClick={() => setRfpDialogOpen(false)}
                sx={{
                  color: '#555555',
                  fontFamily: 'DM Sans, sans-serif',
                  textTransform: 'none',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitRfp}
                sx={{
                  bgcolor: '#F5C800',
                  color: '#000000',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#E5B800' },
                }}
              >
                Submit Request
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
