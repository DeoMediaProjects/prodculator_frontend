// ── Collection endpoints ───────────────────────────────────────────────────────
export const ADMIN_USERS_URL = '/api/admin/users';
export const ADMIN_REPORTS_URL = '/api/admin/reports';
export const ADMIN_METRICS_URL = '/api/admin/metrics';
export const ADMIN_PRODUCTION_SIGNALS_URL = '/api/admin/production-signals';
export const ADMIN_INCENTIVES_URL = '/api/admin/incentives';
export const ADMIN_CREW_COSTS_URL = '/api/admin/crew-costs';
export const ADMIN_COMPARABLES_URL = '/api/admin/comparables';
export const ADMIN_GRANTS_URL = '/api/admin/grants';
export const ADMIN_GRANTS_BULK_IMPORT_URL = '/api/admin/grants/bulk-import';
export const ADMIN_FESTIVALS_URL = '/api/admin/festivals';

// ── Item endpoints (parameterised) ────────────────────────────────────────────
export const adminIncentiveUrl  = (id: string) => `/api/admin/incentives/${id}`;
export const adminCrewCostUrl   = (id: string) => `/api/admin/crew-costs/${id}`;
export const adminComparableUrl = (id: string) => `/api/admin/comparables/${id}`;
export const adminGrantUrl      = (id: string) => `/api/admin/grants/${id}`;
export const adminFestivalUrl   = (id: string) => `/api/admin/festivals/${id}`;
