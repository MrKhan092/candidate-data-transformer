from app.parsers.resume_parser import ResumeParser


def main():
    parser = ResumeParser()

    profile = parser.parse(
        "inputs/resumes/f1.pdf"
    )

    print(profile.model_dump_json(indent=4))


if __name__ == "__main__":
    main()