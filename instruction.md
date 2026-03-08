# ⚡ DealRoom AI: Technical Instructions & Architecture

This document provides a technical walkthrough of the DealRoom AI M&A Intelligence Engine system architecture and how to get the frontend connected to the backend.

## 🏗️ System Architecture Context
DealRoom AI operates as a powerful 3-tier autonomous system:

1. **Frontend (Next.js 15):** The client application in `frontend/`. It handles the premium glass-morphism user interface and listens to real-time Server-Sent Events (SSE) from the backend to render the progress of the 6 AI agents live on the dashboard.
2. **Backend Engine (FastAPI):** Python server in `backend/`. This orchestrates the agent workflows, provides secure endpoints (like the PayU payment checksum generator), connects to the Neon Serverless PostgreSQL database, and streams updates to the frontend.
3. **AI Execution Layer (TinyFish & Gemini):** 
   - **TinyFish Platform:** Provides 6 managed, headless browser agents running concurrently to extract data from 40+ protected data sources (EDGAR, PACER, LinkedIn, Crunchbase) without encountering bot-blocks.
   - **Google Gemini 2.5 Flash:** Synthesizes the massive raw JSON extractions from the 6 TinyFish agents into a single, clean, actionable M&A dossier.

---

## 🚀 Local Development Setup

To run DealRoom AI locally, you **MUST run both the Backend and Frontend concurrently**. The Next.js frontend relies on the FastAPI backend for all data and agent execution.

### STEP 1: Boot the FastAPI Backend
The backend must be running on port `8000` so the frontend can securely proxy requests to it.
Open a terminal, navigate to the `backend/` folder, activate your Python virtual environment, and run:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### STEP 2: Start the Next.js Frontend
Open a *second* terminal window, navigate to the `frontend/` directory, install packages, and start the Next.js development server:

```bash
npm install
npm run dev
```

### STEP 3: Access the Platform
Visit [http://localhost:3000](http://localhost:3000) in your web browser. 
Because of the Next.js `rewrites` configuration in `next.config.ts`, any request the frontend makes to `/api/*` will automatically be proxied securely to your Python backend at `http://localhost:8000/api/*`.

---

## 🛠️ Key Frontend Directories & Navigation

- **`app/page.tsx`** — The principal DealRoom command center and company search interface.
- **`app/analyze/page.tsx`** — The visual dashboard where users watch the 6 TinyFish agents execute workflows concurrently via SSE streaming.
- **`app/pricing/page.tsx`** — The subscription portal. It integrates dynamically with the backend to generate secure cryptographic hashes for PayU checkout.
- **`components/`** — Shared UI building blocks (Navbar, Footer).
- **`globals.css`** — Contains the core DealRoom design system: animated gradient text, frosted glass backdrop filters, structural grids, and CSS micro-animations.

---

## 🌐 API Routing & Production Deployment

**Local Proxies:** To prevent strict CORS errors during local development, the Next.js app automatically reverse-proxies all network requests starting with `/api/` directly to `http://127.0.0.1:8000`.

**Going to Production:** When you deploy this Next.js frontend to a provider like Vercel, you must update the destination URL inside `next.config.ts` (or use an environment variable like `NEXT_PUBLIC_API_URL`) to point toward your live, deployed FastAPI domain instead of localhost.
