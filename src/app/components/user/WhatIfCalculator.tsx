import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Container, Typography, Button, Slider, Chip, IconButton, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import logoBlack from '@/assets/ddbe9f875b0128308d18010a516a1a848d4b7b77.png';

export function WhatIfCalculator() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(4000000); // £4M
  const [vfxAllocation, setVfxAllocation] = useState(0); // 0%
  const [priority, setPriority] = useState<'incentive' | 'full' | 'location'>('full');

  const formatCurrency = (amount: number) => {
    return `£${(amount / 1000000).toFixed(1)}M`;
  };

  const formatLargeNumber = (amount: number) => {
    return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const territories = [
    {
      flag: '🇲🇹',
      name: 'Malta',
      badge: 'BEST VALUE',
      programme: 'Cash Rebate',
      rate: '40%',
      rateColor: '#111111',
      incentive: 1600000,
      incentiveColor: '#1A8C4E',
      currency: 840000,
      currencyColor: '#1A8C4E',
      crew: 620000,
      crewColor: '#1A8C4E',
      netSaving: 3060000,
      netColor: '#C9A227',
      minSpend: 'No minimum',
      payment: '3–6 months',
    },
    {
      flag: '🇭🇺',
      name: 'Hungary',
      programme: 'Film Tax Rebate',
      rate: '30%',
      rateColor: '#111111',
      incentive: 1200000,
      incentiveColor: '#1A8C4E',
      currency: 1040000,
      currencyColor: '#1A8C4E',
      crew: 876000,
      crewColor: '#1A8C4E',
      netSaving: 3116000,
      netColor: '#1A8C4E',
      minSpend: 'No minimum',
      payment: '3–6 months',
    },
    {
      flag: '🇿🇦',
      name: 'South Africa',
      programme: 'NFVF',
      rate: '35%',
      rateColor: '#C17D10',
      rateWarning: true,
      incentive: 840000,
      incentiveColor: '#C17D10',
      incentiveWarning: true,
      incentiveNote: 'Verify programme status',
      currency: 2760000,
      currencyColor: '#1A8C4E',
      currencyBold: true,
      crew: 980000,
      crewColor: '#1A8C4E',
      netSaving: 4580000,
      netColor: '#1A8C4E',
      minSpend: '$400K',
      payment: '6–18 months',
    },
    {
      flag: '🇬🇧',
      name: 'United Kingdom',
      programme: 'AVEC / IFTC',
      rate: '39.75%',
      rateColor: '#111111',
      incentive: 1590000,
      incentiveColor: '#1A8C4E',
      currency: null,
      crew: null,
      netSaving: 1590000,
      netColor: '#1A8C4E',
      minSpend: 'No minimum',
      payment: '3–6 months',
    },
    {
      flag: '🇫🇷',
      name: 'France',
      programme: 'TRIP',
      rate: '30%',
      rateColor: '#111111',
      incentive: 1200000,
      incentiveColor: '#1A8C4E',
      currency: 480000,
      currencyColor: '#1A8C4E',
      crew: 520000,
      crewColor: '#1A8C4E',
      netSaving: 2200000,
      netColor: '#1A8C4E',
      minSpend: '€250K',
      payment: '6–12 months',
    },
    {
      flag: '🇮🇪',
      name: 'Ireland',
      programme: 'Section 481',
      rate: '32%',
      rateColor: '#111111',
      incentive: 1280000,
      incentiveColor: '#1A8C4E',
      currency: 360000,
      currencyColor: '#1A8C4E',
      crew: 480000,
      crewColor: '#1A8C4E',
      netSaving: 2120000,
      netColor: '#1A8C4E',
      minSpend: '€1M',
      payment: '6–12 months',
    },
    {
      flag: '🇺🇸',
      name: 'Georgia, USA',
      programme: 'Film Tax Credit',
      rate: '30%',
      rateColor: '#111111',
      incentive: 1200000,
      incentiveColor: '#1A8C4E',
      currency: null,
      crew: 140000,
      crewColor: '#1A8C4E',
      netSaving: 1340000,
      netColor: '#1A8C4E',
      minSpend: 'No minimum',
      payment: '6–12 months',
    },
    {
      flag: '🇨🇿',
      name: 'Czech Republic',
      programme: 'Cash Rebate',
      rate: '20–28%',
      rateColor: '#111111',
      incentive: 960000,
      incentiveColor: '#1A8C4E',
      currency: 960000,
      currencyColor: '#1A8C4E',
      crew: 720000,
      crewColor: '#1A8C4E',
      netSaving: 2640000,
      netColor: '#1A8C4E',
      minSpend: 'No minimum',
      payment: '3–9 months',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#F8F6F0', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Navigation Bar */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Prodculator Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoBlack} alt="Prodculator" style={{ height: '32px', width: 'auto' }} />
            </Box>

            {/* Export Button */}
            <Button
              sx={{
                bgcolor: 'transparent',
                border: '1px solid rgba(245,200,0,0.4)',
                color: '#C9A227',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                height: '36px',
                px: 2.5,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'rgba(245,200,0,0.08)',
                  border: '1px solid rgba(245,200,0,0.6)',
                },
              }}
            >
              Export to Excel ↓
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: '28px',
              color: '#111111',
              mb: 1,
            }}
          >
            What-If Calculator
          </Typography>
          <Typography
            sx={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              color: '#555555',
            }}
          >
            Compare financial returns across 15 territories at your budget
          </Typography>
        </Box>

        {/* Sliders Card */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            p: 4,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Budget Slider */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#999999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 1,
                }}
              >
                Total Production Budget
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: '#111111',
                  mb: 2,
                }}
              >
                {formatCurrency(budget)}
              </Typography>
              <Slider
                value={budget}
                onChange={(_, value) => setBudget(value as number)}
                min={500000}
                max={50000000}
                step={100000}
                sx={{
                  color: '#F5C800',
                  height: 6,
                  '& .MuiSlider-track': {
                    bgcolor: '#F5C800',
                    border: 'none',
                  },
                  '& .MuiSlider-rail': {
                    bgcolor: 'rgba(0,0,0,0.08)',
                  },
                  '& .MuiSlider-thumb': {
                    bgcolor: '#F5C800',
                    width: 20,
                    height: 20,
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(245,200,0,0.16)',
                    },
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '11px',
                  color: '#999999',
                  mt: 1,
                }}
              >
                Range: £500K to £50M
              </Typography>
            </Box>

            {/* VFX Slider */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#999999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 1,
                }}
              >
                VFX Budget Allocation
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: '#111111',
                  mb: 2,
                }}
              >
                {vfxAllocation}%
              </Typography>
              <Slider
                value={vfxAllocation}
                onChange={(_, value) => setVfxAllocation(value as number)}
                min={0}
                max={60}
                step={1}
                sx={{
                  color: '#F5C800',
                  height: 6,
                  '& .MuiSlider-track': {
                    bgcolor: '#F5C800',
                    border: 'none',
                  },
                  '& .MuiSlider-rail': {
                    bgcolor: 'rgba(0,0,0,0.08)',
                  },
                  '& .MuiSlider-thumb': {
                    bgcolor: '#F5C800',
                    width: 20,
                    height: 20,
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(245,200,0,0.16)',
                    },
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '11px',
                  color: '#999999',
                  mt: 1,
                  fontStyle: 'italic',
                }}
              >
                UK +5%, France +10%, Georgia +10% when VFX &gt; 0
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Production Priority Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Tooltip
            title={
              <Box sx={{ p: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '13px', mb: 1, color: '#F5C800' }}>
                  Production Priority Options:
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#fff' }}>
                    Maximise Incentive
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#A0A7B8' }}>
                    Sorts territories by highest tax rebate/incentive percentage to maximize cash returns
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#fff' }}>
                    Full Picture
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#A0A7B8' }}>
                    Balances incentives, currency advantages, and crew costs for total net savings
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#fff' }}>
                    Location First
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: '#A0A7B8' }}>
                    Prioritizes territories matching your script's locations, then shows financial benefits
                  </Typography>
                </Box>
              </Box>
            }
            placement="left"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#1E2330',
                  border: '1px solid rgba(245,200,0,0.3)',
                  borderRadius: '8px',
                  maxWidth: '350px',
                  '& .MuiTooltip-arrow': {
                    color: '#1E2330',
                    '&::before': {
                      border: '1px solid rgba(245,200,0,0.3)',
                    },
                  },
                },
              },
            }}
          >
            <IconButton
              sx={{
                color: '#F5C800',
                width: '32px',
                height: '32px',
                '&:hover': {
                  bgcolor: 'rgba(245,200,0,0.1)',
                },
              }}
            >
              <InfoOutlined sx={{ fontSize: '18px' }} />
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '9999px',
              p: '3px',
              display: 'flex',
              gap: '2px',
            }}
          >
            <Button
              onClick={() => setPriority('incentive')}
              sx={{
                bgcolor: priority === 'incentive' ? '#F5C800' : 'transparent',
                color: priority === 'incentive' ? '#000000' : '#999999',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: priority === 'incentive' ? 700 : 400,
                fontSize: '13px',
                px: 3,
                py: 1,
                borderRadius: '9999px',
                textTransform: 'none',
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: priority === 'incentive' ? '#F5C800' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Maximise Incentive
            </Button>
            <Button
              onClick={() => setPriority('full')}
              sx={{
                bgcolor: priority === 'full' ? '#F5C800' : 'transparent',
                color: priority === 'full' ? '#000000' : '#999999',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: priority === 'full' ? 700 : 400,
                fontSize: '13px',
                px: 3,
                py: 1,
                borderRadius: '9999px',
                textTransform: 'none',
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: priority === 'full' ? '#F5C800' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Full Picture
            </Button>
            <Button
              onClick={() => setPriority('location')}
              sx={{
                bgcolor: priority === 'location' ? '#F5C800' : 'transparent',
                color: priority === 'location' ? '#000000' : '#999999',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: priority === 'location' ? 700 : 400,
                fontSize: '13px',
                px: 3,
                py: 1,
                borderRadius: '9999px',
                textTransform: 'none',
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: priority === 'location' ? '#F5C800' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Location First
            </Button>
          </Box>
        </Box>

        {/* Territory Comparison Table */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            mb: 4,
          }}
        >
          {/* Header Row */}
          <Box
            sx={{
              display: 'flex',
              bgcolor: 'rgba(245,200,0,0.1)',
              height: '44px',
              alignItems: 'center',
              px: 2,
              borderBottom: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            <Box sx={{ width: '200px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Territory
              </Typography>
            </Box>
            <Box sx={{ width: '160px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Programme
              </Typography>
            </Box>
            <Box sx={{ width: '110px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Incentive Rate
              </Typography>
            </Box>
            <Box sx={{ width: '130px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Est. Incentive
              </Typography>
            </Box>
            <Box sx={{ width: '150px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Currency Advantage
              </Typography>
            </Box>
            <Box sx={{ width: '110px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Crew Saving
              </Typography>
            </Box>
            <Box sx={{ width: '130px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                NET SAVING
              </Typography>
            </Box>
            <Box sx={{ width: '110px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Min Spend
              </Typography>
            </Box>
            <Box sx={{ width: '100px' }}>
              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Payment
              </Typography>
            </Box>
          </Box>

          {/* Data Rows */}
          {territories.map((territory, index) => (
            <Box
              key={territory.name}
              sx={{
                display: 'flex',
                bgcolor: index % 2 === 0 ? '#FFFFFF' : '#FAFAF8',
                height: '52px',
                alignItems: 'center',
                px: 2,
                borderBottom: '1px solid rgba(0,0,0,0.04)',
                '&:hover': {
                  bgcolor: 'rgba(245,200,0,0.04)',
                },
              }}
            >
              <Box sx={{ width: '200px', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '18px' }}>{territory.flag}</Typography>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#111111',
                  }}
                >
                  {territory.name}
                </Typography>
                {territory.badge && (
                  <Chip
                    label={territory.badge}
                    sx={{
                      bgcolor: '#F5C800',
                      color: '#000000',
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '10px',
                      height: '20px',
                      textTransform: 'uppercase',
                      borderRadius: '10px',
                    }}
                  />
                )}
              </Box>
              <Box sx={{ width: '160px' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: '#555555',
                  }}
                >
                  {territory.programme}
                </Typography>
              </Box>
              <Box sx={{ width: '110px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {territory.rateWarning && (
                    <Typography sx={{ fontSize: '14px', color: '#C17D10' }}>⚠</Typography>
                  )}
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: territory.rateColor,
                    }}
                  >
                    {territory.rate}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: '130px' }}>
                {territory.incentive ? (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {territory.incentiveWarning && (
                        <Typography sx={{ fontSize: '14px', color: '#C17D10' }}>⚠</Typography>
                      )}
                      <Typography
                        sx={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontWeight: 600,
                          fontSize: '14px',
                          color: territory.incentiveColor,
                        }}
                      >
                        {formatLargeNumber(territory.incentive)}
                      </Typography>
                    </Box>
                    {territory.incentiveNote && (
                      <Typography
                        sx={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontWeight: 400,
                          fontSize: '10px',
                          color: '#999999',
                          fontStyle: 'italic',
                        }}
                      >
                        {territory.incentiveNote}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#999999' }}>
                    —
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: '150px' }}>
                {territory.currency ? (
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: territory.currencyBold ? 700 : 600,
                      fontSize: '14px',
                      color: territory.currencyColor,
                    }}
                  >
                    {formatLargeNumber(territory.currency)}
                  </Typography>
                ) : (
                  <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#999999' }}>
                    —
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: '110px' }}>
                {territory.crew ? (
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: territory.crewColor,
                    }}
                  >
                    {formatLargeNumber(territory.crew)}
                  </Typography>
                ) : (
                  <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#999999' }}>
                    —
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: '130px' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: territory.netColor,
                  }}
                >
                  {formatLargeNumber(territory.netSaving)}
                </Typography>
              </Box>
              <Box sx={{ width: '110px' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: '#555555',
                  }}
                >
                  {territory.minSpend}
                </Typography>
              </Box>
              <Box sx={{ width: '100px' }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: '#555555',
                  }}
                >
                  {territory.payment}
                </Typography>
              </Box>
            </Box>
          ))}

          {/* Baseline Row */}
          <Box
            sx={{
              display: 'flex',
              bgcolor: '#F8F6F0',
              height: '52px',
              alignItems: 'center',
              px: 2,
              borderTop: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <Box sx={{ width: '200px' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '18px' }}>🇺🇸</Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#CCCCCC',
                    }}
                  >
                    USA — no incentive state
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '10px',
                    color: '#BBBBBB',
                  }}
                >
                  Comparison baseline — not a recommendation
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: '160px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                —
              </Typography>
            </Box>
            <Box sx={{ width: '110px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                —
              </Typography>
            </Box>
            <Box sx={{ width: '130px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                —
              </Typography>
            </Box>
            <Box sx={{ width: '150px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                —
              </Typography>
            </Box>
            <Box sx={{ width: '110px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                —
              </Typography>
            </Box>
            <Box sx={{ width: '130px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                £0
              </Typography>
            </Box>
            <Box sx={{ width: '110px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                —
              </Typography>
            </Box>
            <Box sx={{ width: '100px' }}>
              <Typography sx={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#CCCCCC' }}>
                —
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Studio Flexibility Panel */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(245,200,0,0.3)',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Icon */}
            <Typography sx={{ fontSize: '28px' }}>📦</Typography>

            {/* Content */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#111111',
                  }}
                >
                  Studio-Flexible Productions
                </Typography>
                <Chip
                  label="For INT-heavy scripts"
                  sx={{
                    bgcolor: 'rgba(245,200,0,0.15)',
                    color: '#C9A227',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '10px',
                    height: '22px',
                    textTransform: 'uppercase',
                    borderRadius: '11px',
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: '#555555',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                When 70%+ of your scenes are interior, location becomes a financial decision. Interiors can be
                built anywhere — meaning the best incentive return, currency advantage, and crew cost
                territories become your optimal choice.
              </Typography>

              {/* Stat Cards */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: '#F8F6F0',
                    borderRadius: '8px',
                    p: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#777777',
                      mb: 0.5,
                    }}
                  >
                    Hungary vs UK
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#1A8C4E',
                    }}
                  >
                    ~45% lower crew costs
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    bgcolor: '#F8F6F0',
                    borderRadius: '8px',
                    p: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#777777',
                      mb: 0.5,
                    }}
                  >
                    Malta
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#C9A227',
                    }}
                  >
                    40% cash rebate, fastest payment
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    bgcolor: '#F8F6F0',
                    borderRadius: '8px',
                    p: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#777777',
                      mb: 0.5,
                    }}
                  >
                    South Africa
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#1A8C4E',
                    }}
                  >
                    £1 = R23+ purchasing power
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
