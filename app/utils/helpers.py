"""
App Helper functions
"""
import json
import os
from typing import Any, Dict
from app.utils.logger import logger
from app.utils.constants import (
    DEFAULT_CONFIG_PATH,
    SOURCE_PRIORITY_PATH,
    CUSTOM_CONFIG_PATH
)

def deep_merge(dict1: Dict[str, Any], dict2: Dict[str, Any]) -> Dict[str, Any]:
    """
    Recursively merges dict2 into dict1.
    """
    for key, value in dict2.items():
        if isinstance(value, dict) and key in dict1 and isinstance(dict1[key], dict):
            deep_merge(dict1[key], value)
        else:
            dict1[key] = value
    return dict1

def load_config() -> Dict[str, Any]:
    """
    Loads default config, source priorities, and overrides them with custom config if present.
    """
    config: Dict[str, Any] = {}
    
    # Load defaults
    if os.path.exists(DEFAULT_CONFIG_PATH):
        try:
            with open(DEFAULT_CONFIG_PATH, "r", encoding="utf-8") as f:
                config = json.load(f)
        except Exception as e:
            logger.error(f"Error loading default config at {DEFAULT_CONFIG_PATH}: {e}")
    else:
        logger.warning(f"Default config not found at {DEFAULT_CONFIG_PATH}. Using empty defaults.")

    # Load source priority
    if os.path.exists(SOURCE_PRIORITY_PATH):
        try:
            with open(SOURCE_PRIORITY_PATH, "r", encoding="utf-8") as f:
                priority_config = json.load(f)
                config = deep_merge(config, priority_config)
        except Exception as e:
            logger.error(f"Error loading source priority config at {SOURCE_PRIORITY_PATH}: {e}")
    else:
        logger.warning(f"Source priority config not found at {SOURCE_PRIORITY_PATH}.")

    # Load custom overrides
    if os.path.exists(CUSTOM_CONFIG_PATH):
        try:
            with open(CUSTOM_CONFIG_PATH, "r", encoding="utf-8") as f:
                custom_config = json.load(f)
                if custom_config:
                    config = deep_merge(config, custom_config)
        except Exception as e:
            logger.error(f"Error loading custom config at {CUSTOM_CONFIG_PATH}: {e}")
            
    return config
