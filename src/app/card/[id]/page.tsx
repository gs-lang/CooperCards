import { CARD_TEMPLATES, CHARITIES } from "@/lib/data";
import { getCard } from "@/lib/cards";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CardViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = getCard(id);
  if (!card || !card.paid) return notFound();

  const template = CARD_TEMPLATES.find((t) => t.id === card.templateId) || CARD_TEMPLATES[4];
  const charity = CHARITIES.find((c) => c.id === card.charityId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Card Display */}
      <div
        className={`bg-gradient-to-br ${template.bgGradient} rounded-3xl p-10 md:p-14 text-center ${template.textColor} shadow-xl mb-8`}
      >
        <span className="text-7xl block mb-4">{template.emoji}</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{template.name}</h1>
        <p className="text-xl opacity-90">Dear {card.recipientName},</p>
        {card.personalMessage && (
          <p className="mt-4 text-lg opacity-90 italic max-w-md mx-auto leading-relaxed">
            &ldquo;{card.personalMessage}&rdquo;
          </p>
        )}
        <p className="mt-6 opacity-80">With love, {card.senderName}</p>
      </div>

      {/* Donation Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
        <p className="text-gray-500 text-sm mb-1">This card included a donation of</p>
        <p className="text-3xl font-bold text-rose-500 mb-1">
          ${(card.donationAmount / 100).toFixed(0)}
        </p>
        <p className="text-gray-600">
          to <span className="font-semibold">{charity?.name || card.charityName}</span>{" "}
          {charity?.logo}
        </p>
        {charity && (
          <p className="text-gray-400 text-sm mt-2">{charity.description}</p>
        )}
      </div>

      {/* Send your own CTA */}
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-3">Want to send your own card that gives back?</p>
        <Link
          href="/cards"
          className="inline-block px-8 py-3 rounded-full text-white font-semibold transition-all hover:scale-105"
          style={{ background: "#e94560" }}
        >
          Send a CooperCard
        </Link>
      </div>
    </div>
  );
}
