import os
import json
import httpx
import asyncio
from typing import AsyncGenerator, Callable
from dotenv import load_dotenv

load_dotenv()

TINYFISH_API_KEY = os.getenv("TINYFISH_API_KEY")
TINYFISH_BASE_URL = "https://agent.tinyfish.ai/v1"

# --- Agent definitions: name, start URL, and the goal prompt ---
AGENT_DEFINITIONS = {
    "regulatory": {
        "name": "Regulatory Hound",
        "url": "https://efts.sec.gov/LATEST/search-index?q={company}&dateRange=custom&startdt=2020-01-01&forms=10-K,10-Q,8-K",
        "goal": (
            "You are a regulatory research agent. Search for any SEC filings, regulatory actions, "
            "or government records for '{company}'. Navigate to the results, click through the most "
            "relevant documents, and extract: company type, incorporation state, registered agent, "
            "filing history, any SBA loans, and key regulatory findings. Return structured data."
        ),
    },
    "legal": {
        "name": "Legal Liability Scanner",
        "url": "https://www.courtlistener.com/?q={company}&type=r&order_by=score+desc",
        "goal": (
            "You are a legal research agent. Search for any court cases, lawsuits, judgments, or "
            "bankruptcy records involving '{company}'. Navigate through the results, click on the "
            "most relevant cases, and extract: case numbers, case types (civil/criminal/bankruptcy), "
            "filing dates, outcomes, and any financial penalties. Return structured data."
        ),
    },
    "talent": {
        "name": "Talent Signal Analyst",
        "url": "https://www.linkedin.com/search/results/companies/?keywords={company}",
        "goal": (
            "You are a talent intelligence agent. Search LinkedIn for '{company}', navigate to the "
            "company page, and extract: employee count, recent leadership changes (C-suite hires/departures "
            "in the last 12 months), top hiring roles, and overall headcount growth trend. Then go to "
            "Indeed and search for open jobs at '{company}' to see hiring velocity. Return structured data."
        ),
    },
    "patent": {
        "name": "Patent & IP Scout",
        "url": "https://patents.google.com/?assignee={company}&num=10",
        "goal": (
            "You are a patent intelligence agent. Navigate to Google Patents, search for patents "
            "assigned to '{company}', and extract: total patent count, key technology areas, "
            "most recently filed patents, and any patent litigation. Return structured data."
        ),
    },
    "news": {
        "name": "News & Sentiment Monitor",
        "url": "https://news.google.com/search?q={company}",
        "goal": (
            "You are a news and sentiment agent. Search Google News for '{company}', navigate through "
            "the top 10 most recent articles, and extract: key themes in recent coverage, any negative "
            "press (lawsuits, scandals, layoffs, financial distress signals), positive coverage "
            "(funding, awards, growth), and an overall sentiment score (1-10). Return structured data."
        ),
    },
    "financial": {
        "name": "Financial Deep Dive",
        "url": "https://www.crunchbase.com/textsearch?q={company}",
        "goal": (
            "You are a financial intelligence agent. Go to Crunchbase and search for '{company}'. "
            "Navigate to the company profile and extract: total funding raised, funding rounds with dates "
            "and investors, estimated valuation (if available), and key investors. Return structured data."
        ),
    },
}


async def run_agent_stream(
    company_name: str,
    agent_key: str,
    on_step: Callable[[dict], None],
) -> str:
    """
    Calls the TinyFish SSE API for a single agent.
    Streams step-by-step events back via `on_step` callback.
    Returns the final extracted text content.
    """
    agent = AGENT_DEFINITIONS[agent_key]
    url = agent["url"].format(company=company_name.replace(" ", "+"))
    goal = agent["goal"].format(company=company_name)

    payload = {
        "url": url,
        "goal": goal,
        "max_steps": 20,
    }

    headers = {
        "X-API-Key": TINYFISH_API_KEY,
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
    }

    extracted_content = []

    async with httpx.AsyncClient(timeout=300.0) as client:
        async with client.stream(
            "POST",
            f"{TINYFISH_BASE_URL}/automation/run-sse",
            json=payload,
            headers=headers,
        ) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.strip():
                    continue
                if line.startswith("data:"):
                    raw = line[5:].strip()
                    if raw == "[DONE]":
                        break
                    try:
                        event = json.loads(raw)
                        event_type = event.get("type", "")

                        if event_type == "step":
                            step_msg = event.get("message", "")
                            on_step({
                                "agent_key": agent_key,
                                "agent_name": agent["name"],
                                "type": "step",
                                "message": step_msg,
                            })

                        elif event_type == "result":
                            content = event.get("result", {}).get("content", "")
                            extracted_content.append(content)
                            on_step({
                                "agent_key": agent_key,
                                "agent_name": agent["name"],
                                "type": "completed",
                                "message": f"✅ {agent['name']} finished extraction.",
                            })

                        elif event_type == "error":
                            on_step({
                                "agent_key": agent_key,
                                "agent_name": agent["name"],
                                "type": "error",
                                "message": f"⚠️ {event.get('message', 'Unknown error')}",
                            })

                    except json.JSONDecodeError:
                        pass  # skip malformed SSE lines

    return "\n\n".join(extracted_content)
