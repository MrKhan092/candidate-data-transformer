from typing import List, Optional
from pydantic import BaseModel


class Location(BaseModel):
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None


class Links(BaseModel):
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    other: List[str] = []


class Skill(BaseModel):
    name: str
    confidence: float
    sources: List[str]


class Provenance(BaseModel):
    field: str
    value: str
    source: str
    method: str