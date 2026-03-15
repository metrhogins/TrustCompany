// api/task/_lib.js
// Shared utilities for the task flow — Edge-runtime compatible (Web Crypto API, no Node built-ins).

// ─────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────
export const STEP_MIN_DELAY_MS = parseInt(process.env.STEP_MIN_DELAY_MS || '4000', 10);
export const JWT_TTL_SECONDS   = parseInt(process.env.JWT_TTL_SECONDS   || '180',  10); // 3 min
export const SECRET_KEY        = process.env.SECRET_KEY || 'CHANGE_THIS_SECRET_TO_A_STRONG_VALUE';
export const SECURITY_ENABLED  = process.env.SECURITY_ENABLED !== 'false'; // default true

// ─────────────────────────────────────────────────────────
// CORS HEADERS
// ─────────────────────────────────────────────────────────
export const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function plainHeaders(extra = {}) {
  return { 'Content-Type': 'text/plain', ...CORS, ...extra };
}

// ─────────────────────────────────────────────────────────
// IP HELPERS
// ─────────────────────────────────────────────────────────
export function getIp(req) {
  const fwd = req.headers.get('x-forwarded-for') || '';
  return fwd.split(',')[0].trim() || 'unknown';
}

export function isBrowser(req) {
  const ua = req.headers.get('user-agent') || '';
  return /Mozilla\/5\.0|Chrome|Firefox|Safari|Edge/i.test(ua);
}

// ─────────────────────────────────────────────────────────
// FIREBASE BLOCKLIST  (skipped if SECURITY_ENABLED=false or no credentials)
// ─────────────────────────────────────────────────────────
async function getFirestoreToken() {
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!sa) return null;
  try {
    const { private_key, client_email, project_id } = JSON.parse(sa);
    // Build a signed JWT for the Firestore REST API
    const now = Math.floor(Date.now() / 1000);
    const header  = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payload = b64url(JSON.stringify({
      iss: client_email, sub: client_email,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now, exp: now + 3600,
      scope: 'https://www.googleapis.com/auth/datastore',
    }));
    const data = `${header}.${payload}`;

    // Import the RSA private key
    const keyData = pemToArrayBuffer(private_key);
    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8', keyData,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false, ['sign']
    );
    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(data));
    const signedJwt = `${data}.${b64url(sig)}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: signedJwt,
      }),
    });
    const { access_token } = await tokenRes.json();
    return { access_token, project_id };
  } catch (e) {
    console.error('[LIB] getFirestoreToken error:', e);
    return null;
  }
}

export async function isIpBlocked(ip) {
  if (!SECURITY_ENABLED || !process.env.FIREBASE_SERVICE_ACCOUNT) return false;
  try {
    const auth = await getFirestoreToken();
    if (!auth) return false;
    const url = `https://firestore.googleapis.com/v1/projects/${auth.project_id}/databases/(default)/documents/blocked_ips/${encodeURIComponent(ip)}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${auth.access_token}` } });
    return res.ok; // 200 = doc exists = blocked; 404 = not blocked
  } catch (e) {
    console.error('[LIB] isIpBlocked error (allowing):', e);
    return false;
  }
}

export async function persistBlockIp(ip, reason) {
  if (!SECURITY_ENABLED || !process.env.FIREBASE_SERVICE_ACCOUNT) return;
  try {
    const auth = await getFirestoreToken();
    if (!auth) return;
    const url = `https://firestore.googleapis.com/v1/projects/${auth.project_id}/databases/(default)/documents/blocked_ips/${encodeURIComponent(ip)}`;
    await fetch(url, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${auth.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          ip:        { stringValue: ip },
          reason:    { stringValue: reason || 'unknown' },
          timestamp: { integerValue: String(Date.now()) },
        },
      }),
    });
    console.log('[LIB] Blocked IP written to Firestore:', ip, '-', reason);
  } catch (e) {
    console.error('[LIB] persistBlockIp error:', e);
  }
}

export async function blockAndRespond(ip, reason) {
  console.warn('[LIB] Blocking IP:', ip, '-', reason);
  await persistBlockIp(ip, reason);
  return new Response('Access permanently suspended.', { status: 403, headers: CORS });
}

// ─────────────────────────────────────────────────────────
// HMAC-SHA256 JWT  (HS256 — Edge-compatible, no jsonwebtoken dep)
// ─────────────────────────────────────────────────────────
function b64url(data) {
  let bytes;
  if (typeof data === 'string') {
    bytes = new TextEncoder().encode(data);
  } else if (data instanceof ArrayBuffer) {
    bytes = new Uint8Array(data);
  } else {
    bytes = new Uint8Array(data);
  }
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + (4 - str.length % 4) % 4, '=');
  const bin = atob(padded);
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}

async function getHmacKey() {
  return crypto.subtle.importKey(
    'raw', new TextEncoder().encode(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']
  );
}

export async function createStepToken(ip, sessionId, step, origToken) {
  const header  = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64url(JSON.stringify({
    ip, sessionId, step,
    timestamp: Date.now(),
    origToken: origToken || null,
    exp: Math.floor(Date.now() / 1000) + JWT_TTL_SECONDS,
  }));
  const data = `${header}.${payload}`;
  const key  = await getHmacKey();
  const sig  = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return `${data}.${b64url(sig)}`;
}

export async function verifyStepToken(token) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, sig] = parts;
    const data = `${header}.${payload}`;
    const key  = await getHmacKey();
    const valid = await crypto.subtle.verify(
      'HMAC', key,
      b64urlDecode(sig),
      new TextEncoder().encode(data)
    );
    if (!valid) return null;
    const decoded = JSON.parse(new TextDecoder().decode(b64urlDecode(payload)));
    if (decoded.exp && Math.floor(Date.now() / 1000) > decoded.exp) return null; // expired
    return decoded;
  } catch (e) {
    return null;
  }
}

export function getBearerToken(req) {
  const h = req.headers.get('authorization') || '';
  const parts = h.split(' ');
  return parts.length === 2 && /^bearer$/i.test(parts[0]) ? parts[1] : null;
}

export function genSessionId() {
  return crypto.randomUUID();
}

// ─────────────────────────────────────────────────────────
// RSA PEM → ArrayBuffer  (for Firebase JWT signing above)
// ─────────────────────────────────────────────────────────
function pemToArrayBuffer(pem) {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '');
  const bin = atob(b64);
  return Uint8Array.from(bin, c => c.charCodeAt(0)).buffer;
}

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────
export function getHost(req) {
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host  = req.headers.get('host') || '';
  return `${proto}://${host}`;
}

export function urlParams(req) {
  return new URL(req.url).searchParams;
}
