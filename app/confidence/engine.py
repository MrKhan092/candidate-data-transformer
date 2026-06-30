import json

from app.schema.candidate import CandidateProfile


class ConfidenceEngine:

    def __init__(self):

        with open("config/default.json", "r") as f:
            config = json.load(f)

        self.base_confidence = config["confidence"]["base_confidence"]

    def apply(
        self,
        profile: CandidateProfile,
    ) -> CandidateProfile:

        # ------------------------
        # Skill confidence
        # ------------------------

        for skill in profile.skills:

            if "recruiter" in skill.sources:
                skill.confidence = self.base_confidence["recruiter_csv"]

            elif "github" in skill.sources:
                skill.confidence = self.base_confidence["github_profile"]

            else:
                skill.confidence = self.base_confidence["resume_pdf"]

        # ------------------------
        # Overall confidence
        # ------------------------

        if profile.skills:

            total = sum(
                skill.confidence
                for skill in profile.skills
            )

            profile.overall_confidence = round(
                total / len(profile.skills),
                2,
            )

        return profile