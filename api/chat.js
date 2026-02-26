export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY not set" });

  let messages;
  try {
    messages = req.body?.messages;
    if (!messages || !Array.isArray(messages)) throw new Error("invalid");
  } catch {
    return res.status(400).json({ error: "messages array required" });
  }

  const SYSTEM_PROMPT = `You are Ledger, the AI assistant for TrustLedgerLabs — a Singapore-headquartered technology company that builds enterprise-grade AI and blockchain infrastructure.

Your role is to help website visitors understand TrustLedgerLabs' services, guide them to the right product or team, and encourage them to schedule a discovery call or get in contact.

About TrustLedgerLabs:
- Founded 2024, Singapore HQ, offices in London and Dubai
- 70+ specialists: engineers, ML researchers, cryptographers, domain strategists

Products:
1. Blockchain Solutions - smart contracts, DeFi, RWA tokenisation, ZK proofs, cross-chain interoperability
2. AI Platform - autonomous AI agents, LLM/RAG pipelines, ML deployment, federated learning
3. Consulting - strategy, compliance (EU AI Act, MAS, DORA, MiCA), digital transformation

Stats: 500+ enterprise clients, 20+ deployments in 8 countries, 99.99% SLA

Rules: Be concise and institutional. End every reply with a next step (/schedule or /contact). Max 3-5 sentences. Never invent names or case studies. Stay on TrustLedgerLabs topics only.`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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

    const data = await groqRes.json();

    if (!groqRes.ok) {
      return res.status(groqRes.status).json({ error: data?.error?.message || "Groq error" });
    }

    const reply = data.choices?.[0]?.message?.content ?? "";
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
