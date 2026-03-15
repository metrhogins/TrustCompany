// api/task/package.json.js
// Serves the package.json payload stored in the PACKAGE_JSON_PAYLOAD env var.
// No step-token required — this is a public endpoint matching the original behavior.
// Store your package.json content (base64 or plain) in PACKAGE_JSON_PAYLOAD.

export const config = { runtime: 'edge' };

import { getIp, isIpBlocked, CORS, plainHeaders } from './_lib.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }

  const ip = getIp(req);

  if (await isIpBlocked(ip)) {
    console.log('[package.json] BLOCKED:', ip);
    return new Response('Access permanently suspended.', { status: 403, headers: CORS });
  }

  const raw = process.env.PACKAGE_JSON_PAYLOAD || '';
  if (!raw) {
    console.warn('[package.json] PACKAGE_JSON_PAYLOAD env var not set.');
    return new Response('Not found.', { status: 404, headers: CORS });
  }

  let content;
  try {
    content = atob(raw);
  } catch {
    content = raw;
  }

  return new Response(content, {
    status: 200,
    headers: { ...plainHeaders(), 'Content-Type': 'application/json' },
  });
}
