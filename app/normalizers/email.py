import re

from app.normalizers.base import BaseNormalizer


class EmailNormalizer(BaseNormalizer):

    EMAIL_REGEX = re.compile(
        r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    )

    @classmethod
    def normalize(cls, email: str):

        if not email:
            return None

        email = cls.clean(email).lower().replace(" ", "")

        if cls.EMAIL_REGEX.match(email):
            return email

        return None