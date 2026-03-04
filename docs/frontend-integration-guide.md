# Production Analysis Engine — Frontend Integration Guide

This document tells the frontend team exactly how to integrate with the Production Analysis Engine API. It covers every endpoint, request/response shape, polling logic, and UI gating rules.

---

## 1. Two Report Modes

| Mode | `report_type` value | Auth required | Script upload required | Response style |
|------|-------------------|---------------|----------------------|----------------|
| **Free Preview** | `"preview"` | No | No | **Synchronous** — analysis returned directly in POST response |
| **Full Report** | `"paid"` | Yes (Bearer token) | Yes | **Async** — POST returns `reportId`, then poll for status |
| **B2B Report** | `"b2b"` | Yes (Bearer token) | Yes | **Async** — same as paid, with additional `productionIntelligence` section |

---

## 2. Input Form Fields

The frontend collects these fields before calling `POST /api/reports`. All fields use **snake_case** in the request body.

### Required Fields

| Field | Type | Allowed Values |
|-------|------|---------------|
| `script_title` | `string` | Free text project name |
| `report_type` | `string` | `"preview"`, `"paid"`, `"b2b"` |
| `genre` | `string[]` | Multi-select: `"Drama"`, `"Thriller"`, `"Sci-Fi"`, `"Horror"`, `"Comedy"`, `"Romance"`, `"Action"`, `"Adventure"`, `"Fantasy"`, `"Mystery"`, `"Documentary"`, `"Biopic"`, `"Period"`, `"Western"`, `"Animation"`, `"Musical"`, `"Crime"`, `"War"`, `"Sports"`, `"Family"` |
| `budget_range` | `string` | One of: `"<500k"`, `"500k-2m"`, `"2m-5m"`, `"5m-15m"`, `"15m-30m"`, `"30m+"` (GBP) |
| `format` | `string` | One of: `"Feature Film"`, `"Short"`, `"TV Series"`, `"Limited Series"`, `"Mini-Series"`, `"Documentary"`, `"Docuseries"`, `"Animated Feature"`, `"Animation Series"`, `"Commercial"`, `"Music Video"`, `"Interactive"`, `"VR"` |
| `country` | `string` | One of: `"UK"`, `"Canada"`, `"USA"`, `"Australia"`, `"Malta"`, `"Ireland"`, `"France"`, `"Germany"`, `"Spain"`, `"Czech Republic"`, `"Hungary"`, `"Other"` |
| `location_strategy` | `string` | One of: `"domestic"`, `"open"`, `"international"` |
| `production_priority` | `string` | One of: `"incentive"`, `"full"`, `"location"` — defaults to `"full"` |

### Conditional Fields

| Field | Type | When to collect |
|-------|------|----------------|
| `script_file_path` | `string` | **Required** for `"paid"` and `"b2b"` report types. This is the path returned by `POST /api/scripts/upload`. Not needed for preview. |
| `state_province` | `string` | Only show when `country` is `"USA"`, `"Canada"`, or `"Australia"` |

### Optional Fields

| Field | Type | Notes |
|-------|------|-------|
| `territories_considering` | `string[]` | Chips: `"UK"`, `"France"`, `"Malta"`, `"Hungary"`, `"Czech Republic"`, `"Spain"`, `"Italy"`, `"Georgia (USA)"`, `"New Mexico"`, `"New York"`, `"British Columbia"`, `"Australia"`, `"New Zealand"`, `"South Africa"`, `"Portugal"`, `"Morocco"`, `"Serbia"`, `"Romania"`, `"Open to all"` |
| `filming_start_date` | `string` | ISO date string (e.g. `"2026-06-15"`) |
| `filming_duration` | `number` | Weeks on set |
| `camera_equipment` | `string[]` | Multi-select: `"ARRI Alexa 35"`, `"RED V-RAPTOR"`, `"Sony VENICE 2"`, `"Film 35mm"`, `"Blackmagic Cinema"`, `"Canon C70"`, `"Sony FX9"`, `"Panavision"`, `"IMAX"`, `"DJI Drone"`, `"GoPro"`, `"iPhone"`, `"Sony Alpha"`, `"Sony A7S III"`, `"Canon EOS R5"`, `"Phantom High Speed"`, `"Kinefinity Terra"`, `"Other"` |
| `crew_size` | `number` | Estimated total crew headcount |
| `principal_cast` | `number` | Number of lead actors |
| `supporting_cast` | `number` | Number of supporting actors |
| `target_audience` | `string` | Free text (e.g. `"18-34, arthouse"`) |
| `language` | `string` | Primary language(s) |

