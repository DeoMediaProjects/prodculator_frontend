// ── Shared pagination wrapper ──────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

// ── Metrics (matches /api/admin/metrics response) ─────────────────────────────
export interface AdminMetrics {
  total_users: number;
  active_subscriptions: number;
  total_reports: number;
  reports_this_month: number;
  mrr_usd: number;
  conversion_rate_percent: number;
}

// ── Incentives ────────────────────────────────────────────────────────────────
export interface IncentiveData {
  id?: string;
  territory: string;
  program: string;
  rate: string;
  cap: string;
  lastUpdated: string;
  status: 'Active' | 'Assessment Only';
  sourceUrl: string;
  autoSyncEnabled: boolean;
  lastAutoCheck?: string;
}

export interface PendingChange {
  territory: string;
  field: string;
  currentValue: string;
  detectedValue: string;
  confidence: 'high' | 'medium' | 'low';
  source: string;
}

// ── Crew Costs ────────────────────────────────────────────────────────────────
export interface CrewRate {
  id: string;
  territory: string;
  role: string;
  category: string;
  dayRate: number;
  weekRate: number;
  union: string;
  lastUpdated: string;
  source: string;
}

// ── Comparable Productions ────────────────────────────────────────────────────
export interface ComparableProduction {
  id: string;
  title: string;
  year: number;
  genre: string;
  budget: number;
  territory: string;
  incentiveUsed: string;
  tmdbId?: string;
  source: string;
  lastUpdated: string;
}

// ── Grants ────────────────────────────────────────────────────────────────────
export interface Grant {
  id: string;
  title: string;
  territory: string;
  fundingBody: string;
  maxAmount: string;
  currency: string;
  applicationOpens: string;
  applicationDeadline: string;
  status: 'opening-soon' | 'open' | 'closing-soon' | 'closed';
  daysUntilDeadline: number;
  eligibility: string[];
  websiteUrl: string;
  dataSource: 'manual' | 'rss' | 'api' | 'scrape';
  verified: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  lastVerifiedAt?: string;
}

// Festival is defined in src/app/types/festival.ts — import from there directly.
