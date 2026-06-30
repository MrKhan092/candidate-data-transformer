import json

from app.parsers.resume_parser import ResumeParser
from app.parsers.csv_parser import CSVParser
from app.parsers.github_parser import GitHubParser

from app.normalizers.profile import ProfileNormalizer

from app.merger.merge_engine import MergeEngine

from app.confidence.engine import ConfidenceEngine
from app.provenance.engine import ProvenanceEngine
from app.projection.projection_engine import ProjectionEngine


# ------------------------
# Parse Inputs
# ------------------------

resume = ProfileNormalizer.normalize(
    ResumeParser().parse("inputs/resumes/f1.pdf")
)

recruiter = ProfileNormalizer.normalize(
    CSVParser().parse("inputs/csv/recruiter.csv")
)

github = ProfileNormalizer.normalize(
    GitHubParser().parse("MrKhan092")
)

# ------------------------
# Merge
# ------------------------

profile = MergeEngine.merge(
    resume,
    recruiter,
    github,
)

# ------------------------
# Confidence
# ------------------------

confidence_engine = ConfidenceEngine()

profile = confidence_engine.apply(profile)

# ------------------------
# Provenance
# ------------------------

profile = ProvenanceEngine.apply(profile)

# ------------------------
# Projection
# ------------------------

projection = ProjectionEngine.project(
    profile,
    "config/output.json",
)

# ------------------------
# Output
# ------------------------

print("\n===== PROJECTED OUTPUT =====")

print(
    json.dumps(
        projection,
        indent=4,
    )
)