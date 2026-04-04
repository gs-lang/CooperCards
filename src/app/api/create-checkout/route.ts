import { NextRequest, NextResponse } from "next/server";
import { createCard } from "@/lib/cards";
import { calculatePlatformFee, CHARITIES, CARD_TEMPLATES } from "@/lib/data";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    templateId,
    charityId,
    charityName,
    donationAmount,
    senderName,
    recipientName,
    recipientEmail,
    personalMessage,
  } = body;

  // Validate
  if (!templateId || !charityId || !donationAmount || !senderName || !recipientName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (![500, 1000, 2500].includes(donationAmount)) {
    return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 });
  }
  if (!CHARITIES.find((c) => c.id === charityId)) {
    return NextResponse.json({ error: "Invalid charity" }, { status: 400 });
  }
  if (!CARD_TEMPLATES.find((c) => c.id === templateId)) {
    return NextResponse.json({ error: "Invalid card template" }, { status: 400 });
  }

  const cardId = randomUUID();
  const platformFee = calculatePlatformFee(donationAmount);
  const total = donationAmount + platformFee;

  // Create card record
  const card = createCard({
    id: cardId,
    templateId,
    charityId,
    charityName,
    donationAmount,
    senderName,
    recipientName,
    recipientEmail,
    personalMessage,
    paid: false,
    createdAt: new Date().toISOString(),
  });

  // Check if Stripe is configured
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    try {
      const stripe = require("stripe")(stripeKey);
      const charity = CHARITIES.find((c) => c.id === charityId);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `CooperCard — ${charity?.name || charityName}`,
                description: `Donation to ${charity?.name || charityName} with a ${CARD_TEMPLATES.find((t) => t.id === templateId)?.name || "greeting"} card for ${recipientName}`,
              },
              unit_amount: total,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.nextUrl.origin}/api/payment-success?cardId=${cardId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.nextUrl.origin}/send?card=${templateId}`,
        metadata: { cardId },
      });
      return NextResponse.json({ url: session.url });
    } catch (err) {
      console.error("Stripe error:", err);
      // Fall through to demo mode
    }
  }

  // Demo mode: mark as paid immediately (no Stripe configured)
  const { markCardPaid } = require("@/lib/cards");
  markCardPaid(cardId, "demo-mode");
  return NextResponse.json({ cardId, demo: true });
}
