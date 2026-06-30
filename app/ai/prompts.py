from app.schema.candidate import CandidateProfile


SYSTEM_PROMPT = """
You are an expert candidate profile extraction engine.

Your task is to extract information from a resume.

Rules:

- Return ONLY valid JSON.
- Never wrap JSON inside markdown.
- Never explain anything.
- Never invent information.
- Missing values should be null or [].
- Preserve every experience.
- Preserve every education.
- Extract all skills.
- Extract all links.
- Normalize dates whenever possible.
"""


def build_resume_prompt(resume_text: str) -> str:
    schema = CandidateProfile.model_json_schema()

    return f"""
Extract the candidate profile.

Return ONLY valid JSON.

The JSON MUST follow this schema exactly.

Schema:

{schema}

Resume:

{resume_text}
"""