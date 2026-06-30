from app.normalizers.base import BaseNormalizer
from app.normalizers.loader import ConfigLoader


class CompanyNormalizer(BaseNormalizer):

    COMPANY_MAP = ConfigLoader.load("companies.json")

    @classmethod
    def normalize(cls, company: str):

        if not company:
            return None

        key = cls.clean(company).lower()

        return cls.COMPANY_MAP.get(key, company.strip())