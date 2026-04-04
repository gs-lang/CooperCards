// Simple in-memory card store for MVP (replace with Firestore later)
// In production, this would be a database. For MVP, we use a JSON file.

import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

export interface Card {
  id: string;
  templateId: string;
  charityId: string;
  charityName: string;
  donationAmount: number; // cents
  senderName: string;
  recipientName: string;
  recipientEmail?: string;
  personalMessage: string;
  stripeSessionId?: string;
  paid: boolean;
  createdAt: string;
}

const CARDS_FILE = path.join(process.cwd(), "data", "cards.json");

function ensureDataDir() {
  const dir = path.dirname(CARDS_FILE);
  if (!existsSync(dir)) {
    const { mkdirSync } = require("fs");
    mkdirSync(dir, { recursive: true });
  }
}

function loadCards(): Card[] {
  ensureDataDir();
  if (!existsSync(CARDS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(CARDS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveCards(cards: Card[]) {
  ensureDataDir();
  writeFileSync(CARDS_FILE, JSON.stringify(cards, null, 2));
}

export function createCard(card: Card): Card {
  const cards = loadCards();
  cards.push(card);
  saveCards(cards);
  return card;
}

export function getCard(id: string): Card | undefined {
  return loadCards().find((c) => c.id === id);
}

export function markCardPaid(id: string, stripeSessionId: string): Card | undefined {
  const cards = loadCards();
  const card = cards.find((c) => c.id === id);
  if (card) {
    card.paid = true;
    card.stripeSessionId = stripeSessionId;
    saveCards(cards);
  }
  return card;
}
