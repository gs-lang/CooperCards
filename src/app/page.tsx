import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-indigo-50 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Send Cards That{" "}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Give Back
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Beautiful greeting cards that trigger real donations to charities you care about.
            Celebrate birthdays, say thank you, or honor a loved one — while making the world a little better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cards"
              className="inline-block px-8 py-4 rounded-full text-white text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "#e94560" }}
            >
              Send a Card &rarr;
            </Link>
            <a
              href="#how-it-works"
              className="inline-block px-8 py-4 rounded-full text-slate-700 text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">How CooperCards Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: "🎨", title: "Pick a Card", desc: "Choose from birthday, thank you, holiday, memorial, and general card designs." },
              { icon: "💛", title: "Choose a Charity", desc: "Select from 10 trusted charities like Red Cross, St. Jude, and UNICEF." },
              { icon: "🎉", title: "Send & Donate", desc: "Pay $5–$25. Your recipient gets a beautiful card, and the charity gets a real donation." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CooperCards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">Why CooperCards?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: "❤️", title: "Real Impact", desc: "Every card sends a real donation to a real charity. No middleman gimmicks." },
              { icon: "🎁", title: "A Gift That Means More", desc: "Instead of a forgettable card, give something that helps the world." },
              { icon: "⚡", title: "Quick & Easy", desc: "Pick, personalize, pay. The whole process takes under 2 minutes." },
              { icon: "🌍", title: "10 Trusted Charities", desc: "From health to environment to children — causes everyone cares about." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="text-2xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Someone&apos;s Day?</h2>
          <p className="text-gray-600 mb-8 text-lg">Starting at just $5. Every card makes a real difference.</p>
          <Link
            href="/cards"
            className="inline-block px-10 py-4 rounded-full text-white text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "#e94560" }}
          >
            Send a Card Now &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
