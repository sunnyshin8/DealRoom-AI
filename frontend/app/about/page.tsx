import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About | DealRoom AI — The Story Behind Autonomous M&A Intelligence",
    description:
        "Learn why we built DealRoom AI, how 6 AI agents replace 2 weeks of expensive analyst grunt work, and why autonomous due diligence is the future of investment intelligence. Built by founders who felt the pain firsthand.",
    keywords: [
        "about DealRoom AI", "M&A due diligence automation", "AI investment research",
        "autonomous web agents finance", "affordable due diligence", "SEC EDGAR automation",
        "startup story M&A AI", "AI-powered deal sourcing", "investment intelligence startup",
    ],
    openGraph: {
        title: "About DealRoom AI — Why We Built This",
        description: "Two founders. One $15,000 analyst bill. The birth of an autonomous M&A intelligence engine.",
        type: "website",
    },
};

const TEAM = [
    {
        name: "The Founding Team",
        role: "Builders who felt the pain",
        story: "We've sat in that war-room. Coordinating 3 junior analysts, a Bloomberg Terminal tab, a PACER login, and a Crunchbase spreadsheet—all to answer a single question: 'Is this company clean?' There had to be a better way.",
        emoji: "⚡",
    },
];

const WHY_MATTERS = [
    {
        icon: "⏰",
        title: "2 Weeks → 90 Seconds",
        desc: "A typical pre-LOI screening takes 2 analyst-weeks across 20+ data sources. DealRoom AI collapses that into 90 seconds of autonomous agent execution.",
        accent: "var(--violet)",
    },
    {
        icon: "💸",
        title: "$200K/Year → $1,500/Month",
        desc: "Junior analyst time billed at $200K/year. Our Pro plan at $1,500/month delivers the same breadth of research without the human error, the sick days, or the weekend overtime.",
        accent: "var(--cyan)",
    },
    {
        icon: "🌐",
        title: "Real Websites, Not Stale APIs",
        desc: "Government portals (SEC, PACER, state registries) don't have clean APIs. We send browser agents that navigate like humans filling forms, clicking pagination, reading PDFs because that's the only way.",
        accent: "var(--amber)",
    },
    {
        icon: "🔒",
        title: "No Data Staleness",
        desc: "Bloomberg shows you yesterday's data. We fetch live. Every run is a fresh browse across 40+ sources no caching, no delays, no surprises the day after closing.",
        accent: "var(--emerald)",
    },
];

const PRICING_SIMPLE = [
    { label: "Starter", price: "$199/report", note: "Perfect for one-off screening" },
    { label: "Pro", price: "$1,500/mo", note: "50 reports — small PE/VC firms" },
    { label: "Enterprise", price: "Custom", note: "Investment banks, M&A boutiques" },
];

