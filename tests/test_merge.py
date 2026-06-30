from app.merger.merge_engine import MergeEngine
from app.parsers.resume_parser import ResumeParser
from app.parsers.csv_parser import CSVParser
from app.parsers.github_parser import GitHubParser


def main():
    resume = ResumeParser().parse("inputs/resumes/f1.pdf")

    recruiter = CSVParser().parse("inputs/csv/recruiter.csv")

    github = GitHubParser().parse("MrKhan092")

    merged = MergeEngine().merge(
        resume,
        recruiter,
        github,
    )

    print(merged.model_dump_json(indent=4))


if __name__ == "__main__":
    main()