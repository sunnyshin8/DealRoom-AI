"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

const AGENTS = [
  { icon: "🏛️", name: "Regulatory Hound", color: "var(--violet)", sources: ["SEC EDGAR", "All 50 State Registries", "FINRA BrokerCheck", "FTC Filings"] },
  { icon: "⚖️", name: "Legal Liability Scanner", color: "var(--cyan)", sources: ["PACER Federal Courts", "CourtListener", "State Courts", "OSHA/EPA Records"] },
  { icon: "👥", name: "Talent Signal Analyst", color: "#ec4899", sources: ["LinkedIn (Auth)", "Glassdoor", "Indeed", "Layoffs.fyi"] },
  { icon: "💡", name: "Patent & IP Scout", color: "var(--amber)", sources: ["USPTO Patents", "Google Patents", "EPO", "Trademark TESS"] },
  { icon: "📰", name: "News & Sentiment Monitor", color: "var(--emerald)", sources: ["Reuters/Bloomberg", "Muckrack", "Twitter/X", "Trade Publications"] },
  { icon: "💰", name: "Financial Deep Dive", color: "#f97316", sources: ["Crunchbase", "PitchBook", "OpenCorporates", "Dun & Bradstreet"] },
];

const STATS = [
  { val: "90s", label: "Avg. report time", accent: "var(--violet)" },
  { val: "40+", label: "Live data sources", accent: "var(--cyan)" },
  { val: "6", label: "Concurrent agents", accent: "var(--amber)" },
  { val: "$200K", label: "Analyst cost replaced", accent: "var(--emerald)" },
];

const TESTIMONIALS = [
  { quote: "We cut our initial screening time from 2 weeks to 20 minutes.", name: "Managing Director", firm: "Tier-1 PE Fund" },
  { quote: "The PACER integration alone is worth the entire subscription.", name: "VP of M&A", firm: "Technology Investment Bank" },
  { quote: "Finally something that actually does the work, not just summarizes a Wikipedia page.", name: "General Partner", firm: "VC Fund, $400M AUM" },
];

