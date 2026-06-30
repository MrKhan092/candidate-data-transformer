"""
Stub for app/parsers/github_parser.py
"""
from app.github.client import GitHubClient
from app.schema.candidate import CandidateProfile, Skill


class GitHubParser:
    """
    Parses GitHub profile into CandidateProfile.
    """

    def __init__(self):
        self.client = GitHubClient()

    def parse(self, username: str) -> CandidateProfile:
        user = self.client.get_user(username)
        repos = self.client.get_repositories(username)

        skills = set()

        for repo in repos:
            language = repo.get("language")
            if language:
                skills.add(language)

        return CandidateProfile(
            full_name=user.get("name"),
            headline=user.get("bio"),
            links={
                "github": user.get("html_url"),
                "linkedin": None,
                "portfolio": user.get("blog") or None,
                "other": []
            },
            location={
                "city": None,
                "region": None,
                "country": user.get("location")
            },
            skills=[
                Skill(
                    name=skill,
                    confidence=0.9,
                    sources=["github"]
                )
                for skill in sorted(skills)
            ]
        )