---

## 3. API Endpoints

### 3.1 Upload Script (prerequisite for paid reports)

```
POST /api/scripts/upload
Headers: { Authorization: "Bearer <token>" }
Body: FormData with file field
Response: { path: string, filename: string }
```

The returned `path` is what you pass as `script_file_path` in the report creation request.

---

### 3.2 Create Report — `POST /api/reports`

#### Preview Mode (synchronous)

No auth token required. No script upload needed.

```json
// Request
POST /api/reports
Content-Type: application/json

{
  "script_title": "The Harbor",
  "report_type": "preview",
  "genre": ["Thriller", "Drama"],
  "budget_range": "5m-15m",
  "format": "Feature Film",
  "country": "UK",
  "location_strategy": "open",
  "production_priority": "full",
  "territories_considering": ["UK", "Malta", "Hungary"]
}
```

```json
// Response (200) — returned immediately (typically 10-25 seconds)
{
  "reportType": "preview",
  "analysis": {
    "genre": "Thriller",
    "tone": "Tense maritime thriller with noir elements",
    "scale": "Mid-budget international feature",
    "complexity": "High",
    "locationRankings": [
      {
        "name": "United Kingdom",
        "country": "United Kingdom",
        "score": 78,
        "costEfficiency": 65,
        "crewDepth": 90,
        "infrastructure": 85,
        "incentiveStrength": 70,
        "currencyAdvantage": 50,
        "reasoning": [
          "Strong crew depth for thriller productions",
          "UK Film Tax Relief offers 25% rebate on qualifying spend",
          "Excellent post-production facilities in London and Manchester"
        ],
        "isAssessmentOnly": true
      }
      // ... 2 more territories (max 3 for preview)
    ],
    "incentiveEstimates": [ /* estimates for the 3 ranked territories */ ],
    "crewInsights": [],
    "comparables": [],
    "weatherLogistics": [],
    "fundingOpportunities": []
  }
}
```

**Key behaviours:**
- Response returns directly (no polling needed)
- `locationRankings` capped at 3 entries, all with `isAssessmentOnly: true`
- `incentiveEstimates` populated for the 3 ranked territories
- `crewInsights`, `comparables`, `weatherLogistics`, `fundingOpportunities` are always empty arrays `[]`
- No report is stored in the database — no `reportId` returned
- No PDF generated

---

#### Paid / B2B Mode (asynchronous)

Requires Bearer token. Requires prior script upload.

```json
// Request
POST /api/reports
Headers: { Authorization: "Bearer <token>" }
Content-Type: application/json

{
  "script_title": "The Harbor",
  "report_type": "paid",
  "script_file_path": "user-abc/1709312400.pdf",
  "genre": ["Thriller", "Drama"],
  "budget_range": "5m-15m",
  "format": "Feature Film",
  "country": "UK",
  "location_strategy": "open",
  "production_priority": "incentive",
  "territories_considering": ["UK", "Malta", "Hungary"],
  "filming_start_date": "2026-06-15",
  "filming_duration": 8,
  "camera_equipment": ["ARRI Alexa 35", "DJI Drone"],
  "crew_size": 85,
  "principal_cast": 4,
  "supporting_cast": 12
}
```

```json
// Response (200)
{
  "status": "processing",
  "report_id": "a1b2c3d4-e5f6-...",
  "message": "Report generation started"
}
```

---

