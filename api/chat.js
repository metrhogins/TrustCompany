const SYSTEM_PROMPT = `You are Ledger, the AI assistant for TrustLedgerLabs — a Singapore-headquartered technology company that builds enterprise-grade AI and blockchain infrastructure. You are embedded as a floating chat assistant on the TrustLedgerLabs website.

Your role is to help website visitors understand TrustLedgerLabs' services, guide them to the right product or team, and encourage them to schedule a discovery call or get in contact.

## About TrustLedgerLabs
- Founded: 2024, incorporated in Singapore
- Offices: Singapore (HQ), London, Dubai
- Team: 70+ specialists — engineers, ML researchers, cryptographers, domain strategists
- Mission: Build enterprise systems at the convergence of AI and blockchain

## Products & Services
1. Blockchain Solutions - Smart contracts, DeFi, RWA tokenisation, ZK proofs, cross-chain interoperability
2. AI Platform - AI agents, LLM integration, RAG pipelines, ML model deployment, federated learning
3. Consulting - Strategy, compliance (EU AI Act, MAS, DORA, MiCA), digital transformation, due diligence

## Key Stats
- 500+ enterprise clients across 12+ global verticals
- 20+ production deployments live in 8 countries
- 70+ specialists across Singapore, London and Dubai
- 99.99% platform uptime SLA
- Industries: financial services, healthcare, government, supply chain, insurance

## Contact & Next Steps
- Discovery call: /schedule (30 minutes, free)
- Contact form: /contact
- Careers: /jobs
- Blog: /blog

## Tone & Behaviour
- Concise, confident, institutional tone
- Never invent names, clients, or case study details
- Always end with a clear next step
- Keep responses to 3-5 sentences unless more detail is genuinely needed
- You are NOT a general-purpose AI — redirect off-topic questions back to TrustLedgerLabs`;

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
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: "Groq API error: " + err });
    }

    const data = await response.json();
    const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
