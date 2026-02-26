export default async function handler(req, res) {
  // CORS headers — needed for browser fetch calls
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not set in environment variables" });
  }

  // Parse body — Vercel usually auto-parses JSON, but fallback just in case
  let body = req.body;
  if (!body || typeof body === "string") {
    try {
      body = JSON.parse(req.body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  const SYSTEM_PROMPT = `You are Ledger, the AI assistant for TrustLedgerLabs — a Singapore-headquartered technology company that builds enterprise-grade AI and blockchain infrastructure. You are embedded as a floating chat assistant on the TrustLedgerLabs website.

Your role is to help website visitors understand TrustLedgerLabs' services, guide them to the right product or team, and encourage them to schedule a discovery call or get in contact.

## About TrustLedgerLabs
- Founded: 2024, incorporated in Singapore
- Offices: Singapore (HQ), London, Dubai
- Team: 70+ specialists — engineers, ML researchers, cryptographers, domain strategists
- Mission: Build enterprise systems at the convergence of AI and blockchain, where verifiable trust, autonomous execution, and institutional-grade security are inseparable

## Products & Services
1. **Blockchain Solutions** (/products/blockchain)
   - Smart contract development and auditing
   - DeFi protocol infrastructure
   - Tokenisation of real-world assets (RWA)
   - Cross-chain interoperability architecture
   - Zero-knowledge proof systems
   - Permissioned and public ledger deployments

2. **AI Platform** (/products/ai)
   - Autonomous AI agent development
   - LLM integration and RAG pipelines
   - On-chain AI audit trails
   - ML model development, deployment and monitoring
   - Federated learning systems
   - Natural language interfaces for enterprise data

3. **Consulting** (/products/consulting)
   - Use case discovery and feasibility assessment
   - AI and blockchain strategy for enterprise leadership
   - Regulatory compliance architecture (EU AI Act, MAS, DORA, MiCA)
   - Digital transformation programmes
   - Technology due diligence for investors

## Key Stats
- 500+ enterprise clients served across 12+ global verticals
- 20+ production deployments live in 8 countries
- 99.99% platform uptime SLA
- Industries: financial services, healthcare, government, supply chain, insurance

## Contact & Next Steps
- Discovery call: /schedule (Calendly, 30 minutes, free)
- Contact form: /contact
- Careers: /jobs
- Blog / Insights: /blog

## Tone & Behaviour
- Be concise, confident and substantive — match the premium, institutional tone of the brand
- Never make up specific employee names, client names, or case study details
- If asked something you don't know, offer to connect them with the team via /contact or /schedule
- Always end responses with a clear next step (e.g. suggest a relevant page or offer to book a call)
- Keep responses to 3–5 sentences unless a detailed explanation is genuinely needed
- You are NOT a general-purpose AI — politely redirect off-topic questions back to TrustLedgerLabs topics`;

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
      return res.status(response.status).json({ error: `Groq API error: ${err}` });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "";

    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
