from app.normalizers.base import BaseNormalizer
from app.normalizers.loader import ConfigLoader


class SkillNormalizer(BaseNormalizer):

    SKILL_MAP = ConfigLoader.load("skills.json")

    @classmethod
    def normalize(cls, skill: str):

        if not skill:
            return None

        key = (
            cls.clean(skill)
            .lower()
            .replace(".", "")
            .replace("-", "")
            .replace(" ", "")
        )

        return cls.SKILL_MAP.get(key, skill.strip())