import { apiClient } from './api';
import {
  ADMIN_METRICS_URL,
  ADMIN_INCENTIVES_URL,
  adminIncentiveUrl,
  ADMIN_CREW_COSTS_URL,
  adminCrewCostUrl,
  ADMIN_COMPARABLES_URL,
  adminComparableUrl,
  ADMIN_GRANTS_URL,
  ADMIN_GRANTS_BULK_IMPORT_URL,
  adminGrantUrl,
  ADMIN_FESTIVALS_URL,
  adminFestivalUrl,
} from './admin.apiurl';
import type {
  AdminMetrics,
  IncentiveData,
  CrewRate,
  ComparableProduction,
  Grant,
  CreateGrantPayload,
  BulkImportResult,
  PaginatedResponse,
} from './admin.types';
import type { Festival } from '@/app/types/festival';

// ── Shared result type ─────────────────────────────────────────────────────────
type ApiResult<T> = Promise<{ data: T | null; error: string | null }>;

function paginationQuery(limit = 50, offset = 0) {
  return `?limit=${limit}&offset=${offset}`;
}

// ── Metrics ───────────────────────────────────────────────────────────────────
async function getMetrics(signal?: AbortSignal): ApiResult<AdminMetrics> {
  try {
    const data = await apiClient.get<AdminMetrics>(ADMIN_METRICS_URL, { auth: true, signal });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to fetch metrics' };
  }
}

// ── Incentives ────────────────────────────────────────────────────────────────
async function getIncentives(limit = 50, offset = 0, signal?: AbortSignal): ApiResult<PaginatedResponse<IncentiveData>> {
  try {
    const data = await apiClient.get<PaginatedResponse<IncentiveData>>(
      `${ADMIN_INCENTIVES_URL}${paginationQuery(limit, offset)}`,
      { auth: true, signal },
    );
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to fetch incentives' };
  }
}

async function createIncentive(payload: IncentiveData): ApiResult<IncentiveData> {
  try {
    const data = await apiClient.post<IncentiveData>(ADMIN_INCENTIVES_URL, { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to create incentive' };
  }
}

async function updateIncentive(id: string, payload: IncentiveData): ApiResult<IncentiveData> {
  try {
    const data = await apiClient.patch<IncentiveData>(adminIncentiveUrl(id), { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to update incentive' };
  }
}

async function deleteIncentive(id: string): ApiResult<void> {
  try {
    await apiClient.delete(adminIncentiveUrl(id), { auth: true });
    return { data: null, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to delete incentive' };
  }
}

// ── Crew Costs ────────────────────────────────────────────────────────────────
async function getCrewRates(limit = 50, offset = 0, signal?: AbortSignal): ApiResult<PaginatedResponse<CrewRate>> {
  try {
    const data = await apiClient.get<PaginatedResponse<CrewRate>>(
      `${ADMIN_CREW_COSTS_URL}${paginationQuery(limit, offset)}`,
      { auth: true, signal },
    );
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to fetch crew rates' };
  }
}

async function createCrewRate(payload: CrewRate): ApiResult<CrewRate> {
  try {
    const data = await apiClient.post<CrewRate>(ADMIN_CREW_COSTS_URL, { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to create crew rate' };
  }
}

async function updateCrewRate(id: string, payload: CrewRate): ApiResult<CrewRate> {
  try {
    const data = await apiClient.patch<CrewRate>(adminCrewCostUrl(id), { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to update crew rate' };
  }
}

async function deleteCrewRate(id: string): ApiResult<void> {
  try {
    await apiClient.delete(adminCrewCostUrl(id), { auth: true });
    return { data: null, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to delete crew rate' };
  }
}

// ── Comparables ───────────────────────────────────────────────────────────────
async function getComparables(limit = 50, offset = 0, signal?: AbortSignal): ApiResult<PaginatedResponse<ComparableProduction>> {
  try {
    const data = await apiClient.get<PaginatedResponse<ComparableProduction>>(
      `${ADMIN_COMPARABLES_URL}${paginationQuery(limit, offset)}`,
      { auth: true, signal },
    );
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to fetch comparables' };
  }
}

async function createComparable(payload: ComparableProduction): ApiResult<ComparableProduction> {
  try {
    const data = await apiClient.post<ComparableProduction>(ADMIN_COMPARABLES_URL, { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to create comparable' };
  }
}

async function updateComparable(id: string, payload: ComparableProduction): ApiResult<ComparableProduction> {
  try {
    const data = await apiClient.patch<ComparableProduction>(adminComparableUrl(id), { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to update comparable' };
  }
}

async function deleteComparable(id: string): ApiResult<void> {
  try {
    await apiClient.delete(adminComparableUrl(id), { auth: true });
    return { data: null, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to delete comparable' };
  }
}

// ── Grants ────────────────────────────────────────────────────────────────────
async function getGrants(limit = 50, offset = 0, signal?: AbortSignal): ApiResult<PaginatedResponse<Grant>> {
  try {
    const data = await apiClient.get<PaginatedResponse<Grant>>(
      `${ADMIN_GRANTS_URL}${paginationQuery(limit, offset)}`,
      { auth: true, signal },
    );
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to fetch grants' };
  }
}

async function createGrant(payload: CreateGrantPayload): ApiResult<Grant> {
  try {
    const data = await apiClient.post<Grant>(ADMIN_GRANTS_URL, { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to create grant' };
  }
}

async function bulkImportGrants(file: File): ApiResult<BulkImportResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const data = await apiClient.upload<BulkImportResult>(ADMIN_GRANTS_BULK_IMPORT_URL, formData, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to import grants' };
  }
}

async function updateGrant(id: string, payload: Partial<Grant>): ApiResult<Grant> {
  try {
    const data = await apiClient.patch<Grant>(adminGrantUrl(id), { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to update grant' };
  }
}

async function deleteGrant(id: string): ApiResult<void> {
  try {
    await apiClient.delete(adminGrantUrl(id), { auth: true });
    return { data: null, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to delete grant' };
  }
}

// ── Festivals ─────────────────────────────────────────────────────────────────
async function getFestivals(limit = 50, offset = 0, signal?: AbortSignal): ApiResult<PaginatedResponse<Festival>> {
  try {
    const data = await apiClient.get<PaginatedResponse<Festival>>(
      `${ADMIN_FESTIVALS_URL}${paginationQuery(limit, offset)}`,
      { auth: true, signal },
    );
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to fetch festivals' };
  }
}

async function createFestival(payload: Festival): ApiResult<Festival> {
  try {
    const data = await apiClient.post<Festival>(ADMIN_FESTIVALS_URL, { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to create festival' };
  }
}

async function updateFestival(id: string, payload: Festival): ApiResult<Festival> {
  try {
    const data = await apiClient.patch<Festival>(adminFestivalUrl(id), { payload }, { auth: true });
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to update festival' };
  }
}

async function deleteFestival(id: string): ApiResult<void> {
  try {
    await apiClient.delete(adminFestivalUrl(id), { auth: true });
    return { data: null, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Failed to delete festival' };
  }
}

// ── Named export ──────────────────────────────────────────────────────────────
export const adminApi = {
  getMetrics,
  getIncentives,
  createIncentive,
  updateIncentive,
  deleteIncentive,
  getCrewRates,
  createCrewRate,
  updateCrewRate,
  deleteCrewRate,
  getComparables,
  createComparable,
  updateComparable,
  deleteComparable,
  getGrants,
  createGrant,
  updateGrant,
  deleteGrant,
  bulkImportGrants,
  getFestivals,
  createFestival,
  updateFestival,
  deleteFestival,
};
