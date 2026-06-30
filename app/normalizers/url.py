from app.normalizers.base import BaseNormalizer


class URLNormalizer(BaseNormalizer):

    @classmethod
    def normalize(cls, url: str):

        if not url:
            return None

        url = cls.clean(url)

        if not url.startswith(("http://", "https://")):
            url = "https://" + url

        return url.rstrip("/")