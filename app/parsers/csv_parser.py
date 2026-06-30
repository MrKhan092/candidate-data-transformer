"""
Stub for app/parsers/csv_parser.py
"""
import pandas as pd

from app.schema.candidate import CandidateProfile


class CSVParser:
    """
    Parses recruiter CSV into CandidateProfile.
    """

    def parse(self, csv_path: str) -> CandidateProfile:
        df = pd.read_csv(csv_path)

        row = df.iloc[0]

        return CandidateProfile(
            full_name=row.get("name"),
            emails=[row["email"]] if pd.notna(row.get("email")) else [],
            phones=[str(row["phone"])] if pd.notna(row.get("phone")) else [],
            experience=[
                {
                    "company": row.get("current_company"),
                    "title": row.get("title"),
                    "start": None,
                    "end": None,
                    "summary": None,
                }
            ] if pd.notna(row.get("current_company")) else [],
        )