"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Report {
    id: number;
    company_name: string;
    status: string;
    created_at: string;
    report_data?: { overall_risk_score?: number; recommendation?: string; executive_summary?: string };
}

function RiskBadge({ score }: { score?: number }) {
    if (!score) return <span className="badge badge-cyan">N/A</span>;
    if (score <= 3) return <span className="badge badge-emerald">Low Risk · {score}/10</span>;
    if (score <= 6) return <span className="badge badge-amber">Medium Risk · {score}/10</span>;
    return <span className="badge badge-red">High Risk · {score}/10</span>;
}

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/agents/reports")
            .then((r) => r.json())
            .then((data) => { setReports(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 48px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
                <div>
                    <span className="badge badge-violet anim-fade-up" style={{ marginBottom: 12 }}>Report History</span>
                    <h1 className="anim-fade-up delay-1" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-1.5px", marginTop: 12 }}>
                        Your <span className="gradient-text">Intelligence Dossiers</span>
                    </h1>
                    <p className="anim-fade-up delay-2" style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 10 }}>
                        All past M&A analysis runs · Stored in Neon Postgres
                    </p>
                </div>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ whiteSpace: "nowrap" }}>+ New Analysis</button>
                </Link>
            </div>

            {/* Loading */}
            {loading && (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid var(--glass-border)", borderTopColor: "var(--violet)", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
                    <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading reports...</p>
                </div>
            )}

            {/* Empty */}
            {!loading && reports.length === 0 && (
                <div className="glass anim-fade-up" style={{ padding: "72px 48px", textAlign: "center", opacity: 0 }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>📋</div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>No reports yet</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 28 }}>Run your first analysis to see intelligence dossiers here.</p>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <button className="btn-primary">Analyze a Company →</button>
                    </Link>
                </div>
            )}

            {/* Report list */}
            {!loading && reports.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {reports.map((r, i) => (
                        <div key={r.id} className={`glass-card anim-fade-up delay-${Math.min(i + 1, 6)}`} style={{ padding: "24px 28px", opacity: 0 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                                {/* Left */}
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                                        <span style={{ fontSize: 18 }}>🏢</span>
                                        <h2 style={{ fontSize: 17, fontWeight: 700 }}>{r.company_name}</h2>
                                    </div>
                                    {r.report_data?.executive_summary && (
                                        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: 560 }}>
                                            {r.report_data.executive_summary.slice(0, 160)}...
                                        </p>
                                    )}
                                </div>

                                {/* Right metadata */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                                    <RiskBadge score={r.report_data?.overall_risk_score} />
                                    <span className={`badge ${r.status === "completed" ? "badge-emerald" : r.status === "running" ? "badge-cyan" : "badge-red"}`}>
                                        {r.status === "completed" ? "✓ Complete" : r.status === "running" ? "⟳ Running" : r.status}
                                    </span>
                                    <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                                        #{r.id} · {new Date(r.created_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
                                    </span>
                                    {r.report_data?.recommendation && (
                                        <span style={{
                                            fontSize: 12, fontWeight: 700,
                                            color: r.report_data.recommendation === "Proceed" ? "var(--emerald)" :
                                                r.report_data.recommendation === "Do Not Proceed" ? "var(--red)" : "var(--amber)",
                                        }}>{r.report_data.recommendation}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
