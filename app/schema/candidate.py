from typing import List, Optional

from pydantic import BaseModel

from .common import (
    Location,
    Links,
    Skill,
    Provenance,
)

from .education import Education
from .experience import Experience


class CandidateProfile(BaseModel):

    candidate_id: Optional[str] = None

    full_name: Optional[str] = None

    emails: List[str] = []

    phones: List[str] = []

    location: Location = Location()

    links: Links = Links()

    headline: Optional[str] = None

    years_experience: Optional[float] = None

    skills: List[Skill] = []

    experience: List[Experience] = []

    education: List[Education] = []

    provenance: List[Provenance] = []

    overall_confidence: float = 0.0