from copy import deepcopy

from app.schema.candidate import CandidateProfile


class MergeEngine:

    def merge(
        self,
        resume: CandidateProfile,
        recruiter: CandidateProfile,
        github: CandidateProfile,
    ) -> CandidateProfile:

        merged = deepcopy(resume)

        # ---------- Full Name ----------
        if not merged.full_name:
            merged.full_name = (
                recruiter.full_name
                or github.full_name
            )

        # ---------- Emails ----------
        merged.emails = list(
            dict.fromkeys(
                merged.emails
                + recruiter.emails
                + github.emails
            )
        )

        # ---------- Phones ----------
        merged.phones = list(
            dict.fromkeys(
                merged.phones
                + recruiter.phones
                + github.phones
            )
        )

        return merged