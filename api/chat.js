const https = require("https");

const SYSTEM_PROMPT = `You are Ledger, the AI assistant for TrustLedgerLabs — a Singapore-headquartered technology company that builds enterprise-grade AI and blockchain infrastructure.

Your role is to help website visitors understand TrustLedgerLabs' services, guide them to the right product or team, and encourage them to schedule a discovery call or get in contact.

## About TrustLedgerLabs
- Founded: 2024, incorporated in Singapore
- Offices: Singapore (HQ), London, Dubai
- Team: 70+ specialists — engineers, ML researchers, cryptographers, domain strategists

## Products & Services
1. Blockchain Solutions - Smart contracts, DeFi, RWA tokenisation, ZK proofs, cross-chain interoperability
2. AI Platform - AI agents, LLM integration, RAG pipelines, ML model deployment, federated learning
3. Consulting - Strategy, compliance (EU AI Act, MAS, DORA, MiCA), digital transformation, due diligence

## Key Stats
- 500+ enterprise clients across 12+ global verticals
- 20+ production deployments live in 8 countries
- 70+ specialists, 99.99% platform uptime SLA

## Tone & Behaviour
- Concise, confident, institutional tone
- Never invent names, clients, or case study details
- Always end with a clear next step (/schedule or /contact)
- Keep responses to 3-5 sentences
- Redirect off-topic questions back to TrustLedgerLabs`;

function groqRequest(apiKey, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const options = {
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "Content-Length": Buffer.byteLength(payload),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({ status: res.statusCode, body: data });
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY is not set" });

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  try {
    const result = await groqRequest(apiKey, {
      model: "llama-3.1-8b-instant",
      max_tokens: 400,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
    });

    if (result.status !== 200) {
      return res.status(result.status).json({ error: "Groq error: " + result.body });
    }

    const data = JSON.parse(result.body);
    const text = data.choices[0].message.content || "";
    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
