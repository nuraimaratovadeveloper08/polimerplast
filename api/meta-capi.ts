import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

const normEmail = (s: string) => s.trim().toLowerCase();

const normPhone = (s: string) => s.replace(/\D+/g, '');

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    if (!key) continue;
    const raw = part.slice(idx + 1).trim();
    try {
      out[key] = decodeURIComponent(raw);
    } catch {
      out[key] = raw;
    }
  }
  return out;
}

type IncomingUserData = { email?: string; phone?: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const PIXEL_ID = process.env.META_PIXEL_ID ?? '2144114386381224';
  const accessToken = process.env.FB_ACCESS_TOKEN ?? process.env.META_CAPI_ACCESS_TOKEN;
  const META_CAPI_TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;
  if (!accessToken) {
    return res.status(500).json({ ok: false, error: 'env_missing' });
  }

  const body = req.body as
    | {
        event_name?: string;
        event_id?: string;
        event_source_url?: string;
        user_data?: IncomingUserData;
        custom_data?: Record<string, unknown>;
      }
    | undefined;

  const { event_name, event_id, event_source_url, user_data = {}, custom_data } = body ?? {};
  if (!event_name || !event_id) {
    return res.status(400).json({ ok: false, error: 'bad_request' });
  }

  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim();
  const ua = req.headers['user-agent'] as string | undefined;
  const cookieMap = parseCookies(req.headers.cookie);

  const userDataPayload: Record<string, unknown> = {
    ...(ip ? { client_ip_address: ip } : {}),
    ...(ua ? { client_user_agent: ua } : {}),
    ...(cookieMap._fbp ? { fbp: cookieMap._fbp } : {}),
    ...(cookieMap._fbc ? { fbc: cookieMap._fbc } : {}),
  };

  const emailNorm = user_data.email ? normEmail(user_data.email) : '';
  if (emailNorm) {
    userDataPayload.em = [sha256(emailNorm)];
  }

  const phoneNorm = user_data.phone ? normPhone(user_data.phone) : '';
  if (phoneNorm) {
    userDataPayload.ph = [sha256(phoneNorm)];
  }

  const event: Record<string, unknown> = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    event_source_url: event_source_url ?? undefined,
    action_source: 'website',
    user_data: userDataPayload,
  };

  if (custom_data && Object.keys(custom_data).length > 0) {
    event.custom_data = custom_data;
  }

  const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`;

  const payload: Record<string, unknown> = { data: [event] };
  if (META_CAPI_TEST_EVENT_CODE?.trim()) {
    payload.test_event_code = META_CAPI_TEST_EVENT_CODE.trim();
  }

  let metaRes: Response;
  try {
    metaRes = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return res.status(502).json({ ok: false, error: 'meta_fetch_failed' });
  }

  let parsed: { error?: { message?: string }; events_received?: number };
  try {
    parsed = (await metaRes.json()) as typeof parsed;
  } catch {
    return res.status(502).json({ ok: false, error: 'meta_invalid_json' });
  }

  if (!metaRes.ok || parsed.error) {
    return res.status(502).json({ ok: false, error: 'meta_error', status: metaRes.status });
  }

  return res.status(200).json({ ok: true });
}
