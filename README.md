# Greta — AI Influencer Portfolio Demo

A single static page (`index.html`) plus two tiny Vercel serverless functions.
No framework, no database — just GitHub + Vercel + OpenRouter + PayPal, as requested.

```
├── index.html          the whole app (chat, profile, store, credits, VIP, contact)
├── data/
│   └── catalog.json     single source of truth: creator info, store items, VIP price
├── api/
│   ├── chat.js           calls OpenRouter (openai/gpt-oss-safeguard-20b), keeps your key secret
│   └── config.js          hands the PayPal Client ID to the browser
├── package.json
├── vercel.json
└── .env.example
```

## Rebrand for a new client

Edit **`data/catalog.json`** — creator name, bio, location, niche, store products & prices, VIP price.
Everything on the page (chat persona, store grid, pricing) reads from this one file.

Edit the two `agencyName` / `agencyContact` lines near the top of `index.html`'s `<script>` block
to point at your agency instead of the placeholder.

To change Greta's personality itself, edit the `buildSystemPrompt()` function in `api/chat.js`.

## Environment variables (set in Vercel, never commit real keys)

| Variable | Required | Where to get it |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | https://openrouter.ai/keys |
| `PAYPAL_CLIENT_ID` | For checkout | https://developer.paypal.com/dashboard/applications |
| `SITE_URL` | No | your deployed URL, used only in an outgoing header |

See `.env.example` for the exact format.

## Notes on scope (read before showing this to a client)

- **Credits are stored in the browser only** (localStorage) — there's no account system or database. Clearing browser data resets them. Fine for a demo; a real multi-device product would need a backend + auth.
- **Checkout is one-time payment via PayPal Buttons**, including the "VIP" tiers — it is *not* auto-renewing. True recurring billing needs a PayPal Subscription Plan (Product + Plan created in the PayPal dashboard, then its Plan ID dropped into the checkout code) — a good next step once a client says yes.
- **Reviews are empty by default** — this build deliberately ships with no placeholder testimonials. Add real ones to `data/catalog.json` → `reviews` once they exist.
- The `openai/gpt-oss-safeguard-20b` model on OpenRouter is a safety/content-classification model rather than a general conversational one — it works, but if replies feel stiff, swap the `MODEL` constant in `api/chat.js` for a general chat model.
