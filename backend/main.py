from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import MentalHealthAgent
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Agent
agent = MentalHealthAgent()

class ChatRequest(BaseModel):
    message: str
    language: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    response: str
    stress_level: str
    emotion: str

class ReportRequest(BaseModel):
    session_id: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received chat request: {request}")
        result = agent.process_message(request.message, request.language, request.session_id)
        return result
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/report")
async def generate_report(request: ReportRequest):
    try:
        report = agent.generate_report(request.session_id)
        return {"report": report}
    except Exception as e:
        logger.error(f"Error in report endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}
