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
  lastUpdated: string | null;
  status: string;
  sourceUrl: string | null;
  autoSyncEnabled: boolean;
  lastAutoCheck?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface PendingChange {
  id: string;
  territory: string;
  field: string;
  currentValue: string | null;
  detectedValue: string;
  confidence: 'high' | 'medium' | 'low';
  source: string | null;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string | null;
  resourceId: string | null;
  resolvedAt: string | null;
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
  lastUpdated: string | null;
  source: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

// ── Sync System (shared by incentives & crew costs) ──────────────────────────
export interface SyncStatus {
  territoriesSyncing: number;
  pendingChanges: number;
  daysSinceLastCheck: number;
  nextScheduledCheck: string | null;
}

export interface SyncSettings {
  schedule: 'monthly' | 'quarterly' | 'biannual' | 'annual' | null;
  enabled: boolean;
  lastSyncAt: string | null;
  nextScheduledCheck: string | null;
}

export interface SyncSettingsUpdate {
  schedule?: 'monthly' | 'quarterly' | 'biannual' | 'annual';
  enabled?: boolean;
}

export interface SyncTriggerResponse {
  status: 'sync_triggered';
  lastSyncAt: string;
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

// Payload for creating a grant — backend sets id, createdAt, updatedAt
export type CreateGrantPayload = Omit<Grant, 'id' | 'createdAt' | 'updatedAt'>;

// Response from bulk import
export interface BulkImportResult {
  imported: number;
  failed: number;
  errors: { row: number; reason: string }[];
}

// ── Subscribers ──────────────────────────────────────────────────────────────
export interface SubscriberMetrics {
  total_paid_users: number;
  mrr_usd: number;
  mrr_gbp: number;
  reports_this_month_total: number;
  reports_this_month_free: number;
  reports_this_month_paid: number;
  avg_reports_per_user: number;
  plan_distribution: PlanDistributionEntry[];
}

export interface PlanDistributionEntry {
  plan: string;
  user_count: number;
  revenue: number;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  status: string;
  reports_this_month: number;
  report_limit: number | null;
  monthly_spend: number;
  payment_currency: 'USD' | 'GBP';
  join_date: string;
  last_active: string | null;
  total_reports_generated: number;
}

export interface SubscriberListResponse extends PaginatedResponse<Subscriber> {
  counts: {
    active: number;
    past_due: number;
    canceled: number;
  };
}

export interface CreditAdjustment {
  adjustment: number;
  reason?: string;
}

export interface CreditAdjustmentResponse {
  id: string;
  credits_remaining: number;
}

// Festival is defined in src/app/types/festival.ts — import from there directly.
