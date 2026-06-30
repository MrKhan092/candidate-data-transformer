from app.parsers.github_parser import GitHubParser


def main():
    parser = GitHubParser()

    profile = parser.parse("MrKhan092")

    print(profile.model_dump_json(indent=4))


if __name__ == "__main__":
    main()