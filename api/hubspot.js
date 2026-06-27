/**
 * Vercel Serverless Function: /api/hubspot
 *
 * Query params:
 *   ?resource=contacts   — total count + contacts added in last 30 days
 *   ?resource=deals      — open deal count + total deal value
 *   ?resource=pipeline   — deals grouped by stage
 *   ?resource=activity   — last 5 contacts touched (recent activity)
 *
 * Required env var: HUBSPOT_TOKEN
 *
 * All errors return HTTP 200 with { error: string, data: null }
 * so the frontend can always render a graceful fallback.
 */

const HUBSPOT_BASE = 'https://api.hubapi.com';

function hubspotHeaders() {
  return {
    Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

/** Wrap every handler so uncaught errors still return clean JSON. */
function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('[hubspot] unhandled error:', err);
      res.status(200).json({ error: err.message ?? 'Unknown error', data: null });
    }
  };
}

// ---------------------------------------------------------------------------
// Resource handlers
// ---------------------------------------------------------------------------

async function getContacts() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]; // YYYY-MM-DD

  // Total contacts — use the v3 contacts count endpoint (cheap, single call)
  const totalRes = await fetch(
    `${HUBSPOT_BASE}/crm/v3/objects/contacts?limit=1&properties=hs_object_id`,
    { headers: hubspotHeaders() }
  );
  if (!totalRes.ok) {
    const text = await totalRes.text();
    throw new Error(`HubSpot contacts error ${totalRes.status}: ${text}`);
  }
  const totalJson = await totalRes.json();
  const total = totalJson.total ?? 0;

  // Contacts added in last 30 days — filter by createdate
  const recentRes = await fetch(
    `${HUBSPOT_BASE}/crm/v3/objects/contacts/search`,
    {
      method: 'POST',
      headers: hubspotHeaders(),
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'createdate',
                operator: 'GTE',
                value: thirtyDaysAgo,
              },
            ],
          },
        ],
        properties: ['hs_object_id'],
        limit: 1,
      }),
    }
  );
  if (!recentRes.ok) {
    const text = await recentRes.text();
    throw new Error(`HubSpot recent-contacts error ${recentRes.status}: ${text}`);
  }
  const recentJson = await recentRes.json();
  const addedLast30Days = recentJson.total ?? 0;

  return { total, addedLast30Days };
}

