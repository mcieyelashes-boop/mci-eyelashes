"""
Ad Virality Score — FastAPI backend

Wraps TRIBE v2 brain-response modeling to produce virality scores.
Falls back to deterministic mock scores when GPU / model weights are unavailable.

Run locally:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

Then set in your .env:
    VITE_VIRALITY_API_URL=http://localhost:8000
"""

import logging
import os
import tempfile
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import tribe_scorer

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    log.info(
        "TRIBE v2 available: %s",
        tribe_scorer._tribe_available,
    )
    yield


app = FastAPI(title="Ad Virality Score API", lifespan=lifespan)

# Allow the Vite dev server and any deployed frontend origin
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:4173,https://mci-eyelashes.vercel.app",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class AnalysisResult(BaseModel):
    overall: int
    regions: dict[str, int]
    model: str


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "tribe_v2": tribe_scorer._tribe_available,
    }


@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze(
    url: str | None = Form(default=None),
    file: UploadFile | None = File(default=None),
):
    """
    Analyze a video and return virality scores.

    Accepts either:
      - url  (form field): public video URL (YouTube, Vimeo, direct mp4)
      - file (multipart):  uploaded video file
    """
    if not url and not file:
        raise HTTPException(status_code=422, detail="Provide 'url' or 'file'")

    if file:
        suffix = Path(file.filename or "video.mp4").suffix or ".mp4"
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        try:
            result = tribe_scorer.score_file(tmp_path)
        finally:
            Path(tmp_path).unlink(missing_ok=True)
    else:
        result = tribe_scorer.score_url(url)

    return result
