// Card templates and charity data for CooperCards MVP

export interface CardTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  emoji: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
}

export interface Charity {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string; // emoji placeholder for MVP
  website: string;
}

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: "birthday",
    name: "Happy Birthday",
    category: "Birthday",
    description: "Celebrate someone's special day with a gift that gives back",
    emoji: "🎂",
    bgGradient: "from-pink-400 via-purple-400 to-indigo-400",
    textColor: "text-white",
    accentColor: "#ec4899",
  },
  {
    id: "thankyou",
    name: "Thank You",
    category: "Thank You",
    description: "Express gratitude while making a difference",
    emoji: "💝",
    bgGradient: "from-emerald-400 via-teal-400 to-cyan-400",
    textColor: "text-white",
    accentColor: "#14b8a6",
  },
  {
    id: "holiday",
    name: "Happy Holidays",
    category: "Holiday",
    description: "Spread holiday cheer with a charitable gift",
    emoji: "🎄",
    bgGradient: "from-red-500 via-red-400 to-green-500",
    textColor: "text-white",
    accentColor: "#ef4444",
  },
  {
    id: "memorial",
    name: "In Loving Memory",
    category: "Memorial",
    description: "Honor someone's memory with a meaningful donation",
    emoji: "🕊️",
    bgGradient: "from-slate-400 via-blue-300 to-indigo-300",
    textColor: "text-white",
    accentColor: "#94a3b8",
  },
  {
    id: "general",
    name: "Thinking of You",
    category: "General",
    description: "Let someone know you care, in a way that matters",
    emoji: "✨",
    bgGradient: "from-amber-400 via-orange-400 to-rose-400",
    textColor: "text-white",
    accentColor: "#f59e0b",
  },
];

export const CHARITIES: Charity[] = [
  {
    id: "red-cross",
    name: "American Red Cross",
    description: "Disaster relief, blood services, and humanitarian aid worldwide",
    category: "Humanitarian",
    logo: "🏥",
    website: "https://www.redcross.org",
  },
  {
    id: "st-jude",
    name: "St. Jude Children's Research Hospital",
    description: "Leading the way the world understands, treats, and defeats childhood cancer",
    category: "Health",
    logo: "👶",
    website: "https://www.stjude.org",
  },
  {
    id: "doctors-without-borders",
    name: "Doctors Without Borders",
    description: "Medical humanitarian aid in conflict zones and crisis areas",
    category: "Health",
    logo: "⚕️",
    website: "https://www.doctorswithoutborders.org",
  },
  {
    id: "habitat-humanity",
    name: "Habitat for Humanity",
    description: "Building homes, communities, and hope around the world",
    category: "Housing",
    logo: "🏠",
    website: "https://www.habitat.org",
  },
  {
    id: "world-wildlife",
    name: "World Wildlife Fund",
    description: "Protecting wildlife and conserving nature for future generations",
    category: "Environment",
    logo: "🐼",
    website: "https://www.worldwildlife.org",
  },
  {
    id: "feeding-america",
    name: "Feeding America",
    description: "Fighting hunger in communities across the United States",
    category: "Food Security",
    logo: "🍎",
    website: "https://www.feedingamerica.org",
  },
  {
    id: "unicef",
    name: "UNICEF",
    description: "Protecting children's rights and providing essentials worldwide",
    category: "Children",
    logo: "🌍",
    website: "https://www.unicef.org",
  },
  {
    id: "salvation-army",
    name: "The Salvation Army",
    description: "Meeting human needs without discrimination",
    category: "Community",
    logo: "🔔",
    website: "https://www.salvationarmy.org",
  },
  {
    id: "nature-conservancy",
    name: "The Nature Conservancy",
    description: "Protecting lands and waters on which all life depends",
    category: "Environment",
    logo: "🌿",
    website: "https://www.nature.org",
  },
  {
    id: "make-a-wish",
    name: "Make-A-Wish Foundation",
    description: "Granting wishes to children with critical illnesses",
    category: "Children",
    logo: "⭐",
    website: "https://wish.org",
  },
];

export const DONATION_TIERS = [
  { amount: 500, display: "$5" },
  { amount: 1000, display: "$10" },
  { amount: 2500, display: "$25" },
];

export function calculatePlatformFee(amountCents: number): number {
  const percentageFee = Math.round(amountCents * 0.1);
  const flatFee = 150; // $1.50
  return Math.max(percentageFee, flatFee);
}
