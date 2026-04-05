# CooperCards

Charitable giving platform — send beautiful greeting cards that trigger real donations to charities.

**Stack:** Next.js 16, Stripe, Tailwind CSS, TypeScript

---

## Quick Deploy to Replit

### Step 1 — Upload the code

From this machine, zip the project (excluding `node_modules` and `.next`):

```bash
zip -r cooper-cards.zip . -x "node_modules/*" -x ".next/*" -x "data/*"
```

Upload the zip to your Replit project at https://replit.com/@gregsilverman1/Cooper-Cards, or push via git:

```bash
git remote add replit https://replit.com/@gregsilverman1/Cooper-Cards.git
git push replit main
```

### Step 2 — Set Replit Secrets

In Replit → Secrets, add:

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (from Stripe Dashboard) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from Stripe Webhooks) |
| `NEXT_PUBLIC_BASE_URL` | `https://your-replit-url.replit.app` |

### Step 3 — Install and run

In the Replit Shell:

```bash
npm install
npm run build
npm start
```

### Step 4 — Configure Stripe Webhook

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://your-replit-url.replit.app/api/webhook`
- Events: `checkout.session.completed`

Copy the webhook signing secret and add it as `STRIPE_WEBHOOK_SECRET` in Replit Secrets.

### Step 5 — Switch to live Stripe keys

Replace `sk_test_...` and `pk_test_...` with live keys from the Stripe Dashboard.

---

## Demo Mode (no Stripe needed)

Without `STRIPE_SECRET_KEY` set, the app runs in demo mode — checkout skips Stripe and cards are marked paid instantly. Useful for testing the full flow.

---

## App Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/cards` | Card template gallery |
| `/send?card={id}` | Charity selection + checkout |
| `/success?cardId={id}` | Confirmation + share link |
| `/card/{id}` | Recipient card view |
| `/api/create-checkout` | POST — creates Stripe checkout session |
| `/api/payment-success` | GET — handles Stripe redirect, marks card paid |
| `/api/webhook` | POST — Stripe webhook for reliable payment confirmation |
| `/api/card/[id]` | GET — fetches card data |

---

## Environment Variables

See `.env.example` for all variables. Copy to `.env.local` for local dev:

```bash
cp .env.example .env.local
# Edit .env.local with your keys
```

---

## Local Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve production build
```

Cards are stored in `data/cards.json` (created automatically). Reset by deleting the file.
