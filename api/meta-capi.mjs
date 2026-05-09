import crypto from 'node:crypto';

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    if (!key) continue;
    try { out[key] = decodeURIComponent(part.slice(idx + 1).trim()); }
    catch { out[key] = part.slice(idx + 1).trim(); }
  }
  return out;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://polimerplast.kz');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const PIXEL_ID = process.env.META_PIXEL_ID ?? '2144114386381224';
  const accessToken = process.env.FB_ACCESS_TOKEN ?? process.env.META_CAPI_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(500).json({ ok: false, error: 'env_missing' });
  }

  const { event_name, event_id, event_source_url, user_data = {}, custom_data } = req.body ?? {};

  if (!event_name || !event_id) {
    return res.status(400).json({ ok: false, error: 'bad_request' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim();
  const ua = req.headers['user-agent'];
  const cookies = parseCookies(req.headers.cookie);

  const userDataPayload = {
    ...(ip && { client_ip_address: ip }),
    ...(ua && { client_user_agent: ua }),
    ...(cookies._fbp && { fbp: cookies._fbp }),
    ...(cookies._fbc && { fbc: cookies._fbc }),
    ...(user_data.email && { em: [sha256(user_data.email.trim().toLowerCase())] }),
    ...(user_data.phone && { ph: [sha256(user_data.phone.replace(/\D+/g, ''))] }),
  };

  const payload = {
    data: [{
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id,
      event_source_url,
      action_source: 'website',
      user_data: userDataPayload,
      ...(custom_data && { custom_data }),
    }],
  };

  try {
    const metaRes = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
      { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }
    );

    const parsed = await metaRes.json();

    if (parsed.error) {
      console.error('Meta CAPI error:', parsed.error.message);
      return res.status(502).json({ ok: false, error: parsed.error.message });
    }

    return res.status(200).json({ ok: true, events_received: parsed.events_received });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'fetch_failed' });
  }
}
