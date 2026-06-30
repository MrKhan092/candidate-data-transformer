import os
import requests
from dotenv import load_dotenv

load_dotenv()


class GitHubClient:
    """
    Simple wrapper around the GitHub REST API.
    """

    BASE_URL = "https://api.github.com"

    def __init__(self):
        self.token = os.getenv("GITHUB_TOKEN")

        self.headers = {
            "Accept": "application/vnd.github+json"
        }

        if self.token:
            self.headers["Authorization"] = f"Bearer {self.token}"

    def get_user(self, username: str):
        url = f"{self.BASE_URL}/users/{username}"

        response = requests.get(url, headers=self.headers)

        response.raise_for_status()

        return response.json()

    def get_repositories(self, username: str):
        url = f"{self.BASE_URL}/users/{username}/repos"

        response = requests.get(url, headers=self.headers)

        response.raise_for_status()

        return response.json()