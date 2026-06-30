from app.github.client import GitHubClient


def main():
    client = GitHubClient()

    user = client.get_user("MrKhan092")

    print(user["name"])
    print(user["login"])
    print(user["public_repos"])


if __name__ == "__main__":
    main()