import phonenumbers


class PhoneNormalizer:

    @staticmethod
    def normalize(phone: str) -> str:
        try:
            parsed = phonenumbers.parse(phone, "IN")

            if phonenumbers.is_valid_number(parsed):
                return phonenumbers.format_number(
                    parsed,
                    phonenumbers.PhoneNumberFormat.E164,
                )

        except Exception:
            pass

        return phone