from app.parsers.resume_parser import ResumeParser
from app.normalizers.profile import ProfileNormalizer


def main():

    parser = ResumeParser()

    profile = parser.parse(
        "inputs/resumes/f1.pdf"
    )

    print("======== BEFORE ========")
    print(profile.model_dump_json(indent=4))

    normalized = ProfileNormalizer.normalize(profile)

    print("\n======== AFTER ========")
    print(normalized.model_dump_json(indent=4))


if __name__ == "__main__":
    main()