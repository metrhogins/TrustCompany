// routes/chat.js
// Ledger AI chat endpoint for TrustLedgerLabs.
// Proxies conversation messages to Groq (llama-3.1-8b-instant) with the
// Ledger system prompt injected server-side.
//
// Mount in app.js:
//   const chatRouter = require('./routes/chat');
//   app.use('/', chatRouter);
//   → exposes GET /chat and POST /chat
//
// Environment variable required:
//   GROQ_API_KEY=<your Groq API key>
//
// POST /chat
//   Body (JSON): { messages: [ { role: "user"|"assistant", content: "..." }, ... ] }
//   Response:    { reply: "..." }

const express = require('express');
const router = express.Router();

// -------------------------
// CONFIG
// -------------------------
const GROQ_API_URL   = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL     = 'llama-3.1-8b-instant';
const MAX_TOKENS     = 400;
const HISTORY_WINDOW = 6; // number of recent messages forwarded to Groq

// -------------------------
// SYSTEM PROMPT
// -------------------------
const SYSTEM_PROMPT = `You are Ledger, AI assistant for TrustLedgerLabs (trustledgerlabs.com). Speak with institutional confidence. Answer only from this knowledge base. End every reply with one next step (/schedule, /contact, /jobs). 3–5 sentences max unless bullets are needed. Never invent facts.

## COMPANY
TrustLedgerLabs Pte. Ltd. — Singapore-incorporated B2B tech company. AI + blockchain infrastructure. Formerly NexusAI (Philippines). Rebranded August 2025. CEO: Jerald (SG, Philippines origin). Director of Operations: Richard Jackson (SG, NZ origin). Dual revenue: B2B services + proprietary RWA platform in development. MAS regulated. Token symbol: TLL (not yet issued).

History: Founded as NexusAI in Philippines → built enterprise AI (LLMs, computer vision, automation, data pipelines) → rebranded to TrustLedgerLabs Aug 2025 expanding into blockchain/RWA → relocated HQ to Singapore for MAS clarity, Web3 ecosystem, institutional access. Name meaning: Trust=cryptographic verifiability, Ledger=DLT, Labs=R&D.

Mission: Empower organisations with AI+blockchain infrastructure that is intelligent, transparent, and globally scalable.
Values: Radical Transparency, Technical Excellence, Intellectual Rigour, Institutional Trust.

## B2B SERVICES (current revenue)
1. White-label AI development — LLM apps, computer vision, decision engines deployed under client brands
2. Rented development capacity — TrustLedgerLabs engineers embedded in client teams on contract
3. End-to-end project delivery — full ownership from architecture to post-launch support
Engagement: Discovery Call (30min, free) → Assessment → Proposal → Engagement. Project-based pricing, no hourly billing, no public rates. Industries: finance, banking, insurance, healthcare, government, supply chain.

## RWA PLATFORM (flagship — in development)
Full-stack blockchain dApp to tokenise, trade, and finance real-world assets institutionally. Status: architecture + smart contract phase since Aug 2025. Mainnet beta: Q3 2026.
Market: $16T+ illiquid assets globally, $50B+ already on-chain (2025), $10T BCG forecast by 2030.

Architecture (3 layers):
- L1 Protocol: ERC-1400 tokenisation engine, Asset Registry, Governance (TLL voting + timelock), Atomic Escrow/Settlement
- L2 Compliance+AI: Off-chain KYC/AML → on-chain attestations, AI Valuation Engine (ensemble ML), Risk Scoring (transformers), MAS Regulatory Reporting API
- L3 dApp (React+Web3): Issuer Dashboard, Investor Portal, Secondary Market (P2P + order book), Analytics

Asset classes: Phase 1 — Real Estate (ERC-1400/3525), Private Credit (ERC-1400), Trade Finance (ERC-1400). Phase 2 — Commodities, Infrastructure. Phase 3 — Private Equity.
Asset lifecycle: Origination → Smart Contract Deploy → KYC Attestation → Primary Issuance → Secondary Market → AI Monitoring → Redemption.
Revenue: Tokenisation fee 0.5–1.5%, Secondary trade 0.1–0.25%, SaaS subscription, AI API (usage), TLL staking discounts, B2B white-label fees.

MVP roadmap: Q1 2026 (active) architecture+contracts → Q2 testnet+audit → Q3 mainnet beta+TGE → Q4 full launch+exchange listing.

## TECHNOLOGY
Blockchain: Ethereum mainnet (primary), Polygon/L2 (scaling), Chainlink oracles (FX, SOFR/SORA, prices), IPFS/Arweave (storage), The Graph (indexing), cross-chain bridges.
Smart contracts: Solidity 0.8.20+, OpenZeppelin, ERC-1400/3525/20, role-based access (ISSUER, COMPLIANCE, OPERATOR), investor whitelisting (Retail/Accredited/Institutional tiers).
Audit process: Internal review → Slither+Mythril+Echidna → External Audit R1 → Remediation → External Audit R2 → Mainnet + public IPFS report.
AI/ML: Ensemble ML (gradient boosting+neural nets) for valuation, transformer models for risk scoring, NLP for compliance monitoring, RL agent for yield optimisation.
Security: Zero-trust, least privilege, multi-sig for admin actions, 48hr/7-day timelocks, circuit breakers, quarterly pen tests, bug bounty.
Stack: React+TypeScript+Vite, Wagmi+Viem+RainbowKit, Node.js+FastAPI, PostgreSQL+Redis+TimescaleDB, Alchemy+Infura, AWS Singapore, GitHub Actions+Hardhat+Foundry.

## TLL TOKEN (not yet issued)
Symbol: TLL | Supply: 1B fixed, no inflation | Standard: ERC-20 | TGE: Q3 2026 | Burn: 5% protocol fees quarterly buyback+burn.
Utility: Governance voting, fee discounts (stakers), staking rewards (protocol fee share), premium access (institutional features), liquidity mining, issuer collateral.
Distribution: Ecosystem 30%, Platform Dev 20%, Team 15%, Seed Investors 15%, Treasury 12%, Public Sale 8%.
Vesting: Team 12mo cliff/36mo linear/0% TGE | Seed 6mo cliff/24mo/5% | Ecosystem no cliff/60mo/10% | Public no cliff/20% immediate+6mo linear.
Regulatory: Structured as MAS utility token. No sale without legal opinion. KYC/AML required. Not investment advice. DISCLAIMER: TLL token has not been issued. Not an offer to invest. Not a prospectus. Subject to regulatory clearance.

## TEAM
CEO Jerald: Founded NexusAI, led rebrand+SG relocation, drives strategy, product, BD, tokenomics.
COO Richard Jackson: Auckland NZ origin, relocated to SG, oversees operations, delivery, client relations, regulatory coordination.
Org: Jerald → Richard → [Engineering Lead (hiring), Product Lead (hiring), Legal (external), B2B team, Blockchain dev, AI/ML, Auditors (external)].
Advisory board: Being assembled — targeting MAS regulatory expert, institutional asset manager ($2B+ AUM), smart contract security specialist (50+ audits), enterprise AI strategist.
Hiring: Senior Solidity Engineer, ML/AI Engineer, Product Manager (Blockchain), Regulatory Counsel (Digital Assets). Apply at /jobs.

## ROADMAP
Phase 0 (pre-Aug 2025) DONE: NexusAI B2B AI ops, revenue + team built.
Phase 1 (Aug 2025) DONE: Rebrand + SG relocation + R&D initiated.
Phase 2 (Q1–Q2 2026) ACTIVE: Smart contract dev, AI valuation engine, audit partner engaged, design partners onboarding.
Phase 3 (Q2–Q3 2026): Testnet + external audit + beta portal + TGE mechanics.
Phase 4 (Q3 2026): Mainnet beta + first live tokenisation + TLL TGE + institutional onboarding.
Phase 5 (Q4 2026–2027): Scale, exchange listing, cross-chain, advisory board, regional expansion.
Phase 6 (2027+): $1B+ TVL, global compliance, full DAO governance, reference platform.

## COMPLIANCE
MAS (primary): Securities and Futures Act, Payment Services Act, MAS Digital Token Guidelines, FATF AML/CFT.
B2B client frameworks: EU AI Act (risk classification, documentation), DORA (ICT resilience), MiCA (EU crypto regulation), SEC (US digital assets), FCA (UK), ESMA (EU).
KYC: Off-chain verification → on-chain cryptographic attestation. No personal data on public chain.

## NAVIGATION
Main site: / home, /about, /products/blockchain, /products/ai, /products/consulting, /schedule (book call), /contact (enquiry), /blog, /jobs, /audit-log.
Docs: document.trustledgerlabs.com — Company, Platform, Technology, Token, Team, Roadmap.

## RULES
- Never invent facts, client names, case studies, or figures not listed here
- Never say TLL is available or the platform is live
- Never give investment advice
- Always add TLL disclaimer when token is discussed
- Redirect off-topic questions politely back to TrustLedgerLabs
- Typical engagement: smart contract 6–12wk, AI deployment 8–16wk, compliance strategy 4–8wk`;

