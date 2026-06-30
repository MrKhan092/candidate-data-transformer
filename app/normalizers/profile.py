from copy import deepcopy

from app.schema.candidate import CandidateProfile

from app.normalizers.email import EmailNormalizer
from app.normalizers.phone import PhoneNormalizer
from app.normalizers.url import URLNormalizer
from app.normalizers.skill import SkillNormalizer
from app.normalizers.company import CompanyNormalizer
from app.normalizers.country import CountryNormalizer
from app.normalizers.date import DateNormalizer


class ProfileNormalizer:

    @classmethod
    def normalize(cls, profile: CandidateProfile):

        profile = deepcopy(profile)

        # Emails
        profile.emails = list(
            filter(
                None,
                [
                    EmailNormalizer.normalize(email)
                    for email in profile.emails
                ],
            )
        )

        # Phones
        profile.phones = list(
            filter(
                None,
                [
                    PhoneNormalizer.normalize(phone)
                    for phone in profile.phones
                ],
            )
        )

        # Links
        if profile.links.linkedin:
            profile.links.linkedin = URLNormalizer.normalize(
                profile.links.linkedin
            )

        if profile.links.github:
            profile.links.github = URLNormalizer.normalize(
                profile.links.github
            )

        if profile.links.portfolio:
            profile.links.portfolio = URLNormalizer.normalize(
                profile.links.portfolio
            )

        # Skills
        for skill in profile.skills:
            skill.name = SkillNormalizer.normalize(skill.name)

        # Experience
        for exp in profile.experience:

            if exp.company:
                exp.company = CompanyNormalizer.normalize(exp.company)

            if exp.start:
                exp.start = DateNormalizer.normalize(exp.start)

            if exp.end:
                exp.end = DateNormalizer.normalize(exp.end)

        # Country
        if profile.location.country:
            profile.location.country = CountryNormalizer.normalize(
                profile.location.country
            )

        return profile