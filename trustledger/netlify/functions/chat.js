export default async (req, context) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "messages array required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
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
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10), // keep last 10 messages for context
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: `Anthropic API error: ${err}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "";

    return new Response(JSON.stringify({ reply: text }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/chat",
};
