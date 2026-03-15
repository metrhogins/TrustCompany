# 🤖 AI Chat Agent — Setup Instructions

Your AI assistant "Ledger" is fully built and ready. Follow these steps to activate it.

---

## Step 1 — Get a Free Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign up for a free account
3. Navigate to **API Keys** → click **Create Key**
4. Copy the key (starts with `sk-ant-...`)

> Anthropic gives you **$5 free credit** — enough for thousands of conversations.
> The model used is `claude-haiku-4-5` (fastest & cheapest — ~$0.001 per chat).

---

## Step 2 — Add the Key to Netlify

1. Go to your site in **Netlify dashboard**
2. Click **Site Configuration** → **Environment Variables**
3. Click **Add a variable**
4. Set:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-key-here`
5. Click **Save**
6. **Redeploy** your site (Deploys → Trigger deploy → Deploy site)

That's it. The API key stays on the server — it is never exposed to the browser.

---

## How It Works

```
User types a message in the chat widget
        ↓
Request goes to /api/chat (Netlify serverless function)
        ↓
Function adds your API key and calls Anthropic securely
        ↓
Response comes back and displays in the chat
```

**The API key is never in your frontend code.** ✅

---

## What Ledger Can Do

- Answer questions about TrustLedgerLabs services (AI, Blockchain, Consulting)
- Guide visitors to the right product page
- Explain how to book a discovery call
- Handle contact and careers enquiries
- Maintain conversation context across multiple messages

---

## Customising Ledger's Knowledge

To update what Ledger knows, edit the `SYSTEM_PROMPT` in:
```
netlify/functions/chat.js
```

Add client case studies, new services, team bios, pricing info — anything
you want Ledger to be able to discuss.

---

## Cost Estimate

| Traffic | Monthly Cost |
|---------|-------------|
| 100 conversations | ~$0.10 |
| 1,000 conversations | ~$1.00 |
| 10,000 conversations | ~$10.00 |

Free tier credit covers the first ~5,000 conversations.
