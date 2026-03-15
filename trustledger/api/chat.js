export const config = {
  runtime: "edge",
};

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

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GROQ_API_KEY not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let messages;
  try {
    const body = await req.json();
    messages = body.messages;
    if (!messages || !Array.isArray(messages)) throw new Error("invalid");
  } catch {
    return new Response(JSON.stringify({ error: "messages array required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

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
      return new Response(JSON.stringify({ error: data?.error?.message || "Groq error" }), {
        status: groqRes.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const reply = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}