export default function AboutPage() {
    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>

            {/* ── SEO H1 Badge ───────────────────────────────── */}
            <div style={{ textAlign: "center", marginBottom: 60 }}>
                <span className="badge badge-amber anim-fade-up" style={{ marginBottom: 16 }}>Our Story</span>
                <h1 className="anim-fade-up delay-1" style={{ fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.05, marginTop: 14 }}>
                    We got tired of paying{" "}
                    <span className="gradient-text">$15,000</span>
                    <br />for a spreadsheet.
                </h1>
                <p className="anim-fade-up delay-2" style={{ fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 620, margin: "20px auto 0" }}>
                    So we built an army of AI agents to do the work instead.
                </p>
            </div>

            {/* ── 3D HERO CHARACTER ──────────────────────────── */}
            <div className="anim-fade-up delay-2" style={{ display: "flex", justifyContent: "center", marginBottom: 72, opacity: 0 }}>
                <div style={{ position: "relative", width: 420, height: 420 }}>
                    {/* Glow backdrop */}
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)", filter: "blur(30px)" }} />

                    {/* 3D Character container */}
                    <div id="mascot-container" style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="anim-float" style={{ position: "relative", width: 380, height: 380 }}>
                            <Image
                                src="/avatar_abstract_core.png"
                                alt="DealRoom AI Abstract Core"
                                fill
                                style={{ objectFit: "cover", borderRadius: 24, boxShadow: "0 0 60px rgba(124,58,237,0.3)" }}
                                priority
                            />
                        </div>
                    </div>

                    {/* Floating data badges */}
                    {[
                        { label: "SEC EDGAR", x: "-20px", y: "10%", color: "var(--violet)" },
                        { label: "PACER Courts", x: "calc(100% - 10px)", y: "25%", color: "var(--cyan)" },
                        { label: "USPTO Patents", x: "-30px", y: "65%", color: "var(--amber)" },
                        { label: "LinkedIn", x: "calc(100% - 20px)", y: "70%", color: "var(--emerald)" },
                    ].map((b) => (
                        <div key={b.label} style={{ position: "absolute", left: b.x, top: b.y, background: "rgba(15,18,50,0.9)", border: `1px solid ${b.color}40`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: b.color, whiteSpace: "nowrap", backdropFilter: "blur(8px)" }}>
                            {b.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── ORIGIN STORY ───────────────────────────────── */}
            <div className="glass anim-fade-up" style={{ padding: "40px 48px", marginBottom: 60, opacity: 0, borderLeft: "3px solid var(--amber)", borderRadius: "0 20px 20px 0", background: "linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(124,58,237,0.05) 100%)" }}>
                <div style={{ fontSize: 32, marginBottom: 20 }}>📖</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>
                    The Story Behind DealRoom AI
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                        "It was a Tuesday night in Indore co-working space. Three of us two developers and a former investment banking analyst were staring at a spreadsheet. Our friend (the banker) had just gotten back from a 14-day sprint screening a mid-market SaaS acquisition target. He had spent two weeks doing nothing but opening browser tabs.",
                        "SEC EDGAR filing indexes cluttered with HTML tables from 2003. State registry portals that still require Java applets. PACER the federal court system with a UI designed in 1994. LinkedIn, behind authentication. Glassdoor, another auth wall. USPTO patent search forms that required 6-step navigation. He billed his clients $15,000 for this. They paid it. Because everyone does.",
                        "That banker friend said something we couldn't unhear: \"I feel like a really expensive browser.\" So we built something that replaces the browser part. The analyst part the judgment, the pattern matching, the deal thesis stays human. But the 14 days of tab-switching? Those belong to an agent fleet now.",
                        "We discovered TinyFish a browser agent platform that can navigate real, messy, authenticated web pages just like a human. We pointed it at SEC EDGAR, PACER, USPTO, LinkedIn, Glassdoor, and 35 other sources. We wired the output through Gemini 2.0 Flash for synthesis. We shipped it in a weekend. The result: DealRoom AI 6 autonomous agents, 40+ live sources, 90 seconds.",
                    ].map((para, i) => (
                        <p key={i} style={{ fontSize: 15, color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.8 }}>{para}</p>
                    ))}
                </div>
            </div>

            {/* ── WHY IT MATTERS ─────────────────────────────── */}
            <div style={{ marginBottom: 60 }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <span className="badge badge-violet" style={{ marginBottom: 12 }}>Why It Matters</span>
                    <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-1px", marginTop: 12 }}>
                        Built for the real world. <span className="gradient-text">Priced for reality.</span>
                    </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
                    {WHY_MATTERS.map((item, i) => (
                        <div key={item.title} className={`glass-card anim-fade-up delay-${i + 1}`} style={{ padding: "28px 24px", opacity: 0 }}>
                            <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{item.title}</h3>
                            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{item.desc}</p>
                            <div style={{ marginTop: 16, height: 2, borderRadius: 99, background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── PRICING STRIP ──────────────────────────────── */}
            <div className="glass anim-fade-up" style={{ padding: "36px 40px", marginBottom: 60, opacity: 0, background: "linear-gradient(145deg, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.05) 100%)", borderColor: "rgba(124,58,237,0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
                    <div style={{ flex: "1 1 min-content", maxWidth: 600 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10 }}>
                            Budget-friendly by design.
                        </h2>
                        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24, maxWidth: 500 }}>
                            Bloomberg Terminal: $24,000/year for mostly static data. DealRoom AI: starting at $199 per report for live, deep, multi-source intelligence. The math isn&apos;t even close.
                        </p>
                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                            {PRICING_SIMPLE.map((p) => (
                                <div key={p.label} style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", borderRadius: 12, padding: "16px 22px", minWidth: 120 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{p.label}</div>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text-primary)", marginBottom: 4 }}>{p.price}</div>
                                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{p.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Visual Image container */}
                    <div className="anim-float delay-1" style={{ position: "relative", width: 280, height: 200, flexShrink: 0, margin: "0 auto" }}>
                        <Image
                            src="/budget_fintech_3d.png"
                            alt="Budget Friendly AI Tech"
                            fill
                            style={{ objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(6,182,212,0.1))" }}
                        />
                    </div>
                </div>
            </div>

            {/* ── TECH STACK ─────────────────────────────────── */}
            <div style={{ marginBottom: 60 }}>
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <span className="badge badge-emerald" style={{ marginBottom: 12 }}>Built With</span>
                    <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-1px", marginTop: 12 }}>
                        The stack behind the magic.
                    </h2>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {[
                        { name: "TinyFish API", desc: "Browser agent execution", color: "var(--cyan)" },
                        { name: "Gemini 2.0 Flash", desc: "Data synthesis & structuring", color: "var(--violet)" },
                        { name: "FastAPI", desc: "Async Python backend", color: "var(--amber)" },
                        { name: "Next.js 15", desc: "Premium frontend", color: "#ec4899" },
                        { name: "Neon Postgres", desc: "Serverless database", color: "var(--emerald)" },
                        { name: "SSE Streaming", desc: "Real-time agent updates", color: "#f97316" },
                    ].map((t) => (
                        <div key={t.name} className="glass" style={{ padding: "14px 20px", display: "flex", gap: 10, alignItems: "center" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</div>
                                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CLOSING CTA ────────────────────────────────── */}
            <div className="glass-card anim-fade-up" style={{ padding: "48px", textAlign: "center", opacity: 0, background: "linear-gradient(145deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.07) 100%)", borderColor: "rgba(124,58,237,0.3)" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🚀</div>
                <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 14 }}>
                    Ready to close 10x more deals?
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>
                    Type any company name. Your 6-agent fleet fires in seconds while your competitors are still opening browser tabs.
                </p>
                <a href="/" style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
                        Start Your First Analysis →
                    </button>
                </a>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>No credit card. No signup. Just a company name.</p>
            </div>

        </div>
    );
}
