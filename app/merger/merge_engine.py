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
                resume.emails +
                recruiter.emails +
                github.emails
            )
        )

        # ------------------------
        # Phones
        # ------------------------
        merged.phones = list(
            dict.fromkeys(
                resume.phones +
                recruiter.phones +
                github.phones
            )
        )

        return merged