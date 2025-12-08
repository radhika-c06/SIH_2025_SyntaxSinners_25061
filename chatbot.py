import os
from groq import Groq

def verify_information(claim: str, api_key: str = None) -> dict:
    """
    Verify a user's claim by using Groq's compound model with web search.
    
    Args:
        claim: The information/claim to verify
        api_key: Groq API key (or set GROQ_API_KEY environment variable)
    
    Returns:
        dict containing verification result
    """
    
    # Initialize client
    if api_key is None:
        api_key = os.getenv("GROQ_API_KEY")
    
    if not api_key:
        raise ValueError("API key must be provided or set in GROQ_API_KEY environment variable")
    
    client = Groq(api_key=api_key)
    
    # Create concise verification prompt
    verification_prompt = f"""Verify this claim using web search: "{claim}"

Respond in EXACTLY this format (nothing else):
VERDICT: [TRUE/FALSE/PARTIALLY TRUE/UNVERIFIABLE]
REASON: [One sentence explanation with key evidence]"""

    try:
        response = client.chat.completions.create(
            model="groq/compound",
            messages=[
                {
                    "role": "user",
                    "content": verification_prompt
                }
            ]
        )
        
        result = {
            "claim": claim,
            "verdict": response.choices[0].message.content.strip()
        }
        
        return result
        
    except Exception as e:
        return {
            "claim": claim,
            "verdict": f"ERROR: {str(e)}"
        }


# Set your API key
API_KEY = ""  # Or use os.getenv("GROQ_API_KEY")

# Ask user for claim to verify
claim_to_verify = input("Enter the claim you want to verify: ")

# Verify the claim
result = verify_information(claim_to_verify, API_KEY)
print("\n" + result['verdict'])