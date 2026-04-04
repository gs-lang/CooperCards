import { NextRequest, NextResponse } from "next/server";
import { markCardPaid } from "@/lib/cards";

export async function GET(req: NextRequest) {
  const cardId = req.nextUrl.searchParams.get("cardId");
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!cardId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Mark card as paid
  markCardPaid(cardId, sessionId || "unknown");

  // Redirect to success page
  return NextResponse.redirect(new URL(`/success?cardId=${cardId}`, req.url));
}
