from app.parsers.csv_parser import CSVParser


def main():
    parser = CSVParser()

    profile = parser.parse(
        "inputs/csv/recruiter.csv"
    )

    print(profile.model_dump_json(indent=4))


if __name__ == "__main__":
    main()