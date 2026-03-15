// api/task/tokenParser.js
// STEP 3 — Serves the final payload keyed by ?token=<name>
//
// Requires a valid step-2 JWT (st) via query param or Authorization: Bearer header.
// Verifies step===2 and IP match before serving.
//
// Payloads are stored as Vercel env vars named PAYLOAD_<TOKEN_UPPER> (base64 or plain text).
// Example: token=812  →  env var PAYLOAD_812
//
// This avoids any filesystem reads, making it fully Edge-compatible.

export const config = { runtime: 'edge' };

import {
  getIp, isIpBlocked, blockAndRespond,
  verifyStepToken, getBearerToken,
  urlParams, CORS, plainHeaders,
} from './_lib.js';

function loadPayloadByToken(token) {
  if (!token) return null;
  // Sanitize: only allow alphanumeric + limited chars as env key suffix
  const safe = String(token).replace(/[^a-zA-Z0-9_\-]/g, '').toUpperCase();
  if (!safe) return null;
  const envKey = `PAYLOAD_${safe}`;
  const raw = process.env[envKey] || '';
  if (!raw) return null;
  try {
    return atob(raw);
  } catch {
    return raw;
  }
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }

  const ip        = getIp(req);
  const params    = urlParams(req);
  const origToken = params.get('token') || '';
  const st        = params.get('st') || getBearerToken(req) || '';

  console.log('[tokenParser] called by', ip, 'origToken=', origToken || '(none)');

  if (await isIpBlocked(ip)) {
    console.log('[tokenParser] BLOCKED:', ip);
    return new Response('Access permanently suspended.', { status: 403, headers: CORS });
  }

  // ── Verify step-2 token ──────────────────────────────────
  const decoded = await verifyStepToken(st);
  if (!decoded) {
    return blockAndRespond(ip, 'Invalid or missing step-2 token (st)');
  }
  if (decoded.step !== 2) {
    return blockAndRespond(ip, `Wrong step in token: expected 2, got ${decoded.step}`);
  }
  if (decoded.ip !== ip) {
    return blockAndRespond(ip, 'IP mismatch between JWT and request (possible relay/forgery)');
  }

  // ── Serve payload ────────────────────────────────────────
  const content = loadPayloadByToken(origToken);
  if (!content) {
    console.warn('[tokenParser] No payload found for token:', origToken);
    return new Response('Payload not found.', { status: 404, headers: CORS });
  }

  return new Response(content, { status: 200, headers: plainHeaders() });
}
