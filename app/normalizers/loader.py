import json
from pathlib import Path


CONFIG_DIR = Path("config")


class ConfigLoader:

    @staticmethod
    def load(filename: str):

        path = CONFIG_DIR / filename

        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)