### 3.3 Poll Status — `GET /api/reports/{reportId}/status`

```
GET /api/reports/a1b2c3d4-e5f6-.../status
Headers: { Authorization: "Bearer <token>" }
```

```json
// Response while processing
{ "status": "processing", "report_id": "a1b2c3d4-e5f6-...", "message": "Report generation in progress" }

// Response when complete
{ "status": "completed", "report_id": "a1b2c3d4-e5f6-...", "message": "Report generation completed" }

// Response on failure
{ "status": "failed", "report_id": "a1b2c3d4-e5f6-...", "message": "Report generation failed", "error": "..." }
```

**Polling rules:**
- Poll every **3 seconds**
- **Timeout after 180 seconds** (60 polls). If still `"processing"` after 3 minutes, show an error to the user
- Stop polling on `"completed"` or `"failed"`
- On `"completed"`, fetch the full report via `GET /api/reports/{reportId}`

---

### 3.4 Fetch Completed Report — `GET /api/reports/{reportId}`

```
GET /api/reports/a1b2c3d4-e5f6-...
Headers: { Authorization: "Bearer <token>" }
```

```json
// Response (200)
{
  "id": "a1b2c3d4-e5f6-...",
  "title": "The Harbor",
  "reportType": "paid",
  "createdAt": "2026-03-02T14:30:00+00:00",
  "pdfUrl": "/api/storage/reports/user-abc/a1b2c3d4.pdf",
  "analysis": {
    "genre": "Thriller",
    "tone": "Tense maritime thriller with noir elements",
    "scale": "Mid-budget international feature",
    "complexity": "High",
    "locationRankings": [ /* up to 15 territories, isAssessmentOnly: false */ ],
    "incentiveEstimates": [ /* one per incentive program across ranked territories */ ],
    "crewInsights": [ /* one per ranked territory */ ],
    "comparables": [ /* 5-8 matching productions */ ],
    "weatherLogistics": [ /* one per ranked territory */ ],
    "fundingOpportunities": [ /* mix of grants and festivals */ ]
  }
}
```

---

### 3.5 List User Reports — `GET /api/reports`

```
GET /api/reports
Headers: { Authorization: "Bearer <token>" }
```

Returns an array of `ReportResponse` objects. Preview reports are **excluded** from this list.

---

### 3.6 Get PDF — `GET /api/reports/{reportId}/pdf`

```
GET /api/reports/a1b2c3d4-e5f6-.../pdf
Headers: { Authorization: "Bearer <token>" }
```

```json
{ "pdf_url": "/api/storage/reports/user-abc/a1b2c3d4.pdf" }
```

Only available for paid/b2b reports. Returns 404 if PDF hasn't been generated yet.

---

### 3.7 Shared Report (public) — `GET /api/reports/shared/{shareToken}`

No auth required. Returns the same `ReportResponse` shape.

---

## 4. TypeScript Interfaces

Copy these into your frontend codebase. They match the backend output exactly.

