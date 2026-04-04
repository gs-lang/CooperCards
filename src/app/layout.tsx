import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CooperCards — Send Cards That Give Back",
  description:
    "Send beautiful greeting cards that trigger real donations to charities. Birthday, thank you, holiday, and memorial cards starting at $5.",
  openGraph: {
    title: "CooperCards — Send Cards That Give Back",
    description: "Beautiful greeting cards that trigger real charitable donations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-geist-sans)]">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold" style={{ color: "#e94560" }}>
              Cooper<span className="text-slate-800">Cards</span>
            </a>
            <a
              href="/cards"
              className="px-5 py-2 rounded-full text-white text-sm font-medium transition-transform hover:scale-105"
              style={{ background: "#e94560" }}
            >
              Send a Card
            </a>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-50 border-t border-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} CooperCards. Every card makes a difference.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
