import { NextRequest, NextResponse } from "next/server";
import { markCardPaid, getCard } from "@/lib/cards";

export async function GET(req: NextRequest) {
  const cardId = req.nextUrl.searchParams.get("cardId");
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!cardId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (stripeKey && sessionId && sessionId !== "demo-mode") {
    // Verify the Stripe session metadata matches this cardId before marking paid
    try {
      const stripe = require("stripe")(stripeKey);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.metadata?.cardId !== cardId || session.payment_status !== "paid") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      console.error("Stripe session verification failed:", err);
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (!stripeKey) {
    // Demo mode: only accept cards that were created as unpaid demo cards
    const card = getCard(cardId);
    if (!card) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  markCardPaid(cardId, sessionId || "unknown");
  return NextResponse.redirect(new URL(`/success?cardId=${cardId}`, req.url));
}
