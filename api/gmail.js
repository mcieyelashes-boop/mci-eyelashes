/**
 * Vercel Serverless Function: /api/gmail
 *
 * Query params:
 *   ?resource=threads   — email threads with label "MCI Outreach" (up to 50)
 *   ?resource=stats     — reply count, unread count, total thread count
 *
 * Required env var: GMAIL_ACCESS_TOKEN
 *   This is a bearer token for the Gmail API v1.
 *   For production, replace with a proper OAuth2 service-account flow
 *   that generates a fresh token (e.g. via google-auth-library or
 *   a JWT exchange). For now, a long-lived access token or a token
 *   refreshed by a separate mechanism works.
 *
 * Target Gmail label: "MCI Outreach"
 *   Create this label in Gmail and apply it to all outreach threads.
 *   The label name is matched case-insensitively.
 *
 * All errors return HTTP 200 with { error: string, data: null }.
 */

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1';
const TARGET_LABEL_NAME = 'MCI Outreach';
// userId 'me' means the authenticated user's mailbox
const USER_ID = 'me';

function gmailHeaders() {
  return {
    Authorization: `Bearer ${process.env.GMAIL_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('[gmail] unhandled error:', err);
      res.status(200).json({ error: err.message ?? 'Unknown error', data: null });
    }
  };
}

// ---------------------------------------------------------------------------
// Helper: resolve label name → labelId
// ---------------------------------------------------------------------------

async function resolveLabelId(name) {
  const res = await fetch(
    `${GMAIL_BASE}/users/${USER_ID}/labels`,
    { headers: gmailHeaders() }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gmail labels error ${res.status}: ${text}`);
  }
  const json = await res.json();
  const label = (json.labels ?? []).find(
    (l) => l.name.toLowerCase() === name.toLowerCase()
  );
  if (!label) {
    throw new Error(
      `Gmail label "${name}" not found. Create it in Gmail and apply it to outreach threads.`
    );
  }
  return label.id;
}

// ---------------------------------------------------------------------------
// Resource: threads
// Returns up to 50 threads with the MCI Outreach label, with snippet and
// message count so the frontend can identify replied threads.
// ---------------------------------------------------------------------------

async function getThreads() {
  const labelId = await resolveLabelId(TARGET_LABEL_NAME);

  // List thread IDs (max 50)
  const listRes = await fetch(
    `${GMAIL_BASE}/users/${USER_ID}/threads?labelIds=${labelId}&maxResults=50`,
    { headers: gmailHeaders() }
  );
  if (!listRes.ok) {
    const text = await listRes.text();
    throw new Error(`Gmail threads list error ${listRes.status}: ${text}`);
  }
  const listJson = await listRes.json();
  const threadIds = (listJson.threads ?? []).map((t) => t.id);

  if (threadIds.length === 0) {
    return { threads: [], total: 0 };
  }

  // Fetch each thread in parallel (metadata only — much cheaper than full)
  const threadDetails = await Promise.all(
    threadIds.map(async (id) => {
      const r = await fetch(
        `${GMAIL_BASE}/users/${USER_ID}/threads/${id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
        { headers: gmailHeaders() }
      );
      if (!r.ok) return null;
      const t = await r.json();

      // Extract subject, sender, date from the first message's headers
      const firstMsg = t.messages?.[0];
      const headers = firstMsg?.payload?.headers ?? [];
      const subject = headers.find((h) => h.name === 'Subject')?.value ?? '(no subject)';
      const from = headers.find((h) => h.name === 'From')?.value ?? '';
      const date = headers.find((h) => h.name === 'Date')?.value ?? '';

      const messageCount = t.messages?.length ?? 0;
      const hasReply = messageCount > 1;

      // Check for UNREAD label on any message in the thread
      const isUnread = (t.messages ?? []).some((m) =>
        (m.labelIds ?? []).includes('UNREAD')
      );

      return {
        id: t.id,
        subject,
        from,
        date,
        messageCount,
        hasReply,
        isUnread,
        snippet: t.snippet ?? '',
      };
    })
  );

  const threads = threadDetails.filter(Boolean);
  return { threads, total: listJson.resultSizeEstimate ?? threads.length };
}

// ---------------------------------------------------------------------------
// Resource: stats
// Aggregated counts — avoids sending full thread list to frontend.
// ---------------------------------------------------------------------------

async function getStats() {
  const labelId = await resolveLabelId(TARGET_LABEL_NAME);

  // Gmail label metadata gives unread + total message counts cheaply
  const labelRes = await fetch(
    `${GMAIL_BASE}/users/${USER_ID}/labels/${labelId}`,
    { headers: gmailHeaders() }
  );
  if (!labelRes.ok) {
    const text = await labelRes.text();
    throw new Error(`Gmail label detail error ${labelRes.status}: ${text}`);
  }
  const labelJson = await labelRes.json();

  // threadsTotal and threadsUnread are available on the label object
  const totalThreads = labelJson.threadsTotal ?? 0;
  const unreadThreads = labelJson.threadsUnread ?? 0;

  // Reply count requires checking messageCount per thread.
  // For efficiency, page through thread list without fetching full threads.
  // We use a lightweight list + individual message-count fetch approach
  // (threads.list gives messagesTotal in the thread object when using
  //  the threads.get endpoint; however threads.list itself doesn't expose
  //  messageCount, so we batch-fetch thread metadata).
  //
  // To keep this fast we cap at 100 threads for the reply count.
  const listRes = await fetch(
    `${GMAIL_BASE}/users/${USER_ID}/threads?labelIds=${labelId}&maxResults=100`,
    { headers: gmailHeaders() }
  );
  if (!listRes.ok) {
    const text = await listRes.text();
    throw new Error(`Gmail threads list (stats) error ${listRes.status}: ${text}`);
  }
  const listJson = await listRes.json();
  const threadIds = (listJson.threads ?? []).map((t) => t.id);

  // Batch-fetch minimal thread data in parallel
  const messageCounts = await Promise.all(
    threadIds.map(async (id) => {
      const r = await fetch(
        // format=minimal returns messages with only labelIds, no body payload
        `${GMAIL_BASE}/users/${USER_ID}/threads/${id}?format=minimal`,
        { headers: gmailHeaders() }
      );
      if (!r.ok) return 0;
      const t = await r.json();
      return t.messages?.length ?? 0;
    })
  );

  const replyCount = messageCounts.filter((c) => c > 1).length;

  return {
    totalThreads,
    unreadThreads,
    replyCount,
    // note: replyCount is capped at 100 threads; adjust maxResults above if needed
  };
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

export default withErrorHandling(async (req, res) => {
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

  if (!process.env.GMAIL_ACCESS_TOKEN) {
    console.error('[gmail] GMAIL_ACCESS_TOKEN env var is not set');
    res.status(200).json({ error: 'Server misconfiguration: missing token', data: null });
    return;
  }

  const { resource } = req.query;

  let data;
  switch (resource) {
    case 'threads':
      data = await getThreads();
      break;
    case 'stats':
      data = await getStats();
      break;
    default:
      res.status(200).json({
        error: `Unknown resource "${resource}". Valid values: threads, stats`,
        data: null,
      });
      return;
  }

  res.status(200).json({ error: null, data });
});
