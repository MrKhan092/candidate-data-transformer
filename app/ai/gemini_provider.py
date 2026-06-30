import os

from dotenv import load_dotenv
from google import genai

load_dotenv()


class GeminiProvider:

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found.")

        self.client = genai.Client(api_key=api_key)

    def generate(
        self,
        prompt: str,
        system_instruction: str = "",
        model: str = None,
    ):

        model = model or os.getenv(
            "GEMINI_MODEL",
            "gemini-2.5-flash"
        )

        response = self.client.models.generate_content(
            model=model,
            contents=[
                system_instruction,
                prompt,
            ],
        )

        return response.text