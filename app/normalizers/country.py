from app.normalizers.base import BaseNormalizer
from app.normalizers.loader import ConfigLoader


class CountryNormalizer(BaseNormalizer):

    COUNTRY_MAP = ConfigLoader.load("countries.json")

    @classmethod
    def normalize(cls, country: str):

        if not country:
            return None

        key = cls.clean(country).lower()

        return cls.COUNTRY_MAP.get(key, country.strip())