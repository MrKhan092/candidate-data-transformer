import phonenumbers

from app.normalizers.base import BaseNormalizer


class PhoneNormalizer(BaseNormalizer):

    DEFAULT_REGION = "IN"

    @classmethod
    def normalize(cls, phone: str):

        if not phone:
            return None

        phone = cls.clean(phone)

        try:

            parsed = phonenumbers.parse(
                phone,
                cls.DEFAULT_REGION,
            )

            if not phonenumbers.is_valid_number(parsed):
                return None

            return phonenumbers.format_number(
                parsed,
                phonenumbers.PhoneNumberFormat.E164,
            )

        except phonenumbers.NumberParseException:
            return None