"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReportView from "@/components/ReportView";

const AGENT_META: Record<string, { icon: string; name: string; color: string }> = {
    regulatory: { icon: "🏛️", name: "Regulatory Hound", color: "var(--violet)" },
    legal: { icon: "⚖️", name: "Legal Liability Scanner", color: "var(--cyan)" },
    talent: { icon: "👥", name: "Talent Signal Analyst", color: "#ec4899" },
    patent: { icon: "💡", name: "Patent & IP Scout", color: "var(--amber)" },
    news: { icon: "📰", name: "News & Sentiment Monitor", color: "var(--emerald)" },
    financial: { icon: "💰", name: "Financial Deep Dive", color: "#f97316" },
};

type AgentStatus = "idle" | "starting" | "running" | "completed" | "error";

interface AgentState { key: string; status: AgentStatus; lastStep: string; stepCount: number; }
interface LogLine { key: string; type: string; message: string; ts: string; }

function AnalyzePage() {
    const params = useSearchParams();
    const router = useRouter();
    const company = params.get("company") || "";
    const logEndRef = useRef<HTMLDivElement>(null);

    const [agents, setAgents] = useState<Record<string, AgentState>>(() =>
        Object.keys(AGENT_META).reduce((acc, k) => { acc[k] = { key: k, status: "idle", lastStep: "", stepCount: 0 }; return acc; }, {} as Record<string, AgentState>)
    );
    const [logs, setLogs] = useState<LogLine[]>([]);
    const [report, setReport] = useState<Record<string, unknown> | null>(null);
    const [phase, setPhase] = useState<"connecting" | "running" | "synthesis" | "done">("connecting");
    const [reportId, setReportId] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(0);

    // Elapsed timer
    useEffect(() => {
        const t = setInterval(() => setElapsed((e) => e + 1), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

    useEffect(() => {
        if (!company) return;
        const ctrl = new AbortController();

        (async () => {
            try {
                const res = await fetch("http://localhost:8000/api/agents/start", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ company_name: company }), signal: ctrl.signal,
                });
                if (!res.ok || !res.body) return;
                const reader = res.body.getReader();
                const dec = new TextDecoder();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const text = dec.decode(value);
                    for (const line of text.split("\n")) {
                        if (!line.startsWith("data:")) continue;
                        try {
                            const ev = JSON.parse(line.slice(5).trim());
                            if (ev.type === "init") { setReportId(ev.report_id); setPhase("running"); setAgents((p) => { const n = { ...p }; Object.keys(n).forEach((k) => { n[k] = { ...n[k], status: "starting" }; }); return n; }); }
                            if (["step", "completed", "error"].includes(ev.type)) {
                                const k = ev.agent_key;
                                setAgents((p) => ({ ...p, [k]: { ...p[k], status: ev.type === "completed" ? "completed" : ev.type === "error" ? "error" : "running", lastStep: ev.message, stepCount: (p[k]?.stepCount || 0) + 1 } }));
                                setLogs((p) => [...p.slice(-150), { key: k, type: ev.type, message: ev.message, ts: new Date().toLocaleTimeString() }]);
                            }
                            if (ev.type === "synthesis") setPhase("synthesis");
                            if (ev.type === "complete") { setReport(ev.report); setPhase("done"); }
                        } catch { /* skip */ }
                    }
                }
            } catch (e: unknown) { if (e instanceof Error && e.name !== "AbortError") console.error(e); }
        })();
        return () => ctrl.abort();
    }, [company]);

    if (phase === "done" && report) return <ReportView report={report} company={company} reportId={reportId} />;

    const completedCount = Object.values(agents).filter((a) => a.status === "completed").length;
    const totalAgents = Object.keys(AGENT_META).length;
    const progressPct = phase === "synthesis" ? 90 : phase === "running" ? Math.max(5, (completedCount / totalAgents) * 80) : 2;
    const elapsedStr = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 48px" }}>
            {/* Top bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>
                        Analyzing <span className="gradient-text">{company}</span>
                    </h1>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 5 }}>
                        {phase === "connecting" && "Connecting to TinyFish API..."}
                        {phase === "running" && `${completedCount} of ${totalAgents} agents complete`}
                        {phase === "synthesis" && "🧠 Synthesizing with Gemini 2.0 Flash..."}
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="mono" style={{ fontSize: 14, color: "var(--text-muted)", background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: 8, padding: "6px 14px" }}>
                        ⏱ {elapsedStr}
                    </span>
                    {reportId && <span className="badge badge-cyan mono">#{reportId}</span>}
                </div>
            </div>

            {/* Progress */}
            <div className="progress-track" style={{ marginBottom: 36 }}>
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24, alignItems: "start" }}>
                {/* Agent cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {Object.values(agents).map((a) => {
                        const meta = AGENT_META[a.key];
                        const isActive = a.status === "running" || a.status === "starting";
                        const isDone = a.status === "completed";
                        return (
                            <div key={a.key} className="glass" style={{
                                padding: "16px 18px",
                                borderColor: isDone ? `${meta.color}40` : isActive ? `${meta.color}30` : "var(--glass-border)",
                                background: isActive ? `${meta.color}08` : isDone ? `${meta.color}05` : "var(--glass-bg)",
                                transition: "all 0.4s ease",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    {/* Icon */}
                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${meta.color}15`, border: `1px solid ${meta.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                                        {meta.icon}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                                            <span style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{meta.name}</span>
                                            <StatusDot status={a.status} color={meta.color} />
                                        </div>
                                        {a.lastStep && (
                                            <p className="mono" style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {a.lastStep}
                                            </p>
                                        )}
                                    </div>
                                    {isActive && <Spinner color={meta.color} />}
                                    {isDone && <span style={{ color: meta.color, fontSize: 16 }}>✓</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Live log */}
                <div className="glass" style={{ padding: "20px 22px", height: 520, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--emerald)", display: "block", animation: "pulse-dot 1.5s infinite" }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Live Agent Feed</span>
                        <span className="mono" style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>{logs.length} events</span>
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
                        {logs.length === 0 && (
                            <p style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", marginTop: 60 }}>Waiting for agents to connect...</p>
                        )}
                        {logs.map((l, i) => {
                            const meta = AGENT_META[l.key];
                            return (
                                <div key={i} className="anim-slide-left" style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "4px 0" }}>
                                    <span className="mono" style={{ fontSize: 9, color: "var(--text-muted)", minWidth: 50, marginTop: 2, flexShrink: 0 }}>{l.ts}</span>
                                    <span style={{ fontSize: 12, flexShrink: 0 }}>{meta?.icon}</span>
                                    <span style={{
                                        fontSize: 12, lineHeight: 1.4,
                                        color: l.type === "error" ? "var(--red)" : l.type === "completed" ? "var(--emerald)" : "var(--text-secondary)"
                                    }}>{l.message}</span>
                                </div>
                            );
                        })}
                        <div ref={logEndRef} />
                    </div>
                </div>
            </div>

            {/* Synthesis notice */}
            {phase === "synthesis" && (
                <div className="glass anim-fade-up" style={{ marginTop: 32, padding: "32px", textAlign: "center", opacity: 0, background: "linear-gradient(145deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.06) 100%)", borderColor: "rgba(124,58,237,0.3)" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>🧠</div>
                    <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Synthesizing agent outputs...</p>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>Gemini 2.0 Flash · Structuring your M&A Intelligence Report</p>
                </div>
            )}
        </div>
    );
}

function StatusDot({ status, color }: { status: AgentStatus; color: string }) {
    const map: Record<AgentStatus, string> = { idle: "var(--text-muted)", starting: "var(--amber)", running: color, completed: "var(--emerald)", error: "var(--red)" };
    const labels: Record<AgentStatus, string> = { idle: "Idle", starting: "Starting", running: "Running", completed: "Done", error: "Error" };
    return <span style={{ fontSize: 10, fontWeight: 600, color: map[status] }}>{labels[status]}</span>;
}

function Spinner({ color }: { color: string }) {
    return <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${color}30`, borderTopColor: color, animation: "spin 0.7s linear infinite", flexShrink: 0 }} />;
}

export default function AnalyzeWrapper() {
    return <Suspense><AnalyzePage /></Suspense>;
}
