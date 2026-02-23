import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  Chip,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  CloudUpload,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';
import { useScript, ScriptMetadata } from '@/app/contexts/ScriptContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { InfoTip, TOOLTIP_TEXTS } from '@/app/components/common/InfoTip';
import exampleLogo from '@/assets/2ac5b205356b38916f5ff32008dfa103d8ffc2cb.png';

export function ScriptUpload() {
  const navigate = useNavigate();
  const { generateAnalysis, generatePreview } = useScript();
  const { isAuthenticated, user, hasUsedFreeReport, markFreeReportUsed } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('');
  const [format, setFormat] = useState('');
  const [country, setCountry] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [cameraEquipment, setCameraEquipment] = useState('');
  const [crewSize, setCrewSize] = useState('');
  const [principalCast, setPrincipalCast] = useState('');
  const [supportingCast, setSupportingCast] = useState('');
  const [filmingStart, setFilmingStart] = useState('');
  const [filmingDuration, setFilmingDuration] = useState('');
  
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Production Base fields
  const [productionBase, setProductionBase] = useState('uk');
  const [locationStrategy, setLocationStrategy] = useState('open-international');
  const [territoriesConsidering, setTerritoriesConsidering] = useState<string[]>(['uk', 'malta', 'hungary']);
  const [productionPriority, setProductionPriority] = useState('full-picture');

  // ✅ SECTION 2a: Genre options - expanded list (no pre-selection)
  const genreOptions = [
    'Action', 'Drama', 'Thriller', 'Comedy', 'Romance', 'Mystery', 'Horror', 
    'Sci-Fi', 'Fantasy', 'Historical', 'Period Drama', 'Crime', 'Noir', 
    'Adventure', 'Biopic', 'War', 'Heist', 'Documentary Drama', 'Family', 
    'Supernatural', 'Sports'
  ];

  // ✅ SECTION 2c: Format options - expanded list
  const formatOptions = [
    { value: 'feature', label: 'Feature Film' },
    { value: 'short', label: 'Short Film' },
    { value: 'series', label: 'TV Series' },
    { value: 'limited-series', label: 'Limited Series' },
    { value: 'miniseries', label: 'Mini-Series' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'docuseries', label: 'Docuseries' },
    { value: 'animated-feature', label: 'Animated Feature' },
    { value: 'animation-series', label: 'Animation Series' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'music-video', label: 'Music Video' },
    { value: 'interactive', label: 'Interactive' },
    { value: 'vr', label: 'VR' },
  ];

  // ✅ SECTION 2e: Camera equipment - full expanded list
  // ANNOTATION: Multi-select up to 3 cameras. Reflects real production practice.
  // Camera flags: Film (35mm/16mm) → lab processing costs; IMAX → certified facility availability; 
  // DJI Drone → permit requirements; multiple selections → combined transport & insurance costs
  const cameraOptions = [
    'ARRI Alexa 35',
    'ARRI Alexa Mini LF',
    'ARRI Alexa Classic',
    'RED V-RAPTOR',
    'RED KOMODO-X',
    'RED MONSTRO 8K',
    'Sony VENICE 2',
    'Sony FX9',
    'Sony FX6',
    'Blackmagic URSA Mini Pro 12K',
    'Blackmagic Pocket 6K',
    'Canon EOS C70',
    'Canon EOS C300 Mk III',
    'Panavision Millennium DXL2',
    'IMAX Digital',
    'Film — 35mm',
    'Film — 16mm',
    'DJI Ronin 4D (Drone/Aerial)',
    'Multiple',
    'TBD'
  ];

  // State/Province options based on country
  const usaStates = [
    'California', 'New York', 'Georgia', 'Louisiana', 'New Mexico', 'Texas',
    'North Carolina', 'Massachusetts', 'Illinois', 'Pennsylvania', 'Florida',
    'Oregon', 'Washington', 'Nevada', 'Utah', 'Colorado', 'Other'
  ];

  const canadaProvinces = [
    'British Columbia', 'Ontario', 'Quebec', 'Alberta', 'Manitoba',
    'Nova Scotia', 'Saskatchewan', 'New Brunswick', 'Other'
  ];

  const australiaStates = [
    'New South Wales', 'Victoria', 'Queensland', 'South Australia',
    'Western Australia', 'Tasmania', 'Other'
  ];

  // Get state/province options based on selected country
  const getStateProvinceOptions = () => {
    switch (country) {
      case 'usa': return usaStates;
      case 'canada': return canadaProvinces;
      case 'australia': return australiaStates;
      default: return [];
    }
  };

  // Show state/province field for countries with regional incentives
  const showStateProvince = ['usa', 'canada', 'australia'].includes(country);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, DOCX, or TXT file');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be under 10MB');
        return;
      }
      setFile(selectedFile);
      if (!title) setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      setError('');
    }
  };

  const validateForm = () => {
    if (!file) return 'Please upload a script file';
    if (!title) return 'Project title is required';
    if (genres.length === 0) return 'Please select at least one genre';
    if (!budgetRange) return 'Budget range is required';
    if (!format) return 'Format is required';
    if (!country) return 'Primary production country is required';
    if (!filmingStart) return 'Filming start date is required';
    if (!filmingDuration) return 'Filming duration is required';
    return null;
  };

  const handleGenerateReport = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (!isAuthenticated) {
      setEmailModalOpen(true);
    } else {
      if (!user || (user.plan === 'free' && user.reportsUsed >= 1)) {
        setError('You have used your free report. Please upgrade to continue.');
        navigate('/pricing');
        return;
      }
      runFullAnalysis();
    }
  };

  const runFullAnalysis = async () => {
    setProcessing(true);
    setError('');

    try {
      const metadata: ScriptMetadata = {
        title,
        genre: genres.join(', '),
        budget: budgetRange,
        format,
        country,
        stateProvince: stateProvince || undefined,
        cameraEquipment: cameraEquipment || undefined,
        crewSize: crewSize || undefined,
        principalCast: principalCast || undefined,
        supportingCast: supportingCast || undefined,
        filmingStart,
        filmingDuration,
      };

      await generateAnalysis(file!, metadata);
      navigate('/report/full');
    } catch (err: any) {
      setError(err.message || 'Failed to generate report. Please try again.');
      setProcessing(false);
    }
  };

  const handleFreePreview = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the Terms of Service and Privacy Policy to continue');
      return;
    }

    if (hasUsedFreeReport(email)) {
      setError('This email has already been used for a free preview. Please sign up to continue.');
      return;
    }

    setEmailModalOpen(false);
    setProcessing(true);
    setError('');

    try {
      const metadata: ScriptMetadata = {
        title,
        genre: genres.join(', '),
        budget: budgetRange,
        format,
        country,
        stateProvince: stateProvince || undefined,
        cameraEquipment: cameraEquipment || undefined,
        crewSize: crewSize || undefined,
        principalCast: principalCast || undefined,
        supportingCast: supportingCast || undefined,
        filmingStart,
        filmingDuration,
      };

      await generatePreview(file!, metadata);
      markFreeReportUsed(email);
      navigate('/report/preview');
    } catch (err: any) {
      console.error('Preview generation failed:', err);
      setError(err.message || 'Failed to generate preview. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh' }}>
      {/* Header */}
      <Box 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.98)', 
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img 
                src={exampleLogo} 
                alt="Prodculator" 
                style={{ height: '32px', width: 'auto', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
            </Box>
            <Button 
              startIcon={<ArrowBack />} 
              onClick={() => navigate('/')}
              sx={{
                color: '#000000',
                fontWeight: 500,
                '&:hover': { bgcolor: 'transparent' }
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 1, color: '#ffffff' }}>
          Production Analysis Engine
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#a0a0a0' }}>
          Upload your script to receive investor-ready intelligence reports on locations, incentives, and costs.
        </Typography>

        {processing && (
          <Paper sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: '#0a0a0a', border: '1px solid #D4AF37' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
              Analyzing script structure, production needs, and location efficiency…
            </Typography>
            <LinearProgress 
              sx={{ 
                my: 2,
                bgcolor: 'rgba(212, 175, 55, 0.2)',
                '& .MuiLinearProgress-bar': { bgcolor: '#D4AF37' }
              }} 
            />
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              Our AI is parsing your script for location cues and technical requirements. This takes ~30 seconds.
            </Typography>
          </Paper>
        )}

        {!processing && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(212, 24, 61, 0.1)', color: '#ff5555' }}>
                  {error}
                </Alert>
              )}

              {/* File Upload Section */}
              <Paper sx={{ p: 4, mb: 3, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <Box
                  sx={{
                    border: 2,
                    borderStyle: 'dashed',
                    borderColor: file ? '#4caf50' : 'rgba(212, 175, 55, 0.3)',
                    borderRadius: 1,
                    p: 4,
                    textAlign: 'center',
                    bgcolor: file ? 'rgba(76, 175, 80, 0.05)' : '#000000',
                    cursor: 'pointer',
                    '&:hover': { borderColor: '#D4AF37' },
                  }}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <input id="file-input" type="file" accept=".pdf,.docx,.txt" style={{ display: 'none' }} onChange={handleFileSelect} />
                  {file ? (
                    <>
                      <CheckCircle sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
                      <Typography variant="h6" sx={{ color: '#ffffff' }}>{file.name}</Typography>
                      <Button variant="outlined" sx={{ mt: 2, color: '#D4AF37', borderColor: '#D4AF37' }} onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove</Button>
                    </>
                  ) : (
                    <>
                      <CloudUpload sx={{ fontSize: 48, color: '#D4AF37', mb: 2 }} />
                      <Typography variant="h6" sx={{ color: '#ffffff' }}>Click to upload or drag and drop script</Typography>
                      <Typography variant="body2" sx={{ color: '#a0a0a0' }}>PDF, DOCX, or TXT (max 10MB)</Typography>
                    </>
                  )}
                </Box>
              </Paper>

              {/* Production Intelligence Inputs */}
              <Paper sx={{ p: 4, mb: 3, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, fontWeight: 600 }}>Production Intelligence Inputs</Typography>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      label="Project Title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Genre(s)</InputLabel>
                      <Select
                        multiple
                        value={genres}
                        onChange={(e: SelectChangeEvent<string[]>) => setGenres(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                        input={<OutlinedInput label="Genre(s)" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => <Chip key={value} label={value} size="small" sx={{ bgcolor: '#D4AF37', color: '#000' }} />)}
                          </Box>
                        )}
                      >
                        {genreOptions.map(g => (
                          <MenuItem key={g} value={g}>{g}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>
                        Budget Range
                        <InfoTip text={TOOLTIP_TEXTS.budgetRange} />
                      </InputLabel>
                      <Select 
                        value={budgetRange} 
                        label="Budget Range" 
                        onChange={(e) => setBudgetRange(e.target.value)}
                      >
                        {/* ✅ SECTION 2b: Budget Range - confirmed 6 options in GBP */}
                        <MenuItem value="under-500k">Under £500K</MenuItem>
                        <MenuItem value="500k-2m">£500K–£2M</MenuItem>
                        <MenuItem value="2m-5m">£2M–£5M</MenuItem>
                        <MenuItem value="5m-15m">£5M–£15M</MenuItem>
                        <MenuItem value="15m-30m">£15M–£30M</MenuItem>
                        <MenuItem value="30m-plus">£30M+</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Format</InputLabel>
                      <Select 
                        value={format} 
                        label="Format" 
                        onChange={(e) => setFormat(e.target.value)}
                      >
                        {formatOptions.map(f => (
                          <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Production Country</InputLabel>
                      <Select 
                        value={country} 
                        label="Production Country" 
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <MenuItem value="uk">United Kingdom</MenuItem>
                        <MenuItem value="canada">Canada</MenuItem>
                        <MenuItem value="usa">USA</MenuItem>
                        <MenuItem value="australia">Australia</MenuItem>
                        <MenuItem value="nz">New Zealand</MenuItem>
                        <MenuItem value="malta">Malta</MenuItem>
                        <MenuItem value="ireland">Ireland</MenuItem>
                        <MenuItem value="france">France</MenuItem>
                        <MenuItem value="germany">Germany</MenuItem>
                        <MenuItem value="spain">Spain</MenuItem>
                        <MenuItem value="czech">Czech Republic</MenuItem>
                        <MenuItem value="hungary">Hungary</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {showStateProvince && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>State/Province</InputLabel>
                        <Select 
                          value={stateProvince} 
                          label="State/Province" 
                          onChange={(e) => setStateProvince(e.target.value)}
                        >
                          {getStateProvinceOptions().map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  {/* Location Strategy */}
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ color: '#a0a0a0', fontWeight: 600, mb: 1.5 }}>
                        Location strategy
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        {[
                          { value: 'domestic', label: 'Shooting domestically' },
                          { value: 'open-international', label: 'Open to international' },
                          { value: 'specifically-international', label: 'Specifically international' },
                        ].map((strategy) => (
                          <Button
                            key={strategy.value}
                            variant={locationStrategy === strategy.value ? 'contained' : 'outlined'}
                            onClick={() => setLocationStrategy(strategy.value)}
                            sx={{
                              px: 2.5,
                              py: 1,
                              borderRadius: '20px',
                              textTransform: 'none',
                              fontSize: '0.95rem',
                              fontWeight: 500,
                              ...(locationStrategy === strategy.value ? {
                                bgcolor: '#D4AF37',
                                color: '#000000',
                                border: 'none',
                                '&:hover': { bgcolor: '#E5C158' },
                              } : {
                                borderColor: 'rgba(212, 175, 55, 0.5)',
                                color: '#D4AF37',
                                '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.1)' },
                              }),
                            }}
                          >
                            {strategy.label}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  {/* Territories Considering */}
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ color: '#a0a0a0', fontWeight: 600, mb: 1.5 }}>
                        Territories considering
                        <InfoTip text={TOOLTIP_TEXTS.territoriesConsidering} />
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {/* ✅ SECTION 2d: Full 15-territory list */}
                        {[
                          { value: 'uk', label: 'UK' },
                          { value: 'france', label: 'France' },
                          { value: 'ireland', label: 'Ireland' },
                          { value: 'malta', label: 'Malta' },
                          { value: 'hungary', label: 'Hungary' },
                          { value: 'czech', label: 'Czech Republic' },
                          { value: 'spain', label: 'Spain' },
                          { value: 'italy', label: 'Italy' }, // ✅ ADDED
                          { value: 'georgia', label: 'Georgia USA' },
                          { value: 'new-mexico', label: 'New Mexico USA' },
                          { value: 'new-york', label: 'New York State' }, // ✅ ADDED
                          { value: 'bc-canada', label: 'BC Canada' },
                          { value: 'australia', label: 'Australia' },
                          { value: 'new-zealand', label: 'New Zealand' }, // ✅ ADDED
                          { value: 'south-africa', label: 'South Africa' },
                          { value: 'portugal', label: 'Portugal' }, // ✅ ADDED
                          { value: 'morocco', label: 'Morocco*' }, // ✅ ADDED (emerging, verify incentive)
                          { value: 'serbia', label: 'Serbia' }, // ✅ ADDED
                          { value: 'romania', label: 'Romania' }, // ✅ ADDED
                          { value: 'open-all', label: 'Open to all' },
                        ].map((territory) => (
                          <Chip
                            key={territory.value}
                            label={territory.label}
                            onClick={() => {
                              // ✅ SECTION 10g: "Open to all" logic - de-emphasise other chips
                              if (territory.value === 'open-all') {
                                setTerritoriesConsidering(['open-all']);
                              } else if (territoriesConsidering.includes(territory.value)) {
                                setTerritoriesConsidering(territoriesConsidering.filter(t => t !== territory.value));
                              } else {
                                setTerritoriesConsidering([...territoriesConsidering.filter(t => t !== 'open-all'), territory.value]);
                              }
                            }}
                            sx={{
                              px: 1.5,
                              height: 32,
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                              ...(territoriesConsidering.includes(territory.value) ? {
                                bgcolor: '#D4AF37',
                                color: '#000000',
                                '&:hover': { bgcolor: '#E5C158' },
                              } : {
                                bgcolor: 'rgba(212, 175, 55, 0.1)',
                                color: '#D4AF37',
                                border: '1px solid rgba(212, 175, 55, 0.5)',
                                opacity: territoriesConsidering.includes('open-all') ? 0.5 : 1, // De-emphasise when "Open to all" selected
                                '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.2)' },
                              }),
                            }}
                          />
                        ))}
                      </Box>
                      {territoriesConsidering.includes('open-all') && (
                        <Typography variant="caption" sx={{ color: '#4caf50', display: 'block', mt: 1 }}>
                          We'll rank all 15 territories and recommend the best fit.
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  {/* Production Priority */}
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ color: '#a0a0a0', fontWeight: 600, mb: 1.5 }}>
                        Production priority
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {[
                          { value: 'max-incentive', label: 'Maximise incentive return' },
                          { value: 'full-picture', label: 'Full picture — financial, creative and quality', badge: 'DEFAULT' },
                          { value: 'creative-first', label: 'Location and creative fit first' },
                        ].map((priority) => (
                          <Box
                            key={priority.value}
                            onClick={() => setProductionPriority(priority.value)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              p: 1.5,
                              bgcolor: 'rgba(212, 175, 55, 0.05)',
                              border: productionPriority === priority.value ? '2px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.3)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.1)' },
                            }}
                          >
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: productionPriority === priority.value ? '6px solid #D4AF37' : '2px solid rgba(212, 175, 55, 0.5)',
                                flexShrink: 0,
                              }}
                            />
                            <Typography sx={{ flex: 1, fontWeight: 500, fontSize: '0.95rem', color: '#ffffff' }}>
                              {priority.label}
                            </Typography>
                            {priority.badge && (
                              <Chip
                                label={priority.badge}
                                size="small"
                                sx={{
                                  bgcolor: '#D4AF37',
                                  color: '#000000',
                                  fontWeight: 600,
                                  fontSize: '0.65rem',
                                  height: 20,
                                }}
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      type="date" 
                      label="Filming Start" 
                      InputLabelProps={{ shrink: true }} 
                      value={filmingStart} 
                      onChange={(e) => setFilmingStart(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Filming Duration (Weeks)" 
                      type="number" 
                      value={filmingDuration} 
                      onChange={(e) => setFilmingDuration(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Camera Equipment</InputLabel>
                      <Select 
                        value={cameraEquipment} 
                        label="Camera Equipment" 
                        onChange={(e) => setCameraEquipment(e.target.value)}
                      >
                        {cameraOptions.map(c => (
                          <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Crew Size" 
                      type="number" 
                      value={crewSize} 
                      onChange={(e) => setCrewSize(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Principal Cast" 
                      type="number" 
                      value={principalCast} 
                      onChange={(e) => setPrincipalCast(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      fullWidth 
                      label="Supporting Cast" 
                      type="number" 
                      value={supportingCast} 
                      onChange={(e) => setSupportingCast(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Generate Report Button */}
              <Paper sx={{ p: 4, bgcolor: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  onClick={handleGenerateReport}
                  sx={{ 
                    py: 2, 
                    fontSize: '1.1rem',
                    bgcolor: '#D4AF37',
                    color: '#000000',
                    fontWeight: 600,
                    '&:hover': { bgcolor: '#E5C158' }
                  }}
                >
                  {isAuthenticated ? 'Generate Intelligence Report' : 'See Free Preview Analysis'}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Email Modal for Free Preview */}
      <Dialog open={emailModalOpen} onClose={() => setEmailModalOpen(false)} PaperProps={{ sx: { bgcolor: '#1a1a1a', border: '1px solid #D4AF37' } }}>
        <DialogTitle sx={{ color: '#D4AF37' }}>Free Production Preview</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 3 }}>
            Get a teaser of your script's location ranking and tax incentive potential. Full reports require a professional account.
          </Typography>
          <TextField
            fullWidth
            label="Business Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} sx={{ color: '#D4AF37' }} />}
            label={
              <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                I agree to the Terms of Service and Privacy Policy. I understand this is a preview and non-commercial data.
              </Typography>
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEmailModalOpen(false)} sx={{ color: '#a0a0a0' }}>Cancel</Button>
          <Button variant="contained" onClick={handleFreePreview}>Get Free Preview</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}