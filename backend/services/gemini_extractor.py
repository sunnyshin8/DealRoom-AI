import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

EXTRACTION_PROMPT = """
You are an expert M&A due diligence analyst and forensic investigator. You have been given raw extracted content from 6 different web research agents that investigated a company called "{company}".

Your job is to synthesize this raw data into a highly rigorous, detailed, and structured M&A Intelligence Report in JSON format. 
**CRITICAL INSTRUCTION:** Do NOT provide generic summaries. You MUST extract specific names, dates, dollar amounts, case numbers, and precise findings. If a data point is missing, state 'Data Not Found' rather than guessing. Your report must be detailed-oriented and factual.

Raw agent data:
{raw_data}

Return ONLY a valid JSON object with this exact schema:
{{
  "company_name": "string",
  "executive_summary": "2-3 sentence summary of the company's overall health for M&A purposes",
  "overall_risk_score": "number 1-10, where 10 is highest risk",
  "corporate_structure": {{
    "incorporation_state": "string or null",
    "incorporation_date": "string or null",
    "registered_agent": "string or null",
    "entity_type": "string or null",
    "subsidiaries": ["list of known subsidiaries"],
    "key_findings": ["list of important regulatory findings"]
  }},
  "litigation_risk": {{
    "risk_score": "number 1-10",
    "active_cases": "number or null",
    "case_summary": ["list of notable cases with brief description"],
    "red_flags": ["list of serious legal red flags"]
  }},
  "financial_health": {{
    "total_funding": "string or null",
    "last_round": "string or null",
    "key_investors": ["list of investor names"],
    "revenue_signals": "string description of revenue signals",
    "financial_red_flags": ["list of financial red flags"]
  }},
  "talent_signals": {{
    "employee_count": "string or null",
    "headcount_trend": "Growing / Stable / Declining",
    "recent_executive_changes": ["list of C-suite changes in last 12 months"],
    "hiring_velocity": "High / Medium / Low",
    "key_open_roles": ["list of key open roles"],
    "culture_score": "string or null"
  }},
  "ip_portfolio": {{
    "total_patents": "number or null",
    "key_technology_areas": ["list of tech areas"],
    "recent_filings": ["list of recently filed patents"],
    "trademarks": ["list of key trademarks"],
    "ip_red_flags": ["list of IP risks or litigation"]
  }},
  "news_sentiment": {{
    "sentiment_score": "number 1-10, where 10 is most positive",
    "key_themes": ["list of major news themes"],
    "positive_coverage": ["list of positive news items"],
    "negative_coverage": ["list of negative news items"],
    "recent_headlines": ["list of 3-5 recent headline summaries"]
  }},
  "red_flags": ["master list of all critical red flags across all categories"],
  "green_flags": ["list of positive signals that support acquisition"],
  "recommendation": "Proceed / Proceed with Caution / Do Not Proceed"
}}
"""


async def extract_report(company_name: str, raw_agent_data: dict) -> dict:
    """
    Takes raw text output from all 6 agents and uses Gemini 2.5 Flash Lite
    via Vertex AI REST API to synthesize it into a structured M&A intelligence report.
    """
    raw_data_str = json.dumps(raw_agent_data, indent=2)

    prompt = EXTRACTION_PROMPT.format(
        company=company_name,
        raw_data=raw_data_str,
    )
    
    api_key = os.getenv("GEMINI_API_KEY")
    # Using generateContent (non-streaming) as it's cleaner for simple JSON extraction
    url = f"https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash-lite:generateContent?key={api_key}"
    
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.1
        }
    }
    
    async with httpx.AsyncClient(timeout=180.0) as client:
        try:
            resp = await client.post(url, json=payload)
            if resp.status_code == 429:
                return {
                    "company_name": company_name,
                    "executive_summary": "Extraction error: 429 RESOURCE_EXHAUSTED. You exceeded your current quota.",
                    "overall_risk_score": 5,
                    "recommendation": "Proceed with Caution",
                    "red_flags": ["Quota exceeded on Vertex AI API key."]
                }
                
            resp.raise_for_status()
            data = resp.json()
            text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "{}")
            return json.loads(text)
            
        except httpx.HTTPStatusError as e:
            err_text = e.response.text
            return {
                "company_name": company_name,
                "executive_summary": f"HTTP Error {e.response.status_code}: {err_text[:200]}",
                "overall_risk_score": 5,
                "recommendation": "Proceed with Caution",
                "red_flags": [f"API returned HTTP {e.response.status_code}"]
            }
        except Exception as e:
            return {
                "company_name": company_name,
                "executive_summary": f"Report synthesis encountered an error: {str(e)}",
                "overall_risk_score": 5,
                "red_flags": ["Could not fully parse structured report"],
                "recommendation": "Proceed with Caution",
            }
