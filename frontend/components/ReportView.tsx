"use client";

import { useRouter } from "next/navigation";

interface ReportProps {
    report: Record<string, unknown>;
    company: string;
    reportId: number | null;
}

type RecObj = Record<string, unknown>;

function asStringArray(val: unknown): string[] {
    if (Array.isArray(val)) return val.map(String);
    return [];
}

function riskColor(score: number) {
    if (score <= 3) return "var(--emerald)";
    if (score <= 6) return "var(--amber)";
    return "var(--red)";
}

function Section({ title, icon, accentColor = "var(--violet)", children }: { title: string; icon: string; accentColor?: string; children: React.ReactNode }) {
    return (
        <div className="glass-card anim-fade-up" style={{ padding: "26px 28px", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid var(--glass-border)" }}>
                <span style={{ fontSize: 18, background: `${accentColor}15`, border: `1px solid ${accentColor}30`, borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{title}</h3>
            </div>
            {children}
        </div>
    );
}

function KV({ label, value }: { label: string; value: unknown }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, padding: "9px 0", borderBottom: "1px solid var(--glass-border)" }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 13, color: value ? "var(--text-primary)" : "var(--text-muted)", fontWeight: 500, textAlign: "right" }}>{value ? String(value) : "N/A"}</span>
        </div>
    );
}

function Items({ items, variant }: { items?: string[]; variant?: "red" | "green" }) {
    if (!items?.length) return <p style={{ fontSize: 13, color: "var(--text-muted)" }}>None identified.</p>;
    return (
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
            {items.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, marginTop: 2, color: variant === "red" ? "var(--red)" : variant === "green" ? "var(--emerald)" : "var(--text-muted)" }}>
                        {variant === "red" ? "▲" : variant === "green" ? "▼" : "·"}
                    </span>
                    {String(item)}
                </li>
            ))}
        </ul>
    );
}

function ScoreRing({ score, label, size = 80 }: { score: number; label: string; size?: number }) {
    const color = riskColor(score);
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ width: size, height: size, borderRadius: "50%", border: `3px solid ${color}`, background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0 auto 10px" }}>
                <span style={{ fontSize: size * 0.3, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 9, color, fontWeight: 600, letterSpacing: "0.05em" }}>/10</span>
            </div>
            <span style={{ fontSize: 12, color: "var(--text-muted)", display: "block" }}>{label}</span>
        </div>
    );
}

