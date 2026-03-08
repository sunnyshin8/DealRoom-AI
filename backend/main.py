from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routers import agents
from db.neon import init_db
from dotenv import load_dotenv

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # On startup: initialize DB tables
    await init_db()
    yield
    # On shutdown: nothing to clean up


app = FastAPI(
    title="DealRoom AI",
    description="Autonomous M&A Intelligence Engine powered by TinyFish",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents.router, prefix="/api/agents", tags=["Agents"])
from routers import payment
app.include_router(payment.router, prefix="/api/payment", tags=["Payment"])


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "product": "DealRoom AI", "version": "1.0.0"}
