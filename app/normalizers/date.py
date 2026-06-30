from dateutil import parser

from app.normalizers.base import BaseNormalizer


class DateNormalizer(BaseNormalizer):

    @classmethod
    def normalize(cls, date_str: str):

        if not date_str:
            return None

        try:

            dt = parser.parse(date_str)

            return dt.strftime("%Y-%m")

        except Exception:
            return date_str