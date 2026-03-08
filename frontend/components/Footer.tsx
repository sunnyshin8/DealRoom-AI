"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{
            borderTop: "1px solid var(--glass-border)",
            padding: "24px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            background: "rgba(6,7,26,0.5)",
            backdropFilter: "blur(12px)",
        }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                © 2026 DealRoom AI · Powered by{" "}
                <a
                    href="https://agent.tinyfish.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--violet-light)", textDecoration: "none" }}
                >
                    TinyFish
                </a>
                {" "}& Gemini 2.0 Flash
            </span>
            <div style={{ display: "flex", gap: 20 }}>
                {[
                    { label: "Privacy", href: "/privacy" },
                    { label: "Terms", href: "/terms" },
                    { label: "Contact", href: "/contact" },
                ].map((l) => (
                    <Link
                        key={l.label}
                        href={l.href}
                        style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}
                    >
                        {l.label}
                    </Link>
                ))}
            </div>
        </footer>
    );
}