export default function HomePage() {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;
    setLoading(true);
    router.push(`/analyze?company=${encodeURIComponent(company.trim())}`);
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ padding: "100px 48px 80px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>

        {/* Live badge */}
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <span className="badge badge-violet">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald)", display: "block", animation: "pulse-dot 1.8s infinite" }} />
            Autonomous M&A Intelligence Engine · Powered by TinyFish
          </span>
        </div>

        {/* Headline */}
        <h1 className="anim-fade-up delay-1" style={{ fontSize: "clamp(42px, 7vw, 76px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-3px", marginBottom: 24 }}>
          <span className="gradient-text">Due diligence</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>in 90 seconds.</span>
        </h1>

        {/* Sub */}
        <p className="anim-fade-up delay-2" style={{ fontSize: 19, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 640, margin: "0 auto 52px", fontWeight: 400 }}>
          Deploy 6 AI browser agents that simultaneously crawl SEC EDGAR, PACER courts, LinkedIn, USPTO patents, news archives, and financial databases synthesizing everything into a complete M&A dossier.
        </p>

        {/* Search */}
        <form className="anim-fade-up delay-3" onSubmit={handleSubmit} style={{ display: "flex", gap: 12, maxWidth: 620, margin: "0 auto 14px" }}>
          <input
            className="input-field"
            style={{ flex: 1, fontSize: 16 }}
            type="text"
            placeholder="Enter company name (e.g. Stripe, Airbnb, SpaceX)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button className="btn-primary" type="submit" disabled={loading || !company.trim()} style={{ whiteSpace: "nowrap" }}>
            {loading ? "Launching..." : "Analyze →"}
          </button>
        </form>
        <p className="anim-fade-up delay-3" style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Runs 6 concurrent browser agents · No cached data · Always live
        </p>

        {/* Stats row */}
        <div className="anim-fade-up delay-4" style={{ display: "flex", justifyContent: "center", gap: 0, marginTop: 72, flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <div key={s.val} style={{
              padding: "24px 48px",
              borderRight: i < STATS.length - 1 ? "1px solid var(--glass-border)" : "none",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: s.accent, letterSpacing: "-1px" }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* ── AGENT GRID ───────────────────────────────── */}
      <section style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="badge badge-cyan" style={{ marginBottom: 16 }}>The Agent Fleet</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-1.5px", marginTop: 14 }}>
            6 specialists. <span className="gradient-text-amber">One dossier.</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
            Each agent is a purpose-built browser that logs in, navigates, and extracts exactly as a human analyst would.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {AGENTS.map((a, i) => (
            <div key={a.name} className={`glass-card anim-fade-up delay-${Math.min(i + 1, 6)}`} style={{ padding: "28px 28px 24px", opacity: 0 }}>
              {/* Agent header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, fontSize: 20,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${a.color}18`,
                  border: `1px solid ${a.color}33`,
                }}>
                  {a.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{a.sources.length} sources</div>
                </div>
              </div>
              {/* Sources */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {a.sources.map((s) => (
                  <span key={s} style={{
                    fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 6,
                    background: `${a.color}10`, border: `1px solid ${a.color}22`, color: a.color,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section style={{ padding: "80px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="badge badge-amber" style={{ marginBottom: 16 }}>How It Works</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-1.5px", marginTop: 14 }}>
            From name to dossier <span className="gradient-text">in 4 steps.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            { step: "01", icon: "✍️", title: "Enter Company Name", desc: "Type any company public, private, PE-backed, or startup.", color: "var(--violet)" },
            { step: "02", icon: "🚀", title: "6 Agents Deploy", desc: "TinyFish browser agents fan out across 40+ live websites simultaneously.", color: "var(--cyan)" },
            { step: "03", icon: "🧠", title: "Gemini Synthesizes", desc: "Raw extracted data is structured into a JSON dossier by Gemini 2.0 Flash.", color: "var(--amber)" },
            { step: "04", icon: "📊", title: "Report Delivered", desc: "A complete M&A intelligence report with risk scores and red flags.", color: "var(--emerald)" },
          ].map((item, i) => (
            <div key={item.step} className={`glass anim-fade-up delay-${i + 1}`} style={{ padding: 28, opacity: 0, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 16, right: 20, fontSize: 32, fontWeight: 900, color: `${item.color}15`, fontFamily: "JetBrains Mono, monospace" }}>{item.step}</div>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</div>
              <div style={{ marginTop: 16, height: 2, borderRadius: 99, background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section style={{ padding: "80px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="badge badge-emerald" style={{ marginBottom: 16 }}>Trusted by Dealmakers</span>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-1px", marginTop: 14 }}>
            What the market says.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`glass-card anim-fade-up delay-${i + 1}`} style={{ padding: "28px 28px 24px", opacity: 0 }}>
              {/* Quote marks */}
              <div style={{ fontSize: 40, lineHeight: 1, color: "var(--violet)", marginBottom: 14, fontFamily: "serif" }}>&ldquo;</div>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 20, fontStyle: "italic" }}>{t.quote}</p>
              <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>{t.firm}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section style={{ padding: "60px 48px 100px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div className="glass anim-fade-up" style={{ padding: "52px 48px", opacity: 0, background: "linear-gradient(145deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.06) 100%)", borderColor: "rgba(124,58,237,0.25)" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16 }}>
            Start your first analysis<br />
            <span className="gradient-text">completely free.</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 32 }}>
            No credit card. No signup. Just type a company name.
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto" }}>
            <input
              className="input-field"
              style={{ flex: 1 }}
              type="text"
              placeholder="e.g. Palantir, Figma, OpenAI"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={loading}
            />
            <button className="btn-amber" type="submit" disabled={loading || !company.trim()}>
              {loading ? "..." : "Analyze →"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