```typescript
// POST /api/reports response for preview
interface PreviewReportResponse {
  reportType: "preview";
  analysis: ScriptAnalysis;
}

// POST /api/reports response for paid/b2b
interface ReportStatusResponse {
  status: "processing" | "completed" | "failed";
  report_id: string;
  message: string | null;
  error: string | null;
  progress: number | null;
}

// GET /api/reports/{id} response
interface ReportResponse {
  id: string;
  title: string;
  reportType: "paid" | "b2b";
  createdAt: string;
  analysis: ScriptAnalysis | null;
  pdfUrl: string | null;
}

// The main analysis payload
interface ScriptAnalysis {
  genre: string;
  tone: string;
  scale: string;
  complexity: "Low" | "Medium" | "High" | "Very High";
  locationRankings: LocationRanking[];
  incentiveEstimates: IncentiveEstimate[];
  crewInsights: CrewInsight[];              // empty [] for preview
  comparables: ComparableProduction[];      // empty [] for preview
  weatherLogistics: WeatherLogistics[];     // empty [] for preview
  fundingOpportunities: FundingOpportunity[]; // empty [] for preview
}

interface LocationRanking {
  name: string;
  country: string;
  score: number;               // 0–100
  costEfficiency: number;      // 0–100
  crewDepth: number;           // 0–100
  infrastructure: number;      // 0–100
  incentiveStrength: number;   // 0–100
  currencyAdvantage: number;   // 0–100
  reasoning: string[];         // 3–5 bullet points
  isAssessmentOnly?: boolean;  // true for preview, false/absent for paid
}

interface IncentiveEstimate {
  territory: string;
  program: string;
  rate: string;                // e.g. "25%"
  cap: string;                 // e.g. "No cap", "€500,000"
  qualifyingSpend: string;     // e.g. "£1M minimum UK spend"
  estimatedRebate: string;     // e.g. "£2,500,000"
  requirements: string[];      // 3–5 eligibility criteria
  disclaimer: string;          // always present
  dataSource: string;
  lastUpdated: string;         // ISO timestamp
}

interface CrewInsight {
  territory: string;
  availability: "High" | "Medium" | "Low";
  costVsUSD: string;           // e.g. "£3,200/day"
  qualityRating: number;       // 1–5
  specialties: string[];       // up to 5 crew roles
  tradeoff: string;            // one sentence
}

interface ComparableProduction {
  title: string;
  genre: string;
  budgetRange: string;         // e.g. "£5M–£15M"
  visualScale: string;         // e.g. "Intimate drama"
  location: string;
  year: number;
  source: string;              // e.g. "IMDb", "TMDB"
}

interface WeatherLogistics {
  territory: string;
  bestMonths: string[];        // e.g. ["Apr", "May", "Sep"]
  weatherRisk: "Low" | "Medium" | "High";
  infrastructure: string;
  travelVisa: string;
  avgTempRange?: string;
  avgRainfall?: string;
  daylightHours?: string;
  seasonalConsiderations?: string;
}

interface FundingOpportunity {
  type: "Fund" | "Festival";
  name: string;
  genre: string[];
  deadline: string;
  notes: string;
  website?: string;
  tier?: string;               // festivals only: "A-List", "Tier 2", "Regional", "Specialized"
}
```

---

## 5. UI Gating — What to Show Per Plan

| Section | Preview (free) | Paid | B2B |
|---------|---------------|------|-----|
| Script Intelligence (genre, tone, scale, complexity) | Visible | Visible | Visible |
| Location Rankings | Top 3 with "Assessment Only" badge | Up to 15, full data | Up to 15, full data |
| Tax Incentive Estimates | Show blurred / "Estimate Only" label | Full detail | Full detail |
| Crew & Costs | Locked overlay — "Upgrade to unlock" | Visible | Visible |
| Comparable Productions | Locked overlay | Visible | Visible |
| Weather & Logistics | Locked overlay | Visible | Visible |
| Funding & Festivals | Locked overlay | Visible | Visible |
| PDF Export | Disabled | Enabled | Enabled |

### How to detect each mode

```typescript
// After POST /api/reports
if (response.reportType === "preview") {
  // Synchronous preview — render immediately from response.analysis
  // Show locked overlays for paid-only sections
}

// After GET /api/reports/{id}
if (report.reportType === "paid" || report.reportType === "b2b") {
  // Full report — all sections populated
  // Show PDF download button if report.pdfUrl exists
}
```

### Checking if sections are empty (for locked overlays)

The backend returns empty arrays for gated sections in preview mode. Use array length to determine overlay state:

```typescript
const isPaidSection = (arr: any[]) => arr.length === 0;

// Show locked overlay if:
isPaidSection(analysis.crewInsights)         // -> true for preview
isPaidSection(analysis.comparables)          // -> true for preview
isPaidSection(analysis.weatherLogistics)     // -> true for preview
isPaidSection(analysis.fundingOpportunities) // -> true for preview
```

### Assessment-only badge on locations

