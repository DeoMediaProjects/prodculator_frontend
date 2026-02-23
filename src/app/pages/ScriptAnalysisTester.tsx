import { Error as ErrorIcon,
} from '@mui/icons-material';
import scriptAnalysisService, { ScriptAnalysisResult } from '@/services/script-analysis.service';

export function ScriptAnalysisTester() {
  const [scriptText, setScriptText] = useState('');
  const [scriptTitle, setScriptTitle] = useState('Test Script');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ScriptAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestSample = async () => {
    setAnalyzing(true);
    setError(null);
    try {
      const analysis = await scriptAnalysisService.testAnalysis();
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!scriptText.trim()) {
      setError('Please enter a script');
      return;
    }

    setAnalyzing(true);
    setError(null);
    try {
      const analysis = await scriptAnalysisService.analyzeScript(
        scriptText,
        scriptTitle,
        { userProvidedGenre: 'Action' }
      );
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 700, mb: 1 }}>
          🧪 Script Analysis Service Tester
        </Typography>
        <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4 }}>
          Test the OpenAI GPT-4 integration for script analysis
        </Typography>

        {/* Test Controls */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#0a0a0a' }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={handleTestSample}
              disabled={analyzing}
            >
              Test with Sample Script
            </Button>
            {analyzing && <CircularProgress size={24} sx={{ color: '#D4AF37' }} />}
          </Box>

          <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
            Or paste your own script:
          </Typography>

          <TextField
            fullWidth
            label="Script Title"
            value={scriptTitle}
            onChange={(e) => setScriptTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={10}
            label="Script Text"
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            placeholder="Paste script here..."
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            onClick={handleAnalyze}
            disabled={analyzing || !scriptText.trim()}
          >
            Analyze My Script
          </Button>
        </Paper>

        {/* Error Display */}
        {error && (
          <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Results Display */}
        {result && (
          <Box>
            <Typography variant="h5" sx={{ color: '#D4AF37', fontWeight: 700, mb: 3 }}>
              Analysis Results
            </Typography>

            {/* Budget Estimate */}
            <Accordion defaultExpanded sx={{ bgcolor: '#0a0a0a', mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Budget Estimate
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ bgcolor: '#1a1a1a' }}>
                      <CardContent>
                        <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                          Estimated Range
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#ffffff' }}>
                          {result.budgetEstimate.range}
                        </Typography>
                        <Chip
                          label={result.budgetEstimate.category}
                          size="small"
                          sx={{ mt: 1, bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}
                        />
                        <Chip
                          label={`${result.budgetEstimate.confidence} confidence`}
                          size="small"
                          sx={{ mt: 1, ml: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                      Indicators:
                    </Typography>
                    {result.budgetEstimate.indicators.map((indicator, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CheckCircle sx={{ color: '#4caf50', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                          {indicator}
                        </Typography>
                      </Box>
                    ))}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Locations */}
            <Accordion sx={{ bgcolor: '#0a0a0a', mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Locations ({result.locations.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {result.locations.map((location, idx) => (
                  <Card key={idx} sx={{ bgcolor: '#1a1a1a', mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                        {location.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip label={location.type} size="small" />
                        <Chip label={`${location.frequency} scenes`} size="small" />
                        <Chip label={`${location.feasibility} feasibility`} size="small" />
                      </Box>
                      <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                        Primary Territory: {location.primaryTerritory || 'TBD'}
                      </Typography>
                      {location.alternativeTerritories && location.alternativeTerritories.length > 0 && (
                        <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                          Alternatives: {location.alternativeTerritories.join(', ')}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>

            {/* Territory Recommendations */}
            <Accordion sx={{ bgcolor: '#0a0a0a', mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Territory Recommendations
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {result.territoryRecommendations.map((territory, idx) => (
                  <Card key={idx} sx={{ bgcolor: '#1a1a1a', mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ color: '#ffffff' }}>
                          {territory.territory}
                        </Typography>
                        <Chip
                          label={`Score: ${territory.score}/100`}
                          sx={{ bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                        {territory.reasoning}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip label={`Incentive: ${territory.incentiveMatch}`} size="small" />
                        <Chip label={`Crew: ${territory.crewAvailability}`} size="small" />
                        <Chip label={`Infrastructure: ${territory.infrastructureMatch}`} size="small" />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </AccordionDetails>
            </Accordion>

            {/* Production Scale */}
            <Accordion sx={{ bgcolor: '#0a0a0a', mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Production Scale
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>Crew Size</Typography>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      {result.productionScale.crewSize}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                      {result.productionScale.crewSizeEstimate}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>Shooting Days</Typography>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      {result.productionScale.shootingDays} days
                    </Typography>
                    <Chip
                      label={`${result.productionScale.shootingDaysConfidence} confidence`}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>Complexity</Typography>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      {result.productionScale.complexity}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Equipment */}
            <Accordion sx={{ bgcolor: '#0a0a0a', mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Equipment Recommendations
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 2 }}>
                  {result.equipment.cameraEquipmentReasoning}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {result.equipment.cameraEquipment.map((camera, idx) => (
                    <Chip
                      key={idx}
                      label={camera.toUpperCase()}
                      sx={{ mr: 1, mb: 1, bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}
                    />
                  ))}
                </Box>
                {result.equipment.specialEquipment.length > 0 && (
                  <>
                    <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                      Special Equipment:
                    </Typography>
                    {result.equipment.specialEquipment.map((eq, idx) => (
                      <Chip key={idx} label={eq} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </>
                )}
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={`Stunts: ${result.equipment.stunts ? 'Yes' : 'No'}`}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`VFX: ${result.equipment.vfxComplexity}`}
                    size="small"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Cast */}
            <Accordion sx={{ bgcolor: '#0a0a0a', mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Cast Requirements
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>Principal Cast</Typography>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      {result.cast.principalCast}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>Supporting Cast</Typography>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      {result.cast.supportingCast}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>Background Extras</Typography>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      {result.cast.backgroundExtras}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                      {result.cast.extrasEstimate}
                    </Typography>
                  </Grid>
                </Grid>
                {result.cast.specialSkills.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#a0a0a0', mb: 1 }}>
                      Special Skills Required:
                    </Typography>
                    {result.cast.specialSkills.map((skill, idx) => (
                      <Chip key={idx} label={skill} size="small" sx={{ mr: 1 }} />
                    ))}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Comparables */}
            {result.comparables.length > 0 && (
              <Accordion sx={{ bgcolor: '#0a0a0a', mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                  <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                    Comparable Productions
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {result.comparables.map((comp, idx) => (
                    <Card key={idx} sx={{ bgcolor: '#1a1a1a', mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ color: '#ffffff' }}>
                          {comp.title} ({comp.year})
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                          {comp.similarity}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}

            {/* Raw Analysis */}
            <Accordion sx={{ bgcolor: '#0a0a0a' }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#D4AF37' }} />}>
                <Typography sx={{ color: '#D4AF37', fontWeight: 600 }}>
                  Raw Analysis (Debug)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  value={result.rawAnalysis}
                  InputProps={{ readOnly: true }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    },
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </Container>
    </Box>
  );
}