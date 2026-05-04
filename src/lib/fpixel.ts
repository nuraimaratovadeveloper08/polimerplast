const newEventId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export type PixelUserData = { email?: string; phone?: string };

export function track(
  event: string,
  custom_data?: Record<string, unknown>,
  user_data?: PixelUserData,
) {
  const event_id = newEventId();
  window.fbq?.('track', event, custom_data ?? {}, { eventID: event_id });
  void fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      event_name: event,
      event_id,
      event_source_url: window.location.href,
      user_data,
      custom_data,
    }),
    keepalive: true,
  }).catch(() => {});
}

export const pageview = () => track('PageView');
