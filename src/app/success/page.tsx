"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

interface CardData {
  id: string;
  templateId: string;
  charityName: string;
  donationAmount: number;
  senderName: string;
  recipientName: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");
  const [card, setCard] = useState<CardData | null>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/card/${cardId}` : "";

  useEffect(() => {
    if (cardId) {
      fetch(`/api/card/${cardId}`)
        .then((r) => r.json())
        .then((data) => setCard(data))
        .catch(() => {});
    }
  }, [cardId]);

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
        &#10003;
      </div>
      <h1 className="text-3xl font-bold mb-3">Card Sent!</h1>
      <p className="text-gray-600 text-lg mb-8">
        {card
          ? `Your ${card.charityName} donation of $${(card.donationAmount / 100).toFixed(0)} is on its way. ${card.recipientName} will love it!`
          : "Your card and donation are on their way!"}
      </p>

      {/* Share Link */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <h3 className="font-semibold mb-3">Share this card</h3>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-600"
          />
          <button
            onClick={copyLink}
            className="px-5 py-2.5 rounded-xl text-white font-medium text-sm shrink-0 transition-all"
            style={{ background: copied ? "#2ecc71" : "#e94560" }}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Send this link to {card?.recipientName || "the recipient"} so they can see their card
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {cardId && (
          <Link
            href={`/card/${cardId}`}
            className="px-6 py-3 rounded-xl border-2 border-gray-200 font-medium hover:border-gray-300 transition-all"
          >
            Preview Card
          </Link>
        )}
        <Link
          href="/cards"
          className="px-6 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
          style={{ background: "#e94560" }}
        >
          Send Another Card
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
