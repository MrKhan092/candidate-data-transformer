import json
import os
import shutil
import tempfile

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.parsers.resume_parser import ResumeParser
from app.parsers.csv_parser import CSVParser
from app.parsers.github_parser import GitHubParser

from app.normalizers.profile import ProfileNormalizer
from app.merger.merge_engine import MergeEngine
from app.confidence.engine import ConfidenceEngine
from app.provenance.engine import ProvenanceEngine
from app.projection.projection_engine import ProjectionEngine

app = FastAPI(
    title="Candidate Transformer API",
    version="1.0.0",
)

# Enable CORS for all origins (public API, no cookies/sessions)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "Candidate Transformer API is running"
    }

@app.get("/")
def home():
    return {
        "service": "Candidate Transformer API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }
    
@app.post("/transform")
async def transform(
    resume: UploadFile = File(...),
    recruiter_csv: UploadFile = File(...),
    github_username: str = Form(...),
):

    temp_dir = tempfile.mkdtemp()

    resume_path = os.path.join(temp_dir, resume.filename)
    csv_path = os.path.join(temp_dir, recruiter_csv.filename)

    with open(resume_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    with open(csv_path, "wb") as buffer:
        shutil.copyfileobj(recruiter_csv.file, buffer)

    # -------------------------
    # Parse
    # -------------------------

    resume_profile = ProfileNormalizer.normalize(
        ResumeParser().parse(resume_path)
    )

    recruiter_profile = ProfileNormalizer.normalize(
        CSVParser().parse(csv_path)
    )

    github_profile = ProfileNormalizer.normalize(
        GitHubParser().parse(github_username)
    )

    # -------------------------
    # Merge
    # -------------------------

    profile = MergeEngine.merge(
        resume_profile,
        recruiter_profile,
        github_profile,
    )

    # -------------------------
    # Confidence
    # -------------------------

    confidence_engine = ConfidenceEngine()

    profile = confidence_engine.apply(profile)

    # -------------------------
    # Provenance
    # -------------------------

    profile = ProvenanceEngine.apply(profile)

    # -------------------------
    # Projection
    # -------------------------

    output = ProjectionEngine.project(
        profile,
        "config/output.json",
    )

    shutil.rmtree(temp_dir)

    return output