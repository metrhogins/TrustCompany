# TrustLedgerLabs

## Setup & Run Locally

### Prerequisites
- Node.js 18+
- npm 9+

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Fixes Applied

| # | Issue | Fix |
|---|-------|-----|
| 1 | `"company": "file:.."` in `package.json` | Removed — broken local path dependency not used in code |
| 2 | `firebase: "^12.9.0"` (non-existent version) | Changed to `^10.13.0` — stable release using the same modular API |
| 3 | No `tsconfig.json` for `.tsx` files | Added `tsconfig.json` + `tsconfig.node.json` |
| 4 | Vite alias `'@': '/src'` (absolute path, breaks on Windows) | Updated to use `fileURLToPath` for cross-platform support |
| 5 | Broken `node_modules` & `package-lock.json` from zip | Deleted — fresh `npm install` will regenerate correctly |

---

## Notes

- **Firebase Dashboard** (`/contact/dashboard`): Uses a hardcoded Firebase config. Ensure project `company-application-33a02` is active with Firestore read access.
- **reCAPTCHA** on Contact & Jobs pages: Site keys are domain-restricted. Add `localhost` to allowed domains in [Google reCAPTCHA console](https://www.google.com/recaptcha/admin).
- **`socket.io-client`**: Listed as a dependency but not used anywhere. Safe to remove.