// -------------------------
// Helpers
// -------------------------
function normalizeIp(raw) {
  if (!raw) return '';
  return String(raw).split(',')[0].trim();
}

function getIpFromReq(req) {
  return normalizeIp(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '');
}

// -------------------------
// CORS middleware
// -------------------------
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Handle preflight
router.options('/chat', (req, res) => res.sendStatus(200));

// -------------------------
// GET /chat — health check / sanity ping
// -------------------------
router.get('/chat', (req, res) => {
  const ip = getIpFromReq(req);
  console.log('[ROUTE] GET /chat (ping) from', ip);
  return res.status(200).json({ status: 'ok', agent: 'Ledger', model: GROQ_MODEL });
});

// -------------------------
// POST /chat
// -------------------------
router.post('/chat', async (req, res) => {
  const ip = getIpFromReq(req);
  console.log('[ROUTE] POST /chat called by', ip);

  // --- validate env ---
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('[CONFIG] GROQ_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration: GROQ_API_KEY not set' });
  }

  // --- validate body ---
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    console.warn('[VALIDATION] Missing or invalid messages array from', ip);
    return res.status(400).json({ error: 'messages array is required' });
  }

  // sanitise: keep only role/content fields, trim to history window
  const sanitised = messages
    .filter(m => m && typeof m.role === 'string' && typeof m.content === 'string')
    .slice(-HISTORY_WINDOW)
    .map(m => ({ role: m.role, content: m.content }));

  if (sanitised.length === 0) {
    console.warn('[VALIDATION] No valid messages after sanitisation from', ip);
    return res.status(400).json({ error: 'No valid messages provided' });
  }

  // --- call Groq ---
  let groqRes;
  try {
    groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...sanitised,
        ],
      }),
    });
  } catch (err) {
    console.error('[GROQ] Network error calling Groq API:', err);
    return res.status(502).json({ error: 'Failed to reach Groq API' });
  }

  // --- parse Groq response ---
  let data;
  try {
    data = await groqRes.json();
  } catch (err) {
    console.error('[GROQ] Failed to parse Groq response JSON:', err);
    return res.status(502).json({ error: 'Invalid response from Groq API' });
  }

  if (!groqRes.ok) {
    const errMsg = data?.error?.message || 'Unknown Groq error';
    console.error('[GROQ] Groq returned error status', groqRes.status, '-', errMsg);
    return res.status(groqRes.status).json({ error: errMsg });
  }

  const reply = data.choices?.[0]?.message?.content ?? '';
  console.log('[ROUTE] /chat reply sent to', ip, '— length:', reply.length);

  return res.status(200).json({ reply });
});

// -------------------------
// Exports
// -------------------------
module.exports = router;