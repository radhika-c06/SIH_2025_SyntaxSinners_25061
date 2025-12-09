#!/usr/bin/env python3
"""
Verify monastery information using Groq AI
Usage: python verify_monastery.py "claim to verify"
"""

import sys
import json
from bodhi import verify_information

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No claim provided"}))
        sys.exit(1)
    
    claim = sys.argv[1]
    
    try:
        result = verify_information(claim)
        print(json.dumps(result))
        sys.exit(0)
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
