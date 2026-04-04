"use client";

import Link from "next/link";
import { CARD_TEMPLATES } from "@/lib/data";

export default function CardsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Choose a Card</h1>
        <p className="text-gray-600 text-lg">Pick the perfect card for your occasion</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARD_TEMPLATES.map((card) => (
          <Link
            key={card.id}
            href={`/send?card=${card.id}`}
            className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`bg-gradient-to-br ${card.bgGradient} p-10 flex flex-col items-center justify-center min-h-[220px]`}
            >
              <span className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                {card.emoji}
              </span>
              <h3 className={`text-xl font-bold ${card.textColor}`}>{card.name}</h3>
            </div>
            <div className="p-4 bg-white">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {card.category}
              </span>
              <p className="text-gray-600 text-sm mt-1">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
