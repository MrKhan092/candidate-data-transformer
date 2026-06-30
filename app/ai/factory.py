from typing import Any, Dict
from app.ai.llm_provider import LLMProvider
from app.ai.gemini_provider import GeminiProvider
from app.utils.logger import logger

def get_llm_provider(config: Dict[str, Any]) -> LLMProvider:
    """
    Factory function to instantiate and return an LLMProvider based on configuration.
    """
    llm_config = config.get("llm", {})
    provider_name = llm_config.get("provider", "gemini").lower()
    
    logger.debug(f"Instantiating LLM provider: {provider_name}")
    
    if provider_name == "gemini":
        return GeminiProvider(config)
    else:
        logger.warning(f"Unsupported LLM provider '{provider_name}'. Defaulting to Gemini.")
        return GeminiProvider(config)

