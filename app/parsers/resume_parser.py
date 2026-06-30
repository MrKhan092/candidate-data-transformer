import json

from app.ai.factory import get_llm
from app.ai.prompts import SYSTEM_PROMPT, build_resume_prompt
from app.parsers.pdf_parser import PDFParser
from app.schema.candidate import CandidateProfile


class ResumeParser:
    """
    Uses Gemini to convert a resume PDF into a CandidateProfile.
    """

    def __init__(self):
        self.pdf_parser = PDFParser()

    def parse(self, pdf_path: str) -> CandidateProfile:
        # Extract text from PDF
        resume_text = self.pdf_parser.extract_text(pdf_path)

        # Build prompt
        prompt = build_resume_prompt(resume_text)

        # Ask Gemini
        llm = get_llm()

        response = llm.generate(
            prompt=prompt,
            system_instruction=SYSTEM_PROMPT,
        )

        # Clean Gemini response
        response = response.strip()

        # Remove Markdown code fences if present
        if response.startswith("```json"):
            response = response[len("```json"):]

        if response.endswith("```"):
            response = response[:-3]

        response = response.strip()

        # Convert JSON string to dictionary
        data = json.loads(response)

        # Validate and return CandidateProfile
        return CandidateProfile.model_validate(data)