"""
App Logging Setup
"""
import os
import logging
import sys
from dotenv import load_dotenv
from app.utils.constants import DEFAULT_LOG_DIR, DEFAULT_LOG_FILE

# Load environment variables
load_dotenv()

def setup_logger(name: str = "candidate_transformer") -> logging.Logger:
    """
    Sets up a logger with a console handler and a file handler.
    """
    logger = logging.getLogger(name)
    
    # Avoid duplicate handlers if logger is already set up
    if logger.handlers:
        return logger
        
    log_level_str = os.getenv("LOG_LEVEL", "INFO").upper()
    log_level = getattr(logging, log_level_str, logging.INFO)
    logger.setLevel(log_level)
    
    formatter = logging.Formatter(
        "[%(asctime)s] %(levelname)s [%(name)s:%(filename)s:%(lineno)d] - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    # Console handler
    console_handler = logging.StreamHandler(sys.stderr)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    # File handler (create logs directory if it doesn't exist)
    try:
        os.makedirs(DEFAULT_LOG_DIR, exist_ok=True)
        file_handler = logging.FileHandler(DEFAULT_LOG_FILE, encoding="utf-8")
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    except Exception as e:
        # If we can't create file log, print a warning but continue with console logging
        print(f"Warning: Could not set up log file handler: {e}", file=sys.stderr)
        
    return logger

# Global package logger
logger = setup_logger()
