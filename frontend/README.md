# DealRoom AI — Autonomous M&A Intelligence Engine

<div align="center">

**Deploy 6 AI-powered web agents that research any company across SEC EDGAR, PACER courts, LinkedIn, USPTO patents, and 40+ live sources — delivering a complete M&A intelligence dossier in under 90 seconds.**

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Gemini](https://img.shields.io/badge/Gemini_2.5-Flash_Lite-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

</div>

---

## 🚀 What is DealRoom AI?

DealRoom AI is a full-stack, production-ready **autonomous M&A due diligence platform** that replaces weeks of manual analyst work with a fleet of 6 specialized AI agents. Each agent independently researches a specific aspect of a target company using real-time web data, then Google Gemini synthesizes all findings into a structured, actionable intelligence report.

### The Problem
- **Bloomberg Terminal** costs $24,000/year for mostly static data.
- **Manual due diligence** takes 2–4 weeks and $15,000+ per deal.
- **Generic AI chatbots** hallucinate data and lack access to live regulatory sources.

### The Solution
DealRoom AI deploys **6 autonomous web agents** across **40+ live data sources** simultaneously, producing a comprehensive M&A dossier in **under 90 seconds** — at a fraction of the cost.

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│                  Next.js 16 Frontend             │
│   (Premium Glass-morphism UI, SSE Streaming)     │
│  Pages: Home, Reports, Pricing, About, Contact   │
│         Privacy, Terms, Live Analysis            │
└───────────────────┬──────────────────────────────┘
                    │ HTTP / SSE
┌───────────────────▼──────────────────────────────┐
│               FastAPI Backend                    │
│    ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│    │  Agents  │  │ Payment  │  │   Health     │  │
│    │  Router  │  │  Router  │  │   Check      │  │
│    └────┬─────┘  └──────────┘  └──────────────┘  │
│         │                                        │
│    ┌────▼─────────────────────┐                  │
│    │   TinyFish SSE Client   │ ── 6 AI Agents   │
│    └────┬─────────────────────┘                  │
│         │                                        │
│    ┌────▼─────────────────────┐                  │
│    │  Gemini 2.5 Flash Lite  │ ── Report Synth  │
│    │  (Vertex AI REST API)   │                  │
│    └────┬─────────────────────┘                  │
│         │                                        │
│    ┌────▼─────────────────────┐                  │
│    │   Neon PostgreSQL DB    │ ── Persistence   │
│    └──────────────────────────┘                  │
└──────────────────────────────────────────────────┘
```

---

## 🤖 The 6 AI Agents

| # | Agent | Data Sources | What It Finds |
|---|-------|-------------|---------------|
| 1 | **Regulatory & Filings** | SEC EDGAR, State SOS | Corporate structure, incorporation details, SEC filings, subsidiaries |
| 2 | **Litigation & Legal** | PACER, CourtListener | Active/Past lawsuits, litigation risk score, regulatory actions |
| 3 | **Financial Health** | Crunchbase, PitchBook, Press | Funding rounds, revenue estimates, burn rate indicators |
| 4 | **Leadership & Talent** | LinkedIn Public Profiles | Key executives, board members, headcount trends, recent departures |
| 5 | **IP & Patent Portfolio** | USPTO, Google Patents | Patent filings, technology categories, IP valuation signals |
| 6 | **News & Sentiment** | Google News, TechCrunch | Recent coverage, sentiment analysis, red flag detection |

---

## 📊 Generated Report Structure

Every report includes:
- **Executive Summary** — AI-synthesized overview with key findings
- **Overall Risk Score** (1–10) — Composite risk rating
- **Corporate Structure** — Entity type, incorporation state/date, registered agent
- **Financial Health** — Total funding, last round, revenue estimates
- **Legal Liability** — Litigation risk score, active lawsuits, regulatory actions
- **Talent & Hiring** — Employee count, headcount trend, key departures
- **IP & Patents** — Patent count, technology categories, key patents
- **News Sentiment** — Recent coverage, sentiment score, key events
- **Red Flags** — AI-detected concerns requiring attention
- **Recommendation** — Go / Proceed with Caution / Do Not Proceed

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI component library |
| TypeScript | 5.x | Type-safe development |
| Vanilla CSS | — | Custom glass-morphism design system |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Python | 3.10+ | Backend runtime |
| FastAPI | 0.115.0 | Async REST API framework |
| Uvicorn | 0.30.6 | ASGI server |
| HTTPX | 0.27.2 | Async HTTP client for API calls |
| SQLAlchemy | 2.0.36 | ORM with async support |
| AsyncPG | 0.29.0 | Async PostgreSQL driver |
| Alembic | 1.13.3 | Database migrations |
| google-genai | 1.5.0 | Google Gemini AI SDK |
| python-dotenv | 1.0.1 | Environment variable management |

### External Services
| Service | Purpose |
|---------|---------|
| [TinyFish API](https://agent.tinyfish.ai) | AI web agent execution via SSE |
| [Google Gemini 2.5 Flash Lite](https://ai.google.dev) | Report synthesis via Vertex AI |
| [Neon Database](https://neon.tech) | Serverless PostgreSQL hosting |
| [PayU](https://payu.in) | Secure payment processing |

---

## 📁 Project Structure

```
dealroom-ai/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── requirements.txt           # Python dependencies
│   ├── .env                       # Environment variables (not committed)
│   ├── db/
│   │   ├── neon.py                # Database connection & initialization
│   │   └── __init__.py
│   ├── models/
│   │   ├── report.py              # SQLAlchemy Report & AgentRun models
│   │   └── __init__.py
│   ├── routers/
│   │   ├── agents.py              # /api/agents — SSE streaming endpoint
│   │   ├── payment.py             # /api/payment — PayU hash generation
│   │   └── __init__.py
│   └── services/
│       ├── tinyfish_client.py     # TinyFish SSE API client
│       ├── gemini_extractor.py    # Gemini 2.5 report synthesis
│       └── __init__.py
│
├── frontend/
│   ├── package.json               # Node.js dependencies
│   ├── next.config.ts             # Next.js configuration with API proxy
│   ├── tsconfig.json              # TypeScript configuration
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Navbar/Footer
│   │   ├── globals.css            # Complete design system (12K+ lines)
│   │   ├── page.tsx               # Home — search & hero section
│   │   ├── about/page.tsx         # About — company story & mission
│   │   ├── analyze/page.tsx       # Live analysis — SSE agent streaming
│   │   ├── contact/page.tsx       # Contact form
│   │   ├── pricing/page.tsx       # Pricing plans with PayU checkout
│   │   ├── privacy/page.tsx       # Privacy Policy
│   │   ├── reports/page.tsx       # Report history & detail view
│   │   └── terms/page.tsx         # Terms of Service
│   ├── components/
│   │   ├── Navbar.tsx             # Global navigation bar
│   │   └── Footer.tsx             # Global footer
│   └── public/
│       └── assets/                # Static images and icons
│
└── README.md                      # This file
```

---

## ⚡ Getting Started

### Prerequisites

- **Python** 3.10 or higher
- **Node.js** 18 or higher
- **npm** 9 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/sunnyshin8/dealroom-ai.git
cd dealroom-ai
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your actual keys (see Environment Variables section)

# Start the backend server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev -- --port 3000
```

### 4. Open the Application

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# TinyFish API — Web agent execution
TINYFISH_API_KEY=your_tinyfish_api_key_here

# Google Gemini AI — Report synthesis (Vertex AI REST API)
GEMINI_API_KEY=your_gemini_api_key_here

# Neon PostgreSQL — Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# PayU — Payment processing (optional)
PAYU_API_KEY=your_payu_api_key
PAYU_SALT_32=your_payu_salt_32
PAYU_CLIENT_ID=your_payu_client_id
PAYU_CLIENT_SECRET=your_payu_client_secret
```

### Getting API Keys

| Service | How to Get |
|---------|-----------|
| **TinyFish** | Sign up at [agent.tinyfish.ai](https://agent.tinyfish.ai) → API Keys |
| **Gemini** | Create a project at [Google Cloud Console](https://console.cloud.google.com) → Enable Vertex AI → Create API Key |
| **Neon DB** | Sign up at [neon.tech](https://neon.tech) → Create Project → Copy Connection String |
| **PayU** | Register at [payu.in](https://payu.in) → Dashboard → Generate Merchant Key & Salt |

---

## 🎨 Design System

DealRoom AI features a custom-built premium design system:

- **Glass-morphism** — Frosted glass cards with backdrop blur effects
- **Animated Orbs** — Floating gradient orbs in the background
- **Grid Overlay** — Subtle dot-grid pattern for depth
- **Gradient Text** — Violet-to-cyan animated gradient headings
- **Micro-animations** — Fade-up entrance animations with staggered delays
- **Responsive** — Fully responsive across desktop, tablet, and mobile
- **Dark Theme** — Deep navy/purple palette with carefully tuned contrast ratios

---

## 🔌 API Endpoints

### Agents

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/agents/start?company={name}` | Start 6-agent analysis (SSE stream) |
| `GET` | `/api/agents/reports` | List all generated reports |
| `GET` | `/api/agents/reports/{id}` | Get a specific report by ID |

### Payment

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/payment/hash` | Generate secure PayU payment hash |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero section and company search |
| `/reports` | Report history with status indicators |
| `/reports/{id}` | Detailed intelligence dossier view |
| `/analyze` | Live agent streaming dashboard |
| `/pricing` | Subscription plans with PayU secure checkout |
| `/about` | Company story, mission, and team |
| `/contact` | Contact form and support information |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

---

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel or any Node.js hosting
```

### Backend (Railway / Render / AWS)
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT
```

> **Important:** Update CORS origins in `main.py` from `"*"` to your production domain before deploying.

---

## 🔒 Security Notes

- All API keys are stored server-side in environment variables, never exposed to the client.
- PayU payments use SHA-512 hash verification for tamper-proof transactions.
- Database connections use SSL/TLS encryption.
- CORS is configured to allow all origins in development — **restrict in production**.
- The `.env` file is excluded from version control via `.gitignore`.

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🤝 Contributing

Interested in contributing? Please reach out to us at [shingloo93@gmail.com](mailto:[shingloo93@gmail.com]).

---

<div align="center">

**Built with ❤️ by DealRoom AI**

*Powered by [TinyFish](https://agent.tinyfish.ai) & [Google Gemini](https://ai.google.dev)*

</div>