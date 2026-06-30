import argparse
import json

from app.parsers.resume_parser import ResumeParser
from app.parsers.csv_parser import CSVParser
from app.parsers.github_parser import GitHubParser

from app.normalizers.profile import ProfileNormalizer
from app.merger.merge_engine import MergeEngine
from app.confidence.engine import ConfidenceEngine
from app.provenance.engine import ProvenanceEngine
from app.projection.projection_engine import ProjectionEngine


def main():

    parser = argparse.ArgumentParser(
        description="Candidate Transformer"
    )

    parser.add_argument(
        "--resume",
        required=True,
        help="Resume PDF path",
    )

    parser.add_argument(
        "--csv",
        required=True,
        help="Recruiter CSV path",
    )

    parser.add_argument(
        "--github",
        required=True,
        help="GitHub username",
    )

    parser.add_argument(
        "--config",
        default="config/output.json",
        help="Projection config",
    )

    args = parser.parse_args()

    # ------------------------
    # Parse
    # ------------------------

    resume = ProfileNormalizer.normalize(
        ResumeParser().parse(args.resume)
    )

    recruiter = ProfileNormalizer.normalize(
        CSVParser().parse(args.csv)
    )

    github = ProfileNormalizer.normalize(
        GitHubParser().parse(args.github)
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

    profile = ConfidenceEngine().apply(profile)

    # ------------------------
    # Provenance
    # ------------------------

    profile = ProvenanceEngine.apply(profile)

    # ------------------------
    # Projection
    # ------------------------

    output = ProjectionEngine.project(
        profile,
        args.config,
    )

    print(
        json.dumps(
            output,
            indent=4,
        )
    )


if __name__ == "__main__":
    main()