export default function ReportView({ report, company, reportId }: ReportProps) {
    const router = useRouter();
    const r = report as Record<string, RecObj>;

    const overallScore = Number(r.overall_risk_score) || 5;
    const litScore = Number(r.litigation_risk?.risk_score) || 5;
    const sentScore = Number(r.news_sentiment?.sentiment_score) || 5;
    const rec = String(r.recommendation || "Proceed with Caution");
    const recColor = rec === "Proceed" ? "var(--emerald)" : rec === "Do Not Proceed" ? "var(--red)" : "var(--amber)";

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 48px" }}>
            {/* Header */}
            <div className="anim-fade-up" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
                <div>
                    <span className="badge badge-violet" style={{ marginBottom: 12 }}>M&A Intelligence Report</span>
                    <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, letterSpacing: "-1.5px", marginTop: 10 }}>
                        <span className="gradient-text">{company}</span> Dossier
                    </h1>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
                        {reportId && `Report #${reportId} · `}
                        Generated {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
                    </p>
                </div>

                {/* Recommendation */}
                <div style={{ background: `${recColor}10`, border: `2px solid ${recColor}40`, borderRadius: 16, padding: "18px 28px", textAlign: "center", minWidth: 180 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Recommendation</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: recColor }}>{rec}</div>
                </div>
            </div>

            {/* Executive Summary */}
            {r.executive_summary && (
                <div className="glass anim-fade-up delay-1" style={{ padding: "22px 28px", marginBottom: 24, borderLeft: `3px solid var(--violet)`, borderRadius: "0 16px 16px 0", opacity: 0 }}>
                    <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75 }}>{String(r.executive_summary)}</p>
                </div>
            )}

            {/* Score strip */}
            <div className="glass anim-fade-up delay-2" style={{ padding: "28px 40px", marginBottom: 24, display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 28, opacity: 0 }}>
                <ScoreRing score={overallScore} label="Overall Risk" />
                <div style={{ width: 1, background: "var(--glass-border)" }} />
                <ScoreRing score={litScore} label="Legal Risk" />
                <div style={{ width: 1, background: "var(--glass-border)" }} />
                <ScoreRing score={10 - sentScore} label="Sentiment Risk" />
                <div style={{ width: 1, background: "var(--glass-border)" }} />
                <div style={{ textAlign: "center" }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: `${recColor}10`, border: `3px solid ${recColor}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 24 }}>
                        {rec === "Proceed" ? "✅" : rec === "Do Not Proceed" ? "🚫" : "⚠️"}
                    </div>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Decision</span>
                </div>
            </div>

            {/* Main grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                <Section title="Corporate Structure" icon="🏛️" accentColor="var(--violet)">
                    <KV label="Entity Type" value={r.corporate_structure?.entity_type} />
                    <KV label="Incorporation State" value={r.corporate_structure?.incorporation_state} />
                    <KV label="Incorporation Date" value={r.corporate_structure?.incorporation_date} />
                    <KV label="Registered Agent" value={r.corporate_structure?.registered_agent} />
                    <div style={{ marginTop: 14 }}><Items items={asStringArray(r.corporate_structure?.key_findings)} /></div>
                </Section>

                <Section title="Financial Health" icon="💰" accentColor="#f97316">
                    <KV label="Total Funding" value={r.financial_health?.total_funding} />
                    <KV label="Last Round" value={r.financial_health?.last_round} />
                    <div style={{ marginTop: 12, marginBottom: 10, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{String(r.financial_health?.revenue_signals || "")}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {asStringArray(r.financial_health?.key_investors).map((inv) => (
                            <span key={inv} className="badge badge-cyan" style={{ fontSize: 11 }}>{inv}</span>
                        ))}
                    </div>
                </Section>

                <Section title="Legal Liability" icon="⚖️" accentColor="var(--cyan)">
                    <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, padding: "6px 14px", borderRadius: 8, background: `${riskColor(litScore)}12`, border: `1px solid ${riskColor(litScore)}40`, color: riskColor(litScore) }}>
                            Score {litScore}/10
                        </span>
                        {r.litigation_risk?.active_cases != null && (
                            <span className="badge badge-violet">{String(r.litigation_risk.active_cases)} Active Cases</span>
                        )}
                    </div>
                    <Items items={asStringArray(r.litigation_risk?.case_summary)} />
                </Section>

                <Section title="Talent & Hiring" icon="👥" accentColor="#ec4899">
                    <KV label="Employee Count" value={r.talent_signals?.employee_count} />
                    <KV label="Headcount Trend" value={r.talent_signals?.headcount_trend} />
                    <KV label="Hiring Velocity" value={r.talent_signals?.hiring_velocity} />
                    <KV label="Culture Score" value={r.talent_signals?.culture_score} />
                    <div style={{ marginTop: 14 }}><Items items={asStringArray(r.talent_signals?.recent_executive_changes)} /></div>
                </Section>

                <Section title="Patent & IP Portfolio" icon="💡" accentColor="var(--amber)">
                    <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                        {Boolean(r.ip_portfolio?.total_patents) && <span className="badge badge-amber">{String(r.ip_portfolio?.total_patents)} Patents</span>}
                        {asStringArray(r.ip_portfolio?.key_technology_areas).map((a) => (
                            <span key={a} className="badge badge-violet" style={{ fontSize: 11 }}>{a}</span>
                        ))}
                    </div>
                    <Items items={asStringArray(r.ip_portfolio?.recent_filings)} />
                </Section>

                <Section title="News & Sentiment" icon="📰" accentColor="var(--emerald)">
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, padding: "6px 14px", borderRadius: 8, background: `${riskColor(10 - sentScore)}12`, border: `1px solid ${riskColor(10 - sentScore)}40`, color: riskColor(10 - sentScore) }}>
                            Sentiment {sentScore}/10
                        </span>
                    </div>
                    <Items items={asStringArray(r.news_sentiment?.recent_headlines)} />
                </Section>
            </div>

            {/* Flags row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 32 }}>
                <Section title="Red Flags" icon="🚨" accentColor="var(--red)">
                    <Items items={asStringArray(r.red_flags)} variant="red" />
                </Section>
                <Section title="Green Flags" icon="✅" accentColor="var(--emerald)">
                    <Items items={asStringArray(r.green_flags)} variant="green" />
                </Section>
            </div>

            {/* Actions */}
            <div className="glass anim-fade-up" style={{ padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, opacity: 0 }}>
                <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Analysis complete</p>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>Saved to your Neon database · Report #{reportId}</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-secondary" onClick={() => router.push("/reports")}>View All Reports</button>
                    <button className="btn-primary" onClick={() => router.push("/")}>New Analysis →</button>
                </div>
            </div>
        </div>
    );
}
