from abc import ABC, abstractmethod
from typing import Type, TypeVar
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)

class LLMProvider(ABC):
    """
    Abstract interface for LLM Providers.
    """
    
    @abstractmethod
    def generate_structured_data(
        self, 
        prompt: str, 
        response_model: Type[T],
        system_instruction: str = None
    ) -> T:
        """
        Generates structured data from the LLM, validating it against a Pydantic response model.
        
        Args:
            prompt: The user prompt to send to the model.
            response_model: The Pydantic model class to validate and structure the response against.
            system_instruction: Optional system instructions for the model.
            
        Returns:
            An instance of the response_model.
        """
        pass

