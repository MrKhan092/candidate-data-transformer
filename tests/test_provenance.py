from app.parsers.resume_parser import ResumeParser
from app.parsers.csv_parser import CSVParser
from app.parsers.github_parser import GitHubParser

from app.normalizers.profile import ProfileNormalizer
from app.merger.merge_engine import MergeEngine
from app.confidence.engine import ConfidenceEngine
from app.provenance.engine import ProvenanceEngine


resume = ProfileNormalizer.normalize(
    ResumeParser().parse("inputs/resumes/f1.pdf")
)

recruiter = ProfileNormalizer.normalize(
    CSVParser().parse("inputs/csv/recruiter.csv")
)

github = ProfileNormalizer.normalize(
    GitHubParser().parse("MrKhan092")
)

merged = MergeEngine.merge(
    resume,
    recruiter,
    github,
)

merged = ConfidenceEngine().apply(merged)

merged = ProvenanceEngine().apply(merged)

print(
    merged.model_dump_json(indent=4)
)