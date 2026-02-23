import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import {
  CloudUpload,
  Assignment,
  Menu as MenuIcon,
} from '@mui/icons-material';
import exampleLogo from '@/assets/2ac5b205356b38916f5ff32008dfa103d8ffc2cb.png';
import grantifyBanner from '@/assets/524910a57dfd11f1e00b5b105577b194b5ba8e33.png';
const instagramIcon = '';
const linkedinIcon = '';
const facebookIcon = '';
const xIcon = '';
import { useAuth } from '@/app/contexts/AuthContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}  >
      {/* Atmospheric gradient effect */}
      <Box
        sx={{
          position: 'absolute',
          right: '-20%',
          top: '20%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <Box 
        sx={{ 
          bgcolor: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          py: 2,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img 
                src={exampleLogo} 
                alt="Prodculator" 
                style={{ height: '40px', width: 'auto' }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: { xs: 1, md: 3 }, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3, alignItems: 'center' }}>
                <Button 
                  variant="text"
                  onClick={() => navigate('/b2b')}
                  sx={{ 
                    color: '#000000',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(212, 175, 55, 0.08)',
                    }
                  }}
                >
                  B2B Solutions
                </Button>
                <Button 
                  variant="text"
                  onClick={() => navigate('/pricing')}
                  sx={{ 
                    color: '#000000',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(212, 175, 55, 0.08)',
                    }
                  }}
                >
                  Pricing
                </Button>
                <Button 
                  variant="text"
                  onClick={() => navigate('/faq')}
                  sx={{ 
                    color: '#000000',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(212, 175, 55, 0.08)',
                    }
                  }}
                >
                  FAQ
                </Button>
              </Box>
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="outlined"
                    onClick={() => navigate('/dashboard')}
                    sx={{ 
                      borderColor: '#D4AF37',
                      color: '#D4AF37',
                      fontWeight: 600,
                      px: { xs: 2, md: 3 },
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#E5C158',
                        bgcolor: 'rgba(212, 175, 55, 0.08)',
                      }
                    }}
                  >
                    Dashboard
                  </Button>
                  <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#000000',
                        fontWeight: 400,
                      }}
                    >
                      Plan: <Box component="span" sx={{ fontWeight: 600 }}>Free</Box>
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained"
                    onClick={() => navigate('/pricing')}
                    sx={{ 
                      bgcolor: '#D4AF37',
                      color: '#000000',
                      fontWeight: 700,
                      px: { xs: 2, md: 3 },
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#E5C158',
                      }
                    }}
                  >
                    Upgrade
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outlined"
                    onClick={() => navigate('/login')}
                    sx={{ 
                      borderColor: '#D4AF37',
                      color: '#D4AF37',
                      fontWeight: 600,
                      px: { xs: 2, md: 3 },
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#E5C158',
                        bgcolor: 'rgba(212, 175, 55, 0.08)',
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="contained"
                    onClick={() => navigate('/signup')}
                    sx={{ 
                      bgcolor: '#D4AF37',
                      color: '#000000',
                      fontWeight: 600,
                      px: { xs: 2, md: 3 },
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#E5C158',
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#000000',
                    fontWeight: 600,
                  }}
                >
                  PRODCULATOR
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.05)',
                  },
                  borderRadius: '4px',
                }}
                onClick={() => navigate('/admin')}
              >
                <MenuIcon sx={{ color: '#000000' }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto' }}>
            <Typography 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 4,
                letterSpacing: '-0.02em',
              }}
            >
              <Box component="span" sx={{ color: '#D4AF37' }}>Turn your</Box>
              {' '}
              <Box component="span" sx={{ color: '#ffffff' }}>script</Box>
              {' '}
              <Box component="span" sx={{ color: '#D4AF37' }}>into</Box>
              <br />
              <Box component="span" sx={{ color: '#ffffff' }}>Production intelligence</Box>
              <br />
              <Box component="span" sx={{ color: '#D4AF37', fontSize: '1.5rem' }}>with our Scripteligence tool</Box>
            </Typography>

            <Box sx={{ mb: 6 }}>
              <Typography 
                sx={{ 
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 700,
                  color: '#ffffff',
                  mb: 1,
                }}
              >
                Upload your script.
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 700,
                  color: '#D4AF37',
                  mb: 3,
                }}
              >
                Discover where it makes the most financial sense to shoot.
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  color: '#D4AF37',
                  lineHeight: 1.6,
                  maxWidth: '800px',
                  mx: 'auto',
                  px: { xs: 2, md: 0 },
                }}
              >
                Prodculator analyses your screenplay to generate location recommendations, incentive estimates, and production insights — all delivered in one clear report.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', px: { xs: 2, md: 0 } }}>
              <Button 
                variant="contained"
                size="large"
                onClick={() => navigate('/upload')}
                startIcon={<CloudUpload />}
                sx={{ 
                  bgcolor: '#ffffff',
                  color: '#000000',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  textTransform: 'none',
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  }
                }}
              >
                Upload Script
              </Button>
              <Button 
                variant="contained"
                size="large"
                onClick={() => navigate('/sample')}
                startIcon={<Assignment />}
                sx={{ 
                  bgcolor: '#ffffff',
                  color: '#000000',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  textTransform: 'none',
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  }
                }}
              >
                See Sample Report
              </Button>
            </Box>

            {/* Grantify Partnership Banner */}
            <Box
              sx={{
                mt: 6,
                p: '16px 24px',
                bgcolor: '#FDB913',
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <img 
                  src={grantifyBanner}
                  alt="In partnership with Grantify" 
                  style={{ 
                    height: '30px',
                    width: 'auto',
                  }} 
                />
              </Box>
              <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                <Typography sx={{ fontSize: 12, color: '#000000' }}>
                  To partner with us email{' '}
                  <Typography 
                    component="a" 
                    href="mailto:partners@prodculator.com"
                    sx={{ 
                      fontSize: 12,
                      fontWeight: 600, 
                      color: '#D4AF37',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    partners@prodculator.com
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          bgcolor: '#1a1a1a',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 3,
            }}
          >
            {/* Logo & Copyright */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <img 
                src={exampleLogo} 
                alt="Prodculator" 
                style={{ height: '35px', width: 'auto', marginBottom: '12px' }}
              />
              <Typography sx={{ fontSize: 13, color: '#a0a0a0' }}>
                © 2026 Prodculator. All rights reserved.
              </Typography>
            </Box>

            {/* Contact & Social */}
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography sx={{ fontSize: 14, color: '#D4AF37', fontWeight: 600, mb: 1.5 }}>
                Get in Touch
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#ffffff', mb: 0.5 }}>
                General:{' '}
                <Typography
                  component="a"
                  href="mailto:contact@prodculator.com"
                  sx={{
                    color: '#D4AF37',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  contact@prodculator.com
                </Typography>
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#ffffff', mb: 2 }}>
                Partnerships:{' '}
                <Typography
                  component="a"
                  href="mailto:partners@prodculator.com"
                  sx={{
                    color: '#D4AF37',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  partners@prodculator.com
                </Typography>
              </Typography>

              {/* Social Media Icons */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Box
                  component="a"
                  href="https://www.instagram.com/prodculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': { opacity: 0.7 },
                    transition: 'opacity 0.2s',
                  }}
                >
                  <img 
                    src={instagramIcon}
                    alt="Instagram" 
                    style={{ height: '24px', width: 'auto' }} 
                  />
                </Box>
                <Box
                  component="a"
                  href="https://www.facebook.com/prodculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': { opacity: 0.7 },
                    transition: 'opacity 0.2s',
                  }}
                >
                  <img 
                    src={facebookIcon}
                    alt="Facebook" 
                    style={{ height: '24px', width: 'auto' }} 
                  />
                </Box>
                <Box
                  component="a"
                  href="https://www.linkedin.com/company/prodculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': { opacity: 0.7 },
                    transition: 'opacity 0.2s',
                  }}
                >
                  <img 
                    src={linkedinIcon}
                    alt="LinkedIn" 
                    style={{ height: '24px', width: 'auto' }} 
                  />
                </Box>
                <Box
                  component="a"
                  href="https://x.com/prodculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': { opacity: 0.7 },
                    transition: 'opacity 0.2s',
                  }}
                >
                  <img 
                    src={xIcon}
                    alt="X" 
                    style={{ height: '24px', width: 'auto' }} 
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}