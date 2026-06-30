"""
Application Constants
"""
import os

# Project root path
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# Source names
SOURCE_CSV = "recruiter_csv"
SOURCE_RESUME = "resume_pdf"
SOURCE_GITHUB = "github_profile"

# Methods
METHOD_CSV = "csv_parsing"
METHOD_GEMINI = "gemini_parsing"
METHOD_GITHUB = "github_api_fetch"

# Config file paths
DEFAULT_CONFIG_PATH = os.path.join(PROJECT_ROOT, "config", "default.json")
SOURCE_PRIORITY_PATH = os.path.join(PROJECT_ROOT, "config", "source_priority.json")
CUSTOM_CONFIG_PATH = os.path.join(PROJECT_ROOT, "config", "custom.json")

# Log paths
DEFAULT_LOG_DIR = os.path.join(PROJECT_ROOT, "logs")
DEFAULT_LOG_FILE = os.path.join(DEFAULT_LOG_DIR, "transformer.log")
