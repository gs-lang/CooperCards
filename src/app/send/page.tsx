"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { CARD_TEMPLATES, CHARITIES, DONATION_TIERS, calculatePlatformFee } from "@/lib/data";

function SendForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cardId = searchParams.get("card") || "general";

  const template = CARD_TEMPLATES.find((c) => c.id === cardId) || CARD_TEMPLATES[4];
  const [selectedCharity, setSelectedCharity] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"charity" | "details">("charity");

  const charity = CHARITIES.find((c) => c.id === selectedCharity);
  const platformFee = calculatePlatformFee(selectedAmount);
  const total = selectedAmount + platformFee;

  async function handleSubmit() {
    if (!selectedCharity || !senderName || !recipientName) return;
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          charityId: selectedCharity,
          charityName: charity?.name || "",
          donationAmount: selectedAmount,
          senderName,
          recipientName,
          recipientEmail,
          personalMessage,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.cardId) {
        router.push(`/success?cardId=${data.cardId}`);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Card preview header */}
      <div className="mb-8">
        <div
          className={`bg-gradient-to-br ${template.bgGradient} rounded-2xl p-8 text-center ${template.textColor}`}
        >
          <span className="text-5xl">{template.emoji}</span>
          <h2 className="text-2xl font-bold mt-2">{template.name}</h2>
        </div>
      </div>

      {step === "charity" ? (
        <>
          <h2 className="text-2xl font-bold mb-2">Choose a Charity</h2>
          <p className="text-gray-600 mb-6">Your donation goes directly to the charity you pick</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {CHARITIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCharity(c.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  selectedCharity === c.id
                    ? "border-rose-500 bg-rose-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <span className="text-2xl shrink-0">{c.logo}</span>
                <div>
                  <h3 className="font-semibold text-sm">{c.name}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{c.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Donation Amount */}
          <h3 className="text-lg font-semibold mb-3">Donation Amount</h3>
          <div className="flex gap-3 mb-8">
            {DONATION_TIERS.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => setSelectedAmount(tier.amount)}
                className={`flex-1 py-3 rounded-xl font-semibold text-lg border-2 transition-all ${
                  selectedAmount === tier.amount
                    ? "border-rose-500 bg-rose-50 text-rose-600"
                    : "border-gray-100 hover:border-gray-200 text-gray-700"
                }`}
              >
                {tier.display}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep("details")}
            disabled={!selectedCharity}
            className="w-full py-3 rounded-xl text-white font-semibold text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            style={{ background: selectedCharity ? "#e94560" : "#ccc" }}
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setStep("charity")}
            className="text-gray-500 hover:text-gray-700 mb-4 text-sm"
          >
            &larr; Back to charity selection
          </button>

          <h2 className="text-2xl font-bold mb-6">Personalize Your Card</h2>

          {/* Summary bar */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{charity?.logo}</span>
              <span className="font-medium text-sm">{charity?.name}</span>
            </div>
            <span className="font-bold text-rose-600">
              ${(selectedAmount / 100).toFixed(0)} donation
            </span>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient&apos;s Name *
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none"
                placeholder="Who is this card for?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient&apos;s Email (optional)
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none"
                placeholder="They'll get a notification"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Message
              </label>
              <textarea
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none resize-none"
                placeholder="Add a heartfelt message..."
              />
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Donation to {charity?.name}</span>
              <span>${(selectedAmount / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Platform fee</span>
              <span>${(platformFee / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !senderName || !recipientName}
            className="w-full py-3 rounded-xl text-white font-semibold text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            style={{
              background: !loading && senderName && recipientName ? "#e94560" : "#ccc",
            }}
          >
            {loading ? "Processing..." : `Pay $${(total / 100).toFixed(2)} & Send Card`}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Secure payment powered by Stripe. Your donation goes directly to the selected charity.
          </p>
        </>
      )}
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full" />
        </div>
      }
    >
      <SendForm />
    </Suspense>
  );
}
