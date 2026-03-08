import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "DealRoom AI | Autonomous M&A Intelligence Engine",
    template: "%s | DealRoom AI",
  },
  description:
    "Deploy 6 autonomous AI web agents that research any company across SEC EDGAR, PACER courts, LinkedIn, USPTO patents and 40+ live sources :delivering a complete M&A intelligence dossier in under 90 seconds.",
  keywords: [
    "M&A due diligence", "autonomous AI agents", "investment intelligence",
    "SEC EDGAR research", "PACER court records", "TinyFish API",
    "private equity research", "company intelligence", "deal sourcing",
  ],
  authors: [{ name: "DealRoom AI" }],
  openGraph: {
    title: "DealRoom AI :Due Diligence in 90 Seconds",
    description: "6 AI agents. 40+ live sources. Complete M&A dossier in 90 seconds.",
    type: "website",
    locale: "en_US",
    siteName: "DealRoom AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealRoom AI :Autonomous M&A Intelligence",
    description: "Deploy 6 AI agents across SEC, PACER, LinkedIn, USPTO and 40+ sources.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Animated background */}
        <div className="bg-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
        </div>
        <div className="bg-grid" aria-hidden="true" />

        {/* App shell */}
        <div className="page-content" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

