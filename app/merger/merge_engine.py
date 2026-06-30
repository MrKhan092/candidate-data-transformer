from copy import deepcopy

from app.schema.candidate import CandidateProfile


class MergeEngine:

    @classmethod
    def merge(
        cls,
        resume: CandidateProfile,
        recruiter: CandidateProfile,
        github: CandidateProfile,
    ) -> CandidateProfile:

        merged = deepcopy(resume)

        # ------------------------
        # Emails
        # ------------------------

        merged.emails = list(
            dict.fromkeys(
                resume.emails
                + recruiter.emails
                + github.emails
            )
        )

        # ------------------------
        # Phones
        # ------------------------

        merged.phones = list(
            dict.fromkeys(
                resume.phones
                + recruiter.phones
                + github.phones
            )
        )

        # ------------------------
        # Links
        # ------------------------

        merged.links.linkedin = (
            resume.links.linkedin
            or recruiter.links.linkedin
            or github.links.linkedin
        )

        merged.links.github = (
            resume.links.github
            or recruiter.links.github
            or github.links.github
        )

        merged.links.portfolio = (
            resume.links.portfolio
            or recruiter.links.portfolio
            or github.links.portfolio
        )

        merged.links.other = list(
            dict.fromkeys(
                resume.links.other
                + recruiter.links.other
                + github.links.other
            )
        )

        # ------------------------
        # Skills
        # ------------------------

        skills = {}

        for profile in (resume, recruiter, github):

            for skill in profile.skills:

                key = skill.name.lower()

                if key not in skills:
                    skills[key] = skill

        merged.skills = list(skills.values())

        # ------------------------
        # Experience
        # ------------------------

        merged.experience = (
            resume.experience
            + recruiter.experience
            + github.experience
        )

        # ------------------------
        # Education
        # ------------------------

        merged.education = (
            resume.education
            + recruiter.education
            + github.education
        )

        # ------------------------
        # Location
        # ------------------------

        merged.location.city = (
            resume.location.city
            or recruiter.location.city
            or github.location.city
        )

        merged.location.region = (
            resume.location.region
            or recruiter.location.region
            or github.location.region
        )

        merged.location.country = (
            resume.location.country
            or recruiter.location.country
            or github.location.country
        )

        # ------------------------
        # Headline
        # ------------------------

        merged.headline = (
            resume.headline
            or recruiter.headline
            or github.headline
        )

        # ------------------------
        # Years of Experience
        # ------------------------

        merged.years_experience = (
            resume.years_experience
            or recruiter.years_experience
            or github.years_experience
        )

        return merged