class BaseNormalizer:

    @staticmethod
    def clean(value: str):

        if value is None:
            return None

        return value.strip()