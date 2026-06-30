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
        self.llm = get_llm()

    def parse(self, pdf_path: str) -> CandidateProfile:
        # Extract text from PDF
        resume_text = self.pdf_parser.extract_text(pdf_path)

        # Build prompt
        prompt = build_resume_prompt(resume_text)

        # Ask Gemini
        response = self.llm.generate(
            prompt=prompt,
            system_instruction=SYSTEM_PROMPT,
        )

        # Convert JSON string to Python dictionary
        data = json.loads(response)

        # Validate using Pydantic
        return CandidateProfile.model_validate(data)