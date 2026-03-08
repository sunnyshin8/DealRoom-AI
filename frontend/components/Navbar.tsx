"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/reports", label: "Reports" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar">
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: "linear-gradient(135deg, var(--violet) 0%, var(--cyan) 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, boxShadow: "0 0 20px var(--violet-glow)"
                }}>🐟</div>
                <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px", color: "var(--text-primary)" }}>
                    Deal<span style={{ color: "var(--violet-light)" }}>Room</span>
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> AI</span>
                </span>
            </Link>

            {/* Nav links */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {NAV_LINKS.map((l) => {
                    const active = pathname === l.href;
                    return (
                        <Link key={l.href} href={l.href} style={{
                            padding: "8px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500,
                            color: active ? "var(--text-primary)" : "var(--text-secondary)",
                            background: active ? "rgba(124,58,237,0.15)" : "transparent",
                            border: active ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                            textDecoration: "none", transition: "all 0.2s ease",
                        }}>{l.label}</Link>
                    );
                })}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="badge badge-cyan">
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "block", animation: "pulse-dot 2s infinite" }} />
                    Live · 6 Agents Running
                </span>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>
                        New Analysis →
                    </button>
                </Link>
            </div>
        </nav>
    );
}
