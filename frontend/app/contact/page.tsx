"use client";

import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 32px" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <span className="badge badge-cyan anim-fade-up" style={{ marginBottom: 14 }}>Get in Touch</span>
                <h1 className="anim-fade-up delay-1" style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, letterSpacing: "-2px", marginTop: 12 }}>
                    Contact <span className="gradient-text">Us</span>
                </h1>
                <p className="anim-fade-up delay-2" style={{ color: "var(--text-secondary)", fontSize: 16, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
                    Have questions about DealRoom AI, enterprise plans, or partnership opportunities? We&apos;d love to hear from you.
                </p>
            </div>

            {/* Contact cards */}
            <div className="anim-fade-up delay-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
                {[
                    { icon: "📧", label: "Email", value: "hello@dealroom.ai" },
                    { icon: "🏢", label: "Headquarters", value: "San Francisco, CA" },
                    { icon: "⏰", label: "Response Time", value: "Within 24 hours" },
                ].map((item) => (
                    <div key={item.label} className="glass-card" style={{ padding: "24px 20px", textAlign: "center" }}>
                        <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{item.label}</div>
                        <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 600 }}>{item.value}</div>
                    </div>
                ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card anim-fade-up delay-3" style={{ padding: "36px 32px", opacity: 0 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Send us a message</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Name</label>
                        <input
                            type="text" required placeholder="John Doe"
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            style={{
                                width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
                                background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)",
                                color: "var(--text-primary)", outline: "none",
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
                        <input
                            type="email" required placeholder="john@example.com"
                            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            style={{
                                width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
                                background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)",
                                color: "var(--text-primary)", outline: "none",
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Subject</label>
                    <input
                        type="text" required placeholder="Enterprise plan inquiry"
                        value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        style={{
                            width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
                            background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)",
                            color: "var(--text-primary)", outline: "none",
                        }}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
                    <textarea
                        required rows={5} placeholder="Tell us how we can help..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        style={{
                            width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
                            background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)",
                            color: "var(--text-primary)", outline: "none", resize: "vertical",
                        }}
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                    {sent ? "✓ Message Sent!" : "Send Message →"}
                </button>

                {sent && (
                    <p style={{ textAlign: "center", marginTop: 16, color: "var(--emerald)", fontSize: 14 }}>
                        Thank you! We&apos;ll get back to you within 24 hours.
                    </p>
                )}
            </form>
        </div>
    );
}
