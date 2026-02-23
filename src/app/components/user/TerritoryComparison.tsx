import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  Compare,
  Download,
  Share,
  Add,
  Close,
  CheckCircle,
  Cancel,
  Info,
  ArrowBack,
} from '@mui/icons-material';
import exampleLogo from '@/assets/2ac5b205356b38916f5ff32008dfa103d8ffc2cb.png';

interface TerritoryData {
  id: string;
  name: string;
  country: string;
  level: 'National' | 'Regional' | 'Provincial' | 'State' | 'Local';
  taxRebate: string;
  postProductionRebate: string;
  minSpend: string;
  avgCrewCost: string;
  payrollTaxStatus: 'Exempt' | 'Taxable' | 'Partially Exempt';
  applicationFee: string;
  processingTime: string;
  laborRequirement: string;
  currency: string;
  lastVerified: string;
  highlights: string[];
  restrictions: string[];
}

const AVAILABLE_TERRITORIES: TerritoryData[] = [
  {
    id: 'georgia-us',
    name: 'Georgia',
    country: 'USA',
    level: 'State',
    taxRebate: '30%',
    postProductionRebate: '+10%',
    minSpend: '$500,000',
    avgCrewCost: '$850/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '$0',
    processingTime: '90-120 days',
    laborRequirement: '75% in-state crew',
    currency: 'USD',
    lastVerified: 'January 2026',
    highlights: [
      'No cap on rebate amount',
      'Post-production eligible',
      'Fast approval process',
      'Robust crew base',
    ],
    restrictions: [
      'Minimum 75% in-state labor',
      'Must pass GA promotional logo requirements',
    ],
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    country: 'UK',
    level: 'National',
    taxRebate: '25%',
    postProductionRebate: '+5%',
    minSpend: '£1,000,000',
    avgCrewCost: '£650/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '£0',
    processingTime: '60-90 days',
    laborRequirement: '10% UK/EEA crew minimum',
    currency: 'GBP',
    lastVerified: 'January 2026',
    highlights: [
      'Cultural test or UK co-production',
      'Interim and final relief available',
      'Strong VFX infrastructure',
      'Access to Europe locations',
    ],
    restrictions: [
      'Must pass cultural test',
      '10% UK/EEA labor requirement',
    ],
  },
  {
    id: 'canada-bc',
    name: 'British Columbia',
    country: 'Canada',
    level: 'Provincial',
    taxRebate: '28%',
    postProductionRebate: 'Included',
    minSpend: 'CAD $1,000,000',
    avgCrewCost: '$920/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: 'CAD $0',
    processingTime: '120-180 days',
    laborRequirement: '50% Canadian crew',
    currency: 'CAD',
    lastVerified: 'January 2026',
    highlights: [
      'Regional tax credit available',
      'Strong VFX sector',
      'Diverse filming locations',
      'Experienced crews',
    ],
    restrictions: [
      'Canadian content requirements',
      'CAVCO certification needed',
    ],
  },
  {
    id: 'malta',
    name: 'Malta',
    country: 'Malta',
    level: 'National',
    taxRebate: '40%',
    postProductionRebate: 'Included',
    minSpend: '€1,000,000',
    avgCrewCost: '€600/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: '€0',
    processingTime: '30-60 days',
    laborRequirement: 'No minimum',
    currency: 'EUR',
    lastVerified: 'January 2026',
    highlights: [
      'Highest rebate rate',
      'Fast processing',
      'Mediterranean locations',
      'Water tanks available',
    ],
    restrictions: [
      'Limited crew base for large productions',
      'Small territory',
    ],
  },
  {
    id: 'louisiana',
    name: 'Louisiana',
    country: 'USA',
    level: 'State',
    taxRebate: '25%',
    postProductionRebate: '+10%',
    minSpend: '$300,000',
    avgCrewCost: '$750/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '$0',
    processingTime: '90-120 days',
    laborRequirement: '60% in-state crew',
    currency: 'USD',
    lastVerified: 'January 2026',
    highlights: [
      'Lower minimum spend',
      'New Orleans crew base',
      'Diverse locations',
      'Transferable credits',
    ],
    restrictions: [
      'Annual program cap ($180M)',
      '60% in-state labor required',
    ],
  },
  {
    id: 'canada-on',
    name: 'Ontario',
    country: 'Canada',
    level: 'Provincial',
    taxRebate: '21.5%',
    postProductionRebate: '+10%',
    minSpend: 'CAD $1,000,000',
    avgCrewCost: '$950/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: 'CAD $0',
    processingTime: '120-180 days',
    laborRequirement: '50% Canadian crew',
    currency: 'CAD',
    lastVerified: 'January 2026',
    highlights: [
      'Toronto crew base',
      'Post-production bonus',
      'Robust infrastructure',
      'Regional bonus available',
    ],
    restrictions: [
      'CAVCO certification required',
      'Canadian content requirements',
    ],
  },
  // ===== UK REGIONAL =====
  {
    id: 'uk-scotland',
    name: 'Scotland',
    country: 'UK',
    level: 'Regional',
    taxRebate: '25%',
    postProductionRebate: '+5%',
    minSpend: '£500,000',
    avgCrewCost: '£600/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '£0',
    processingTime: '45-60 days',
    laborRequirement: '10% UK/EEA crew',
    currency: 'GBP',
    lastVerified: 'January 2026',
    highlights: [
      'Screen Scotland funding available',
      'Diverse locations (Highlands, Glasgow, Edinburgh)',
      'Strong crew base',
      'Production Growth Fund access',
    ],
    restrictions: [
      'Cultural test required',
      'Additional regional requirements',
    ],
  },
  {
    id: 'uk-wales',
    name: 'Wales',
    country: 'UK',
    level: 'Regional',
    taxRebate: '25%',
    postProductionRebate: '+5%',
    minSpend: '£500,000',
    avgCrewCost: '£580/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '£0',
    processingTime: '45-60 days',
    laborRequirement: '10% UK/EEA crew',
    currency: 'GBP',
    lastVerified: 'January 2026',
    highlights: [
      'Ffilm Cymru Wales funding',
      'Cardiff crew base',
      'BBC Wales facilities',
      'Lower crew costs than London',
    ],
    restrictions: [
      'Cultural test required',
      'Wales-specific spend requirements for regional funds',
    ],
  },
  {
    id: 'uk-northern-ireland',
    name: 'Northern Ireland',
    country: 'UK',
    level: 'Regional',
    taxRebate: '25%',
    postProductionRebate: '+5%',
    minSpend: '£500,000',
    avgCrewCost: '£550/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '£0',
    processingTime: '45-60 days',
    laborRequirement: '10% UK/EEA crew',
    currency: 'GBP',
    lastVerified: 'January 2026',
    highlights: [
      'Northern Ireland Screen funding',
      'Belfast studios (Titanic Studios)',
      'Game of Thrones legacy crew',
      'Competitive costs',
    ],
    restrictions: [
      'Cultural test required',
      'Regional funding application separate',
    ],
  },
  {
    id: 'uk-england',
    name: 'England',
    country: 'UK',
    level: 'Regional',
    taxRebate: '25%',
    postProductionRebate: '+5%',
    minSpend: '£1,000,000',
    avgCrewCost: '£700/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '£0',
    processingTime: '60-90 days',
    laborRequirement: '10% UK/EEA crew',
    currency: 'GBP',
    lastVerified: 'January 2026',
    highlights: [
      'London crew base (largest in UK)',
      'World-class studios (Pinewood, Shepperton)',
      'Creative England funding opportunities',
      'Strongest VFX infrastructure',
    ],
    restrictions: [
      'Cultural test required',
      'Higher costs than other UK regions',
    ],
  },
  {
    id: 'uk-yorkshire',
    name: 'Yorkshire',
    country: 'UK',
    level: 'Local',
    taxRebate: '25%',
    postProductionRebate: '+5%',
    minSpend: '£500,000',
    avgCrewCost: '£570/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '£0',
    processingTime: '45-60 days',
    laborRequirement: '10% UK/EEA crew',
    currency: 'GBP',
    lastVerified: 'January 2026',
    highlights: [
      'Yorkshire Content Fund (up to £1M)',
      'Screen Yorkshire support',
      'Leeds/Bradford crew base',
      'Diverse period & contemporary locations',
    ],
    restrictions: [
      'Cultural test required',
      'Must meet Yorkshire regional spend requirements',
    ],
  },
  // ===== USA STATES =====
  {
    id: 'california',
    name: 'California',
    country: 'USA',
    level: 'State',
    taxRebate: '20-25%',
    postProductionRebate: '+5%',
    minSpend: '$1,000,000',
    avgCrewCost: '$1,200/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: '$0',
    processingTime: '120-180 days',
    laborRequirement: '75% CA wages',
    currency: 'USD',
    lastVerified: 'January 2026',
    highlights: [
      'Hollywood infrastructure',
      'Largest crew base in US',
      'World-class post-production',
      'Diverse locations',
    ],
    restrictions: [
      'Annual cap ($330M)',
      'Competitive application process',
      'High living costs',
    ],
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    level: 'State',
    taxRebate: '30%',
    postProductionRebate: '+10%',
    minSpend: '$500,000',
    avgCrewCost: '$1,150/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: '$0',
    processingTime: '90-120 days',
    laborRequirement: '75% NY labor',
    currency: 'USD',
    lastVerified: 'January 2026',
    highlights: [
      'NYC crew base',
      'Steiner & Silvercup Studios',
      'Post-production incentives',
      'Upstate regional bonus available',
    ],
    restrictions: [
      'Annual cap ($700M)',
      '75% NY labor requirement',
      'High production costs',
    ],
  },
  {
    id: 'new-mexico',
    name: 'New Mexico',
    country: 'USA',
    level: 'State',
    taxRebate: '25-35%',
    postProductionRebate: 'Included',
    minSpend: '$0',
    avgCrewCost: '$800/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '$0',
    processingTime: '60-90 days',
    laborRequirement: 'No minimum',
    currency: 'USD',
    lastVerified: 'January 2026',
    highlights: [
      'No minimum spend',
      'Albuquerque Studios',
      'Lower costs than CA/NY',
      'No annual cap',
    ],
    restrictions: [
      'Smaller crew base',
      'Limited infrastructure compared to CA/NY',
    ],
  },
  {
    id: 'michigan',
    name: 'Michigan',
    country: 'USA',
    level: 'State',
    taxRebate: '30%',
    postProductionRebate: '+10%',
    minSpend: '$500,000',
    avgCrewCost: '$850/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '$0',
    processingTime: '90-120 days',
    laborRequirement: '50% MI labor',
    currency: 'USD',
    lastVerified: 'January 2026',
    highlights: [
      'Detroit crew base',
      'Michigan Film Studios',
      'Growing infrastructure',
      'Competitive rates',
    ],
    restrictions: [
      'Annual program cap',
      '50% Michigan labor requirement',
    ],
  },
  {
    id: 'pennsylvania',
    name: 'Pennsylvania',
    country: 'USA',
    level: 'State',
    taxRebate: '25-30%',
    postProductionRebate: 'Included',
    minSpend: '$500,000',
    avgCrewCost: '$900/day',
    payrollTaxStatus: 'Exempt',
    applicationFee: '$0',
    processingTime: '90-120 days',
    laborRequirement: '60% PA labor',
    currency: 'USD',
    lastVerified: 'January 2026',
    highlights: [
      'Philadelphia & Pittsburgh crew bases',
      'Diverse locations',
      'Strong post-production sector',
      'Additional city incentives available',
    ],
    restrictions: [
      'Annual cap ($70M)',
      '60% PA labor requirement',
    ],
  },
  // ===== CANADA PROVINCIAL =====
  {
    id: 'canada-quebec',
    name: 'Quebec',
    country: 'Canada',
    level: 'Provincial',
    taxRebate: '32%',
    postProductionRebate: '+16%',
    minSpend: 'CAD $500,000',
    avgCrewCost: '$880/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: 'CAD $0',
    processingTime: '120-180 days',
    laborRequirement: '50% Canadian crew',
    currency: 'CAD',
    lastVerified: 'January 2026',
    highlights: [
      'Montreal crew base',
      'Strong VFX sector',
      'French-language bonus available',
      'Lower costs than Toronto/Vancouver',
    ],
    restrictions: [
      'CAVCO certification required',
      'Language requirements for some regional funding',
    ],
  },
  {
    id: 'canada-manitoba',
    name: 'Manitoba',
    country: 'Canada',
    level: 'Provincial',
    taxRebate: '30-45%',
    postProductionRebate: 'Included',
    minSpend: 'CAD $500,000',
    avgCrewCost: '$800/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: 'CAD $0',
    processingTime: '90-120 days',
    laborRequirement: '50% Canadian crew',
    currency: 'CAD',
    lastVerified: 'January 2026',
    highlights: [
      'Winnipeg crew base',
      'Very competitive rates',
      'Up to 65% combined incentives',
      'Fast processing',
    ],
    restrictions: [
      'Smaller crew base',
      'CAVCO certification required',
    ],
  },
  {
    id: 'canada-nova-scotia',
    name: 'Nova Scotia',
    country: 'Canada',
    level: 'Provincial',
    taxRebate: '32%',
    postProductionRebate: '+5%',
    minSpend: 'CAD $500,000',
    avgCrewCost: '$750/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: 'CAD $0',
    processingTime: '90-120 days',
    laborRequirement: '50% Canadian crew',
    currency: 'CAD',
    lastVerified: 'January 2026',
    highlights: [
      'Halifax crew base',
      'Coastal locations',
      'Screen Nova Scotia support',
      'Lower costs',
    ],
    restrictions: [
      'Smaller crew base',
      'CAVCO certification required',
    ],
  },
  {
    id: 'canada-saskatchewan',
    name: 'Saskatchewan',
    country: 'Canada',
    level: 'Provincial',
    taxRebate: '45%',
    postProductionRebate: 'Included',
    minSpend: 'CAD $500,000',
    avgCrewCost: '$700/day',
    payrollTaxStatus: 'Taxable',
    applicationFee: 'CAD $0',
    processingTime: '90-120 days',
    laborRequirement: '50% Canadian crew',
    currency: 'CAD',
    lastVerified: 'January 2026',
    highlights: [
      'Highest provincial incentive in Canada',
      'Very low costs',
      'Regina/Saskatoon crew',
      'Prairie landscapes',
    ],
    restrictions: [
      'Limited crew base',
      'CAVCO certification required',
    ],
  },
  // ===== AUSTRALIA =====
  {
    id: 'australia',
    name: 'Australia',
    country: 'Australia',
    level: 'National',
    taxRebate: '40%',
    postProductionRebate: 'Included',
    minSpend: 'AUD $500,000',
    avgCrewCost: 'AUD $800/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'AUD $0',
    processingTime: '90-120 days',
    laborRequirement: 'Significant Australian Expenditure (SAE)',
    currency: 'AUD',
    lastVerified: 'January 2026',
    highlights: [
      'Producer Offset - 40% for features',
      'Location Offset available',
      'World-class facilities',
      'Diverse landscapes',
    ],
    restrictions: [
      'Must meet Significant Australian Content test',
      'Complex qualifying expenditure rules',
    ],
  },
  {
    id: 'australia-nsw',
    name: 'New South Wales',
    country: 'Australia',
    level: 'State',
    taxRebate: '10%',
    postProductionRebate: 'Included',
    minSpend: 'AUD $500,000',
    avgCrewCost: 'AUD $900/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'AUD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Minimum NSW spend required',
    currency: 'AUD',
    lastVerified: 'January 2026',
    highlights: [
      'Sydney crew base (largest in Australia)',
      'Made in NSW Fund',
      'Fox Studios Australia',
      'Stackable with Federal offset',
    ],
    restrictions: [
      'Competitive application process',
      'High production costs',
    ],
  },
  {
    id: 'australia-vic',
    name: 'Victoria',
    country: 'Australia',
    level: 'State',
    taxRebate: '10%',
    postProductionRebate: 'Included',
    minSpend: 'AUD $500,000',
    avgCrewCost: 'AUD $850/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'AUD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Minimum Victorian spend',
    currency: 'AUD',
    lastVerified: 'January 2026',
    highlights: [
      'Melbourne crew base',
      'VicScreen funding',
      'Docklands Studios',
      'Stackable with Federal offset',
    ],
    restrictions: [
      'Must demonstrate Victorian benefit',
      'Competitive application',
    ],
  },
  {
    id: 'australia-qld',
    name: 'Queensland',
    country: 'Australia',
    level: 'State',
    taxRebate: '15%',
    postProductionRebate: 'Included',
    minSpend: 'AUD $500,000',
    avgCrewCost: 'AUD $800/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'AUD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Minimum QLD spend',
    currency: 'AUD',
    lastVerified: 'January 2026',
    highlights: [
      'Gold Coast crew base',
      'Village Roadshow Studios',
      'Production Attraction Strategy',
      'Tropical & coastal locations',
    ],
    restrictions: [
      'Must meet Queensland spend thresholds',
      'Competitive application',
    ],
  },
  {
    id: 'australia-sa',
    name: 'South Australia',
    country: 'Australia',
    level: 'State',
    taxRebate: '10%',
    postProductionRebate: 'Included',
    minSpend: 'AUD $250,000',
    avgCrewCost: 'AUD $750/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'AUD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Minimum SA spend',
    currency: 'AUD',
    lastVerified: 'January 2026',
    highlights: [
      'Adelaide Studios',
      'Lower minimum spend',
      'Competitive costs',
      'South Australian Film Corporation support',
    ],
    restrictions: [
      'Smaller crew base',
      'Must demonstrate SA economic benefit',
    ],
  },
  {
    id: 'australia-wa',
    name: 'Western Australia',
    country: 'Australia',
    level: 'State',
    taxRebate: '15%',
    postProductionRebate: 'Included',
    minSpend: 'AUD $1,000,000',
    avgCrewCost: 'AUD $800/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'AUD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Minimum WA spend',
    currency: 'AUD',
    lastVerified: 'January 2026',
    highlights: [
      'Screenwest support',
      'Unique Western Australian landscapes',
      'Perth crew base',
      'Growing infrastructure',
    ],
    restrictions: [
      'Remote location',
      'Limited large-scale infrastructure',
    ],
  },
  // ===== NEW ZEALAND =====
  {
    id: 'new-zealand',
    name: 'New Zealand',
    country: 'New Zealand',
    level: 'National',
    taxRebate: '20-40%',
    postProductionRebate: 'Included',
    minSpend: 'NZD $15,000,000',
    avgCrewCost: 'NZD $700/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'NZD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Significant NZ Expenditure',
    currency: 'NZD',
    lastVerified: 'January 2026',
    highlights: [
      'Screen Production Grant (20-40%)',
      'Lord of the Rings legacy crew',
      'Wētā FX world-class VFX',
      'Diverse landscapes',
    ],
    restrictions: [
      'High minimum spend (NZD $15M)',
      'Must meet Significant NZ Content test',
    ],
  },
  {
    id: 'new-zealand-wellington',
    name: 'Wellington',
    country: 'New Zealand',
    level: 'Regional',
    taxRebate: '20-40%',
    postProductionRebate: 'Included',
    minSpend: 'NZD $15,000,000',
    avgCrewCost: 'NZD $750/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'NZD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Significant NZ Expenditure',
    currency: 'NZD',
    lastVerified: 'January 2026',
    highlights: [
      'Wētā FX & Wētā Workshop headquarters',
      'Stone Street Studios',
      'Strongest VFX in Southern Hemisphere',
      'Wellington Film Office support',
    ],
    restrictions: [
      'High minimum spend',
      'Competitive market',
    ],
  },
  {
    id: 'new-zealand-auckland',
    name: 'Auckland',
    country: 'New Zealand',
    level: 'Regional',
    taxRebate: '20-40%',
    postProductionRebate: 'Included',
    minSpend: 'NZD $15,000,000',
    avgCrewCost: 'NZD $720/day',
    payrollTaxStatus: 'Partially Exempt',
    applicationFee: 'NZD $0',
    processingTime: '60-90 days',
    laborRequirement: 'Significant NZ Expenditure',
    currency: 'NZD',
    lastVerified: 'January 2026',
    highlights: [
      'Kumeu Film Studios',
      'Auckland Film Studios',
      'Largest crew base in NZ',
      'Auckland Unlimited support',
    ],
    restrictions: [
      'High minimum spend',
      'Higher costs than Wellington',
    ],
  },
];

