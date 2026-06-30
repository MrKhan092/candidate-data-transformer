from app.ai.factory import get_llm

llm = get_llm()

response = llm.generate("Say hello in exactly three words.")

print(response)