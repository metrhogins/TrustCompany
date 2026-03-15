// api/task/_debug-decode.js
// Dev-only: decodes a step token (no signature check) so you can inspect its claims.
// Automatically returns 403 when NODE_ENV=production.

export const config = { runtime: 'edge' };

import { getBearerToken, urlParams, CORS } from './_lib.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }

  if (process.env.NODE_ENV === 'production') {
    return new Response('Forbidden', { status: 403, headers: CORS });
  }

  const st = urlParams(req).get('st') || getBearerToken(req) || '';
  if (!st) {
    return new Response('Missing st', { status: 400, headers: CORS });
  }

  try {
    const parts = st.split('.');
    if (parts.length !== 3) throw new Error('Not a JWT');
    // base64url decode payload (no signature check here — debug only)
    const padded  = parts[1].replace(/-/g, '+').replace(/_/g, '/').padEnd(parts[1].length + (4 - parts[1].length % 4) % 4, '=');
    const decoded = JSON.parse(atob(padded));
    return new Response(JSON.stringify({ decoded }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  }
}
