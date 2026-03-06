# Admin API: Incentives & Crew Costs

All endpoints require admin authentication via `Authorization: Bearer <token>`.
All request/response bodies use **camelCase** field names.

---

## Incentive Programs

Base path: `/api/admin/incentives`

### List Incentives

```
GET /api/admin/incentives?limit=50&offset=0
```

**Query params:**
| Param    | Type | Default | Constraints    |
|----------|------|---------|----------------|
| `limit`  | int  | 50      | 1–500          |
| `offset` | int  | 0       | >= 0           |

**Response** `200`:
```json
{
  "items": [
    {
      "id": "uuid",
      "territory": "Georgia",
      "program": "Georgia Film Tax Credit",
      "rate": "30%",
      "cap": "$10M",
      "lastUpdated": "2025-12-01T00:00:00",
      "status": "active",
      "sourceUrl": "https://...",
      "autoSyncEnabled": true,
      "lastAutoCheck": "2025-12-01T00:00:00",
      "createdAt": "2025-12-01T00:00:00",
      "updatedAt": "2025-12-01T00:00:00"
    }
  ],
  "total": 42,
  "limit": 50,
  "offset": 0
}
```

### Create Incentive

```
POST /api/admin/incentives
```

**Request body:**
```json
{
  "payload": {
    "territory": "Georgia",
    "program": "Georgia Film Tax Credit",
    "rate": "30%",
    "cap": "$10M",
    "status": "active",
    "sourceUrl": "https://...",
    "autoSyncEnabled": true
  }
}
```

`id`, `createdAt`, and `updatedAt` are auto-generated.

**Response** `200`: The created record (same shape as list items).

### Update Incentive

```
PATCH /api/admin/incentives/{item_id}
```

**Request body:**
```json
{
  "payload": {
    "rate": "35%",
    "cap": "$15M"
  }
}
```

Only include the fields you want to update. `updatedAt` is set automatically.

**Response** `200`: The updated record.

### Delete Incentive

```
DELETE /api/admin/incentives/{item_id}
```

**Response** `200`:
```json
{ "message": "incentive deleted" }
```

---

## Crew Costs & Union Rates

Base path: `/api/admin/crew-costs`

### List Crew Costs

```
GET /api/admin/crew-costs?limit=50&offset=0
```

**Query params:** Same as incentives (limit/offset).

**Response** `200`:
```json
{
  "items": [
    {
      "id": "uuid",
      "territory": "Los Angeles",
      "role": "Director of Photography",
      "category": "Camera",
      "dayRate": 1500.0,
      "weekRate": 7500.0,
      "union": "IATSE",
      "lastUpdated": "2025-12-01T00:00:00",
      "source": "IATSE Rate Card 2025",
      "createdAt": "2025-12-01T00:00:00",
      "updatedAt": "2025-12-01T00:00:00"
    }
  ],
  "total": 120,
  "limit": 50,
  "offset": 0
}
```

### Create Crew Cost

```
POST /api/admin/crew-costs
```

**Request body:**
```json
{
  "payload": {
    "territory": "Los Angeles",
    "role": "Director of Photography",
    "category": "Camera",
    "dayRate": 1500.0,
    "weekRate": 7500.0,
    "union": "IATSE",
    "source": "IATSE Rate Card 2025"
  }
}
```

**Response** `200`: The created record.

### Update Crew Cost

```
PATCH /api/admin/crew-costs/{item_id}
```

**Request body:**
```json
{
  "payload": {
    "dayRate": 1600.0,
    "weekRate": 8000.0
  }
}
```

**Response** `200`: The updated record.

### Delete Crew Cost

```
DELETE /api/admin/crew-costs/{item_id}
```

**Response** `200`:
```json
{ "message": "crew cost deleted" }
```

---

## Sync System (shared by both resources)

Both `/api/admin/incentives` and `/api/admin/crew-costs` expose identical sync endpoints.

### Get Sync Status

```
GET /api/admin/incentives/sync-status
GET /api/admin/crew-costs/sync-status
```

**Response** `200`:
```json
{
  "territoriesSyncing": 15,
  "pendingChanges": 3,
  "daysSinceLastCheck": 7,
  "nextScheduledCheck": "2026-04-01T00:00:00"
}
```

### Get Pending Changes

```
GET /api/admin/incentives/pending-changes
GET /api/admin/crew-costs/pending-changes
```