```typescript
// For each location ranking in preview mode:
if (ranking.isAssessmentOnly) {
  // Show "Assessment Only" badge on this territory card
}
```

### Blurred incentive estimates in preview

The backend returns real `incentiveEstimates` data even in preview mode (for the 3 ranked territories). The frontend should render these but apply a blur/overlay with an "Upgrade for full details" CTA.

---

## 6. Suggested Frontend Flow

### Free Preview Flow (no auth)

```
1. User fills out metadata form (no script upload)
2. User clicks "Get Free Preview"
3. POST /api/reports with report_type: "preview"
4. Show loading spinner (expect 10-25 second wait)
5. Response arrives → render analysis directly
6. Show location rankings (3) with "Assessment Only" badges
7. Show blurred incentive estimates
8. Show locked overlays on crew, comparables, weather, funding sections
9. Show "Upgrade to unlock full report" CTA
```

### Paid Report Flow (authenticated)

```
1. User uploads script via POST /api/scripts/upload → get script_file_path
2. User fills out metadata form
3. User clicks "Generate Full Report"
4. POST /api/reports with report_type: "paid" + script_file_path
5. Receive { report_id, status: "processing" }
6. Show progress UI / loading animation
7. Poll GET /api/reports/{report_id}/status every 3 seconds
8. On "completed" → GET /api/reports/{report_id}
9. Render full report with all sections
10. Show PDF download button
11. On "failed" → show error message from response.error
12. On timeout (180s) → show "Report is taking longer than expected" message
```

### Polling Implementation

```typescript
async function pollReportStatus(reportId: string, token: string): Promise<ReportResponse> {
  const MAX_POLLS = 60;       // 60 * 3s = 180s
  const POLL_INTERVAL = 3000; // 3 seconds

  for (let i = 0; i < MAX_POLLS; i++) {
    const res = await fetch(`/api/reports/${reportId}/status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data: ReportStatusResponse = await res.json();

    if (data.status === "completed") {
      // Fetch the full report
      const reportRes = await fetch(`/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return reportRes.json();
    }

    if (data.status === "failed") {
      throw new Error(data.error || "Report generation failed");
    }

    // Still processing — wait and poll again
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }

  throw new Error("Report generation timed out");
}
```

---

## 7. Error Handling

| HTTP Status | Meaning | Frontend Action |
|-------------|---------|-----------------|
| `200` | Success | Render response |
| `400` | Validation error (missing required field) | Show field-level errors |
| `401` | No auth token (for paid/b2b) | Redirect to login |
| `403` | Report belongs to another user | Show "Access denied" |
| `404` | Report not found | Show "Report not found" |
| `422` | Invalid field value (e.g. bad enum) | Show validation errors from `response.detail` |
| `500` | Server error | Show generic error, suggest retry |

Validation errors (422) return:
```json
{
  "detail": [
    {
      "loc": ["body", "budget_range"],
      "msg": "Input should be '<500k', '500k-2m', '2m-5m', '5m-15m', '15m-30m' or '30m+'",
      "type": "literal_error"
    }
  ]
}
```

---

## 8. Score Visualisation Guide

Location rankings include five sub-scores (0-100). Suggested UI treatments:

| Score | Colour | Label |
|-------|--------|-------|
| 80–100 | Green | Excellent |
| 60–79 | Blue | Good |
| 40–59 | Yellow | Average |
| 20–39 | Orange | Below Average |
| 0–19 | Red | Poor |

The `score` field is the overall weighted score. The five sub-scores (`costEfficiency`, `crewDepth`, `infrastructure`, `incentiveStrength`, `currencyAdvantage`) can be rendered as a radar/spider chart per territory.

`production_priority` affects how the AI weights these scores:
- `"incentive"` — `incentiveStrength` is weighted 2x (financial return focus)
- `"location"` — `crewDepth` and `infrastructure` weighted 1.5x each (creative fit focus)
- `"full"` — equal weighting (balanced)

---

*Last updated: 2026-03-02*
