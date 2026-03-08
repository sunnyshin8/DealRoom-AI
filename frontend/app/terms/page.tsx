import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "DealRoom AI Terms of Service — usage guidelines, limitations, and legal terms.",
};

const SECTIONS = [
    {
        title: "1. Acceptance of Terms",
        content: `By accessing or using DealRoom AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms apply to all users, including visitors, registered users, and paying subscribers.`,
    },
    {
        title: "2. Description of Service",
        content: `DealRoom AI is an autonomous M&A intelligence platform that deploys AI-powered web research agents to gather publicly available information about companies. The platform synthesizes data from sources such as SEC EDGAR, PACER court records, USPTO patent databases, LinkedIn public profiles, and news outlets to generate structured due diligence reports.

The Service is intended for informational purposes only and should not be considered as legal, financial, or investment advice.`,
    },
    {
        title: "3. User Accounts",
        content: `• You must provide accurate and complete information when creating an account.
• You are responsible for maintaining the confidentiality of your account credentials.
• You are responsible for all activities that occur under your account.
• You must notify us immediately of any unauthorized use of your account.
• We reserve the right to suspend or terminate accounts that violate these terms.`,
    },
    {
        title: "4. Subscription & Payments",
        content: `• Paid plans are billed as described on our Pricing page.
• All payments are processed securely through PayU.
• Subscriptions auto-renew unless cancelled before the renewal date.
• Refunds are handled on a case-by-case basis. Contact support@dealroom.ai for refund requests.
• We reserve the right to change pricing with 30 days advance notice.`,
    },
    {
        title: "5. Acceptable Use",
        content: `You agree NOT to use DealRoom AI to:
• Violate any applicable laws or regulations.
• Harass, defame, or infringe on the rights of any third party.
• Attempt to reverse-engineer, decompile, or extract the source code of our AI agents.
• Use automated scripts or bots to access the Service beyond the provided API.
• Resell or redistribute generated reports without authorization.
• Interfere with or disrupt the integrity or performance of the Service.`,
    },
    {
        title: "6. Intellectual Property",
        content: `• All content, branding, code, and AI models within DealRoom AI are the intellectual property of DealRoom AI and its licensors.
• Reports generated for you are licensed for your internal use. You may share reports within your organization but may not publicly redistribute them.
• The underlying data in reports is sourced from publicly available sources and remains subject to the original source's terms.`,
    },
    {
        title: "7. Disclaimer of Warranties",
        content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. We do not warrant that:
• The Service will be uninterrupted, secure, or error-free.
• Reports will be 100% accurate, complete, or current.
• The AI agents will successfully access all intended data sources at all times.

DealRoom AI reports are AI-generated summaries of publicly available data and should be independently verified before making any business decisions.`,
    },
    {
        title: "8. Limitation of Liability",
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, DEALROOM AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.

Our total liability for any claim arising from the Service shall not exceed the amount you paid us in the 12 months preceding the claim.`,
    },
    {
        title: "9. Indemnification",
        content: `You agree to indemnify and hold harmless DealRoom AI, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the Service or violation of these Terms.`,
    },
    {
        title: "10. Termination",
        content: `• You may cancel your account at any time by contacting support@dealroom.ai.
• We may terminate or suspend your access immediately, without prior notice, for conduct that we determine violates these Terms or is harmful to other users or the Service.
• Upon termination, your right to use the Service ceases immediately.`,
    },
    {
        title: "11. Governing Law",
        content: `These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of San Francisco County, California.`,
    },
    {
        title: "12. Changes to Terms",
        content: `We reserve the right to modify these Terms at any time. We will provide notice of significant changes via email or through the Service. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.`,
    },
    {
        title: "13. Contact",
        content: `For questions about these Terms of Service, please contact us at:
• **Email:** legal@dealroom.ai
• **Address:** DealRoom AI, San Francisco, CA, USA`,
    },
];

export default function TermsPage() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <span className="badge badge-violet anim-fade-up" style={{ marginBottom: 14 }}>Legal</span>
                <h1 className="anim-fade-up delay-1" style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, letterSpacing: "-2px", marginTop: 12 }}>
                    Terms of <span className="gradient-text">Service</span>
                </h1>
                <p className="anim-fade-up delay-2" style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 12 }}>
                    Last updated: March 8, 2026
                </p>
            </div>

            <div className="glass-card anim-fade-up delay-2" style={{ padding: "40px 36px", opacity: 0 }}>
                <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                    Please read these Terms of Service carefully before using DealRoom AI. By accessing or using our platform, you agree to be bound by these terms.
                </p>

                {SECTIONS.map((section, i) => (
                    <div key={i} style={{ marginBottom: 32 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>{section.title}</h2>
                        <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                            {section.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
