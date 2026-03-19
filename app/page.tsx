"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const PAIN_POINTS = [
  {
    icon: "🪑",
    stat: "40%",
    statLabel: "of seats sit empty during off-peak hours",
    headline: "Empty seats, full rent",
    body: "You're paying rent, utilities, and staff for a half-empty shop every Tuesday afternoon. Instagram posts reach your followers — not the 200 people within walking distance who'd come in if they knew you had a deal running.",
    solution: "Push a flash deal to everyone within a mile. Fill those seats in 30 minutes, not 30 days.",
  },
  {
    icon: "📞",
    stat: "63%",
    statLabel: "of calls to local businesses are simple status questions",
    headline: "Your phone won't stop ringing",
    body: "\"Are you open?\" \"How long is the wait?\" \"Do you have outdoor seating?\" Every call pulls your staff off their actual job. Google says you close at 9, but you closed early today — and now people are showing up to a locked door.",
    solution: "Your live status answers 80% of these questions before they become phone calls.",
  },
  {
    icon: "🕐",
    stat: "15sec",
    statLabel: "is all it takes to update your entire status",
    headline: "Updating Google feels like filing taxes",
    body: "Log into a dashboard. Navigate three menus. Find the right field. Type. Save. Repeat tomorrow. No wonder your Google listing says you have \"outdoor seating\" when you removed it two years ago.",
    solution: "Just speak: \"Slow right now, fresh scones just came out, closing at 7 today.\" Our AI handles the rest.",
  },
  {
    icon: "📊",
    stat: "0",
    statLabel: "tools tell you who walked in because of your online presence",
    headline: "You can't measure what works",
    body: "You posted on Instagram. You updated Yelp. You paid for a Google ad. Did any of it actually bring someone through your door? You have no idea. You're spending money on marketing you can't attribute.",
    solution: "See exactly how many people viewed your status, claimed your deal, and walked in. Real attribution, not guesswork.",
  },
];

const BUSINESS_TYPES = [
  "Restaurants & Cafés",
  "Coffee Shops",
  "Hair Salons & Barbershops",
  "Grocery & Specialty Stores",
  "Auto Repair Shops",
  "Fitness Studios",
  "Retail Boutiques",
  "Bakeries & Delis",
];

const TESTIMONIAL_SCENARIOS = [
  {
    type: "Coffee Shop Owner",
    location: "Fremont, CA",
    quote: "I spend Tuesday afternoons watching an empty shop. If I could reach people nearby with a quick deal, that changes everything.",
  },
  {
    type: "Restaurant Manager",
    location: "Mountain View, CA",
    quote: "We get 30+ calls a day asking about wait times. That's an employee's entire shift wasted on answering the same question.",
  },
  {
    type: "Salon Owner",
    location: "Palo Alto, CA",
    quote: "I had three no-shows today and empty chairs all afternoon. I'd love a way to fill last-minute openings with nearby walk-ins.",
  },
];

function useInView(threshold = 0.15): [React.RefCallback<HTMLDivElement>, boolean] {
  const [visible, setVisible] = useState(false);
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [el, threshold]);

  const ref = useCallback((node: HTMLDivElement | null) => {
    setEl(node);
  }, []);

  return [ref, visible];
}

function AnimatedSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function InstaWareLanding() {
  const [email, setEmail] = useState("");
  const [bizName, setBizName] = useState("");
  const [bizType, setBizType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const interval = setInterval(() => setActiveScenario((p) => (p + 1) % TESTIMONIAL_SCENARIOS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !bizName) return;

    setSubmitting(true);
    setError("");

    try {
      // Uses the API endpoint configured in environment, falls back to simple mode
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (apiUrl) {
        // Real API backend (Phase B)
        const res = await fetch(`${apiUrl}/api/waitlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            business_name: bizName,
            email,
            business_type: bizType || undefined,
            source: "website",
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Something went wrong. Please try again.");
        }
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#1a1a1a", background: "#FAF9F6", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: #E8553A; color: white; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes grain { 0% { transform: translate(0,0) } 10% { transform: translate(-2%,-2%) } 20% { transform: translate(2%,1%) } 30% { transform: translate(-1%,2%) } 40% { transform: translate(1%,-1%) } 50% { transform: translate(-2%,2%) } 60% { transform: translate(2%,0) } 70% { transform: translate(0,2%) } 80% { transform: translate(-2%,-1%) } 90% { transform: translate(1%,1%) } 100% { transform: translate(0,0) } }
        .grain::after { content:''; position:absolute; inset:0; opacity:0.03; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); animation: grain 6s steps(8) infinite; pointer-events:none; }
        .cta-btn { background: #E8553A; color: white; border: none; padding: 16px 40px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 16px; border-radius: 6px; cursor: pointer; transition: all 0.25s ease; letter-spacing: 0.01em; }
        .cta-btn:hover { background: #D04830; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(232,85,58,0.25); }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn:disabled { background: #ccc; cursor: default; transform: none; box-shadow: none; }
        input, select { font-family: 'DM Sans', sans-serif; font-size: 15px; padding: 14px 16px; border: 1.5px solid #d4d0c8; border-radius: 6px; background: white; color: #1a1a1a; outline: none; transition: border-color 0.2s; width: 100%; }
        input:focus, select:focus { border-color: #E8553A; }
        input::placeholder { color: #a0998c; }
        .pain-card { background: white; border-radius: 12px; padding: 40px; border: 1px solid #e8e4dc; transition: all 0.35s ease; position: relative; overflow: hidden; }
        .pain-card:hover { border-color: #E8553A; box-shadow: 0 12px 40px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .pain-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #E8553A; transform: scaleX(0); transition: transform 0.35s ease; transform-origin: left; }
        .pain-card:hover::before { transform: scaleX(1); }
      `}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="grain" style={{ position: "relative", background: "#0F1419", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 24px 100px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at 70% 30%, rgba(232,85,58,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: "60%", background: "radial-gradient(ellipse at 30% 80%, rgba(45,156,219,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

        {/* Nav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8553A", animation: "pulse-dot 2s ease infinite" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase" }}>InstaWare</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>EARLY ACCESS</span>
        </div>

        {/* Hero Content */}
        <div style={{ maxWidth: 800, margin: "0 auto", width: "100%", zIndex: 2 }}>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s ease" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
              For local business owners
            </p>
            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 28 }}>
              Your customers are nearby.
              <br />
              <span style={{ color: "#E8553A" }}>They just don't know you're ready for them.</span>
            </h1>
          </div>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease 0.3s" }}>
            <p style={{ fontSize: "clamp(17px, 2vw, 21px)", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", maxWidth: 620, fontWeight: 300 }}>
              InstaWare lets you broadcast your live status — how busy you are, today's specials, flash deals — to every potential customer within walking distance. Update by just speaking into your phone. Takes 15 seconds.
            </p>
          </div>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.9s ease 0.6s", marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#signup" style={{ textDecoration: "none" }}>
              <button className="cta-btn" style={{ padding: "18px 44px", fontSize: 17 }}>
                Get early access
              </button>
            </a>
            <a href="#pain" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "18px 36px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 16, borderRadius: 6, cursor: "pointer", transition: "all 0.25s", letterSpacing: "0.01em" }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)"; (e.target as HTMLButtonElement).style.color = "white"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
              >
                See what we solve
              </button>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.3 }}>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, transparent, white)" }} />
        </div>
      </section>

      {/* ═══════ SOCIAL PROOF BAR ═══════ */}
      <section style={{ background: "#1a1a1a", padding: "20px 24px", display: "flex", justifyContent: "center", gap: "clamp(24px, 5vw, 64px)", flexWrap: "wrap", alignItems: "center" }}>
        {[
          ["200+", "businesses interested"],
          ["15 sec", "to update your status"],
          ["$0", "to start"],
          ["1 mile", "reach radius"],
        ].map(([num, label], i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#E8553A" }}>{num}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em" }}>{label}</span>
          </div>
        ))}
      </section>

      {/* ═══════ PAIN POINTS ═══════ */}
      <section id="pain" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            The problems we solve
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", maxWidth: 650, marginBottom: 16 }}>
            You're losing customers you already have nearby
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#6B6560", maxWidth: 560, fontWeight: 300, marginBottom: 64 }}>
            Every day, potential customers walk past your business or choose a competitor — not because you're worse, but because they didn't know what you had to offer right now.
          </p>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 24 }}>
          {PAIN_POINTS.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="pain-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontSize: 32 }}>{p.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: "#E8553A", lineHeight: 1 }}>{p.stat}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#a0998c", maxWidth: 160, marginTop: 4, lineHeight: 1.3 }}>{p.statLabel}</div>
                  </div>
                </div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.01em" }}>{p.headline}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#6B6560", marginBottom: 20, fontWeight: 300 }}>{p.body}</p>
                <div style={{ borderTop: "1px solid #f0ece4", paddingTop: 16 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a5276", lineHeight: 1.5 }}>
                    <span style={{ color: "#E8553A", marginRight: 6 }}>→</span>
                    {p.solution}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section style={{ background: "#0F1419", color: "white", padding: "100px 24px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              How it works
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 64 }}>
              Three things. Fifteen seconds. More customers.
            </h2>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 40 }}>
            {[
              {
                step: "01",
                title: "Speak your update",
                desc: "Pick up your phone and say what's happening. \"Slow right now, cinnamon rolls just came out, 20% off lattes for the next hour.\" That's it.",
              },
              {
                step: "02",
                title: "AI structures it instantly",
                desc: "Our AI understands your words and turns them into a live status, menu updates, and a flash deal — all in one confirmation tap.",
              },
              {
                step: "03",
                title: "Nearby customers see it",
                desc: "Everyone within a mile with InstaWare gets your update. They see you're not busy, you have fresh pastries, and there's a deal. They walk in.",
              },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 48, fontWeight: 500, color: "rgba(232,85,58,0.25)", lineHeight: 1, display: "block", marginBottom: 16 }}>{s.step}</span>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ VOICE DEMO MOCKUP ═══════ */}
      <section style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 48, alignItems: "center" }}>
            {/* Phone mockup */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 280, background: "#0F1419", borderRadius: 32, padding: "48px 20px 36px", position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,0.15)" }}>
                <div style={{ width: 80, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "0 auto 28px" }} />
                <div style={{ background: "#1a2332", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Your live status</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "white", fontWeight: 600 }}>Busyness</span>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1,2,3,4,5].map(n => (
                        <div key={n} style={{ width: 20, height: 8, borderRadius: 2, background: n <= 2 ? "#4CAF50" : "rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "white", fontWeight: 600 }}>Wait time</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#4CAF50" }}>~5 min</span>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12, marginTop: 4 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#E8553A", fontWeight: 600, marginBottom: 4 }}>Today's highlight</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Fresh cinnamon rolls just out of the oven</p>
                  </div>
                </div>
                <div style={{ background: "#E8553A", borderRadius: 12, padding: 14, textAlign: "center" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>Active deal</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "white", fontWeight: 700 }}>20% off all cold drinks</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Expires in 47 min · 12 claimed</p>
                </div>
                <div style={{ marginTop: 16, background: "rgba(232,85,58,0.1)", borderRadius: 24, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E8553A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", fontSize: 14 }}>🎤</span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#E8553A", fontWeight: 500 }}>Tap to update status</span>
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                The business experience
              </p>
              <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
                Talk to your app like you'd talk to your staff
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "#6B6560", fontWeight: 300, marginBottom: 28 }}>
                No dashboards. No forms. No learning curve. Just speak naturally and your live status, specials, and deals are published to nearby customers in seconds. One tap to confirm — that's the whole workflow.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Voice or text — update however you prefer",
                  "AI extracts busyness, wait time, specials, hours",
                  "SMS fallback — text updates without opening the app",
                  "See who's viewing, claiming deals, and heading over",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#E8553A", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, marginTop: 2 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#4a4540", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══════ SCENARIOS / SOCIAL PROOF ═══════ */}
      <section style={{ background: "#F5F0E8", padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 40 }}>
              Sound familiar?
            </p>
            <div style={{ position: "relative", minHeight: 140 }}>
              {TESTIMONIAL_SCENARIOS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: i === activeScenario ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    opacity: i === activeScenario ? 1 : 0,
                    transform: i === activeScenario ? "translateY(0)" : "translateY(12px)",
                    transition: "all 0.6s ease",
                    pointerEvents: i === activeScenario ? "auto" : "none",
                  }}
                >
                  <p style={{ fontSize: "clamp(19px, 2.5vw, 24px)", lineHeight: 1.6, fontWeight: 300, fontStyle: "italic", color: "#3a3530", marginBottom: 20 }}>
                    "{t.quote}"
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{t.type}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#a0998c" }}>{t.location}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
              {TESTIMONIAL_SCENARIOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScenario(i)}
                  style={{ width: i === activeScenario ? 28 : 8, height: 8, borderRadius: 4, background: i === activeScenario ? "#E8553A" : "#d4d0c8", border: "none", cursor: "pointer", transition: "all 0.3s ease" }}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ BUSINESS TYPES ═══════ */}
      <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Built for
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 40 }}>
            Every local business with a door and customers
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {BUSINESS_TYPES.map((b, i) => (
              <span key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 20px",
                borderRadius: 100,
                background: "white",
                border: "1px solid #e8e4dc",
                color: "#4a4540",
                transition: "all 0.2s",
                cursor: "default",
              }}>{b}</span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ═══════ PRICING PROMISE ═══════ */}
      <section style={{ background: "#0F1419", color: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Free for early partners. <span style={{ color: "#E8553A" }}>No catch.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", fontWeight: 300, marginBottom: 40 }}>
              The first 50 businesses in each launch neighborhood get InstaWare completely free — no subscription, no deal fees, no commitment. We're building this with you, not selling to you. Your feedback shapes the product.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 24, textAlign: "center" }}>
              {[
                ["$0/month", "For early partners"],
                ["No contracts", "Leave anytime"],
                ["Full features", "Status, deals, Q&A, analytics"],
              ].map(([title, sub], i) => (
                <div key={i} style={{ padding: 20 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, color: "#E8553A", marginBottom: 4 }}>{title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ EMAIL CAPTURE ═══════ */}
      <section id="signup" style={{ padding: "100px 24px 120px", maxWidth: 600, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              Join early access
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 16 }}>
              Be the first to reach your nearby customers
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6B6560", fontWeight: 300 }}>
              We're launching in the Bay Area. Drop your info and we'll reach out when we're ready for your neighborhood.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#4a4540", display: "block", marginBottom: 6 }}>Business name *</label>
                <input
                  type="text"
                  placeholder="e.g. Priya's Coffee House"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#4a4540", display: "block", marginBottom: 6 }}>Business type</label>
                <select value={bizType} onChange={(e) => setBizType(e.target.value)} style={{ color: bizType ? "#1a1a1a" : "#a0998c" }}>
                  <option value="" disabled>Select your business type</option>
                  {BUSINESS_TYPES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#4a4540", display: "block", marginBottom: 6 }}>Email address *</label>
                <input
                  type="email"
                  placeholder="you@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="cta-btn" type="submit" disabled={!email || !bizName || submitting} style={{ marginTop: 8, width: "100%" }}>
                {submitting ? "Joining..." : "Get early access →"}
              </button>
              {error && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#E8553A", textAlign: "center", lineHeight: 1.5 }}>
                  {error}
                </p>
              )}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#a0998c", textAlign: "center", lineHeight: 1.5 }}>
                No spam. No commitments. We'll only email you when we're launching in your area.
              </p>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: 48, background: "white", borderRadius: 12, border: "1px solid #e8e4dc" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 }}>✓</div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>You're on the list!</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#6B6560", fontWeight: 300, maxWidth: 380, margin: "0 auto" }}>
                Thanks, <strong style={{ color: "#1a1a1a" }}>{bizName}</strong>. We'll reach out personally when InstaWare is ready for your neighborhood. You'll be among the first 50 — everything free.
              </p>
            </div>
          )}
        </AnimatedSection>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: "#0F1419", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8553A" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "white", letterSpacing: "0.06em", textTransform: "uppercase" }}>InstaWare</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>
          Real-time location intelligence for local businesses
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.15)" }}>
          Bay Area, 2026
        </p>
      </footer>
    </div>
  );
}
