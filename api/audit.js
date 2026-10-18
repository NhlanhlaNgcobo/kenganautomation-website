// Vercel serverless function: POST /api/audit
//
// Receives Free Audit form submissions and forwards them to the Google Sheets
// Apps Script webhook (same contract as the old Express server.js). Vercel
// auto-deploys any file in /api as a serverless function — no extra config.
//
// Set GSHEET_WEBHOOK_URL in Vercel → Project → Settings → Environment Variables.
// (See setup_google_sheets.md for how to create that Apps Script web-app URL.)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Vercel parses JSON bodies automatically, but guard for string/empty bodies.
  const data =
    typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  if (!data.fullName || !data.email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const webhook = process.env.GSHEET_WEBHOOK_URL;
  if (!webhook) {
    // No sheet wired yet — don't lose the lead; log it so it's in Vercel logs.
    console.warn('GSHEET_WEBHOOK_URL not set. Lead received but not forwarded:', data);
    return res.status(200).json({ success: true, message: 'Audit request received.' });
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, submittedAt: data.submittedAt || new Date().toISOString() }),
    });
    if (!r.ok) {
      console.error('Google Sheet webhook failed:', r.status, await r.text().catch(() => ''));
      // Still 200 to the user — the lead reached us; retry/alerting is our problem, not theirs.
    }
  } catch (err) {
    console.error('Error forwarding to Google Sheet:', err);
  }

  return res.status(200).json({ success: true, message: 'Audit request received successfully' });
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
