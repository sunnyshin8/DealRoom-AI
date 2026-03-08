import asyncio
import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy import select
from db.neon import AsyncSessionLocal
from models.report import Report
from services.tinyfish_client import run_agent_stream, AGENT_DEFINITIONS
from services.gemini_extractor import extract_report

router = APIRouter()


class AnalysisRequest(BaseModel):
    company_name: str


@router.post("/start")
async def start_analysis(request: AnalysisRequest):
    """
    Triggers 6 TinyFish agents concurrently for the given company.
    Returns a streaming SSE response with live step-by-step updates.
    After all agents complete, synthesizes the report with Gemini and saves to Neon.
    """
    company = request.company_name.strip()
    if not company:
        raise HTTPException(status_code=400, detail="company_name is required")

    async def event_stream():
        queue: asyncio.Queue = asyncio.Queue()

        # Create DB record immediately so we have an ID
        async with AsyncSessionLocal() as session:
            report = Report(company_name=company, status="running")
            session.add(report)
            await session.commit()
            await session.refresh(report)
            report_id = report.id

        yield f"data: {json.dumps({'type': 'init', 'report_id': report_id, 'message': f'🚀 Starting 6 intelligence agents for {company}...'})}\n\n"

        # Callback that each agent fires on every SSE step
        def on_step(event: dict):
            queue.put_nowait(event)

        raw_results: dict = {}

        async def run_single_agent(key: str):
            try:
                content = await run_agent_stream(company, key, on_step)
                raw_results[key] = content
            except Exception as e:
                raw_results[key] = f"Error: {str(e)}"
                queue.put_nowait({
                    "agent_key": key,
                    "agent_name": AGENT_DEFINITIONS[key]["name"],
                    "type": "error",
                    "message": f"⚠️ Agent failed: {str(e)}",
                })

        # Launch all 6 agents concurrently
        agent_tasks = asyncio.gather(
            *[run_single_agent(k) for k in AGENT_DEFINITIONS.keys()]
        )

        # Drain the queue while agents are running
        while not agent_tasks.done():
            try:
                event = queue.get_nowait()
                yield f"data: {json.dumps(event)}\n\n"
            except asyncio.QueueEmpty:
                await asyncio.sleep(0.1)

        # Drain remaining events after all tasks complete
        while not queue.empty():
            event = queue.get_nowait()
            yield f"data: {json.dumps(event)}\n\n"

        # Now synthesize with Gemini
        yield f"data: {json.dumps({'type': 'synthesis', 'message': '🧠 All agents complete. Synthesizing intelligence report with Gemini 2.0 Flash...'})}\n\n"

        try:
            structured_report = await extract_report(company, raw_results)
        except Exception as e:
            structured_report = {
                "company_name": company,
                "executive_summary": f"Extraction error: {str(e)}",
                "overall_risk_score": 5,
                "recommendation": "Proceed with Caution",
                "red_flags": [f"Report synthesis failed: {str(e)}"],
            }

        # Save final report to Neon DB
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(Report).where(Report.id == report_id))
            db_report = result.scalar_one()
            db_report.status = "completed"
            db_report.report_data = structured_report
            await session.commit()

        yield f"data: {json.dumps({'type': 'complete', 'report_id': report_id, 'report': structured_report, 'message': '✅ Intelligence report ready!'})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream", headers={
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
    })


@router.get("/reports")
async def list_reports():
    """Returns a list of all previous reports (most recent first)."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(Report).order_by(Report.created_at.desc()).limit(50)
        )
        reports = result.scalars().all()
        return [r.to_dict() for r in reports]


@router.get("/reports/{report_id}")
async def get_report(report_id: int):
    """Returns a specific report by ID."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Report).where(Report.id == report_id))
        report = result.scalar_one_or_none()
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        return report.to_dict()