async function getDeals() {
  // Fetch open deals (not closed-won / closed-lost).
  // We page through all results (max 100 per call) to compute totals.
  let after = undefined;
  let openCount = 0;
  let totalValue = 0;

  do {
    const url = new URL(`${HUBSPOT_BASE}/crm/v3/objects/deals`);
    url.searchParams.set('limit', '100');
    url.searchParams.set('properties', 'dealstage,amount,closedate,dealname');
    if (after) url.searchParams.set('after', after);

    const res = await fetch(url.toString(), { headers: hubspotHeaders() });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HubSpot deals error ${res.status}: ${text}`);
    }
    const json = await res.json();

    for (const deal of json.results ?? []) {
      const stage = deal.properties?.dealstage ?? '';
      const isClosed = stage === 'closedwon' || stage === 'closedlost';
      if (!isClosed) {
        openCount++;
        const amt = parseFloat(deal.properties?.amount ?? '0');
        if (!isNaN(amt)) totalValue += amt;
      }
    }

    after = json.paging?.next?.after;
  } while (after);

  return { openCount, totalValue: Math.round(totalValue * 100) / 100 };
}

async function getPipeline() {
  // Map internal HubSpot stage IDs to friendly display names.
  // We first fetch the pipeline definition to build a label map,
  // then count deals per stage.
  const FRIENDLY_STAGE_NAMES = {
    contacted: 'Contacted',
    replied: 'Replied',
    'call booked': 'Call Booked',
    callbooked: 'Call Booked',
    proposal: 'Proposal',
    proposalmade: 'Proposal',
    closedwon: 'Closed',
    'closed won': 'Closed',
  };

  // Fetch pipeline definitions to get stage labels
  const pipelineRes = await fetch(
    `${HUBSPOT_BASE}/crm/v3/pipelines/deals`,
    { headers: hubspotHeaders() }
  );
  const stageLabels = {}; // stageId -> displayName
  if (pipelineRes.ok) {
    const pipelineJson = await pipelineRes.json();
    for (const pipeline of pipelineJson.results ?? []) {
      for (const stage of pipeline.stages ?? []) {
        stageLabels[stage.id] = stage.label;
      }
    }
  }

  // Fetch all deals with their stage
  let after = undefined;
  const stageCounts = {};

  do {
    const url = new URL(`${HUBSPOT_BASE}/crm/v3/objects/deals`);
    url.searchParams.set('limit', '100');
    url.searchParams.set('properties', 'dealstage,amount');
    if (after) url.searchParams.set('after', after);

    const res = await fetch(url.toString(), { headers: hubspotHeaders() });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HubSpot pipeline error ${res.status}: ${text}`);
    }
    const json = await res.json();

    for (const deal of json.results ?? []) {
      const stageId = deal.properties?.dealstage ?? 'unknown';
      const rawLabel = stageLabels[stageId] ?? stageId;
      // Normalize to a friendly name if we recognize it
      const friendlyKey = rawLabel.toLowerCase().trim();
      const label = FRIENDLY_STAGE_NAMES[friendlyKey] ?? rawLabel;

      if (!stageCounts[label]) stageCounts[label] = { count: 0, value: 0 };
      stageCounts[label].count++;
      const amt = parseFloat(deal.properties?.amount ?? '0');
      if (!isNaN(amt)) stageCounts[label].value += amt;
    }

    after = json.paging?.next?.after;
  } while (after);

  // Convert to array sorted by a preferred stage order
  const STAGE_ORDER = ['Contacted', 'Replied', 'Call Booked', 'Proposal', 'Closed'];
  const stages = Object.entries(stageCounts).map(([name, { count, value }]) => ({
    name,
    count,
    value: Math.round(value * 100) / 100,
  }));
  stages.sort((a, b) => {
    const ai = STAGE_ORDER.indexOf(a.name);
    const bi = STAGE_ORDER.indexOf(b.name);
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return { stages };
}

async function getActivity() {
  // Last 5 contacts touched (sorted by lastmodifieddate descending)
  const res = await fetch(
    `${HUBSPOT_BASE}/crm/v3/objects/contacts/search`,
    {
      method: 'POST',
      headers: hubspotHeaders(),
      body: JSON.stringify({
        filterGroups: [],
        sorts: [{ propertyName: 'lastmodifieddate', direction: 'DESCENDING' }],
        properties: [
          'firstname',
          'lastname',
          'email',
          'lastmodifieddate',
          'hs_lead_status',
        ],
        limit: 5,
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HubSpot activity error ${res.status}: ${text}`);
  }
  const json = await res.json();

  const contacts = (json.results ?? []).map((c) => ({
    id: c.id,
    name:
      [c.properties?.firstname, c.properties?.lastname]
        .filter(Boolean)
        .join(' ') || c.properties?.email || 'Unknown',
    email: c.properties?.email ?? null,
    lastTouched: c.properties?.lastmodifieddate ?? null,
    status: c.properties?.hs_lead_status ?? null,
  }));

  return { contacts };
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

export default withErrorHandling(async (req, res) => {
  // CORS — only allow same-origin / your own domain
  res.setHeader('Access-Control-Allow-Origin', 'https://mci-eyelashes.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed', data: null });
    return;
  }

  if (!process.env.HUBSPOT_TOKEN) {
    console.error('[hubspot] HUBSPOT_TOKEN env var is not set');
    res.status(200).json({ error: 'Server misconfiguration: missing token', data: null });
    return;
  }

  const { resource } = req.query;

  let data;
  switch (resource) {
    case 'contacts':
      data = await getContacts();
      break;
    case 'deals':
      data = await getDeals();
      break;
    case 'pipeline':
      data = await getPipeline();
      break;
    case 'activity':
      data = await getActivity();
      break;
    default:
      res.status(200).json({
        error: `Unknown resource "${resource}". Valid values: contacts, deals, pipeline, activity`,
        data: null,
      });
      return;
  }

  res.status(200).json({ error: null, data });
});
