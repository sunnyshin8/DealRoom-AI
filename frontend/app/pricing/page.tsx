"use client";

import { useState } from "react";

const PLANS = [
    {
        name: "Starter",
        price: "$199",
        period: "per report",
        badge: null,
        badgeColor: null,
        color: "var(--cyan)",
        desc: "Perfect for one-off deal screening or independent consultants.",
        features: [
            "1 full M&A intelligence report",
            "All 6 agents (40+ sources)",
            "SEC, PACER, LinkedIn, USPTO",
            "Gemini 2.0 Flash synthesis",
            "PDF export",
            "7-day report access",
        ],
    },
    {
        name: "Pro",
        price: "$1,500",
        period: "/ month",
        badge: "Most Popular",
        badgeColor: "var(--amber)",
        color: "var(--violet)",
        desc: "For small PE/VC firms running 5–10 deals per month.",
        features: [
            "50 reports per month",
            "All 6 agents (40+ sources)",
            "Priority queue (faster runs)",
            "Report history & search",
            "CSV data export",
            "Email alerts on red flags",
            "API access (1,000 calls/mo)",
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact us",
        badge: "For Banks",
        badgeColor: "var(--emerald)",
        color: "var(--emerald)",
        desc: "For investment banks, M&A boutiques, and large PE firms.",
        features: [
            "Unlimited reports",
            "Custom agent workflows",
            "Dedicated compute",
            "SSO & team workspaces",
            "SOC2 Type II compliance",
            "White-label option",
            "SLA + dedicated support",
        ],
    },
];

const COMPARE = [
    { feature: "Bloomberg Terminal", price: "$24,000/yr", coverage: "Mostly static data, no browser agents", verdict: "❌" },
    { feature: "Manual Analysts (2 weeks)", price: "$15,000+/deal", coverage: "Human error, slow, expensive", verdict: "❌" },
    { feature: "DealRoom AI Pro", price: "$1,500/mo", coverage: "Live agents, 40+ sources, 90 seconds", verdict: "✅" },
];

export default function PricingPage() {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handlePayment = async (planName: string, amountStr: string) => {
        setLoadingPlan(planName);
        try {
            // Convert e.g "$1,500" to "1500" or "$199" to "199"
            const usdAmount = parseFloat(amountStr.replace(/[^0-9.]/g, ""));
            // PayU India processes in INR. Convert USD to INR (using approx rate ~86.5)
            const amount = Math.round(usdAmount * 86.5).toString();

            const res = await fetch("/api/payment/hash", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    plan_name: planName,
                    amount: amount,
                    firstname: "DealRoomUser",
                    email: "hello@dealroom.ai",
                    phone: "9999999999"
                })
            });

            if (!res.ok) throw new Error("Payment config failed");

            const data = await res.json();

            // Open a centered popup window for PayU checkout
            const w = 520, h = 680;
            const left = window.screenX + (window.innerWidth - w) / 2;
            const top = window.screenY + (window.innerHeight - h) / 2;
            const popup = window.open("", "PayUCheckout", `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`);

            const form = document.createElement("form");
            form.method = "POST";
            form.action = data.payu_url;
            form.target = "PayUCheckout";

            const fields: Record<string, string> = {
                key: data.key,
                txnid: data.txnid,
                amount: data.amount,
                productinfo: data.productinfo,
                firstname: data.firstname,
                email: data.email,
                phone: data.phone,
                hash: data.hash,
                surl: data.surl,
                furl: data.furl,
            };

            for (const k in fields) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = k;
                input.value = fields[k];
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
            setLoadingPlan(null);
        } catch (err) {
            console.error(err);
            alert("Secure checkout unavailable right now.");
            setLoadingPlan(null);
        }
    };

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 60 }}>
                <span className="badge badge-violet anim-fade-up" style={{ marginBottom: 16 }}>Pricing</span>
                <h1 className="anim-fade-up delay-1" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-2px", marginTop: 14 }}>
                    Simple, <span className="gradient-text">transparent</span> pricing.
                </h1>
                <p className="anim-fade-up delay-2" style={{ color: "var(--text-secondary)", fontSize: 17, marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
                    Bloomberg Terminal costs $24K/year for static data. We deliver live, deep intelligence at a fraction of the cost.
                </p>
            </div>

            {/* Plans */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 72 }}>
                {PLANS.map((plan, i) => (
                    <div key={plan.name}
                        className={`glass-card anim-fade-up delay-${i + 1}`}
                        style={{
                            padding: "36px 32px", opacity: 0,
                            ...(plan.badge === "Most Popular" ? {
                                background: "linear-gradient(145deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%)",
                                borderColor: "rgba(124,58,237,0.4)",
                                boxShadow: "0 0 60px rgba(124,58,237,0.15)",
                            } : {}),
                        }}>
                        {/* Badge */}
                        {plan.badge && (
                            <div style={{ marginBottom: 20 }}>
                                <span style={{
                                    fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99,
                                    background: `${plan.badgeColor}20`, border: `1px solid ${plan.badgeColor}50`,
                                    color: plan.badgeColor as string,
                                    textTransform: "uppercase", letterSpacing: "0.05em",
                                }}>{plan.badge}</span>
                            </div>
                        )}

                        <div style={{ color: plan.color, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{plan.name}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 12 }}>
                            <span style={{ fontSize: 40, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-2px" }}>{plan.price}</span>
                            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{plan.period}</span>
                        </div>
                        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 28, minHeight: 44 }}>{plan.desc}</p>

                        {plan.price === "Custom" ? (
                            <button
                                className={plan.badge === "Most Popular" ? "btn-primary" : "btn-secondary"}
                                style={{ width: "100%", marginBottom: 28 }}
                            >
                                Contact Sales →
                            </button>
                        ) : (
                            <button
                                onClick={() => handlePayment(plan.name, plan.price)}
                                disabled={loadingPlan === plan.name}
                                className={plan.badge === "Most Popular" ? "btn-primary" : "btn-secondary"}
                                style={{ width: "100%", marginBottom: 28, opacity: loadingPlan === plan.name ? 0.7 : 1 }}
                            >
                                {loadingPlan === plan.name ? "Redirecting securely..." : "Pay Now →"}
                            </button>
                        )}

                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                            {plan.features.map((f) => (
                                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                                    <span style={{ color: plan.color, fontSize: 12, flexShrink: 0 }}>✓</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Comparison table */}
            <div className="anim-fade-up glass" style={{ overflow: "hidden", opacity: 0 }}>
                <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--glass-border)" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700 }}>How We Compare</h2>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                            {["Solution", "Annual Cost", "Coverage", ""].map((h) => (
                                <th key={h} style={{ padding: "14px 24px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {COMPARE.map((row, i) => (
                            <tr key={i} style={{ borderBottom: i < COMPARE.length - 1 ? "1px solid var(--glass-border)" : "none", background: row.verdict === "✅" ? "rgba(16,185,129,0.04)" : "transparent" }}>
                                <td style={{ padding: "18px 24px", fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{row.feature}</td>
                                <td style={{ padding: "18px 24px", fontSize: 14, color: row.verdict === "✅" ? "var(--emerald)" : "var(--text-secondary)", fontWeight: row.verdict === "✅" ? 700 : 400 }}>{row.price}</td>
                                <td style={{ padding: "18px 24px", fontSize: 13, color: "var(--text-secondary)" }}>{row.coverage}</td>
                                <td style={{ padding: "18px 24px", fontSize: 20 }}>{row.verdict}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
