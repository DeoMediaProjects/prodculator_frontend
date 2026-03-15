import { useState, useEffect } from 'react';
import { getTerritories } from '@/services/api';
import type { Territory } from '@/services/admin.types';

// ---------------------------------------------------------------------------
// Static fallback — mirrors GET /api/territories exactly.
// Used when the API is unreachable (e.g. dev without a running backend).
// 17 top-level countries + 24 sub-territories = 41 total.
// ---------------------------------------------------------------------------
export const STATIC_TERRITORIES: Territory[] = [
  // ── Top-level countries ──────────────────────────────────────────────────
  { label: 'United Kingdom',  iso: 'GB', parent: null, isSubTerritory: false },
  { label: 'France',          iso: 'FR', parent: null, isSubTerritory: false },
  { label: 'Ireland',         iso: 'IE', parent: null, isSubTerritory: false },
  { label: 'Malta',           iso: 'MT', parent: null, isSubTerritory: false },
  { label: 'Hungary',         iso: 'HU', parent: null, isSubTerritory: false },
  { label: 'Czech Republic',  iso: 'CZ', parent: null, isSubTerritory: false },
  { label: 'Spain',           iso: 'ES', parent: null, isSubTerritory: false },
  { label: 'Italy',           iso: 'IT', parent: null, isSubTerritory: false },
  { label: 'Portugal',        iso: 'PT', parent: null, isSubTerritory: false },
  { label: 'Morocco',         iso: 'MA', parent: null, isSubTerritory: false },
  { label: 'Serbia',          iso: 'RS', parent: null, isSubTerritory: false },
  { label: 'Romania',         iso: 'RO', parent: null, isSubTerritory: false },
  { label: 'South Africa',    iso: 'ZA', parent: null, isSubTerritory: false },
  { label: 'New Zealand',     iso: 'NZ', parent: null, isSubTerritory: false },
  { label: 'Australia',       iso: 'AU', parent: null, isSubTerritory: false },
  { label: 'Canada',          iso: 'CA', parent: null, isSubTerritory: false },
  { label: 'United States',   iso: 'US', parent: null, isSubTerritory: false },

  // ── UK devolved nations ──────────────────────────────────────────────────
  { label: 'England',         iso: 'GB-ENG', parent: 'United Kingdom', isSubTerritory: true },
  { label: 'Scotland',        iso: 'GB-SCT', parent: 'United Kingdom', isSubTerritory: true },
  { label: 'Wales',           iso: 'GB-WLS', parent: 'United Kingdom', isSubTerritory: true },
  { label: 'Northern Ireland',iso: 'GB-NIR', parent: 'United Kingdom', isSubTerritory: true },

  // ── US states ────────────────────────────────────────────────────────────
  { label: 'Georgia (USA)',   iso: 'US-GA', parent: 'United States', isSubTerritory: true },
  { label: 'New Mexico',      iso: 'US-NM', parent: 'United States', isSubTerritory: true },
  { label: 'New York',        iso: 'US-NY', parent: 'United States', isSubTerritory: true },
  { label: 'California',      iso: 'US-CA', parent: 'United States', isSubTerritory: true },
  { label: 'Louisiana',       iso: 'US-LA', parent: 'United States', isSubTerritory: true },
  { label: 'Illinois',        iso: 'US-IL', parent: 'United States', isSubTerritory: true },
  { label: 'Massachusetts',   iso: 'US-MA', parent: 'United States', isSubTerritory: true },
  { label: 'North Carolina',  iso: 'US-NC', parent: 'United States', isSubTerritory: true },

  // ── Canadian provinces ───────────────────────────────────────────────────
  { label: 'British Columbia',iso: 'CA-BC', parent: 'Canada',        isSubTerritory: true },
  { label: 'Ontario',         iso: 'CA-ON', parent: 'Canada',        isSubTerritory: true },
  { label: 'Quebec',          iso: 'CA-QC', parent: 'Canada',        isSubTerritory: true },

  // ── Australian states ────────────────────────────────────────────────────
  { label: 'New South Wales', iso: 'AU-NSW', parent: 'Australia',    isSubTerritory: true },
  { label: 'Victoria',        iso: 'AU-VIC', parent: 'Australia',    isSubTerritory: true },
  { label: 'Queensland',      iso: 'AU-QLD', parent: 'Australia',    isSubTerritory: true },
  { label: 'South Australia', iso: 'AU-SA',  parent: 'Australia',    isSubTerritory: true },
  { label: 'Western Australia',iso: 'AU-WA', parent: 'Australia',    isSubTerritory: true },
  { label: 'Tasmania',        iso: 'AU-TAS', parent: 'Australia',    isSubTerritory: true },
];

// ---------------------------------------------------------------------------

interface UseTerritories {
  /** All 41 territories */
  territories: Territory[];
  /** Only top-level countries (isSubTerritory === false) */
  countries: Territory[];
  loading: boolean;
  error: string | null;
}

/**
 * Fetches the territory list from GET /api/territories (unauthenticated).
 * Falls back silently to the static list if the request fails.
 */
export function useTerritories(): UseTerritories {
  const [territories, setTerritories] = useState<Territory[]>(STATIC_TERRITORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getTerritories()
      .then((data) => {
        if (!cancelled && data.length > 0) {
          setTerritories(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load territories';
          setError(message);
          // Leave the static fallback in place — no need to surface the error visually
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const countries = territories.filter((t) => !t.isSubTerritory);

  return { territories, countries, loading, error };
}