export function TerritoryComparison() {
  const [selectedTerritories, setSelectedTerritories] = useState<TerritoryData[]>([
    AVAILABLE_TERRITORIES[0], // Georgia
    AVAILABLE_TERRITORIES[1], // UK
  ]);

  const handleAddTerritory = (territoryId: string) => {
    const territory = AVAILABLE_TERRITORIES.find((t) => t.id === territoryId);
    if (territory && selectedTerritories.length < 4) {
      setSelectedTerritories([...selectedTerritories, territory]);
    }
  };

  const handleRemoveTerritory = (territoryId: string) => {
    if (selectedTerritories.length > 1) {
      setSelectedTerritories(selectedTerritories.filter((t) => t.id !== territoryId));
    }
  };

  const handleExportPDF = () => {
    alert('PDF export coming soon! This will generate a professional comparison report.');
  };

  const handleExportExcel = () => {
    alert('Excel export coming soon! This will generate a spreadsheet comparison.');
  };

  const handleShare = () => {
    alert('Share link coming soon! This will generate a shareable comparison URL.');
  };

  const availableToAdd = AVAILABLE_TERRITORIES.filter(
    (t) => !selectedTerritories.find((s) => s.id === t.id)
  );

  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.98)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
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
                '&:hover': { bgcolor: 'transparent' },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 6 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Compare sx={{ fontSize: 40, color: '#D4AF37', mr: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffffff' }}>
                Territory Comparison
              </Typography>
            </Box>
            
            {/* Explanation Box */}
            <Alert
              severity="info"
              icon={<Info />}
              sx={{
                mb: 3,
                bgcolor: 'rgba(212, 175, 55, 0.1)',
                color: '#D4AF37',
                border: '2px solid #D4AF37',
                '& .MuiAlert-icon': {
                  color: '#D4AF37',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                What are these territories?
              </Typography>
              <Typography variant="body2" sx={{ color: '#ffffff' }}>
                These are <strong>filming locations</strong> where you can shoot your production and receive tax incentives, rebates, and production support. 
                Compare territories like <strong>Wales vs British Columbia</strong>, <strong>Scotland vs New Zealand</strong>, or <strong>Queensland vs Georgia</strong> to find the best location 
                for your production based on rebate rates, crew costs, and infrastructure.
              </Typography>
            </Alert>

            <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 3 }}>
              Compare tax incentives, crew costs, and requirements side-by-side to make informed location decisions
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExportPDF}
                sx={{
                  bgcolor: '#D4AF37',
                  color: '#000000',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#E5C158' },
                }}
              >
                Export to PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExportExcel}
                sx={{
                  borderColor: '#D4AF37',
                  color: '#D4AF37',
                  '&:hover': { borderColor: '#E5C158', color: '#E5C158' },
                }}
              >
                Export to Excel
              </Button>
              <Button
                variant="outlined"
                startIcon={<Share />}
                onClick={handleShare}
                sx={{
                  borderColor: '#666',
                  color: '#a0a0a0',
                  '&:hover': { borderColor: '#D4AF37', color: '#D4AF37' },
                }}
              >
                Share Comparison
              </Button>
            </Box>
          </Box>

          {/* Add Territory */}
          {availableToAdd.length > 0 && selectedTerritories.length < 4 && (
            <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid #333', mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Add sx={{ color: '#D4AF37' }} />
                  <FormControl sx={{ minWidth: 350 }}>
                    <InputLabel sx={{ color: '#a0a0a0' }}>Add Territory to Compare</InputLabel>
                    <Select
                      label="Add Territory to Compare"
                      onChange={(e) => handleAddTerritory(e.target.value)}
                      value=""
                      sx={{
                        color: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                      }}
                    >
                      {/* UK Territories */}
                      <MenuItem disabled sx={{ color: '#D4AF37', fontWeight: 700 }}>
                        🇬🇧 UNITED KINGDOM
                      </MenuItem>
                      {availableToAdd
                        .filter((t) => t.country === 'UK')
                        .map((territory) => (
                          <MenuItem key={territory.id} value={territory.id} sx={{ pl: 4 }}>
                            {territory.name} ({territory.level})
                          </MenuItem>
                        ))}
                      
                      {/* Canada Territories */}
                      <MenuItem disabled sx={{ color: '#D4AF37', fontWeight: 700, mt: 1 }}>
                        🇨🇦 CANADA
                      </MenuItem>
                      {availableToAdd
                        .filter((t) => t.country === 'Canada')
                        .map((territory) => (
                          <MenuItem key={territory.id} value={territory.id} sx={{ pl: 4 }}>
                            {territory.name} ({territory.level})
                          </MenuItem>
                        ))}
                      
                      {/* USA Territories */}
                      <MenuItem disabled sx={{ color: '#D4AF37', fontWeight: 700, mt: 1 }}>
                        🇺🇸 USA
                      </MenuItem>
                      {availableToAdd
                        .filter((t) => t.country === 'USA')
                        .map((territory) => (
                          <MenuItem key={territory.id} value={territory.id} sx={{ pl: 4 }}>
                            {territory.name} ({territory.level})
                          </MenuItem>
                        ))}
                      
                      {/* Malta */}
                      <MenuItem disabled sx={{ color: '#D4AF37', fontWeight: 700, mt: 1 }}>
                        🇲🇹 MALTA
                      </MenuItem>
                      {availableToAdd
                        .filter((t) => t.country === 'Malta')
                        .map((territory) => (
                          <MenuItem key={territory.id} value={territory.id} sx={{ pl: 4 }}>
                            {territory.name} ({territory.level})
                          </MenuItem>
                        ))}
                      
                      {/* Australia */}
                      <MenuItem disabled sx={{ color: '#D4AF37', fontWeight: 700, mt: 1 }}>
                        🇦🇺 AUSTRALIA
                      </MenuItem>
                      {availableToAdd
                        .filter((t) => t.country === 'Australia')
                        .map((territory) => (
                          <MenuItem key={territory.id} value={territory.id} sx={{ pl: 4 }}>
                            {territory.name} ({territory.level})
                          </MenuItem>
                        ))}
                      
                      {/* New Zealand */}
                      <MenuItem disabled sx={{ color: '#D4AF37', fontWeight: 700, mt: 1 }}>
                        🇳🇿 NEW ZEALAND
                      </MenuItem>
                      {availableToAdd
                        .filter((t) => t.country === 'New Zealand')
                        .map((territory) => (
                          <MenuItem key={territory.id} value={territory.id} sx={{ pl: 4 }}>
                            {territory.name} ({territory.level})
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 600 }}>
                      {availableToAdd.length} territories available
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      (Max 4 territories for comparison)
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Comparison Table */}
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: '#0a0a0a',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              borderRadius: 2,
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(212, 175, 55, 0.1)' }}>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 700, fontSize: '1rem' }}>
                    Criteria
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell
                      key={territory.id}
                      sx={{
                        color: '#D4AF37',
                        fontWeight: 700,
                        fontSize: '1rem',
                        position: 'relative',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box>
                          <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 700 }}>
                            {territory.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                            {territory.country}
                          </Typography>
                        </Box>
                        {selectedTerritories.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveTerritory(territory.id)}
                            sx={{ color: '#666', '&:hover': { color: '#D4AF37' } }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Tax Rebate */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Tax Rebate
                      <Tooltip title="Base tax incentive rate">
                        <Info sx={{ fontSize: 16, color: '#666' }} />
                      </Tooltip>
                    </Box>
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ color: '#ffffff', borderBottom: '1px solid #333' }}>
                      <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                        {territory.taxRebate}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Post-Production Rebate */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Post-Production Bonus
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ color: '#ffffff', borderBottom: '1px solid #333' }}>
                      <Typography
                        sx={{
                          color: territory.postProductionRebate.includes('+') ? '#4CAF50' : '#a0a0a0',
                        }}
                      >
                        {territory.postProductionRebate}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Minimum Spend */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Minimum Spend
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ color: '#ffffff', borderBottom: '1px solid #333' }}>
                      {territory.minSpend}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Avg Crew Cost */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Avg Crew Cost
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ color: '#ffffff', borderBottom: '1px solid #333' }}>
                      {territory.avgCrewCost}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Payroll Tax Status */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Payroll Tax Status
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ borderBottom: '1px solid #333' }}>
                      <Chip
                        icon={territory.payrollTaxStatus === 'Exempt' ? <CheckCircle /> : <Cancel />}
                        label={territory.payrollTaxStatus}
                        size="small"
                        sx={{
                          bgcolor:
                            territory.payrollTaxStatus === 'Exempt'
                              ? 'rgba(76, 175, 80, 0.2)'
                              : 'rgba(244, 67, 54, 0.2)',
                          color:
                            territory.payrollTaxStatus === 'Exempt'
                              ? '#4CAF50'
                              : '#f44336',
                          border: `1px solid ${
                            territory.payrollTaxStatus === 'Exempt'
                              ? '#4CAF50'
                              : '#f44336'
                          }`,
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>

                {/* Labor Requirement */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Labor Requirement
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ color: '#ffffff', borderBottom: '1px solid #333' }}>
                      {territory.laborRequirement}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Processing Time */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Processing Time
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ color: '#ffffff', borderBottom: '1px solid #333' }}>
                      {territory.processingTime}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Application Fee */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Application Fee
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ color: '#ffffff', borderBottom: '1px solid #333' }}>
                      {territory.applicationFee}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Highlights */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700, borderBottom: '1px solid #333' }}>
                    Highlights
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id} sx={{ borderBottom: '1px solid #333' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {territory.highlights.map((highlight, idx) => (
                          <Typography key={idx} variant="body2" sx={{ color: '#4CAF50', fontSize: '0.875rem' }}>
                            ✓ {highlight}
                          </Typography>
                        ))}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Restrictions */}
                <TableRow>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 700 }}>
                    Restrictions
                  </TableCell>
                  {selectedTerritories.map((territory) => (
                    <TableCell key={territory.id}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {territory.restrictions.map((restriction, idx) => (
                          <Typography key={idx} variant="body2" sx={{ color: '#ff9800', fontSize: '0.875rem' }}>
                            ⚠ {restriction}
                          </Typography>
                        ))}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Data Disclaimer */}
          <Alert
            severity="info"
            sx={{
              mt: 3,
              bgcolor: 'rgba(33, 150, 243, 0.1)',
              color: '#2196F3',
              border: '1px solid rgba(33, 150, 243, 0.3)',
            }}
          >
            <Typography variant="body2">
              <strong>Data Disclaimer:</strong> All rebate rates, crew costs, and requirements are indicative estimates. 
              Last verified: January 2026. Always verify with official sources and consult tax professionals before making production decisions.
            </Typography>
          </Alert>
        </Container>
      </Box>
    </Box>
  );
}