import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/app/contexts/AuthContext';
import exampleLogo from '@/assets/2ac5b205356b38916f5ff32008dfa103d8ffc2cb.png';

export function UserLogin() {
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await userLogin(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 6,
            bgcolor: '#0a0a0a',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            borderRadius: 3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img 
                src={exampleLogo} 
                alt="Prodculator" 
                style={{ height: '48px', width: 'auto' }}
              />
            </Box>
            <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: '#a0a0a0' }}>
              Sign in to your Prodculator account
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                bgcolor: 'rgba(244, 67, 54, 0.1)',
                color: '#f44336',
                border: '1px solid rgba(244, 67, 54, 0.3)',
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#a0a0a0' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ textAlign: 'right', mb: 4 }}>
              <Button
                sx={{
                  color: '#D4AF37',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password?
              </Button>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: '#D4AF37',
                color: '#000000',
                fontWeight: 700,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: '#E5C158',
                },
                '&:disabled': {
                  bgcolor: '#666',
                  color: '#a0a0a0',
                },
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>

          <Divider sx={{ my: 4, borderColor: 'rgba(212, 175, 55, 0.2)' }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 2 }}>
              Don't have an account?
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              fullWidth
              sx={{
                borderColor: '#D4AF37',
                color: '#D4AF37',
                fontWeight: 600,
                py: 1.2,
                '&:hover': {
                  borderColor: '#E5C158',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              Create Account
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              onClick={() => navigate('/')}
              sx={{
                color: '#a0a0a0',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#D4AF37',
                  bgcolor: 'transparent',
                },
              }}
            >
              ← Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}