**Response** `200`:
```json
[
  {
    "id": "uuid",
    "territory": "Georgia",
    "field": "rate",
    "currentValue": "30%",
    "detectedValue": "35%",
    "confidence": "high",
    "source": "Official gazette",
    "status": "pending",
    "createdAt": "2026-03-01T00:00:00",
    "resourceId": "uuid-of-incentive-or-crew-cost",
    "resolvedAt": null
  }
]
```

`confidence` is one of: `"high"`, `"medium"`, `"low"`.
`status` is one of: `"pending"`, `"approved"`, `"rejected"`.

### Approve Pending Change

```
POST /api/admin/incentives/pending-changes/{change_id}/approve
POST /api/admin/crew-costs/pending-changes/{change_id}/approve
```

Approving a change sets `status` to `"approved"`, records `resolvedAt` and the admin who approved it, and **applies the detected value** to the underlying resource record.

**Response** `200`: The updated pending change record.

### Reject Pending Change

```
POST /api/admin/incentives/pending-changes/{change_id}/reject
POST /api/admin/crew-costs/pending-changes/{change_id}/reject
```

Sets `status` to `"rejected"` without modifying the underlying resource.

**Response** `200`: The updated pending change record.

### Trigger Sync

```
POST /api/admin/incentives/sync
POST /api/admin/crew-costs/sync
```

Triggers a data sync. Updates `lastSyncAt` on the sync settings.

**Response** `200`:
```json
{
  "status": "sync_triggered",
  "lastSyncAt": "2026-03-03T12:00:00"
}
```

### Get Sync Settings

```
GET /api/admin/incentives/sync-settings
GET /api/admin/crew-costs/sync-settings
```

If no settings exist yet, defaults are auto-created (`schedule: "monthly"`, `enabled: true`).

**Response** `200`:
```json
{
  "schedule": "monthly",
  "enabled": true,
  "lastSyncAt": "2026-03-01T00:00:00",
  "nextScheduledCheck": "2026-04-01T00:00:00"
}
```

`schedule` is one of: `"monthly"`, `"quarterly"`, `"biannual"`, `"annual"`.

### Update Sync Settings

```
PATCH /api/admin/incentives/sync-settings
PATCH /api/admin/crew-costs/sync-settings
```

**Request body:**
```json
{
  "schedule": "quarterly",
  "enabled": true
}
```

Both fields are optional — only include what you want to change.

**Response** `200`: The updated sync settings (same shape as GET).

---

## TypeScript Interfaces

```typescript
// ── Incentives ──────────────────────────────────────────────

interface IncentiveProgram {
  id: string;
  territory: string;
  program: string;
  rate: string;
  cap: string;
  lastUpdated: string | null;
  status: string;
  sourceUrl: string | null;
  autoSyncEnabled: boolean;
  lastAutoCheck: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// ── Crew Costs ──────────────────────────────────────────────

interface CrewRate {
  id: string;
  territory: string;
  role: string;
  category: string;
  dayRate: number;
  weekRate: number;
  union: string;
  lastUpdated: string | null;
  source: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

// ── Shared ──────────────────────────────────────────────────

interface AdminListResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

interface AdminUpsertRequest {
  payload: Record<string, unknown>;
}

interface SuccessResponse {
  message: string;
}

// ── Sync System ─────────────────────────────────────────────

interface SyncStatus {
  territoriesSyncing: number;
  pendingChanges: number;
  daysSinceLastCheck: number;
  nextScheduledCheck: string | null;
}

interface PendingChange {
  id: string;
  territory: string;
  field: string;
  currentValue: string | null;
  detectedValue: string;
  confidence: "high" | "medium" | "low";
  source: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string | null;
  resourceId: string | null;
  resolvedAt: string | null;
}

interface SyncSettings {
  schedule: "monthly" | "quarterly" | "biannual" | "annual" | null;
  enabled: boolean;
  lastSyncAt: string | null;
  nextScheduledCheck: string | null;
}

interface SyncSettingsUpdate {
  schedule?: "monthly" | "quarterly" | "biannual" | "annual";
  enabled?: boolean;
}

interface SyncTriggerResponse {
  status: "sync_triggered";
  lastSyncAt: string;
}
```

---

## Error Responses

All endpoints return standard error shapes:

| Status | Meaning                         |
|--------|---------------------------------|
| 400    | Invalid request / operation failed |
| 401    | Missing or invalid auth token   |
| 403    | Not an admin                    |
| 404    | Resource not found (pending changes) |
| 500    | Server error                    |

```json
{ "detail": "Error message here" }
```
