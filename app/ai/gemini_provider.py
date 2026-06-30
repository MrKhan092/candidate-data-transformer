import os
from typing import Any, Dict, Type, TypeVar
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

from app.ai.llm_provider import LLMProvider
from app.utils.logger import logger

load_dotenv()

T = TypeVar('T', bound=BaseModel)

class GeminiProvider(LLMProvider):
    """
    Concrete Gemini implementation of LLMProvider.
    """
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        llm_config = config.get("llm", {})
        self.model_name = llm_config.get("model_name", "gemini-1.5-flash")
        self.temperature = llm_config.get("temperature", 0.1)
        self.max_output_tokens = llm_config.get("max_output_tokens", 4096)
        
        # Load API key from env
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
        else:
            logger.warning("GEMINI_API_KEY environment variable is missing. LLM calls will fail.")

    def generate_structured_data(
        self, 
        prompt: str, 
        response_model: Type[T],
        system_instruction: str = None
    ) -> T:
        """
        Sends request to Gemini using Structured Output features.
        """
        logger.info(f"Generating structured data using Gemini model: {self.model_name}")
        
        try:
            if not self.api_key:
                raise ValueError("GEMINI_API_KEY is not set.")
                
            generation_config = {
                "response_mime_type": "application/json",
                "response_schema": response_model,
                "temperature": self.temperature,
                "max_output_tokens": self.max_output_tokens
            }
            
            model = genai.GenerativeModel(
                model_name=self.model_name,
                generation_config=generation_config,
                system_instruction=system_instruction
            )
            
            response = model.generate_content(prompt)
            
            # Extract text (JSON format enforced by the API)
            response_text = response.text.strip()
            logger.debug(f"Raw response from Gemini: {response_text}")
            
            # Parse & validate JSON
            return response_model.model_validate_json(response_text)
            
        except Exception as e:
            logger.error(f"Gemini API query or validation failed: {e}", exc_info=True)
            
            # Fallback logic: emit a partial/empty profile rather than stopping execution
            logger.info("Initializing fallback model instantiation...")
            try:
                fallback_args = {}
                for field_name, field_info in response_model.model_fields.items():
                    if field_info.is_required():
                        # Fill required fields with type-appropriate placeholders
                        if field_info.annotation == str:
                            fallback_args[field_name] = "Unknown (API Failure)"
                        elif getattr(field_info.annotation, "__origin__", None) is list:
                            fallback_args[field_name] = []
                        elif getattr(field_info.annotation, "__origin__", None) is dict:
                            fallback_args[field_name] = {}
                        else:
                            fallback_args[field_name] = None
                return response_model(**fallback_args)
            except Exception as fallback_err:
                logger.critical(f"Critical: Failed to generate fallback representation: {fallback_err}")
                raise e

