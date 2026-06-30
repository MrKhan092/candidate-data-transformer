"""
Provenance Engine
"""

from app.schema.common import Provenance
from app.schema.candidate import CandidateProfile


class ProvenanceEngine:

    @staticmethod
    def apply(profile: CandidateProfile) -> CandidateProfile:

        provenance = []

        # ------------------------
        # Emails
        # ------------------------

        for email in profile.emails:
            provenance.append(
                Provenance(
                    field="email",
                    value=email,
                    source="resume_pdf",
                    method="llm_resume_parser",
                )
            )

        # ------------------------
        # Phones
        # ------------------------

        for phone in profile.phones:
            provenance.append(
                Provenance(
                    field="phone",
                    value=phone,
                    source="resume_pdf",
                    method="llm_resume_parser",
                )
            )

        # ------------------------
        # Skills
        # ------------------------

        for skill in profile.skills:

            source = "resume_pdf"
            method = "llm_resume_parser"

            if "github" in skill.sources:
                source = "github_profile"
                method = "github_api"

            elif "recruiter" in skill.sources:
                source = "recruiter_csv"
                method = "csv_import"

            provenance.append(
                Provenance(
                    field="skill",
                    value=skill.name,
                    source=source,
                    method=method,
                )
            )

        # ------------------------
        # Experience
        # ------------------------

        for exp in profile.experience:
            provenance.append(
                Provenance(
                    field="experience",
                    value=exp.company or exp.title or "Unknown",
                    source="resume_pdf",
                    method="llm_resume_parser",
                )
            )

        # ------------------------
        # Education
        # ------------------------

        for edu in profile.education:
            provenance.append(
                Provenance(
                    field="education",
                    value=edu.institution,
                    source="resume_pdf",
                    method="llm_resume_parser",
                )
            )

        profile.provenance = provenance

        return profile